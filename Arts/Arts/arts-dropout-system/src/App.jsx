import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import MentorDashboard from './pages/MentorDashboard';
import ParentDashboard from './pages/ParentDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/student-login" element={<StudentDashboard />} />
        <Route path="/mentor-login" element={<MentorDashboard />} />
        <Route path="/parent-login" element={<ParentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
