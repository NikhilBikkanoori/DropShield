import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('performance');
  const [student] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    enrollment: 'B.A. English Literature',
    mentor: 'Priya Singh',
    joinDate: '2023-06-15'
  });

  const [performance] = useState({
  attendance: 85,
  gpa: 8.2,
  totalClasses: 140,
  attendedClasses: 119,
  riskLevel: "Low",

  // 🔽 Added factors you asked for
  familyIncome: 4,           // 0–10 scale
  careerClarity: 6,          // 0–10
  languageBarrier: 3,        // 0–10
  mentalStress: 5,           // 0–10
  lowPerformance: 2,         // 0–10
  peerPressure: 4,           // 0–10
  socialDistraction: 5,      // 0–10
  teachingLearningGap: 3,    // 0–10
  multipleBacklogs: 1,       // number of backlogs
  migration: 0,              // 0–10
});
const [meeting, setMeeting] = useState(null);



  const [subjects] = useState([
    { name: 'English Literature', marks: 78, grade: 'B+' },
    { name: 'History', marks: 82, grade: 'A-' },
    { name: 'Philosophy', marks: 75, grade: 'B' },
    { name: 'Political Science', marks: 88, grade: 'A' }
  ]);

  const [resources] = useState([
    { id: 1, title: 'Essay Writing Guide', type: 'PDF', downloads: 234 },
    { id: 2, title: 'Research Methodology', type: 'Video', downloads: 189 },
    { id: 3, title: 'Stress Management Tips', type: 'Article', downloads: 456 },
    { id: 4, title: 'Time Management Workshop', type: 'Video', downloads: 312 }
  ]);

  const [messages] = useState([
    { id: 1, from: 'Priya Singh', subject: 'Great work on your essay!', date: 'Dec 8' },
    { id: 2, from: 'Admin', subject: 'System Update Notice', date: 'Dec 6' }
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

    .student-container {
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
      height: 100vh;
      overflow-y: auto;
      position: sticky;
      top: 0;
      box-sizing: border-box;
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

    .student-profile {
      background: rgba(0, 212, 255, 0.1);
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
      border: 1px solid rgba(0, 212, 255, 0.2);
    }

    .student-profile p {
      color: var(--text-light);
      font-size: 0.85rem;
      margin: 5px 0;
    }

    .student-profile .name {
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
      height: 100vh;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
    }

    .header {
      margin-bottom: 1rem;
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
      height: 30px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 15px;
      overflow: hidden;
      margin-top: 10px;
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
      font-size: 0.8rem;
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
    }

    .content-card h3 {
      color: var(--c4);
      margin-bottom: 10px;
      font-size: 1rem;
    }

    .table-container {
      width: 100%;
      overflow-x: auto;
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
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

    .grade-badge {
      padding: 5px 10px;
      background: rgba(0, 212, 255, 0.2);
      color: var(--c4);
      border-radius: 6px;
      font-weight: 600;
      font-size: 0.85rem;
    }

    .resource-card {
      background: rgba(0, 212, 255, 0.05);
      padding: 15px;
      border-radius: 8px;
      border: 1px solid rgba(0, 212, 255, 0.2);
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .resource-info h4 {
      color: var(--c4);
      margin-bottom: 5px;
    }

    .resource-info p {
      color: var(--text-light);
      font-size: 0.85rem;
    }

    .download-btn {
      padding: 8px 15px;
      background: linear-gradient(135deg, var(--c4), var(--c5));
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .download-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(0, 212, 255, 0.3);
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

    .alert-banner {
      background: linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(76, 175, 80, 0.05));
      border: 1px solid rgba(76, 175, 80, 0.3);
      color: #4caf50;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
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
      <div className="student-container">
        <div className="dashboard-frame">
        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="sidebar-logo">👨‍🎓 Student</div>
          
          <div className="student-profile">
            <p className="name">{student.name}</p>
            <p>{student.enrollment}</p>
            <p>👨‍🏫 {student.mentor}</p>
          </div>

          <div className="sidebar-menu">
            <div
              className={`sidebar-item ${activeTab === 'performance' ? 'active' : ''}`}
              onClick={() => setActiveTab('performance')}
            >
              📊 My Performance
            </div>
            <div
              className={`sidebar-item ${activeTab === 'subjects' ? 'active' : ''}`}
              onClick={() => setActiveTab('subjects')}
            >
              📚 Subjects
            </div>
            <div
              className={`sidebar-item ${activeTab === 'resources' ? 'active' : ''}`}
              onClick={() => setActiveTab('resources')}
            >
              📖 Resources
            </div>
            <div
              className={`sidebar-item ${activeTab === 'mentor' ? 'active' : ''}`}
              onClick={() => setActiveTab('mentor')}
            >
              💬 My Mentor
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
          {activeTab === 'performance' && (
            <>
              <div className="header">
                <h1>My Academic Performance</h1>
              </div>

              <div className="alert-banner">
                ✅ Great job! Your performance is steady. Keep up the excellent work!
              </div>

             <div className="stats-grid">

  {/* Attendance */}
  <div className="stat-card">
    <div className="stat-value">{performance.attendance}%</div>
    <div className="stat-label">Attendance</div>
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${performance.attendance}%` }}></div>
    </div>
  </div>

  {/* GPA */}
  <div className="stat-card">
    <div className="stat-value">{performance.gpa}</div>
    <div className="stat-label">Current GPA</div>
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${(performance.gpa / 10) * 100}%` }}></div>
    </div>
  </div>

  {/* Classes Attended */}
  <div className="stat-card">
    <div className="stat-value">{performance.attendedClasses}</div>
    <div className="stat-label">Classes Attended</div>
    <p style={{ color: '#B8C5D6', fontSize: '0.85rem', marginTop: '5px' }}>
      of {performance.totalClasses}
    </p>
  </div>

  {/* Overall Risk Level */}
  <div className="stat-card">
    <div className="stat-value" style={{ color: '#4caf50' }}>
      {performance.riskLevel}
    </div>
    <div className="stat-label">Risk Level</div>
  </div>

  {/* 🔽 NEW FACTORS — Added below in same style */}

  {/* Family Income */}
  <div className="stat-card">
    <div className="stat-value">{performance.familyIncome}</div>
    <div className="stat-label">Family Income (0–10)</div>
  </div>

  {/* Career Clarity */}
  <div className="stat-card">
    <div className="stat-value">{performance.careerClarity}</div>
    <div className="stat-label">Career Clarity</div>
  </div>

  {/* Language Barrier */}
  <div className="stat-card">
    <div className="stat-value">{performance.languageBarrier}</div>
    <div className="stat-label">Language Barrier</div>
  </div>

  {/* Mental Stress */}
  <div className="stat-card">
    <div className="stat-value">{performance.mentalStress}</div>
    <div className="stat-label">Mental Stress</div>
  </div>

  {/* Low Performance */}
  <div className="stat-card">
    <div className="stat-value">{performance.lowPerformance}</div>
    <div className="stat-label">Low Performance</div>
    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{ width: `${performance.lowPerformance * 10}%` }}
      ></div>
    </div>
  </div>

  {/* Peer Pressure */}
  <div className="stat-card">
    <div className="stat-value">{performance.peerPressure}</div>
    <div className="stat-label">Peer Pressure</div>
  </div>

  {/* Social Distraction */}
  <div className="stat-card">
    <div className="stat-value">{performance.socialDistraction}</div>
    <div className="stat-label">Social Distraction</div>
  </div>

  {/* Teaching–Learning Gap */}
  <div className="stat-card">
    <div className="stat-value">{performance.teachingLearningGap}</div>
    <div className="stat-label">Teaching–Learning Gap</div>
  </div>

  {/* Multiple Backlogs */}
  <div className="stat-card">
    <div className="stat-value">{performance.multipleBacklogs}</div>
    <div className="stat-label">Backlogs</div>
  </div>

  {/* Migration */}
  <div className="stat-card">
    <div className="stat-value">{performance.migration}</div>
    <div className="stat-label">Migration (0–10)</div>
  </div>

</div>
            </>
          )}    

          {activeTab === 'subjects' && (
            <>
              <div className="header">
                <h1>My Subjects</h1>
              </div>

              <div className="content-card">
                <h3>Current Semester Courses</h3>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Marks</th>
                        <th>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjects.map((subject, index) => (
                        <tr key={index}>
                          <td>{subject.name}</td>
                          <td>{subject.marks}/100</td>
                          <td><span className="grade-badge">{subject.grade}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'resources' && (
            <>
              <div className="header">
                <h1>Learning Resources</h1>
              </div>

              <div className="content-card">
                <h3>📚 Available Study Materials</h3>
                {resources.map(resource => (
                  <div key={resource.id} className="resource-card">
                    <div className="resource-info">
                      <h4>{resource.title}</h4>
                      <p>{resource.type} • {resource.downloads} downloads</p>
                    </div>
                    <button
  className="download-btn"
  onClick={() => alert("Downloaded successfully!")}
>
  ⬇️ Download
</button>

                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'mentor' && (
            <>
              <div className="header">
                <h1>Connect with Your Mentor</h1>
              </div>

              <div className="content-card">
                <h3>👨‍🏫 {student.mentor}</h3>
                <p style={{ color: '#B8C5D6', marginBottom: '20px' }}>Your assigned mentor is here to support your academic journey</p>
                
                <div style={{ background: 'rgba(0, 212, 255, 0.05)', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                  <p style={{ color: '#B8C5D6', marginBottom: '10px' }}>Email: priya.singh@university.edu</p>
                  <p style={{ color: '#B8C5D6', marginBottom: '10px' }}>Office Hours: Mon-Fri, 2-4 PM</p>
                  <p style={{ color: '#B8C5D6' }}>Expertise: Literature, Essay Writing, Academic Counseling</p>
                </div>

               <button
  className="action-btn"
  style={{ marginRight: "10px" }}
  onClick={() => {
    const msg = prompt("Enter your message:");
    if (msg && msg.trim() !== "") {
      alert("Message sent successfully!");
    }
  }}
>
  Send Message
</button>

<button
  className="action-btn"
  style={{ background: "rgba(0, 212, 255, 0.2)", color: "#00D4FF" }}
  onClick={() => {
    const date = prompt("Enter meeting date (YYYY-MM-DD):");
    if (!date) return;

    const time = prompt("Enter meeting time (HH:MM):");
    if (!time) return;

    // Store meeting details in state
    setMeeting({ date, time });
  }}
>
  📅 Schedule Meeting
</button>
{meeting && (
  <div
    style={{
      marginTop: "15px",
      padding: "10px",
      background: "rgba(0,212,255,0.15)",
      borderRadius: "8px",
      color: "#00D4FF",
      fontSize: "0.9rem",
      border: "1px solid rgba(0,212,255,0.3)",
      width: "fit-content"
    }}
  >
    📅 <strong>Meeting Scheduled:</strong> {meeting.date} at {meeting.time}
  </div>
)}


              </div>
            </>
          )}

          {activeTab === 'messages' && (
            <>
              <div className="header">
                <h1>Messages</h1>
              </div>

              <div className="content-card">
                <h3>📧 Recent Messages</h3>
                {messages.map(message => (
                  <div key={message.id} className="message-card">
                    <div className="message-from">{message.from}</div>
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

export default StudentDashboard;
