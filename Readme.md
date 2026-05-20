# 💰 Expense Tracker

<p align="center">
  A modern full-stack finance tracking web application to manage income, expenses, balance trends, and spending analytics with interactive dashboards and charts.
</p>

---

## 🚀 Features

---

# 🔐 Authentication

✅ User Sign Up  
✅ User Sign In  
✅ Secure Authentication Flow  
✅ Protected Routes  

---

# 📊 Dashboard Analytics

## 💳 Top Summary Cards

- Total Balance
- Total Income
- Total Expense
- Total Transactions

---

## 📈 Balance Overview (Line Chart)

Track balance changes over time using interactive line charts.

### Features

- Dynamic balance calculation
- Responsive chart
- Interactive tooltips
- Empty dashboard onboarding state

---

## 🥧 Expense Categories (Pie Chart)

Visualize category-wise spending distribution.

### Features

- Expense percentage calculation
- Dynamic category colors
- Custom legends
- Empty state onboarding UI

---

## 🧾 Recent Transactions

Displays latest financial activity.

### Features

- Transaction dates
- Income/expense indicators
- Responsive transaction cards
- “View All” transactions
- Empty state support

---

# 💸 Transactions Management

## ✅ Create Transactions

Users can:

- Add income
- Add expense
- Select categories
- Create custom categories
- Select date & time

---

## 🗑 Delete Transactions

- Remove unwanted transactions
- Real-time UI updates

---

## 🔍 Search Transactions

- Search by category name
- Real-time filtering

---

# 🗂 Categories System

## Default Categories

### Expense Categories
- 🍔 Food
- ✈️ Travel
- 🛍 Shopping

### Income Categories
- 💰 Salary
- 📈 Investment
- 🔁 Refund

---

## ➕ Custom Categories

Users can:
- Create custom categories
- Separate categories by:
  - Income
  - Expense

---

# 🌙 Dark Mode

Fully responsive dark/light theme support.

### Features

- Persistent theme toggle
- Modern fintech-inspired UI

---

# 📱 Responsive Design

Optimized for:

- 📱 Mobile
- 💻 Tablet
- 🖥 Desktop

### Includes

- Mobile sidebar drawer
- Bottom sheet modal
- Responsive charts
- Adaptive layouts

---

# ✨ UI/UX Highlights

- Modern fintech-inspired design
- Gradient cards
- Smooth animations
- Interactive hover effects
- Empty state onboarding
- Floating action buttons
- Responsive dashboard layout

---

# 🛠 Tech Stack

## Frontend

- React
- TypeScript
- Tailwind CSS
- Recharts
- React Router

---

## Backend

- Node.js
- Express.js
- TypeScript

---

## Database & ORM

- PostgreSQL
- Prisma ORM

---

## Validation

- Zod

---

# 📂 Project Structure

```bash
src/
│
├── components/
├── pages/
├── hooks/
├── context/
├── charts/
├── modals/
├── routes/
└── utils/
⚙️ Installation
1️⃣ Clone Repository
git clone <your-repository-url>
2️⃣ Install Dependencies
Frontend
npm install
Backend
npm install
3️⃣ Setup Environment Variables

Create a .env file:

DATABASE_URL=
JWT_SECRET=
4️⃣ Prisma Setup
npx prisma generate
npx prisma migrate dev
5️⃣ Run Development Server
Frontend
npm run dev
Backend
npm run dev
📸 Screenshots

<p align="center">
  <img src="./screenshots/Screenshot 2026-05-20 224245.png" width="900"/>
</p>

Dashboard
Transactions Page
Charts
Mobile View
Dark Mode
🔮 Future Improvements
🎯 Budget goals
📅 Monthly reports
📤 Export transactions
🤖 AI spending insights
🔁 Recurring transactions
🔔 Notifications
💱 Multi-currency support
👨‍💻 Author
Nadeem Ansari
GitHub
LinkedIn
Twitter/X