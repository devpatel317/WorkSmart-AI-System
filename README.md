# 🚀 WorkSmart AI

> An intelligent workforce management system powered by AI agents for burnout detection, task optimization, and employee wellbeing.

## 📋 Overview

WorkSmart AI is a full-stack application that leverages artificial intelligence to monitor employee workload, detect burnout risks, and provide actionable recommendations for workforce optimization. The system uses a multi-agent architecture powered by LangGraph and LLM technology to analyze employee activities and suggest interventions.

## ✨ Key Features

- 🤖 **AI-Powered Burnout Detection** - Real-time analysis of employee workload and activity patterns
- 📊 **Multi-Agent System** - Coordinated AI agents for observation, prediction, optimization, and policy enforcement
- 👥 **Role-Based Access Control** - Separate dashboards for Admins, Managers, and Employees
- 📝 **Task Management** - Assign, track, and manage tasks with deadline monitoring
- 📈 **Analytics Dashboard** - Comprehensive insights into team performance and wellbeing
- ⚡ **Smart Recommendations** - AI-driven suggestions for workload redistribution and break scheduling
- 🔐 **Secure Authentication** - JWT-based auth with refresh tokens and cookie management
- 📋 **Approval Workflow** - Request and approval system for leave and task modifications

## 🏗️ Architecture

### Three-Tier Application Stack

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                            │
│              React + Vite + Material-UI                     │
│                    (Port: 5173)                             │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         Backend                             │
│          Node.js + Express + MongoDB                        │
│                    (Port: 5000)                             │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       AI Service                            │
│      Python Flask + LangGraph + Groq LLM                    │
│                    (Port: 8000)                             │
└─────────────────────────────────────────────────────────────┘
```

### AI Agent Workflow

```
        Observer Agent
             ↓
   (Collect Employee Data)
             ↓
    Burnout Predictor Agent
             ↓
   (Analyze Risk Levels)
             ↓
    Workforce Optimizer Agent
             ↓
   (Generate Recommendations)
             ↓
      Policy Guard Agent
             ↓
   (Validate & Execute Actions)
```

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19.2.0
- **Build Tool**: Vite (Rolldown)
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Styling**: Styled Components + Emotion

### Backend
- **Runtime**: Node.js
- **Framework**: Express 5.2.1
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT + bcrypt
- **API Communication**: RESTful APIs
- **Middleware**: CORS, Cookie Parser

### AI Service
- **Language**: Python
- **Framework**: Flask
- **AI Framework**: LangGraph
- **LLM Provider**: Groq (Llama 3.3 70B)
- **Type Checking**: TypedDict for state management

## 📁 Project Structure

```
WorkSmart AI/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layers
│   │   ├── routes/        # Route configurations
│   │   └── theme/         # Theme and layout
│   └── package.json
│
├── backend/               # Node.js API server
│   ├── controllers/       # Request handlers
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API route definitions
│   ├── middleware/       # Auth & validation middleware
│   ├── config/           # Database configuration
│   └── server.js
│
└── ai-service/           # Python AI service
    ├── agents/           # AI agent implementations
    │   ├── observer_agent.py
    │   ├── burnout_predictor_agent.py
    │   ├── workforce_optimizer_agent.py
    │   └── policy_guard_agent.py
    ├── graphs/           # LangGraph workflow definitions
    ├── state/            # State management (TypedDict)
    ├── tools/            # Agent tools (activity, task, user)
    └── main.py
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Python 3.10+
- MongoDB (local or cloud instance)
- Groq API Key

### Installation

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd "WorkSmart AI"
```

#### 2. Setup Backend
```bash
cd backend
npm install

# Create .env file
echo PORT=5000 > .env
echo MONGO_URI=your_mongodb_connection_string >> .env
echo JWT_SECRET=your_jwt_secret >> .env
echo JWT_REFRESH_SECRET=your_refresh_secret >> .env
```

#### 3. Setup Frontend
```bash
cd ../frontend
npm install

# Create .env file
echo VITE_API_URL=http://localhost:5000 > .env
```

#### 4. Setup AI Service
```bash
cd ../ai-service
pip install -r requirements.txt

# Create .env file (or export environment variable)
echo GROQ_API_KEY=your_groq_api_key > .env
```

### Running the Application

#### Start MongoDB
```bash
# If running locally
mongod
```

#### Start Backend Server
```bash
cd backend
npm run dev
```

#### Start AI Service
```bash
cd ai-service
python main.py
```

#### Start Frontend
```bash
cd frontend
npm run dev
```

Access the application at: `http://localhost:5173`

## 🔑 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/worksmart
JWT_SECRET=your_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_here
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

### AI Service (.env)
```env
GROQ_API_KEY=your_groq_api_key_here
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token

### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

### Task Management
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### AI Analysis
- `GET /api/analyze/burnout` - Trigger burnout analysis
- Calls AI service at `http://localhost:8000/api/ai/burnout/analyze`

### Admin Routes
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

## 🤖 AI Agents

### 1. Observer Agent
Collects real-time data about employees including:
- Total tasks assigned
- Tasks in progress
- Overdue tasks
- Days since last activity

### 2. Burnout Predictor Agent
Analyzes collected data using LLM to:
- Assess burnout risk (LOW, MEDIUM, HIGH)
- Provide explanations for risk levels
- Flag employees requiring attention

### 3. Workforce Optimizer Agent
Generates actionable recommendations:
- **REASSIGN** - Redistribute tasks to other team members
- **REDUCE_LOAD** - Decrease workload temporarily
- **RECOMMEND_BREAK** - Suggest scheduled breaks
- **DELAY_DEADLINES** - Extend task deadlines

### 4. Policy Guard Agent
Validates and executes optimization decisions:
- Ensures recommendations comply with policies
- Executes approved actions via system tools
- Logs all executed actions

## 👥 User Roles

### Admin
- Manage all users and roles
- View system-wide analytics
- Configure system settings

### Manager
- Assign tasks to team members
- View team burnout reports
- Approve optimization recommendations
- Access team insights dashboard

### Employee
- View assigned tasks
- Track work history
- See personal activity logs
- Submit approval requests

## 🔒 Security Features

- JWT-based authentication with access and refresh tokens
- Password hashing using bcrypt
- Role-based middleware protection
- HTTP-only cookies for token storage
- CORS configuration for cross-origin requests
- Internal authentication for AI service communication

## 📊 Database Models

- **User** - User accounts and profiles
- **Task** - Task assignments and tracking
- **ActivityLog** - Employee activity history
- **ApprovalRequest** - Leave and task approval requests
- **ApprovalAction** - Actions taken on requests
- **RefreshToken** - Token management for auth

## 🧪 Development

### Run in Development Mode

Backend:
```bash
npm run dev
```

Frontend:
```bash
npm run dev
```

### Build for Production

Frontend:
```bash
npm run build
npm run preview
```

### Linting
```bash
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 📧 Contact

For questions or support, please open an issue in the repository.

---

**Built with ❤️ using AI-powered workforce intelligence**
