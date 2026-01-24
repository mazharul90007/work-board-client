# WORK BOARD FRONTEND

**WORK BOARD SERVER** - WORK BOARD CLIENT is a task management platform created by Next.js 16. The platform supports user and assigned task management using modern frontend and backend technologies.

🌐 **Frontend Live URL:** [https://workboard-client.vercel.app](https://workboard-client.vercel.app)  
🌐 **Backend Live URL:** [https://workboard-server-nestjs.onrender.com](https://workboard-server-nestjs.onrender.com)  
🌐 **Backend Github URL:** [https://github.com/mazharul90007/workboard-server-nestjs](https://github.com/mazharul90007/workboard-server-nestjs)  
📚 **API Documentation:** [Postman Documentation](https://documenter.getpostman.com/view/40157327/2sBXVfkBth)

---

## 🚀 Features

### Role Based Authorization

[MEMBER, LEADER, ADMIN, SUPER_ADMIN]

### Authentication with JWT

- **Create User** (ADMIN & SUPER_ADMIN)
- **Login** (PUBLIC)
- **Update Token** (PUBLIC)

### Task Management

- **Create Task** (LEADER, ADMIN, SUPER_ADMIN)
- **Get all Tasks** (ALL LOGGEDIN USER)
- **Get a Specific Task by Id** (ALL LOGGEDIN USER)
- **Update a Specific Task by Id** (LEADER, ADMIN & SUPER_ADMIN)
- **Update Task Status** (ALL LOGGEDIN USER)
- **Delete Task** (ADMIN & SUPER_ADMIN)

### User Management

- **Create User** (ADMIN & SUPER_ADMIN)
- **Get a Single User** (ADMIN & SUPER_ADMIN)
- **Get All Users** (ADMIN & SUPER_ADMIN)
- **Update User data** (ADMIN & SUPER_ADMIN)
- **Delete User** (ADMIN & SUPER_ADMIN)
- **Update User Profile Photo** (ALL LOGGEDIN USER)

---

## 🛠 Frontend Technology Stack

### Core Framework

- **Next.js (v16.1.0)** - The React framework for the web (using App Router).
- **React (v19.2.3)** (v5.2.1) - UI library for building components.
- **TypeScript** - Type-safe JavaScript

### State Management & Data Fetching

- **Zustand (5.0.9)** - Powerful and fast state-management library.
- **TanStack Query (v5.90.12)** - Powerful asynchronous state management for managing server state (caching, synchronization, and updating).
- **Axios** - Promise-based HTTP client for API requests.

### UI & Styling

- **Tailwind CSS (v4)** - A utility-first CSS framework for rapid and modern UI development.
- **Lucide React** - A library of beautiful, consistent icons.
- **Lottie React** - Light-weight, high-quality animation library.

### Notifications

- **React Toastify** - Elegant notification system for success and error messages.
- **sweetalert2** - JavaScript library for beautiful, customizable popup alerts.

### Form Handling

- **React Hook Form** (v4.21.0) - Performant, flexible, and extensible forms with easy validation.

### Deployment

- **Vercel** - Serverless deployment platform

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher)
- **npm** or **pnpm** package manager
- **Git**

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd work-board-client
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using pnpm:

```bash
pnpm install
```

### 5. Build the Project

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist` folder.

---

## 🎯 Usage Instructions

### Development Mode

Run the server in development mode with hot-reload:

```bash
npm run dev
```

The server will start on `http://localhost:3000` (or your configured PORT).

### Backend API Base URL

- **Production:** `https://workboard-server-nestjs.onrender.com`

---

## 📝 License

ISC

---

## 👤 Author

Mazharul Islam Sourabh

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
