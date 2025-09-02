# 📚 School System

A **School Management System** built with **Next.js, Node.js, and TailwindCSS**, featuring database connectivity for managing school-related operations.

---
## URL : https://school-system-one-psi.vercel.app/

## 🚀 Features
- 🏫 School management functionality  
- 🔒 Secure authentication (signup & login test scripts)  
- 🗄️ Database integration (SQL setup provided)  
- 🎨 Styled with TailwindCSS  
- ⚡ Fast performance with Next.js  

---

## 📂 Project Structure
```
School_System-main/
│── app/                 # Next.js application pages
│── components/          # Reusable UI components
│── lib/                 # Utility functions & database logic
│── public/              # Static assets
│── hooks/               # Custom React hooks
│── database_setup.sql   # SQL script for database schema
│── setup-db.js          # Node script to set up DB
│── test-connection.js   # Test database connectivity
│── package.json         # Project dependencies
│── tailwind.config.ts   # TailwindCSS config
```

---

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone <repo_url>
   cd School_System-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   - Import the SQL file:
     ```bash
     mysql -u root -p < database_setup.sql
     ```
   - Or run the Node setup script:
     ```bash
     node setup-db.js
     ```

4. **Configure environment variables**
   - Create a `.env.local` file in the root:
     ```env
     DATABASE_URL=mysql://user:password@localhost:3306/school_system
     ```

---

## ▶️ Running the Project

**Development Mode:**
```bash
npm run dev
```
Runs on [http://localhost:3000](http://localhost:3000)

**Production Build:**
```bash
npm run build
npm start
```

---

## 🧪 Testing

Scripts available for testing:
```bash
node test-connection.js   # Test DB connection
node test-api.js          # Test API endpoints
node test-signup.js       # Test signup functionality
```

---

## 📌 Requirements
- Node.js v16+
- MySQL / PostgreSQL
- npm or yarn

---
## screenshots


![WhatsApp Image 2025-09-02 at 13 29 13_bd7362bb](https://github.com/user-attachments/assets/0b143490-8529-4f45-8b54-6579c270105d)

![WhatsApp Image 2025-09-02 at 13 29 13_700408d9](https://github.com/user-attachments/assets/a2edb8c4-1ebc-47af-8b05-64e9e6f22945)

![WhatsApp Image 2025-09-02 at 13 29 13_d1aa36b2](https://github.com/user-attachments/assets/f1897649-0ff5-43da-824a-87597cba734c)

![WhatsApp Image 2025-09-02 at 13 29 12_5ee1647c](https://github.com/user-attachments/assets/d2d60e47-36a4-4e4b-8868-01d7cc2e5fda)

![WhatsApp Image 2025-09-02 at 13 29 11_f7145e03](https://github.com/user-attachments/assets/936582e1-8a9e-4a8c-b218-5214ce580e5b)

![WhatsApp Image 2025-09-02 at 13 29 11_571775be](https://github.com/user-attachments/assets/4b70b09e-488a-4878-8ecb-e427a2e64aab)

![WhatsApp Image 2025-09-02 at 13 29 12_fb5470f3](https://github.com/user-attachments/assets/faf61b78-eb50-433b-97d5-6f96a45164af)
