# DropShield 🛡️

**Dropout Prevention System - Smart India Hackathon 2025**

DropShield is a comprehensive dropout prevention platform designed to identify at-risk students early and provide intervention strategies to keep them in school.

## 📋 Project Overview

DropShield leverages data analytics and machine learning to:
- Predict students at risk of dropping out
- Provide dashboards for administrators, teachers, mentors, and parents
- Enable real-time monitoring of attendance, marks, and other key indicators
- Facilitate communication between stakeholders

## 🏗️ Project Structure

```
├── Arts/                    # Arts dropout prevention module
├── dropshield_with_home/    # Main DropShield frontend with home page
├── engg/                    # Engineering module
├── SIH{Changes}/            # Landing pages and organization routing
└── Universal/               # Universal dropout prevention system
    ├── vc/
    │   ├── src/             # React frontend source
    │   └── backend--v.0/    # Node.js/Express backend
```

## 🚀 Tech Stack

### Frontend
- **React** - UI framework
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM

### Machine Learning
- **Python** - ML model development
- Prediction models for dropout risk assessment

## 🛠️ Installation

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB
- Python 3.x (for ML components)

### Frontend Setup
```bash
cd Universal/vc
npm install
npm start
```

### Backend Setup
```bash
cd Universal/vc/backend--v.0
npm install
# Create .env file with MongoDB connection string
npm start
```

## 👥 User Roles

- **Admin** - System-wide oversight and configuration
- **Faculty** - Student monitoring and intervention
- **Parent** - Track child's progress and communicate with teachers
- **Mentor** - Guide at-risk students

## 📊 Key Features

1. **Early Warning System** - ML-based prediction of dropout risk
2. **Dashboard Analytics** - Visual representation of student data
3. **Attendance Tracking** - Monitor student attendance patterns
4. **Marks Analysis** - Track academic performance
5. **Parent Portal** - Keep parents informed and engaged
6. **Mentor Assignment** - Connect at-risk students with mentors
7. **Communication Tools** - Complaint boxes and teacher contact

## 🤝 Team CodeVanguards

Smart India Hackathon 2025 - Problem Statement SIH25102

## 📄 License

This project is part of the Smart India Hackathon 2025 submission.
