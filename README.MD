# SkillForge – Professional Skill Portfolio & Learning Tracker


## Overview

**SkillForge** is a full-stack web application that enables students and professionals to build, organize, and manage their complete professional portfolio through a single centralized platform.

The application allows users to securely maintain their profile, technical skills, projects, certificates, resume, learning goals, and learning resources while providing administrators with tools to manage users and monitor the system.

This project was developed as part of the **PGCP-AC Course at C-DAC Noida**.

---

# Features

### User Module

- User Registration
- Secure Login (JWT Authentication)
- Profile Management
- Skills Management
- Projects Management
- Certificate Management
- Resume Upload & Management
- Learning Goals
- Learning Resources
- Responsive Dashboard

###  Admin Module

- User Management
- Dashboard
- View Registered Users
- Update User Status
- Secure Role-Based Authorization

---

# Technology Stack

## Frontend

- React.js
- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5
- Bootstrap Icons
- Vite

## Backend

- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA (Hibernate)
- REST APIs

## Database

- MySQL
- MySQL Workbench

## Development Tools

- Visual Studio Code
- Apache Maven
- Postman
- Git & GitHub

---

# Project Structure

```text
SkillForge
│
├── skillforge-frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── ...
│
├── skillforge-backend
│   ├── src
│   ├── pom.xml
│   ├── mvnw
│   └── ...
│
├── README.md
└── .gitignore
```

---

# Major Modules

- Authentication
- Profile Management
- Skills Management
- Projects Management
- Certificate Management
- Resume Management
- Learning Goals
- Learning Resources
- Admin Dashboard

---

# Authentication

The application uses:

- JWT (JSON Web Token)
- Spring Security
- Role-Based Authorization
- Secure REST APIs

---

# Database

The project uses **MySQL** as the relational database.

Major entities include:

- User
- Role
- Profile
- Skill
- Project
- Certificate
- Resume
- Learning Goal
- Learning Resource

---

# Installation

## Clone Repository

```bash
git clone https://github.com/<your-username>/SkillForge.git
```

---

## Backend

```bash
cd skillforge-backend
```

Configure your MySQL database in:

```
application.properties
```

Run:

```bash
mvn spring-boot:run
```

---

## Frontend

```bash
cd skillforge-frontend
```

Install dependencies:

```bash
npm install
```

Run:

```bash
npm run dev
```

The application will start at:

```
http://localhost:5173
```

---

# Future Enhancements

- AI-based Career Recommendation
- Resume Builder
- Job Recommendation System
- Portfolio Sharing
- Mobile Application
- Cloud Storage Integration
- LinkedIn Integration
- GitHub Integration
- Email Notifications

---

# Learning Outcomes

This project demonstrates:

- Full Stack Development
- REST API Development
- Spring Security & JWT
- React.js Development
- Database Design
- CRUD Operations
- Authentication & Authorization
- Responsive UI Design

---

# Developed By

**Aaditya Pratyay Pathak**

PGCP-AC – Centre for Development of Advanced Computing (C-DAC), Noida

---

## Support

If you found this project useful, consider giving it a ⭐ on GitHub.