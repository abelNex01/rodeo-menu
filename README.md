# Rodeo Restaurant Menu App

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwind-css)

A professional, enterprise-ready digital menu and restaurant management system. This application provides a seamless experience for both customers (ordering, browsing) and restaurant staff (menu management, order tracking, analytics).

---

## 🚀 Key Features

### 🛒 Customer Experience
- **Sleek Ordering Flow**: Multi-step checkout process from category browsing to payment confirmation.
- **Micro-Interactions**: Smooth animations powered by Framer Motion and Lucide icons.
- **Smart Cart Logic**: Persistent cart management with automatic tax (7.5%) and discount calculations.
- **Waiter Assistance**: Integrated guest-to-staff calling system with visual feedback.
- **Dynamic Search & Filters**: Real-time filtering by category, price, or name.

### 🔐 Admin Portal
- **Dashboard & Analytics**: At-a-glance KPIs including total revenue, order volume, and performance metrics.
- **Live Order Tracking**: Manage order lifecycles (Pending → Preparing → Completed) in real-time.
- **Menu Inventory Control**: Full CRUD operations for menu items and categories via the Admin UI.
- **User Management**: Role-based access control (Staff, Management, Admin).
- **Settings & Localization**: Configurable tax rates, store metadata, and notification toggles.

---

## 🛠️ Tech Stack

- **Framework**: React 18 (with Hooks & Functional Components)
- **State Management**: Multi-Context Architecture (`Auth`, `Cart`, `Orders`, `Menu`, `Notifications`)
- **Build Tool**: Vite (Optimized for speed and HMR)
- **Styling**: Tailwind CSS (Utility-first approach with custom theme extensions)
- **Animations**: Framer Motion
- **Data Persistence**: Service-oriented architecture with LocalStorage-based Mock API
- **Routing**: React Router DOM v6 (including Protected Routes and Lazy Loading)

---

## 📂 Project Structure

```text
src/
├── assets/             # Global static assets (images, logos)
├── components/         # Reusable UI components
│   ├── admin/          # Admin-specific UI elements
│   ├── common/         # Shared components (Buttons, Inputs)
│   └── ...
├── context/            # Global state providers and custom hooks
├── data/               # Initial seed data and static constants
├── layouts/            # Page layouts (AdminShell, CustomerLayout)
├── pages/              # Main application screens
│   ├── admin/          # Protected Admin views (Dashboard, Analytics, etc.)
│   └── customer/       # Customer-facing views (Categories, Payment, etc.)
├── services/           # API layer and storage adapters
├── App.jsx             # Root router and application shell
└── main.jsx            # Entry point
```

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/username/rodeo-menu.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Default Credentials (for Demo)
- **Admin Email**: `admin@rodeo.com`
- **Password**: `admin123`

---

## 🏛️ Architecture Overview

### 1. Multi-Context State Management
The app utilizes a centralized `AppProvider` that aggregates multiple specialized contexts. This avoids "prop drilling" and ensures a clean separation of concerns:
- `AuthContext`: Manages session state and RBAC.
- `CartContext`: Handles item additions, removals, and total calculations via `useReducer`.
- `OrdersContext`: Synchronizes order states between customer actions and admin views.

### 2. Service-Oriented API Layer
All data interactions are abstracted into a `services/api.js` layer. This allows for easy migration from LocalStorage to a real REST/GraphQL backend by simply swapping the adapter implementation.

### 3. Protected Routing
Admin routes are wrapped in a `RequireAuth` higher-order component (HOC) that validates session status and user roles before rendering sensitive views.

---

## 📖 Usage & Maintenance

### Adding Menu Items
Instead of manually editing `menuData.js`, use the **Admin Menu Editor** (`/admin/menu`). New items are persisted across sessions via the API layer.

### Modifying Business Rules
Tax rates and discount logic can be adjusted in `src/context/AppProvider.jsx` or via the **Admin Settings** page.

---

## 📄 License
This project is licensed under the MIT License.

---
Developed with ❤️ by the Rodeo Team.

