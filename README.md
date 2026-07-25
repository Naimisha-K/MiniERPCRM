# Mini ERP CRM Operations Portal

A full-stack Mini ERP & CRM Operations Portal developed using **React, Node.js, Express, TypeScript, Prisma ORM, and PostgreSQL**. The application helps businesses manage customers, products, inventory, and sales challans through a simple admin dashboard.

---

# Features

## Authentication
- User Login with JWT Authentication
- Secure API Access
- Protected Backend Routes

## Dashboard
- Live Dashboard Statistics
- Total Customers
- Total Products
- Total Challans
- Low Stock Count

## Customer Management
- View Customers
- Add Customer
- Edit Customer *(In Progress)*
- Delete Customer *(In Progress)*

## Product Management
- View Products
- Add Product
- Edit Product *(In Progress)*
- Delete Product *(In Progress)*

## Inventory Management
- Stock In
- Stock Out
- Automatic Stock Updates
- Low Stock Monitoring

## Challan Management
- Generate Sales Challan
- Select Customer
- Select Products
- Automatic Total Quantity Calculation
- Automatic Total Amount Calculation
- Challan History

---

# Tech Stack

## Frontend
- React
- TypeScript
- Material UI
- Axios
- React Router
- Vite

## Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- JWT Authentication
- Zod Validation

## Database
- PostgreSQL

---

# Project Structure

```
MiniERPCRM
│
├── Backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── routes
│   │   ├── services
│   │   ├── validators
│   │   ├── prisma
│   │   └── server.ts
│
└── frontend-react
    ├── src
    │   ├── components
    │   ├── layouts
    │   ├── pages
    │   ├── routes
    │   ├── services
    │   └── App.tsx
```

---

# Database Models

## User

- id
- name
- email
- password
- role

---

## Customer

- customerName
- mobile
- email
- businessName
- gstNumber
- customerType
- address
- status
- followUpDate
- notes

---

## Product

- productName
- sku
- category
- unitPrice
- currentStock
- minimumStock
- warehouse

---

## Stock Movement

- quantity
- type (IN / OUT)
- reason
- createdAt

---

## Challan

- challanNumber
- customer
- totalQuantity
- totalAmount
- status

---

## Challan Item

- product
- quantity
- price

---

# API Endpoints

## Authentication

```
POST /auth/login
```

---

## Customers

```
POST    /customers
GET     /customers
GET     /customers/:id
PUT     /customers/:id
DELETE  /customers/:id
```

---

## Products

```
POST    /products
GET     /products
GET     /products/:id
PUT     /products/:id
DELETE  /products/:id
```

---

## Inventory

```
POST /inventory/stock-in
POST /inventory/stock-out
```

---

## Challans

```
POST /challans
GET  /challans
GET  /challans/:id
```

---

## Dashboard

```
GET /dashboard
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/MiniERPCRM.git
```

---

## Backend

```bash
cd Backend
npm install
```

Create a `.env` file.

```
DATABASE_URL=your_postgresql_database_url
JWT_SECRET=your_secret_key
PORT=3000
```

Generate Prisma Client

```bash
npx prisma generate
```

Push Database Schema

```bash
npx prisma db push
```

Run Backend

```bash
npm run dev
```

---

## Frontend

```bash
cd frontend-react
npm install
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

Backend runs on

```
http://localhost:3000
```

---

# Dashboard

The dashboard displays:

- Total Customers
- Total Products
- Total Challans
- Low Stock Products

Statistics are fetched dynamically from the backend.

---

# Inventory Workflow

1. Create Product
2. Add Initial Stock
3. Perform Stock In
4. Perform Stock Out
5. Generate Challan
6. Stock updates automatically

---

# Security

- JWT Authentication
- Request Validation using Zod
- Protected API Routes
- Prisma ORM for safe database access

---

# Future Enhancements

- Customer Edit & Delete UI
- Product Edit & Delete UI
- Search & Pagination
- Dashboard Charts
- PDF Challan Generation
- Reports
- User Role Management
- Email Notifications

---

# Screenshots

Add screenshots of:

- Login
- Dashboard
- Customers
- Products
- Inventory
- Challans

---

# Developed By

**Naimisha K**

B.Tech Information Technology

Mini ERP CRM Operations Portal

2026
