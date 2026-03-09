import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const styles = `
    :root {
      --c1: #0f1419;
      --c2: #FF6B9D;
      --c3: #1a2332;
      --c4: #00D4FF;
      --c5: #6B5FFF;
      --silver: rgba(192,192,192,0.7);
      --text-dark: #F0F4F8;
      --text-light: #B8C5D6;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', 'Roboto', sans-serif;
      background: linear-gradient(135deg, var(--c1) 0%, #1a2a3a 100%);
      color: var(--text-dark);
      overflow-x: hidden;
    }

    /* HEADER */
    .home-header {
      background: rgba(26, 35, 50, 0.95);
      padding: 20px 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 8px 32px rgba(0, 212, 255, 0.1);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(0, 212, 255, 0.2);
    }

    .home-header h1 {
      background: linear-gradient(135deg, var(--c4), var(--c5));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 2em;
      font-weight: 800;
      letter-spacing: -1px;
    }

    .home-nav {
      display: flex;
      gap: 30px;
      align-items: center;
    }

    .home-nav a {
      color: var(--text-light);
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      position: relative;
      font-size: 0.95rem;
    }

    .home-nav a::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, var(--c4), var(--c5));
      transition: width 0.3s ease;
    }

    .home-nav a:hover {
      color: var(--c4);
    }

    .home-nav a:hover::after {
      width: 100%;
    }

    /* BUTTON STYLES */
    .btn {
      background: linear-gradient(135deg, var(--c2), var(--c5));
      color: white;
      padding: 14px 32px;
      border-radius: 30px;
      font-weight: 700;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      position: relative;
      overflow: hidden;
      border: none;
      cursor: pointer;
      text-decoration: none;
      font-size: 0.95rem;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 15px rgba(255, 107, 157, 0.3);
    }

    .btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s ease;
    }

    .btn:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 12px 25px rgba(255, 107, 157, 0.4);
    }

    .btn:hover::before {
      left: 100%;
    }

    /* CARDS */
    .card {
      background: linear-gradient(135deg, rgba(26, 35, 50, 0.8), rgba(107, 95, 255, 0.1));
      border-radius: 16px;
      padding: 2rem;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      color: var(--text-dark);
      border: 1px solid rgba(0, 212, 255, 0.2);
      backdrop-filter: blur(10px);
    }

    .card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 212, 255, 0.2);
      border-color: rgba(0, 212, 255, 0.5);
      background: linear-gradient(135deg, rgba(26, 35, 50, 0.9), rgba(107, 95, 255, 0.2));
    }

    .card h3 {
      color: var(--c4);
      margin-bottom: 0.8rem;
      font-size: 1.3rem;
    }

    .card p {
      color: var(--text-light);
      line-height: 1.6;
    }

    /* SECTION HEADERS */
    section h2 {
      background: linear-gradient(135deg, var(--c2), var(--c4));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 1rem;
      letter-spacing: -1px;
    }

    section > p {
      color: var(--text-light);
      font-size: 1.1rem;
      line-height: 1.8;
    }

    /* HERO SECTION */
    .hero-section {
      background: linear-gradient(180deg, rgba(0, 212, 255, 0.1) 0%, transparent 100%);
      padding: 40px 30px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .hero-section::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba(107, 95, 255, 0.2) 0%, transparent 70%);
      animation: float 15s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(50px, 50px); }
    }

    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 900px;
      margin: 0 auto;
    }

    .hero-content h1 {
      font-size: 2.5rem;
      font-weight: 900;
      line-height: 1.2;
      margin-bottom: 0.8rem;
      background: linear-gradient(135deg, var(--c4), var(--c2));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -2px;
    }

    .hero-content > p {
      font-size: 0.95rem;
      color: var(--text-light);
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    /* BENEFIT CARDS */
    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
      margin-top: 1.5rem;
    }

    .benefit-card {
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(107, 95, 255, 0.1));
      padding: 1rem;
      border-radius: 12px;
      text-align: center;
      border: 1px solid rgba(0, 212, 255, 0.3);
      transition: all 0.3s ease;
    }

    .benefit-card:hover {
      border-color: var(--c4);
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 212, 255, 0.15);
    }

    .benefit-icon {
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
      animation: bobbing 3s ease-in-out infinite;
    }

    @keyframes bobbing {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    /* LOGIN SECTION */
    .login-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.2rem;
      margin-top: 1.5rem;
    }

    .login-card {
      text-align: center;
      padding: 2.5rem;
      background: linear-gradient(135deg, rgba(26, 35, 50, 0.9), rgba(107, 95, 255, 0.15));
      border-radius: 16px;
      border: 2px solid rgba(0, 212, 255, 0.2);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      position: relative;
      overflow: hidden;
    }

    .login-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--c4), var(--c5));
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.4s ease;
    }

    .login-card:hover {
      transform: translateY(-12px);
      box-shadow: 0 20px 40px rgba(0, 212, 255, 0.25);
      border-color: rgba(0, 212, 255, 0.6);
    }

    .login-card:hover::before {
      transform: scaleX(1);
    }

    .login-card h3 {
      font-size: 1.8rem;
      color: var(--c2);
      margin-bottom: 1rem;
      font-weight: 700;
    }

    .login-card p {
      color: var(--text-light);
      margin-bottom: 2rem;
      line-height: 1.7;
      font-size: 0.95rem;
    }

    /* FEATURES GRID */
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }

    /* STATS SECTION */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }

    .stat-card {
      text-align: center;
      padding: 2.5rem;
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(255, 107, 157, 0.1));
      border-radius: 16px;
      border: 1px solid rgba(0, 212, 255, 0.3);
    }

    .stat-number {
      font-size: 3rem;
      font-weight: 900;
      background: linear-gradient(135deg, var(--c4), var(--c2));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 1.1rem;
      color: var(--c4);
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .stat-desc {
      color: var(--text-light);
      font-size: 0.9rem;
    }

    /* FOOTER */
    footer {
      background: linear-gradient(180deg, rgba(26, 35, 50, 0.8), rgba(26, 35, 50, 0.95));
      color: var(--text-light);
      text-align: center;
      padding: 40px 20px;
      margin-top: 80px;
      border-top: 1px solid rgba(0, 212, 255, 0.2);
      backdrop-filter: blur(10px);
    }

    footer p {
      margin: 0.5rem 0;
    }

    footer a {
      color: var(--c4);
      font-weight: 600;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    footer a:hover {
      color: var(--c2);
    }

    /* RESPONSIVE */
    @media (max-width: 768px) {
      .home-header {
        padding: 15px 20px;
        flex-direction: column;
        gap: 15px;
      }

      .home-header h1 {
        font-size: 1.5em;
      }

      .home-nav {
        gap: 15px;
        font-size: 0.85rem;
      }

      .hero-content h1 {
        font-size: 2.2rem;
      }

      section h2 {
        font-size: 1.8rem;
      }
    }
  `;

  return (
    <div style={{ background: '#0f1419', color: '#F0F4F8' }}>
      <style>{styles}</style>

      {/* HEADER */}
      <header className="home-header">
        <h1>🎓 Arts Shield</h1>
        <nav className="home-nav">
          <a href="http://localhost:5173" style={{ background: '#FF6B9D', color: '#fff', padding: '6px 14px', borderRadius: '16px', border: 'none' }}>← Main Branch</a>
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
          <a href="#features">Features</a>
          <a href="#stats">Impact</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Support Every Arts Student's Journey</h1>
          <p>
            Intelligent dropout prediction with AI-powered insights. Connect students with mentors
            and counselors who understand their unique challenges.
          </p>

          {/* Key Benefits */}
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">📊</div>
              <h4>Smart Analytics</h4>
              <p style={{ fontSize: '0.9rem', color: '#B8C5D6' }}>Real-time data tracking</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">⚡</div>
              <h4>Early Detection</h4>
              <p style={{ fontSize: '0.9rem', color: '#B8C5D6' }}>Identify at-risk students</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h4>Targeted Support</h4>
              <p style={{ fontSize: '0.9rem', color: '#B8C5D6' }}>Personalized interventions</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💬</div>
              <h4>Direct Connection</h4>
              <p style={{ fontSize: '0.9rem', color: '#B8C5D6' }}>Mentor-to-student guidance</p>
            </div>
          </div>
        </div>
      </section>

      {/* LOGIN SECTION */}
      <section id="login" style={{ padding: '80px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center' }}>Choose Your Role & Login</h2>
        <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Access your personalized dashboard. Each role has dedicated tools to support student success.
        </p>

        <div className="login-cards">
          {/* STUDENT LOGIN */}
          <div className="login-card">
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>👨‍🎓</div>
            <h3>For Students</h3>
            <p>
              Track your academic progress, view performance insights, connect with mentors,
              and access counseling resources tailored to your needs.
            </p>
            <Link to="/student-login" className="btn">
              Student Login →
            </Link>
          </div>

          {/* MENTOR LOGIN */}
          <div className="login-card">
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>👨‍🏫</div>
            <h3>For Mentors</h3>
            <p>
              Monitor mentees' progress in real-time, receive alerts for at-risk students,
              provide guided interventions, and track improvement outcomes.
            </p>
            <Link to="/mentor-login" className="btn">
              Mentor Login →
            </Link>
          </div>

          {/* PARENT LOGIN */}
          <div className="login-card">
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>👨‍👩‍👧</div>
            <h3>For Parents</h3>
            <p>
              Stay updated on your child's academic journey, receive timely alerts,
              collaborate with mentors, and support your student's success.
            </p>
            <Link to="/parent-login" className="btn">
              Parent Login →
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" style={{ padding: '80px 40px', background: 'rgba(0, 212, 255, 0.05)', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center' }}>Powerful Features for Student Success</h2>

        <div className="features-grid">
          <div className="card">
            <h3>
              <i className="fas fa-chart-line" style={{ marginRight: '0.8rem', color: '#FF6B9D' }}></i>
              Predictive Analytics
            </h3>
            <p>AI algorithms analyze attendance, grades, and engagement to predict dropout risk with 92% accuracy.</p>
          </div>

          <div className="card">
            <h3>
              <i className="fas fa-users" style={{ marginRight: '0.8rem', color: '#00D4FF' }}></i>
              Mentor Matching
            </h3>
            <p>Intelligent system connects students with mentors based on subject expertise and support needs.</p>
          </div>

          <div className="card">
            <h3>
              <i className="fas fa-bell" style={{ marginRight: '0.8rem', color: '#6B5FFF' }}></i>
              Smart Notifications
            </h3>
            <p>Real-time alerts notify mentors and parents when students need attention or support.</p>
          </div>

          <div className="card">
            <h3>
              <i className="fas fa-calendar-check" style={{ marginRight: '0.8rem', color: '#FF6B9D' }}></i>
              Attendance Tracking
            </h3>
            <p>Automated monitoring of class attendance with pattern analysis and intervention suggestions.</p>
          </div>

          <div className="card">
            <h3>
              <i className="fas fa-headset" style={{ marginRight: '0.8rem', color: '#00D4FF' }}></i>
              Counselor Network
            </h3>
            <p>Access professional mental health support and academic counseling from qualified specialists.</p>
          </div>

          <div className="card">
            <h3>
              <i className="fas fa-book" style={{ marginRight: '0.8rem', color: '#6B5FFF' }}></i>
              Resource Hub
            </h3>
            <p>Comprehensive library of study materials, wellness guides, and career resources for Arts students.</p>
          </div>

          <div className="card">
            <h3>
              <i className="fas fa-comments" style={{ marginRight: '0.8rem', color: '#FF6B9D' }}></i>
              Direct Messaging
            </h3>
            <p>Secure communication platform for students to connect with mentors and counselors anytime.</p>
          </div>

          <div className="card">
            <h3>
              <i className="fas fa-chart-bar" style={{ marginRight: '0.8rem', color: '#00D4FF' }}></i>
              Progress Dashboard
            </h3>
            <p>Comprehensive analytics showing improvement trends, achievements, and areas for growth.</p>
          </div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section id="stats" style={{ padding: '80px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center' }}>Our Impact in Numbers</h2>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">92%</div>
            <div className="stat-label">Prediction Accuracy</div>
            <div className="stat-desc">ML-powered risk detection</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">5K+</div>
            <div className="stat-label">Students Supported</div>
            <div className="stat-desc">Across multiple institutions</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">300+</div>
            <div className="stat-label">Active Mentors</div>
            <div className="stat-desc">Dedicated professionals</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">89%</div>
            <div className="stat-label">Intervention Success</div>
            <div className="stat-desc">Student retention rate</div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '80px 40px', background: 'linear-gradient(180deg, rgba(107, 95, 255, 0.1), transparent)', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center' }}>How It Works</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>1️⃣</div>
            <h4 style={{ color: '#00D4FF', marginBottom: '0.5rem' }}>Data Collection</h4>
            <p style={{ color: '#B8C5D6' }}>System gathers attendance, grades, and engagement data</p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>2️⃣</div>
            <h4 style={{ color: '#00D4FF', marginBottom: '0.5rem' }}>Risk Analysis</h4>
            <p style={{ color: '#B8C5D6' }}>AI identifies patterns indicating dropout risk</p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>3️⃣</div>
            <h4 style={{ color: '#00D4FF', marginBottom: '0.5rem' }}>Alert System</h4>
            <p style={{ color: '#B8C5D6' }}>Mentors & parents notified immediately</p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>4️⃣</div>
            <h4 style={{ color: '#00D4FF', marginBottom: '0.5rem' }}>Intervention</h4>
            <p style={{ color: '#B8C5D6' }}>Mentors provide targeted support & guidance</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '80px 40px', background: 'rgba(0, 212, 255, 0.05)', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>What Users Say</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="card">
            <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
              "This system helped me identify my at-risk students early and connect them with proper support. It's made a real difference!"
            </p>
            <p style={{ color: '#00D4FF', fontWeight: 'bold' }}>- Mentor, Delhi University</p>
          </div>

          <div className="card">
            <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
              "Having direct access to my mentor has been transformative. I feel supported and motivated to succeed."
            </p>
            <p style={{ color: '#FF6B9D', fontWeight: 'bold' }}>- Arts Student</p>
          </div>

          <div className="card">
            <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
              "As a parent, I appreciate the real-time updates about my child's progress. It gives me peace of mind."
            </p>
            <p style={{ color: '#6B5FFF', fontWeight: 'bold' }}>- Parent</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact">
        <p style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Arts Dropout Prevention & Counselling System</p>
        <p>&copy; 2025 All Rights Reserved. Empowering Arts Students Everywhere.</p>
        <p style={{ marginTop: '1.5rem', fontSize: '0.95rem' }}>
          <a href="#contact">Contact Us</a> | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
        </p>
        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#6B5FFF' }}>
          ✨ For Students • Mentors • Parents • Educators ✨
        </p>
      </footer>
    </div>
  );
};

export default Home;
