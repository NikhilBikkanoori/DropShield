import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const demoParent = {
  id: "P-001",
  name: "Demo Parent",
  email: "parent.demo@example.com",
  phone: "9000000000",
  address: "123 Demo Street",
  username: "parent.demo",
  studentId: "DS-001",
  photo: ""
};

const ParentLogin = () => {
  const navigate = useNavigate();

  const handleDirectLogin = () => {
    localStorage.setItem("parentData", JSON.stringify(demoParent));
    localStorage.setItem("isLoggedIn", "parent");
    navigate("/parent-dashboard");
  };

  return (
    <div style={{ background: '#192047', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'Segoe UI', sans-serif" }}>
      <header style={{ background: '#262C53', color: '#fff', padding: '15px 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ background: 'linear-gradient(135deg, #192047, #A2F4F9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '1.8em', fontWeight: 'bold' }}>DropShield</h1>
      </header>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
        <div style={{ background: '#262C53', borderRadius: '12px', width: '100%', maxWidth: '420px', boxShadow: '0 6px 18px rgba(0,0,0,0.1)', padding: '2rem' }}>
          <div className="login-container">
            <Link to="/" style={{ color: '#fff', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>← Back to Home</Link>
          </div>
          <h2 style={{ textAlign: 'center', color: '#A2F4F9', marginBottom: '0.75rem' }}>
            <i className="fas fa-user-shield" style={{ marginRight: '0.5rem' }}></i> Parent Direct Login
          </h2>
          <p style={{ color: '#d6e7ff', textAlign: 'center', marginBottom: '1.5rem' }}>
            Instant access with demo parent data. No credentials required. When any problem shows up—academic pressure, finances, mental health, family duties, or distractions—pair a simple routine with early help.
          </p>
          <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
            {["Clarify their why (freedom, stability, self-respect)", "Keep one daily phone-free study slot", "Ask mentors early; do not wait for marks to drop", "Watch sleep and meals—mind first, marks next", "If there's a pause, keep them learning something small"].map((tip) => (
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

export default ParentLogin;
