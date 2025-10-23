# 🚗 CrudParking Frontend

This repository contains the **frontend interface** for **CrudParking**, a parking management system built using **Vue.js**.  
It provides a clean and responsive user interface to interact with the backend API for managing vehicles, users, rates, and parking sessions.

---

## 🎯 Project Objective

The purpose of this project is to provide an intuitive and dynamic **web interface** that connects to the CrudParking backend API.  
It allows administrators to easily register, update, and track vehicle parking activity through a modern Vue.js application.

---

## ⚙️ Installation & Execution

### 🧩 Prerequisites
Before running the project, ensure you have installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)
- The [CrudParking Backend](https://github.com/Vanessa55-rgb/crudpark-csharp-back.git) running locally on `http://localhost:5000`

---

### 🔽 Clone the repository
```bash
git clone https://github.com/Vanessa55-rgb/crudpark-csharp-front.git
cd crudpark-csharp-front
```

---

### 📦 Install dependencies
```bash
npm install
```

---

### ⚙️ Configure backend connection
If necessary, update the API base URL in your environment or configuration file to point to the local backend:
```bash
http://localhost:5000
```

---

### ▶️ Run the development server
```bash
npm run dev
```

Once the app starts, open your browser and go to:
```
http://localhost:5173
```

---

## 🔁 General Usage Flow

1. **Start the backend** using `dotnet run` on `http://localhost:5000`
2. **Run the frontend** using `npm run dev`
3. The frontend consumes API routes such as:
   - `GET /api/vehicles` → List all vehicles
   - `POST /api/vehicles` → Register a new vehicle
   - `PUT /api/vehicles/{id}` → Update vehicle information
   - `DELETE /api/vehicles/{id}` → Remove a vehicle
4. Data is dynamically displayed and managed in the Vue interface.

---

## 👥 Credits

- **Team:** Java_C#
- **Developers:**
  - Andres Marin  
  - Santiago Restrepo Arismendy  
  - Vanessa Gomez Lopez  

🔗 **Team registration:** [https://teams.crudzaso.com](https://teams.crudzaso.com)

---

## 🧠 Technologies Used

- Vue.js 3 (Composition API)
- JavaScript (ES6+)
- HTML5 / CSS3
- Vite (Development Server & Bundler)
- RESTful API Integration

---

## 🧩 License

This project is open source.
