const testData = {
  username: 'testuser',
  fullName: 'Test User',
  email: 'test@example.com',
  contact: '1234567890',
  password: process.env.TEST_PASSWORD || 'Test123!@#'
};

fetch('http://localhost:3000/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testData)
})
.then(res => res.json())
.then(data => console.log('Response:', data))
.catch(err => console.error('Error:', err));