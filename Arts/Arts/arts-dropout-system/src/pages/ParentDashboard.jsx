import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ParentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const [child] = useState({
    name: 'Rajesh Kumar',
    enrollment: 'B.A. English Literature',
    enrollmentDate: '2023-06-15',
    mentor: 'Priya Singh'
  });

  const [performance] = useState({
    attendance: 85,
    gpa: 3.2,
    riskLevel: 'Low'
  });
  const [showDetailedReport, setShowDetailedReport] = useState(false);
  const [scheduledMeetings, setScheduledMeetings] = useState([]);

// Function to handle scheduling a meeting
const handleScheduleMeeting = () => {
  const newMeeting = {
    id: scheduledMeetings.length + 1,
    date: new Date().toLocaleString(), // current date/time
    with: child.mentor,
    purpose: 'Parent-Mentor Meeting'
  };
  setScheduledMeetings(prev => [...prev, newMeeting]);
};



  const [subjects] = useState([
    { name: 'English Literature', marks: 78, grade: 'B+', lastUpdated: '2 days ago' },
    { name: 'History', marks: 82, grade: 'A-', lastUpdated: '3 days ago' },
    { name: 'Philosophy', marks: 75, grade: 'B', lastUpdated: '1 week ago' },
    { name: 'Political Science', marks: 88, grade: 'A', lastUpdated: '4 days ago' }
  ]);

  const [alerts] = useState([
    { id: 1, title: 'Great Performance!', message: 'Your child scored excellent marks in Political Science', type: 'positive', date: 'Dec 8' },
    { id: 2, title: 'Attendance Notice', message: 'Attendance is at 85%, maintain consistency', type: 'info', date: 'Dec 6' }
  ]);

  const [communication] = useState([
    { id: 1, from: 'Mentor (Priya Singh)', subject: 'Monthly Progress Report', date: 'Dec 7' },
    { id: 2, from: 'Counselor', subject: 'Career Guidance Session Scheduled', date: 'Dec 5' }
  ]);

  const [advice] = useState([
    { id: 1, title: 'Support Consistent Study Habits', content: 'Encourage your child to maintain a regular study schedule. Set aside specific hours for academics each day.' },
    { id: 2, title: 'Open Communication', content: 'Talk regularly with your child about their academic progress and any challenges they might be facing.' },
    { id: 3, title: 'Stress Management', content: 'Help your child manage academic stress through proper sleep, exercise, and relaxation techniques.' },
    { id: 4, title: 'Mentorship Connection', content: 'Your child has an assigned mentor. Encourage them to reach out for guidance and support regularly.' }
  ]);

  const styles = `
    :root {
      --c1: #0f1419;
      --c2: #FF6B9D;
      --c3: #1a2332;
      --c4: #00D4FF;
      --c5: #6B5FFF;
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
    }

    .parent-container {
      display: flex;
      height: 100vh;
      width: 100%;
      max-width: 100%;
      background: linear-gradient(135deg, var(--c1) 0%, #1a2a3a 100%);
      overflow: hidden;
    }

    /* Fixed centered dashboard frame */
    .dashboard-frame {
      width: 1200px;
      height: 800px;
      margin: 20px auto;
      display: flex;
      background: transparent;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    }

    .sidebar {
      width: 250px;
      background: rgba(26, 35, 50, 0.95);
      padding: 20px 14px;
      border-right: 1px solid rgba(0, 212, 255, 0.2);
      height: 100%;
      overflow-y: auto;
      position: sticky;
      top: 0;
      box-sizing: border-box;
    }

    .header .actions {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .header .clock {
      min-width: 80px;
      text-align: right;
      color: var(--text-light);
      font-size: 0.95rem;
      white-space: nowrap;
    }

    .sidebar-logo {
      font-size: 1.8rem;
      font-weight: 800;
      background: linear-gradient(135deg, var(--c4), var(--c5));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 2rem;
      text-align: center;
    }

    .parent-profile {
      background: rgba(0, 212, 255, 0.1);
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
      border: 1px solid rgba(0, 212, 255, 0.2);
    }

    .parent-profile p {
      color: var(--text-light);
      font-size: 0.85rem;
      margin: 5px 0;
    }

    .parent-profile .label {
      color: var(--c4);
      font-weight: 700;
      font-size: 0.9rem;
    }

    .sidebar-menu {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;
    }

    .sidebar-item {
      padding: 12px 15px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      color: var(--text-light);
      font-weight: 600;
      border-left: 3px solid transparent;
    }

    .sidebar-item:hover,
    .sidebar-item.active {
      background: rgba(0, 212, 255, 0.15);
      border-left-color: var(--c4);
      color: var(--c4);
    }

    .logout-btn {
      width: 100%;
      margin-top: 20px;
      padding: 12px 15px;
      background: linear-gradient(135deg, var(--c2), var(--c5));
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .logout-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(255, 107, 157, 0.3);
    }

    .main-content {
      flex: 1;
      padding: 12px;
      overflow: auto;
      height: 100%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
    }

    .header {
      margin-bottom: 1rem;
    }

    .header h1 {
      font-size: 2rem;
      background: linear-gradient(135deg, var(--c4), var(--c2));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 10px;
      margin-bottom: 0.8rem;
    }

    .stat-card {
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(107, 95, 255, 0.1));
      padding: 20px;
      border-radius: 12px;
      border: 1px solid rgba(0, 212, 255, 0.3);
      text-align: center;
    }

    .stat-value {
      font-size: 2.5rem;
      font-weight: 800;
      background: linear-gradient(135deg, var(--c4), var(--c2));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.3rem;
    }

    .stat-label {
      color: var(--text-light);
      font-size: 0.85rem;
    }

    .progress-bar {
      width: 100%;
      height: 25px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      overflow: hidden;
      margin-top: 8px;
      position: relative;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--c4), var(--c2));
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      font-size: 0.75rem;
    }

    .tabs {
      display: flex;
      gap: 15px;
      margin-bottom: 2rem;
      border-bottom: 2px solid rgba(0, 212, 255, 0.2);
    }

    .tab {
      padding: 12px 20px;
      cursor: pointer;
      color: var(--text-light);
      font-weight: 600;
      border-bottom: 3px solid transparent;
      transition: all 0.3s ease;
    }

    .tab.active {
      color: var(--c4);
      border-bottom-color: var(--c4);
    }

    .tab:hover {
      color: var(--c4);
    }

    .content-card {
      background: rgba(26, 35, 50, 0.8);
      border-radius: 12px;
      border: 1px solid rgba(0, 212, 255, 0.2);
      padding: 12px;
      margin-bottom: 12px;
      max-height: 60vh;
      overflow-y: auto;
      box-sizing: border-box;
    }
      margin-bottom: 15px;
      font-size: 1.2rem;
    }

    .alert-card {
      background: rgba(0, 212, 255, 0.05);
      padding: 15px;
      border-radius: 8px;
      border-left: 3px solid var(--c4);
      margin-bottom: 10px;
    }

    .alert-card.positive {
      border-left-color: #4caf50;
      background: rgba(76, 175, 80, 0.05);
    }

    .alert-card.info {
      border-left-color: var(--c4);
      background: rgba(0, 212, 255, 0.05);
    }

    .alert-title {
      color: var(--c4);
      font-weight: 700;
      margin-bottom: 5px;
    }

    .alert-card.positive .alert-title {
      color: #4caf50;
    }

    .alert-message {
      color: var(--text-light);
      margin-bottom: 5px;
    }

    .alert-date {
      color: var(--text-light);
      font-size: 0.8rem;
    }

    .subject-card {
      background: rgba(0, 212, 255, 0.05);
      padding: 15px;
      border-radius: 8px;
      border: 1px solid rgba(0, 212, 255, 0.2);
      margin-bottom: 10px;
    }

    .subject-name {
      color: var(--c4);
      font-weight: 700;
      margin-bottom: 10px;
    }

    .subject-info {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 8px;
    }

    .subject-item {
      color: var(--text-light);
      font-size: 0.85rem;
    }

    .grade-badge {
      display: inline-block;
      padding: 5px 10px;
      background: rgba(0, 212, 255, 0.2);
      color: var(--c4);
      border-radius: 6px;
      font-weight: 600;
      font-size: 0.85rem;
    }

    .advice-card {
      background: rgba(107, 95, 255, 0.1);
      padding: 15px;
      border-radius: 8px;
      border: 1px solid rgba(107, 95, 255, 0.3);
      margin-bottom: 15px;
    }

    .advice-title {
      color: var(--c5);
      font-weight: 700;
      margin-bottom: 10px;
    }

    .advice-content {
      color: var(--text-light);
      line-height: 1.6;
      font-size: 0.95rem;
    }

    .communication-card {
      background: rgba(0, 212, 255, 0.05);
      padding: 15px;
      border-radius: 8px;
      border: 1px solid rgba(0, 212, 255, 0.2);
      margin-bottom: 10px;
    }

    .comm-from {
      color: var(--c4);
      font-weight: 700;
      margin-bottom: 5px;
    }

    .comm-subject {
      color: var(--text-light);
      margin-bottom: 5px;
    }

    .comm-date {
      color: var(--text-light);
      font-size: 0.8rem;
    }

    .action-btn {
      padding: 10px 20px;
      background: linear-gradient(135deg, var(--c2), var(--c5));
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .action-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(255, 107, 157, 0.3);
    }

    @media (max-width: 768px) {
      .sidebar {
        position: fixed;
        left: 0;
        top: 0;
        width: 0;
        padding: 0;
      }

      .main-content {
        padding: 15px;
      }
    }
  `;

  return (
    <div style={{ background: '#0f1419', minHeight: '100vh' }}>
      <style>{styles}</style>
      <div className="parent-container">
        <div className="dashboard-frame">
        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="sidebar-logo">👨‍👩‍👧 Parent</div>
          
          <div className="parent-profile">
            <p className="label">Child's Name</p>
            <p>{child.name}</p>
            <p className="label" style={{ marginTop: '10px' }}>Program</p>
            <p>{child.enrollment}</p>
            <p className="label" style={{ marginTop: '10px' }}>Mentor</p>
            <p>{child.mentor}</p>
          </div>

          <div className="sidebar-menu">
            <div
              className={`sidebar-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              👀 Overview
            </div>
            <div
              className={`sidebar-item ${activeTab === 'subjects' ? 'active' : ''}`}
              onClick={() => setActiveTab('subjects')}
            >
              📚 Subjects & Marks
            </div>
            <div
              className={`sidebar-item ${activeTab === 'alerts' ? 'active' : ''}`}
              onClick={() => setActiveTab('alerts')}
            >
              🔔 Alerts
            </div>
            <div
              className={`sidebar-item ${activeTab === 'communication' ? 'active' : ''}`}
              onClick={() => setActiveTab('communication')}
            >
              📧 Communications
            </div>
            <div
              className={`sidebar-item ${activeTab === 'guidance' ? 'active' : ''}`}
              onClick={() => setActiveTab('guidance')}
            >
              💡 Guidance Tips
            </div>
          </div>

          <Link to="/">
            <button className="logout-btn">← Back to Home</button>
          </Link>
        </div>

        {/* MAIN CONTENT */}
        <div className="main-content">
          {activeTab === 'overview' && (
            <>
              <div className="header">
                <h1>Child's Academic Overview</h1>
              </div>

              <div style={{ background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.15), transparent)', padding: '15px', borderRadius: '8px', marginBottom: '2rem', border: '1px solid rgba(76, 175, 80, 0.3)' }}>
                <p style={{ color: '#4caf50', fontWeight: '600' }}>✅ Your child is performing well! Current risk level is Low. Keep supporting their academic journey.</p>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-value">{performance.attendance}%</div>
                  <div className="stat-label">Attendance</div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${performance.attendance}%` }}></div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{performance.gpa}</div>
                  <div className="stat-label">Current GPA</div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(performance.gpa / 4) * 100}%` }}></div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-value" style={{ color: '#4caf50' }}>{performance.riskLevel}</div>
                  <div className="stat-label">Risk Assessment</div>
                </div>
              </div>

              <div className="content-card">
                <h3>📊 Academic Summary</h3>
                <p style={{ color: '#B8C5D6', marginBottom: '15px' }}>
                  Your child is enrolled since {child.enrollmentDate}. Current performance shows consistent progress across all subjects.
                </p>

<button
  className="action-btn"
  onClick={() => setShowDetailedReport(prev => !prev)}
>
  {showDetailedReport ? 'Hide Detailed Report' : 'View Detailed Report'}
</button>

{showDetailedReport && (
  <div style={{
    marginTop: '15px',
    padding: '15px',
    background: 'rgba(0, 212, 255, 0.05)',
    border: '1px solid rgba(0, 212, 255, 0.2)',
    borderRadius: '8px'
  }}>
    <h3 style={{ color: '#00D4FF', marginBottom: '10px' }}>📄 Detailed Academic Report</h3>
    <p style={{ color: '#B8C5D6' }}>Here is a detailed breakdown of your child's performance:</p>
    
    <div style={{ marginTop: '10px' }}>
      <p><strong>Attendance:</strong> {performance.attendance}%</p>
      <p><strong>GPA:</strong> {performance.gpa}</p>
      <p><strong>Risk Level:</strong> {performance.riskLevel}</p>
      <p><strong>Mentor:</strong> {child.mentor}</p>
      <h4 style={{ color: '#00D4FF', marginTop: '10px' }}>Subjects:</h4>
      <ul style={{ color: '#B8C5D6', paddingLeft: '20px' }}>
        {subjects.map((sub, idx) => (
          <li key={idx}>
            {sub.name} — Marks: {sub.marks}, Grade: {sub.grade}, Updated: {sub.lastUpdated}
          </li>
        ))}
      </ul>
    </div>
  </div>
)}

              </div>

              {/* <div className="content-card">
                <h3>👨‍🏫 Mentor Assigned</h3>
                <p style={{ color: '#B8C5D6', marginBottom: '10px' }}>
                  Your child is mentored by <strong>{child.mentor}</strong>, who provides personalized academic and career guidance.
                </p>
                <button className="action-btn">Message Mentor</button>
                <button className="action-btn" style={{ background: 'rgba(0, 212, 255, 0.2)', color: '#00D4FF', marginLeft: '10px' }}>Schedule Meeting</button>
              </div> */}
            </>
          )}

          {activeTab === 'subjects' && (
            <>
              <div className="header">
                <h1>Subjects & Academic Performance</h1>
              </div>

              <div className="content-card">
                <h3>📚 Current Semester Courses</h3>
                {subjects.map((subject, index) => (
                  <div key={index} className="subject-card">
                    <div className="subject-name">{subject.name}</div>
                    <div className="subject-info">
                      <div className="subject-item">📊 Marks: {subject.marks}/100</div>
                      <div className="subject-item">
                        <span className="grade-badge">{subject.grade}</span>
                      </div>
                      <div className="subject-item">Updated: {subject.lastUpdated}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'alerts' && (
            <>
              <div className="header">
                <h1>Alerts & Updates</h1>
              </div>

              <div className="content-card">
                <h3>🔔 Recent Alerts</h3>
                {alerts.map(alert => (
                  <div key={alert.id} className={`alert-card ${alert.type}`}>
                    <div className="alert-title">{alert.title}</div>
                    <div className="alert-message">{alert.message}</div>
                    <div className="alert-date">{alert.date}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'communication' && (
            <>
              <div className="header">
                <h1>Communications from Mentor</h1>
              </div>

              <div className="content-card">
                <h3>📧 Messages & Updates</h3>
                {communication.map(comm => (
                  <div key={comm.id} className="communication-card">
                    <div className="comm-from">{comm.from}</div>
                    <div className="comm-subject">{comm.subject}</div>
                    <div className="comm-date">{comm.date}</div>
                  </div>
                ))}
              </div>

              <div className="content-card">
  <h3>📞 Contact Mentor Directly</h3>
<button
  className="action-btn"
  onClick={() => {
    const message = prompt("Type your message to the mentor:");
    if (message && message.trim() !== "") {
      // Here you could also call a backend API to send the message
      console.log("Message sent to mentor:", message);
      alert("Message sent successfully!");
    } else if (message !== null) {
      alert("Message cannot be empty.");
    }
  }}
>
  Send Message to Mentor
</button>
  <button
    className="action-btn"
    style={{ background: 'rgba(0, 212, 255, 0.2)', color: '#00D4FF', marginLeft: '10px' }}
    onClick={handleScheduleMeeting}
  >
    Schedule Parent-Mentor Meeting
  </button>

  {scheduledMeetings.length > 0 && (
    <div style={{ marginTop: '15px' }}>
      <h4 style={{ color: '#00D4FF', marginBottom: '10px' }}>📅 Scheduled Meetings</h4>
      {scheduledMeetings.map(meeting => (
        <div
          key={meeting.id}
          style={{
            padding: '10px',
            borderRadius: '8px',
            background: 'rgba(0, 212, 255, 0.05)',
            border: '1px solid rgba(0, 212, 255, 0.2)',
            marginBottom: '8px',
            color: '#B8C5D6'
          }}
        >
          <p><strong>With:</strong> {meeting.with}</p>
          <p><strong>Date/Time:</strong> {meeting.date}</p>
          <p><strong>Purpose:</strong> {meeting.purpose}</p>
        </div>
      ))}
    </div>
  )}
</div>

            </>
          )}

          {activeTab === 'guidance' && (
            <>
              <div className="header">
                <h1>Parental Guidance Tips</h1>
              </div>

              <div className="content-card">
                <h3>💡 How You Can Help Your Child Succeed</h3>
                {advice.map(tip => (
                  <div key={tip.id} className="advice-card">
                    <div className="advice-title">{tip.title}</div>
                    <div className="advice-content">{tip.content}</div>
                  </div>
                ))}
              </div>

              <div className="content-card">
                <h3>📞 Support Resources</h3>
                <p style={{ color: '#B8C5D6', marginBottom: '15px' }}>
                  If you have concerns about your child's academic progress or well-being, you can reach out to:
                </p>
                <div style={{ color: '#B8C5D6', fontSize: '0.95rem', lineHeight: '1.8' }}>
                  <p>📧 <strong>Mentor:</strong> {child.mentor} (priya.singh@university.edu)</p>
                  <p>👥 <strong>Academic Counselor:</strong> counselor@university.edu</p>
                  <p>🏥 <strong>Student Wellness Center:</strong> wellness@university.edu</p>
                </div>
              </div>
            </>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
