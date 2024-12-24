import { NextResponse } from 'next/server';
import sql from 'mssql';
import { getConnection } from '@/lib/db';

export async function GET() {
  let pool: sql.ConnectionPool | null = null;
  try {
    pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Startups');

    if (!result.recordset) {
      throw new Error('No data returned from database');
    }

    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error('Error fetching startups:', error);
    return NextResponse.json({ error: 'Failed to fetch startups' }, { status: 500 });
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}

