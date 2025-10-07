💸 Fortify — Personal Budget Tracker

A full-stack web application for managing personal finances, built with ASP.NET Core Web API (backend) and React.js with Tailwind CSS (frontend).

🚀 Features

✅ User Authentication — Secure login/register with JWT tokens
💰 Budget Management — Set monthly spending limits
📊 Transaction Tracking — Record income and expenses
🏷️ Category Management — Organize by custom categories
📈 Budget Progress — Visual indicators for spending vs. budget
🗓️ Monthly Views — Filter transactions by month/year

🛠️ Tech Stack
Backend

⚙️ ASP.NET Core 9.0 — Web API

🗄️ Entity Framework Core — ORM

🔐 ASP.NET Core Identity — Authentication

🔑 JWT Bearer Tokens — Secure auth

🧱 SQL Server — Database

🐳 Docker — Containerization

Frontend

⚛️ React.js 18 — UI framework

🎨 Tailwind CSS — Styling

⚡ Vite — Build tool

🌐 React Router — Routing

📋 Prerequisites

Before running the project, ensure you have:

.NET 9.0 SDK

Node.js 20+

Docker Desktop

SQL Server (local or via Docker)

🏗️ Project Structure
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

⚙️ Quick Start
🧩 Option 1: Development Setup (Without Docker)
Backend
cd FortifyAPI
dotnet restore
dotnet ef database update
dotnet run


Backend → http://localhost:5046

Frontend
cd ../fortify-frontend
npm install
npm run dev


Frontend → http://localhost:5173

🐳 Option 2: Docker Setup (Recommended)
docker-compose up --build
# or run in detached mode
docker-compose up -d --build


Services:

🌐 Frontend → http://localhost:5173

⚙️ Backend → http://localhost:5046

🗄️ Database → localhost:1433

🔧 Configuration
Backend (appsettings.json)
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

Frontend (src/config.js or component)
const API_BASE_URL = "http://localhost:5046/api";

📊 API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/Login	User login
POST	/api/SignUp	User registration
GET	/api/Login/me	Get current user
Budgets
Method	Endpoint	Description
GET	/api/Budget/{month}/{year}	Get monthly budget
POST	/api/Budget	Create budget
PUT	/api/Budget	Update budget
Transactions
Method	Endpoint	Description
GET	/api/Transaction	Get all transactions
GET	/api/Transaction/month/{month}/{year}	Get monthly transactions
POST	/api/Transaction	Create transaction
PUT	/api/Transaction/{id}	Update
DELETE	/api/Transaction/{id}	Delete
Categories
Method	Endpoint	Description
GET	/api/Categories	Get all
POST	/api/Categories	Create
PUT	/api/Categories/{id}	Update
DELETE	/api/Categories/{id}	Delete
🗃️ Database Schema
Key Tables

Users — Authentication data

Budgets — Monthly limits

Categories — Income/Expense types

Transactions — Records of spending

Relationships

User 1 → N Budgets

User 1 → N Categories

User 1 → N Transactions

Category 1 → N Transactions

🧪 Testing

Backend:

cd FortifyAPI
dotnet test


Frontend:

cd fortify-frontend
npm test

🐛 Troubleshooting
Database Connection Issues

Ensure SQL Server container is running: docker ps

Check connection string

Reapply migrations if needed:

dotnet ef database update

JWT / CORS

Make sure JWT secret matches

Verify backend CORS allows http://localhost:5173

Reset Docker
docker-compose down -v
docker system prune -a
docker-compose up --build

📝 Environment Variables

Backend (.env or appsettings.json)

ASPNETCORE_ENVIRONMENT=Development
ConnectionStrings__DefaultConnection=Server=db;Database=FortifyDb;User=sa;Password=Password1234!
Jwt__Key=Your_JWT_Secret_Key


Frontend (.env)

VITE_API_BASE_URL=http://localhost:5046

🔒 Security Features

JWT authentication with HTTP-only cookies

Password hashing via ASP.NET Identity

CORS policy for frontend-backend communication

SQL injection prevention (EF Core)

XSS protection via proper content types

🤝 Contributing

Fork the repo

Create your feature branch

git checkout -b feature/amazing-feature


Commit your changes

git commit -m "Add some amazing feature"


Push to the branch

git push origin feature/amazing-feature


Open a Pull Request

📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

🙏 Acknowledgments

Microsoft ASP.NET Core team

React.js team

Tailwind CSS

Vite

📞 Support

If you encounter any issues:

Check the Troubleshooting section

Search GitHub Issues

Or open a new issue with details

💰 Happy Budgeting with Fortify!