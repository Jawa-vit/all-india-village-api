🌍 All India Village API Portal

A full-stack web application that allows users to explore and search Indian geographical data through a hierarchical structure of States → Districts → SubDistricts → Villages. Built using modern web technologies with a responsive and user-friendly interface.

🚀 Features

✅ View all Indian States

✅ Dynamic District loading based on selected State

✅ Dynamic SubDistrict loading based on selected District

✅ Dynamic Village loading based on selected SubDistrict

✅ Real-time Village Search

✅ JWT Authentication for protected routes

✅ RESTful API Architecture

✅ Responsive UI with Tailwind CSS

✅ PostgreSQL Database Integration

✅ Production Deployment (Vercel & Render)

🛠️ Tech Stack
Frontend
React.js
Axios
Tailwind CSS
Backend
Node.js
Express.js
Database
PostgreSQL
Prisma ORM
Authentication
JWT (JSON Web Token)
Deployment
Vercel (Frontend)
Render (Backend)
📂 Project Architecture
Frontend (React)
       ↓
Axios API Calls
       ↓
Backend (Express.js)
       ↓
Prisma ORM
       ↓
PostgreSQL Database
🔄 Application Flow
User
 ↓
Select State
 ↓
Load Districts
 ↓
Select District
 ↓
Load SubDistricts
 ↓
Select SubDistrict
 ↓
Load Villages
 ↓
Search Village
 ↓
Display Results
📸 Key Functionalities
State Management
Fetches all available states from the database.
Populates dynamic dropdown menus.
Hierarchical Navigation
State → District → SubDistrict → Village relationship handling.
Efficient API-driven data loading.
Search Functionality
Search villages by name.
Instant API response with matching results.
Security
JWT-based authentication.
Protected API endpoints.
📡 API Endpoints
States
GET /api/states
Districts
GET /api/districts/:stateId
SubDistricts
GET /api/subdistricts/:districtId
Villages
GET /api/villages/:subDistrictId
Search Villages
GET /api/search?q=villageName
⚙️ Installation
Clone Repository
git clone https://github.com/your-username/all-india-village-api.git
Backend Setup
cd backend
npm install
Frontend Setup
cd frontend
npm install
Start Backend
npm run dev
Start Frontend
npm start
🌐 Deployment
Frontend

Hosted on Vercel

Backend

Hosted on Render

Database

Hosted on PostgreSQL

📚 Learning Outcomes
Full Stack Development
REST API Design
React State Management
Authentication & Authorization
Database Design
Prisma ORM
Deployment & Hosting
Git & GitHub Workflow
👨‍💻 Author

Jawagar K.R

Aspiring Software Developer | Full Stack Developer

GitHub: https://github.com/your-username

LinkedIn: https://linkedin.com/in/your-profile
