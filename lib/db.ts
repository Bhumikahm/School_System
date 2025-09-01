import mysql from 'mysql2/promise';

let connection: mysql.Connection | null = null;

export const getConnection = async () => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Bhumika@2003',
      database: process.env.DB_NAME || 'school_management',
    });
  }
  return connection;
};

export default { getConnection };