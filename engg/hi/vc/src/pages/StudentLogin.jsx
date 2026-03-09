import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

const StudentLogin = () => {
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    // For now, we only support direct login as requested
    handleDirectLogin();
  };

  const handleDirectLogin = () => {
    const demoStudent = {
      Username: "rohan01",
      FullName: "Rohan Das",
      Department: "CSE",
      RollNo: "21CSE048",
      Phone: "9876543210",
      Email: "rohan.das@example.com",
      DateOfBirth: "2002-05-15",
      Gender: "Male",
      Address: "Demo Hostel, Room 402",
      Parent: "Rajesh Kumar"
    };

    localStorage.setItem("token", "demo-token-" + Date.now());
    localStorage.setItem("studentname", demoStudent.Username);
    localStorage.setItem("studentData", JSON.stringify(demoStudent));
    localStorage.setItem("isLoggedIn", "student");
    navigate("/dashboard");
  };

  return (
    <div style={{ background: '#192047', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'Segoe UI', sans-serif" }}>
      <style>{`
        @media(max-width:480px){
          .sl-header{padding:12px 18px !important;}
          .sl-card{padding:1.2rem !important; margin:0 8px;}
          .sl-title{font-size:1.2em !important;}
        }
      `}</style>
      <header className="sl-header" style={{ background: '#262C53', color: '#fff', padding: '15px 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="sl-title" style={{ background: 'linear-gradient(135deg, #192047, #A2F4F9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '1.8em', fontWeight: 'bold' }}>DropShield</h1>
        <button onClick={() => navigate('/')} style={{ background: 'rgba(162,244,249,0.12)', border: '1px solid rgba(162,244,249,0.3)', color: '#A2F4F9', padding: '7px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
          ← Back to Home
        </button>
      </header>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
        <Card className="w-full max-w-[400px] p-8">
          <h2 className="text-center text-[#A2F4F9] mb-6 text-2xl font-semibold">
            <i className="fas fa-user-graduate mr-2"></i> Student Portal
          </h2>

          <div className="text-center mt-6">
            <p className="text-gray-300 mb-6 text-sm">Welcome to the student portal. Click below to access your dashboard instantly.</p>
            <Button
              type="button"
              onClick={handleDirectLogin}
              className="w-full bg-[#00C853] hover:bg-[#00E676] text-white border-none py-4 text-lg"
            >
              🚀 Direct Login (Demo)
            </Button>
          </div>
        </Card>
      </div>

      <footer style={{ background: '#262C53', color: '#fff', textAlign: 'center', padding: '20px' }}>
        <p>&copy; 2025 Dropout Prediction & Counselling System</p>
      </footer>
    </div>
  );
};

export default StudentLogin;
