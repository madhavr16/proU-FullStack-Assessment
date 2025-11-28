# ⭐ ProU Fullstack Assessment – Employee & Task Management System

A full-stack employee & task management platform built as part of the **ProU Fullstack Developer Assessment**, featuring:

- 🔐 Secure authentication with role-based access  
- 👥 Employee & task CRUD operations  
- 📊 Dashboard analytics  
- 🎨 Modern UI with dark/light mode  
- 🌀 Smooth animated page transitions  
- 📱 Fully responsive, elegant interface  

---

## 🚀 Tech Stack

### **Frontend**
- React (Vite)
- React Query
- Zustand
- Tailwind CSS
- Framer Motion
- Recharts
- Axios

### **Backend**
- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- JWT Authentication  
- Bcrypt Security  

---

## 🏆 Key Features

### 🔐 Authentication & Role Management
- Login & Register (with JWT)
- Auto-login after registration  
- Persistent authentication using Zustand + LocalStorage  
- Role-based permissions:  
  - **Admin:** Full access (employees + tasks)  
  - **Manager:** Limited edit permissions  
  - **Employee:** Read-only restricted access  

---

### 👥 Employee Management
- Add, Edit, Delete employees  
- Search + advanced filtering  
- Pagination-ready backend  
- Clean UI for employee details  

---

### 📋 Task Management
- Task CRUD operations  
- Assign tasks to employees  
- Filter by priority & status  
- Due dates and task descriptions  

---

### 📊 Dashboard & Analytics
- Task distribution pie chart  
- Employee count  
- Task progress overview  
- Animated cards with metrics  

---

### 🎨 UI & UX Enhancements
- Modern responsive layout  
- Dark/Light theme toggle  
- Smooth page transitions (Framer Motion)  
- Loading skeletons  
- Professional illustrations on auth screens  

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd proU-fullstack-assessment


Or manually on GitHub: create repo, then:

```powershell
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```
### 2️⃣ Backend Setup (Node.js/Express)

Inside the `backend/` directory:

1.  **Install dependencies**
    ```bash
    npm install
    ```
2.  **Create `.env` file**
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```
3.  **Start the backend**
    ```bash
    npm run dev
    ```

---

### 3️⃣ Frontend Setup (React/Vite)

Inside the `frontend/` directory:

1.  **Install dependencies**
    ```bash
    npm install
    ```
2.  **Create `.env` file**
    ```
    VITE_API_URL=http://localhost:5000/api
    ```
3.  **Run the frontend**
    ```bash
    npm run dev
    ```

---

### 🛠️ API Endpoints Overview

#### **Auth**

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register user |
| `POST` | `/api/auth/login` | Login & get token |

#### **Employees** (Requires Auth)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/employees` | List all employees |
| `POST` | `/api/employees` | Create a new employee |
| `PUT` | `/api/employees/:id` | Update an employee by ID |
| `DELETE` | `/api/employees/:id` | Delete an employee by ID |

#### **Tasks** (Requires Auth)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/tasks` | List all tasks |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update a task by ID |
| `DELETE` | `/api/tasks/:id` | Delete a task by ID |

#### **Analytics** (Requires Auth)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/analytics/summary` | Fetch dashboard summary data |

---

### 🖼️ Screenshots

| Page | Screenshot Placeholder |
| :--- | :--- |
| 🔐 **Login Page** | (Insert screenshot here) |
| 📝 **Register Page** | (Insert screenshot here) |
| 📊 **Dashboard** | (Insert screenshot here) |
| 👥 **Employees Page** | (Insert screenshot here) |
| 📋 **Tasks Page** | (Insert screenshot here) |

---

### ☁️ Deployment

#### **Database**
* MongoDB Atlas

#### **Backend Hosting**
* Render
* Railway
* Vercel Functions
* AWS EC2 / Lambda

#### **Frontend Hosting**
* Vercel
* Netlify
* GitHub Pages

---

### 🧭 GitHub Setup (Local → Remote)

```bash
cd proU-fullstack-assessment
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin [https://github.com/](https://github.com/)<username>/<repo-name>.git
git push -u origin main
```

### 📄 License

This project is part of the **ProU Fullstack Assessment** and intended exclusively for evaluation.

---

### ❤️ Acknowledgements

Designed & developed with attention to detail, focusing on:

* **Code readability**
* **Scalable architecture**
* **UI/UX polish**
* **API quality**
* **Performance**
