import { ConnectionPool } from 'mssql';

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || '',
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: false,
    connectionTimeout: 30000,
    requestTimeout: 15000,
  },
};

export async function getConnection() {
  try {
    const pool = await new ConnectionPool(config).connect();
    console.log('Connected to database');
    return pool;
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    throw err;
  }
}

