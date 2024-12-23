import { NextResponse } from 'next/server';
import sql from 'mssql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getConnection } from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'f3a453a35cedbf838c72b503f39d93c2a1a1472a93f8e97e06487586953746d51405b07ec3ff6ab8393c25aa64ec34e4227c6500c15de0468dce94d0aec20ad8d7f0b45a8a94db5933c82191d6cbfacb7d58273cf3bc42b7a4c70fb4ee57149dd68f217456526671aaa1c5ba21cef163b99c21c22b0c132907aff175f2d3223015212b0d858f8820b9f282a131e2a6e5e2306e9beb87d9232bdf0832891da46f828a03f7deb6906314262646e36ddb4679b54de5f574f57fa43a5e59c393e4dc5e09617ff347701776e03041341a12344371008356ff1f34f6a490989d41537c7c0236fc517f6e4c9dee3f88c63b1d145aae658e2b48ba39cc08cee9ab14cbbf';

export async function POST(req: Request) {
  let pool: sql.ConnectionPool | null = null;
  try {
    const { email, password } = await req.json();

    pool = await getConnection();
    const result = await pool.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT * FROM Users WHERE Email = @email');

    const user = result.recordset[0];

    if (user && await bcrypt.compare(password, user.PasswordHash)) {
      const token = jwt.sign({ userId: user.UserID }, JWT_SECRET, { expiresIn: '1h' });
      return NextResponse.json({ token, firstName: user.FirstName, lastName: user.LastName }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error('Signin error:', error);
    if (error instanceof sql.RequestError) {
      return NextResponse.json({ message: 'Database request error. Please try again later.' }, { status: 503 });
    }
    return NextResponse.json({ message: 'Error during signin' }, { status: 500 });
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}
