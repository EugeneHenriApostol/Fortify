# Fortify - Personal Budget Tracker
A full-stack web application for managing personal finances, built with ASP.NET Core Web API backend and React.js frontend with Tailwind CSS.

## 🚀 Features
User Authentication - Secure login/register with JWT tokens

Budget Management - Set monthly spending limits

Transaction Tracking - Record income and expenses with categories

Category Management - Organize transactions by custom categories

Budget Progress - Visual indicators showing spending against budget

Monthly Views - Filter transactions and budgets by month/year

## 🛠️ Tech Stack
Backend
ASP.NET Core 9.0 - Web API

Entity Framework Core - ORM

ASP.NET Core Identity - Authentication

JWT Bearer Tokens - Secure authentication

SQL Server - Database

Docker - Containerization

Frontend
React.js 18 - Frontend framework

Tailwind CSS - Styling

Vite - Build tool

React Router - Client-side routing

## 📋 Prerequisites
.NET 9.0 SDK

Node.js 20+

Docker Desktop (for containerized deployment)

SQL Server (or use Docker)

## 🏗️ Project Structure
FortifyApp/
├── FortifyAPI/                 # Backend ASP.NET Core API
│   ├── Controllers/           # API endpoints
│   ├── Models/                # Data models
│   ├── DTOs/                  # Data transfer objects
│   ├── Services/              # Business logic
│   ├── Repository/            # Data access layer
│   ├── Data/                  # DbContext and migrations
│   └── FortifyAPI.csproj
├── fortify-frontend/          # React.js frontend
│   ├── src/
│   │   ├── Components/        # UI components
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── docker-compose.yml         # Docker composition


## 🚀 Quick Start
Option 1: Development Setup (Without Docker)
Backend Setup
bash
## Navigate to backend directory
cd FortifyAPI

## Restore NuGet packages
dotnet restore

## Run database migrations
dotnet ef database update

## Start the backend API
dotnet run
Backend will be available at: http://localhost:5046

Frontend Setup
bash

## Navigate to frontend directory
cd ../fortify-frontend

## Install dependencies
npm install

## Start development server
npm run dev
Frontend will be available at: http://localhost:5173

Option 2: Docker Setup (Recommended)
bash

## Build and start all services
docker-compose up --build

## Or run in detached mode
docker-compose up -d --build
Services will be available at:

Frontend: http://localhost:5173

Backend API: http://localhost:5046

Database: localhost:1433

## 🔧 Configuration
Backend Configuration
Update appsettings.json in the FortifyAPI project:

json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=db;Database=FortifyDb;User=sa;Password=Password1234!;TrustServerCertificate=True;"
  },
  "Jwt": {
    "Key": "your-super-secret-key-here",
    "Issuer": "FortifyApp",
    "Audience": "FortifyUsers"
  }
}
Frontend Configuration
Update API base URL in frontend components if needed:

javascript
const API_BASE_URL = "http://localhost:5046/api";

## 📊 API Endpoints
### Authentication
POST /api/Login - User login

POST /api/Register - User registration

GET /api/Login/me - Get current user info

### Budgets
GET /api/Budget/{month}/{year} - Get monthly budget

POST /api/Budget - Set monthly budget

PUT /api/Budget - Update budget

### Transactions
GET /api/Transaction - Get all transactions

GET /api/Transaction/month/{month}/{year} - Get monthly transactions

POST /api/Transaction - Create transaction

PUT /api/Transaction/{id} - Update transaction

DELETE /api/Transaction/{id} - Delete transaction

### Categories
GET /api/Categories - Get all categories

POST /api/Categories - Create category

PUT /api/Categories/{id} - Update category

DELETE /api/Categories/{id} - Delete category

## 🗃️ Database Schema
### Key Tables
Users - User accounts and authentication

Budgets - Monthly spending limits

Categories - Transaction categories (Income/Expense)

Transactions - Individual income/expense records

### Relationships
User 1:N Budgets

User 1:N Categories

User 1:N Transactions

Category 1:N Transactions

## 🐛 Troubleshooting
Common Issues
Database Connection Issues

Ensure SQL Server is running

Check connection string in appsettings.json

Verify database exists and is accessible

JWT Token Issues

Verify JWT secret key is set

Check token expiration settings

Ensure cookies are enabled in browser

CORS Issues

Backend CORS is configured for http://localhost:5173

Update CORS settings in Program.cs if using different ports

Docker Issues

bash
## Reset Docker environment
docker-compose down -v
docker system prune -a
docker-compose up --build
## 🧪 Testing
Backend Testing
bash
cd FortifyAPI
dotnet test
Frontend Testing
bash
cd fortify-frontend
npm test
## 📝 Environment Variables
Backend (.env or appsettings.json)
text
ASPNETCORE_ENVIRONMENT=Development
ConnectionStrings__DefaultConnection=Your_Connection_String
Jwt__Key=Your_JWT_Secret_Key
Frontend (.env)
text
VITE_API_BASE_URL=http://localhost:5046
## 🔒 Security Features
JWT-based authentication with secure HTTP-only cookies

Password hashing with ASP.NET Core Identity

CORS configuration for frontend-backend communication

Input validation and model binding

SQL injection protection with Entity Framework

XSS protection with proper content types

## 🤝 Contributing
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments
ASP.NET Core team for the excellent web framework

React.js team for the frontend library

Tailwind CSS for the utility-first CSS framework

Vite for the fast build tool

## 📞 Support
If you encounter any issues or have questions:

Check the Troubleshooting section

Search existing GitHub Issues

Create a new issue with detailed information

Happy Budgeting! 💰