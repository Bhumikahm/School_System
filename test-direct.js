const { getConnection } = require('./lib/db.ts');

async function testDirect() {
  try {
    console.log('Testing database connection...');
    const connection = await getConnection();
    console.log('Connection successful!');
    
    const [result] = await connection.execute('SELECT 1 as test');
    console.log('Query result:', result);
  } catch (error) {
    console.error('Direct test error:', error);
  }
}

testDirect();