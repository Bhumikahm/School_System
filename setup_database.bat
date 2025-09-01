@echo off
echo Setting up MySQL database for School Management System...

echo Creating database and tables...
mysql -u root -proot < database_setup.sql

if %errorlevel% equ 0 (
    echo Database setup completed successfully!
    echo Database: school_management
    echo Tables created: users, otps, schools
) else (
    echo Error setting up database. Please check your MySQL installation and credentials.
)

pause