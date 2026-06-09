🌍 All India Village API Portal

🇮🇳 Explore India's Geographical Hierarchy with Ease

A Full-Stack Web Application built using React.js, Node.js, Express.js, Prisma ORM, PostgreSQL, and Tailwind CSS that enables users to seamlessly navigate through States → Districts → SubDistricts → Villages with real-time search capabilities.

✨ Overview

The All India Village API Portal is a modern full-stack application that provides structured access to Indian geographical data.

Users can:

🔹 Browse Indian States

🔹 View corresponding Districts

🔹 Explore SubDistricts

🔹 Access Village information

🔹 Search Villages instantly

🔹 Experience a clean and responsive UI

🎯 Problem Statement

Accessing Indian geographical data often requires navigating multiple disconnected sources.

This project solves that challenge by providing a centralized platform that allows users to traverse geographical information through a hierarchical and intuitive interface.

🚀 Key Features
🌎 Hierarchical Navigation
State
  ↓
District
  ↓
SubDistrict
  ↓
Village
🔍 Smart Village Search

Search villages instantly with real-time API responses.

✔ Fast

✔ Accurate

✔ User Friendly

🔐 Secure API Access

Protected routes using JWT Authentication.

User
 ↓
JWT Token
 ↓
Protected API
 ↓
Authorized Access
⚡ Dynamic Data Loading

Instead of loading everything at once:

Select State
      ↓
Load Districts

Select District
      ↓
Load SubDistricts

Select SubDistrict
      ↓
Load Villages

This improves performance and scalability.

🏗️ System Architecture
┌─────────────────┐
│     React UI    │
└────────┬────────┘
         │ Axios
         ▼
┌─────────────────┐
│  Express APIs   │
└────────┬────────┘
         │ Prisma ORM
         ▼
┌─────────────────┐
│ PostgreSQL DB   │
└─────────────────┘
🛠️ Technology Stack
Category	Technology
Frontend	React.js
Styling	Tailwind CSS
API Calls	Axios
Backend	Node.js
Framework	Express.js
ORM	Prisma
Database	PostgreSQL
Authentication	JWT
Deployment	Vercel & Render
📂 Project Structure
all-india-village-api/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── middleware/
│   ├── prisma/
│   ├── controllers/
│   └── package.json
│
└── README.md
📡 API Endpoints
Get All States
GET /api/states
Get Districts
GET /api/districts/:stateId
Get SubDistricts
GET /api/subdistricts/:districtId
Get Villages
GET /api/villages/:subDistrictId
Search Villages
GET /api/search?q=villageName
🌟 Application Workflow
User Visits Portal
        ↓
States Loaded
        ↓
Select State
        ↓
Districts Loaded
        ↓
Select District
        ↓
SubDistricts Loaded
        ↓
Select SubDistrict
        ↓
Villages Loaded
        ↓
Search Village
        ↓
Results Displayed
🚀 Deployment
Frontend

Hosted on Vercel

Backend

Hosted on Render

Database

Hosted on PostgreSQL

📈 What I Learned

✅ Full Stack Development

✅ React Hooks & State Management

✅ REST API Design

✅ Prisma ORM

✅ PostgreSQL Database Management

✅ JWT Authentication

✅ Deployment & Hosting

✅ Production Debugging

✅ Git & GitHub Workflow

👨‍💻 Developer
Jawagar K.R

Aspiring Software Developer | Full Stack Developer

💻 Passionate about building scalable web applications and solving real-world problems through technology.
