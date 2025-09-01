const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function testSignup() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'school_management',
    });
    
    // Check current users
    const [users] = await connection.execute('SELECT * FROM users');
    console.log('Current users:', users);
    
    // Check current OTPs
    const [otps] = await connection.execute('SELECT * FROM otps');
    console.log('Current OTPs:', otps);
    
    await connection.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testSignup();