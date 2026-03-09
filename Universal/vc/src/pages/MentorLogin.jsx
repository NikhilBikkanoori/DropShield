import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const demoMentor = {
  id: "F-001",
  facultyId: "F-001",
  name: "Demo Mentor",
  email: "mentor.demo@example.com",
  phone: "9888888888",
  department: "Computer Science",
  gender: "Prefer not to say",
  address: "Demo Campus",
  dob: "1990-01-01",
  username: "mentor.demo",
  photo: ""
};

const MentorLogin = () => {
  const navigate = useNavigate();

  const handleDirectLogin = () => {
    localStorage.setItem("mentorData", JSON.stringify(demoMentor));
    localStorage.setItem("isLoggedIn", "mentor");
    navigate("/mentor-dashboard");
  };

  return (
    <div style={{ background: '#192047', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'Segoe UI', sans-serif" }}>
      <header style={{ background: '#262C53', color: '#fff', padding: '15px 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ background: 'linear-gradient(135deg, #192047, #A2F4F9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '1.8em', fontWeight: 'bold' }}>DropShield</h1>
      </header>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
        <div style={{ background: '#262C53', borderRadius: '12px', width: '100%', maxWidth: '420px', boxShadow: '0 6px 18px rgba(0,0,0,0.1)', padding: '2rem' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>← Back to Home</Link>
          <h2 style={{ textAlign: 'center', color: '#A2F4F9', marginBottom: '0.75rem' }}>
            <i className="fas fa-user-graduate" style={{ marginRight: '0.5rem' }}></i> Mentor Direct Login
          </h2>
          <p style={{ color: '#d6e7ff', textAlign: 'center', marginBottom: '1.5rem' }}>
            Enter the mentor view instantly with demo data. Coach for any issue—purpose gaps, heavy syllabus, finances, mental health, family pressure, or distractions—using early nudges, routines, and counseling referrals.
          </p>
          <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
            {["Help them craft a one-line why", "Sequence basics before advanced", "Spot money/transport stress early", "Normalize asking for help weekly", "Design a 1–2 hour focused block, phone off", "Route to counseling for interests and roadmaps"].map((tip) => (
              <div key={tip} style={{ background: 'rgba(255,255,255,0.06)', color: '#e6f5ff', padding: '0.6rem 0.75rem', borderRadius: '6px', fontSize: '0.9rem' }}>{tip}</div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleDirectLogin}
            style={{
              width: '100%',
              padding: '0.9rem',
              background: 'linear-gradient(135deg, #192047, #262C53)',
              color: '#A2F4F9',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '0.25rem',
              transition: '0.3s'
            }}
          >
            Direct Login
          </button>
        </div>
      </div>

      <footer style={{ background: '#262C53', color: '#fff', textAlign: 'center', padding: '20px' }}>
        <p>&copy; 2025 Dropout Prediction & Counselling System</p>
      </footer>
    </div>
  );
};

export default MentorLogin;