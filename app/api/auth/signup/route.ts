import { NextResponse } from 'next/server';
import sql from 'mssql';
import bcrypt from 'bcryptjs';
import { getConnection } from '@/lib/db';

export async function POST(req: Request) {
  let pool: sql.ConnectionPool | null = null;
  try {
    const { firstName, lastName, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    pool = await getConnection();
    await pool.request()
      .input('firstName', sql.NVarChar, firstName)
      .input('lastName', sql.NVarChar, lastName)
      .input('email', sql.NVarChar, email)
      .input('passwordHash', sql.NVarChar, hashedPassword)
      .query('INSERT INTO Users (FirstName, LastName, Email, PasswordHash) VALUES (@firstName, @lastName, @email, @passwordHash)');

    return NextResponse.json({ message: 'User registered successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    if (error instanceof sql.RequestError) {
      if (error.number === 2627) {
        return NextResponse.json({ message: 'Email already exists' }, { status: 409 });
      }
      return NextResponse.json({ message: 'Database request error. Please try again later.' }, { status: 503 });
    }
    return NextResponse.json({ message: 'Error registering user' }, { status: 500 });
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}
