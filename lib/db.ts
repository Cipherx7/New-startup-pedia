import { ConnectionPool } from 'mssql';

const config = {
  user: 'supreme',
  password: '1234567890zxcvbnm,',
  server: 'startupedia.database.windows.net',
  database: 'signup',
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
    return pool;
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    throw err;
  }
}
