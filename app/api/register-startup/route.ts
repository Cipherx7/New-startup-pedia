import { NextResponse } from 'next/server';
import sql from 'mssql';
import { getConnection } from '@/lib/db';

export async function POST(req: Request) {
  let pool: sql.ConnectionPool | null = null;
  try {
    const { name, description, website, industry, founder, collaboration, phase, helpNeeded } = await req.json();

    pool = await getConnection();
    await pool.request()
      .input('name', sql.NVarChar, name)
      .input('description', sql.NVarChar, description)
      .input('website', sql.NVarChar, website)
      .input('industry', sql.NVarChar, industry)
      .input('founder', sql.NVarChar, founder)
      .input('collaboration', sql.NVarChar, collaboration)
      .input('phase', sql.NVarChar, phase)
      .input('helpNeeded', sql.NVarChar, helpNeeded)
      .query(`
        INSERT INTO Startups (Name, Description, Website, Industry, Founder, Collaboration, Phase, HelpNeeded)
        VALUES (@name, @description, @website, @industry, @founder, @collaboration, @phase, @helpNeeded)
      `);

    return NextResponse.json({ message: 'Startup registered successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Startup registration error:', error);
    if (error instanceof sql.RequestError) {
      return NextResponse.json({ message: 'Database request error. Please try again later.' }, { status: 503 });
    }
    return NextResponse.json({ message: 'Error registering startup' }, { status: 500 });
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}

