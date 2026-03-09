import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MentorDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [intervention, setIntervention] = useState([]);


  const [mentee] = useState([
    { id: 1, name: 'Rajesh Kumar', enrollment: 'B.A. English', attendance: 85, gpa: 8.2, riskLevel: 'Low', lastContact: '2 days ago' },
    { id: 2, name: 'Amit Patel', enrollment: 'B.A. History', attendance: 55, gpa: 6.1, riskLevel: 'High', lastContact: '5 days ago' },
    { id: 3, name: 'Sneha Roy', enrollment: 'B.A. English', attendance: 92, gpa: 9.8, riskLevel: 'Low', lastContact: '1 day ago' }
  ]);

  const [alerts] = useState([
    { id: 1, student: 'Amit Patel', type: '⚠️ Low Attendance', message: 'Attendance dropped to 55%', date: 'Dec 8', priority: 'High' },
    { id: 2, student: 'Rajesh Kumar', type: '📉 Grade Drop', message: 'Latest exam score below average', date: 'Dec 7', priority: 'Medium' },
    { id: 3, student: 'Sneha Roy', type: '✅ Achievement', message: 'Excellent performance in exam', date: 'Dec 6', priority: 'Low' }
  ]);

  const [interventions] = useState([
    { id: 1, student: 'Amit Patel', action: 'Scheduled one-on-one counseling', date: 'Dec 8', status: 'Completed' },
    { id: 2, student: 'Rajesh Kumar', action: 'Provided study resources', date: 'Dec 7', status: 'Completed' },
    { id: 3, student: 'Sneha Roy', action: 'Career guidance session', date: 'Dec 5', status: 'Completed' }
  ]);



  const [messages] = useState([
    { id: 1, student: 'Amit Patel', subject: 'Need help with coursework', unread: true, date: 'Today' },
    { id: 2, student: 'Rajesh Kumar', subject: 'Thanks for the guidance!', unread: false, date: 'Yesterday' }
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

    .mentor-container {
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

    .mentor-profile {
      background: rgba(0, 212, 255, 0.1);
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
      border: 1px solid rgba(0, 212, 255, 0.2);
    }

    .mentor-profile p {
      color: var(--text-light);
      font-size: 0.85rem;
      margin: 5px 0;
    }

    .mentor-profile .name {
      color: var(--c4);
      font-weight: 700;
      font-size: 0.95rem;
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

    .content-card h3 {
      color: var(--c4);
      margin-bottom: 15px;
      font-size: 1.2rem;
    }

    .mentee-card {
      background: rgba(0, 212, 255, 0.05);
      padding: 15px;
      border-radius: 8px;
      border: 1px solid rgba(0, 212, 255, 0.2);
      margin-bottom: 10px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .mentee-card:hover {
      border-color: var(--c4);
      background: rgba(0, 212, 255, 0.1);
      transform: translateX(5px);
    }

    .mentee-name {
      color: var(--c4);
      font-weight: 700;
      margin-bottom: 5px;
    }

    .mentee-info {
      color: var(--text-light);
      font-size: 0.85rem;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-top: 10px;
    }

    .alert-card {
      background: rgba(0, 212, 255, 0.05);
      padding: 15px;
      border-radius: 8px;
      border-left: 3px solid var(--c4);
      margin-bottom: 10px;
    }

    .alert-card.high {
      border-left-color: #FF6B9D;
      background: rgba(255, 107, 157, 0.05);
    }

    .alert-card.medium {
      border-left-color: #ff9800;
      background: rgba(255, 152, 0, 0.05);
    }

    .alert-type {
      color: var(--c4);
      font-weight: 700;
      margin-bottom: 5px;
    }

    .alert-card.high .alert-type {
      color: #FF6B9D;
    }

    .alert-message {
      color: var(--text-light);
      margin-bottom: 5px;
    }

    .alert-date {
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
      margin-right: 10px;
      margin-bottom: 10px;
    }

    .action-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(255, 107, 157, 0.3);
    }

    .status-badge {
      display: inline-block;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .status-completed {
      background: rgba(76, 175, 80, 0.2);
      color: #4caf50;
    }

    .priority-high {
      background: rgba(255, 107, 157, 0.2);
      color: #FF6B9D;
    }

    .priority-medium {
      background: rgba(255, 152, 0, 0.2);
      color: #ff9800;
    }

    .priority-low {
      background: rgba(76, 175, 80, 0.2);
      color: #4caf50;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }

    th {
      background: rgba(0, 212, 255, 0.1);
      padding: 12px;
      text-align: left;
      color: var(--c4);
      font-weight: 700;
      border-bottom: 2px solid rgba(0, 212, 255, 0.3);
    }

    td {
      padding: 12px;
      border-bottom: 1px solid rgba(0, 212, 255, 0.1);
      color: var(--text-light);
    }

    tr:hover {
      background: rgba(0, 212, 255, 0.05);
    }

    .message-card {
      background: rgba(0, 212, 255, 0.05);
      padding: 15px;
      border-radius: 8px;
      border: 1px solid rgba(0, 212, 255, 0.2);
      margin-bottom: 10px;
    }

    .message-from {
      color: var(--c4);
      font-weight: 700;
      margin-bottom: 5px;
    }

    .message-subject {
      color: var(--text-light);
      margin-bottom: 5px;
    }

    .message-date {
      color: var(--text-light);
      font-size: 0.8rem;
    }

    .unread {
      background: rgba(0, 212, 255, 0.1);
      border-left: 3px solid var(--c4);
    }
  `;

  return (
    <div style={{ background: '#0f1419', minHeight: '100vh' }}>
      <style>{styles}</style>
      <div className="mentor-container">
        <div className="dashboard-frame">
        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="sidebar-logo">👨‍🏫 Mentor</div>
          
          <div className="mentor-profile">
            <p className="name">Priya Singh</p>
            <p>Senior Mentor</p>
            <p>📧 priya@university.edu</p>
          </div>

          <div className="sidebar-menu">
            <div
              className={`sidebar-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              📊 Dashboard
            </div>
            <div
              className={`sidebar-item ${activeTab === 'mentees' ? 'active' : ''}`}
              onClick={() => setActiveTab('mentees')}
            >
              👥 My Mentees
            </div>
            <div
              className={`sidebar-item ${activeTab === 'alerts' ? 'active' : ''}`}
              onClick={() => setActiveTab('alerts')}
            >
              🔔 Alerts
            </div>
            <div
              className={`sidebar-item ${activeTab === 'interventions' ? 'active' : ''}`}
              onClick={() => setActiveTab('interventions')}
            >
              💡 Interventions
            </div>
            <div
              className={`sidebar-item ${activeTab === 'messages' ? 'active' : ''}`}
              onClick={() => setActiveTab('messages')}
            >
              📧 Messages
            </div>
          </div>

          <Link to="/">
            <button className="logout-btn">← Back to Home</button>
          </Link>
        </div>

        {/* MAIN CONTENT */}
        <div className="main-content">
          {activeTab === 'dashboard' && (
            <>
              <div className="header">
                <h1>Mentor Dashboard</h1>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-value">3</div>
                  <div className="stat-label">Active Mentees</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">1</div>
                  <div className="stat-label">At Risk</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">12</div>
                  <div className="stat-label">Interventions Done</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">94%</div>
                  <div className="stat-label">Success Rate</div>
                </div>
              </div>

              <div className="content-card">
                <h3>📋 Recent Alerts</h3>
                {alerts.slice(0, 3).map(alert => (
                  <div key={alert.id} className={`alert-card ${alert.priority.toLowerCase()}`}>
                    <div className="alert-type">{alert.type}</div>
                    <div className="alert-message">{alert.student}: {alert.message}</div>
                    <div className="alert-date">{alert.date}</div>
                  </div>
                ))}
              </div>

              <div className="content-card">
                <h3>📊 Quick Stats</h3>
                <p style={{ color: '#B8C5D6', marginBottom: '15px' }}>
                  You're doing great! Keep monitoring your mentees' progress and providing timely support.
                </p>
                <button className="action-btn">View All Mentees</button>
                <button className="action-btn" style={{ background: 'rgba(0, 212, 255, 0.2)', color: '#00D4FF' }}>Check Interventions</button>
              </div>
            </>
          )}

          {activeTab === 'mentees' && (
            <>
              <div className="header">
                <h1>My Mentees</h1>
              </div>

              <div className="content-card">
                <h3>👥 Mentee Progress Overview</h3>
                {mentee.map(m => (
                  <div key={m.id} className="mentee-card" onClick={() => setSelectedStudent(m.id)}>
                    <div className="mentee-name">{m.name}</div>
                    <p style={{ color: '#B8C5D6', fontSize: '0.9rem', marginBottom: '10px' }}>{m.enrollment}</p>
                    <div className="mentee-info">
                      <div>📚 Attendance: {m.attendance}%</div>
                      <div>📊 GPA: {m.gpa}</div>
                      <div>⚠️ Risk: {m.riskLevel}</div>
                    </div>
                    <p style={{ color: '#B8C5D6', fontSize: '0.8rem', marginTop: '10px' }}>Last contact: {m.lastContact}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'alerts' && (
            <>
              <div className="header">
                <h1>System Alerts</h1>
              </div>

              <div className="content-card">
                <h3>🔔 All Alerts</h3>
                {alerts.map(alert => (
                  <div key={alert.id} className={`alert-card ${alert.priority.toLowerCase()}`}>
                    <div className="alert-type">{alert.type}</div>
                    <div className="alert-message">{alert.student}: {alert.message}</div>
                    <div style={{ marginTop: '10px' }}>
                      <span className={`status-badge priority-${alert.priority.toLowerCase()}`}>{alert.priority}</span>
                      <span style={{ color: '#B8C5D6', fontSize: '0.8rem', marginLeft: '10px' }}>{alert.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'interventions' && (
  <>
    <div className="header">
      <h1>Intervention Log</h1>
    </div>

    <div className="content-card">
      <h3>💡 My Interventions</h3>

      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Action Taken</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {intervention.map(intervention => (
            <tr key={intervention.id}>
              <td>{intervention.student}</td>
              <td>{intervention.action}</td>
              <td>{intervention.date}</td>
              <td>
                <span
                  className={
                    intervention.status === "Completed"
                      ? "status-badge status-completed"
                      : "status-badge status-pending"
                  }
                >
                  {intervention.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
)}
            {activeTab === 'interventions' && (     
            <>  
                

              <div className="content-card">
                <h3>📝 Log New Intervention</h3>
               <button
  className="action-btn"
  onClick={() => {
    const student = prompt("Student name:");
    if (!student) return;

    const action = prompt("Action taken:");
    if (!action) return;

    const status = prompt("Status (Completed / Pending):", "Completed");
    if (!status) return;

    const newIntervention = {
      id: Date.now(),
      student,
      action,
      status,
      date: new Date().toLocaleDateString()
    };

    setIntervention(prev => [...prev, newIntervention]);
  }}
>
  + Record Intervention
</button>

              </div>
            </>
          )}

          {activeTab === 'messages' && (
            <>
              <div className="header">
                <h1>Messages</h1>
              </div>

              <div className="content-card">
                <h3>📧 Student Messages</h3>
                {messages.map(message => (
                  <div key={message.id} className={`message-card ${message.unread ? 'unread' : ''}`}>
                    <div className="message-from">{message.student}</div>
                    <div className="message-subject">{message.subject}</div>
                    <div className="message-date">{message.date}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
