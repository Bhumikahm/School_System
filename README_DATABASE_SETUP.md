# Database Setup Instructions

## Prerequisites
- MySQL Server installed and running
- MySQL command line tools available

## Setup Steps

1. **Start MySQL Server** (if not already running)

2. **Run the database setup script:**
   ```bash
   mysql -u root -proot < database_setup.sql
   ```

3. **Alternative: Manual setup via MySQL Workbench or phpMyAdmin:**
   - Create database: `school_management`
   - Run the SQL commands from `database_setup.sql`

## Database Configuration
- Host: localhost
- User: root
- Password: root
- Database: school_management

## Tables Created
- `users` - User authentication and profile data
- `otps` - OTP verification codes
- `schools` - School information and details

## Running the Application
After database setup:
```bash
npm install
npm run dev
```

The application will be available at http://localhost:3000