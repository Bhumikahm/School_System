import mysql from 'mysql2/promise';

// Database configuration - hardcoded for API routes
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Bhumika@2003',
  database: 'school_management',
  connectionLimit: 10,
  acquireTimeout: 60000,
  timeout: 60000,
};

// Create connection pool for better performance
const pool = mysql.createPool(dbConfig);

export async function getConnection() {
  try {
    return await pool.getConnection();
  } catch (error) {
    console.error('Database connection failed:', error);
    throw new Error('Database connection failed');
  }
}

export async function executeQuery(query: string, params: any[] = []) {
  if (!query || typeof query !== 'string') {
    throw new Error('Invalid query provided');
  }
  
  let connection;
  try {
    connection = await getConnection();
    const [results] = await connection.execute(query, params);
    return results;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export default pool;