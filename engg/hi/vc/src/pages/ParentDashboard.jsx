import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SAMPLE_PARENT_DATA } from "../data/mockData";
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [parentData, setParentData] = useState({
    name: "Parent",
    email: "",
    phone: "",
    address: "",
    studentId: ""
  });
  const [childData, setChildData] = useState({
    name: "Loading...",
    rollNo: "",
    department: "",
    gpa: "N/A",
    attendance: 0,
    fees: { status: "N/A", dueAmount: 0, dueDate: "" },
    notifications: [],
    remarks: []
  });

  // Load parent data from localStorage and fetch child data
  useEffect(() => {
    // Sample parent data with corresponding student data

    const stored = localStorage.getItem("parentData");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setParentData(data);

        const matchingData = SAMPLE_PARENT_DATA.find(d => d.parent.name === data.name);
        if (matchingData) {
          setChildData(matchingData.student);
        } else {
          // Try to fetch linked student data from API
          if (data.studentId) {
            fetchChildData(data.studentId);
          }
        }
      } catch (_) { }
    } else {
      const randomData = SAMPLE_PARENT_DATA[Math.floor(Math.random() * SAMPLE_PARENT_DATA.length)];
      setParentData(randomData.parent);
      setChildData(randomData.student);
      localStorage.setItem("parentData", JSON.stringify(randomData.parent));
    }
  }, []);

  // Fetch child/student data from API
  const fetchChildData = async (studentId) => {
    try {
      const res = await axios.get("http://localhost:6000/api/student-admin/get-students");
      const student = res.data.find(s => s._id === studentId);
      if (student) {
        setChildData(prev => ({
          ...prev,
          name: student.FullName || "Unknown",
          rollNo: student.RollNo || "",
          department: student.Department || ""
        }));
      }
    } catch (err) {
      console.error("Error fetching child data:", err);
    }
  };

  // Get initials for avatar
  const getInitials = () => {
    return (parentData.name || "P")
      .split(" ")
      .map((x) => x[0] || "")
      .join("")
      .toUpperCase();
  };

  const styles = `
    :root {
      --bg: #192047;
      --card: #262C53;
      --soft: #1a2349;
      --muted: #9aa3be;
      --accent: #A2F4F9;
      --danger: #ff6b6b;
      --warning: #ffa500;
      --success: #51cf66;
      --c2: #FFD1D8;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      font-family: 'Inter', 'Segoe UI', sans-serif;
      background: var(--bg);
      color: white;
    }

    .topbar {
      background: var(--card);
      padding: 15px 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background: rgba(255,255,255,0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
    }

    .top-right {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .profile-mini {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(255,255,255,0.12);
      padding: 6px 10px;
      border-radius: 999px;
      cursor: pointer;
    }

    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--accent);
      color: var(--card);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
    }

    .container {
      display: flex;
      gap: 20px;
      padding: 28px;
      max-width: 1400px;
      margin: 90px auto 0 auto;
    }

    .main-content {
      flex: 1;
    }

    .card {
      background: var(--card);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }

    .stat-box {
      background: var(--card);
      padding: 20px;
      border-radius: 12px;
      text-align: center;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: bold;
      color: var(--accent);
      margin: 10px 0;
    }

    .stat-label {
      color: var(--muted);
      font-size: 0.9rem;
    }

    .section-title {
      font-size: 1.3rem;
      font-weight: 700;
      color: white;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .see-more {
      font-size: 0.85rem;
      color: var(--accent);
      cursor: pointer;
      text-decoration: none;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    th {
      color: var(--accent);
      font-weight: 600;
    }

    .btn {
      padding: 8px 16px;
      background: var(--accent);
      color: var(--card);
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s;
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(162, 244, 249, 0.3);
    }

    .profile-dropdown {
      position: absolute;
      top: 66px;
      right: 50px;
      background: var(--card);
      border-radius: 8px;
      padding: 12px;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
      z-index: 1100;
      min-width: 180px;
    }

    .profile-dropdown a {
      display: block;
      padding: 10px;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      transition: background 0.2s;
      cursor: pointer;
    }

    .profile-dropdown a:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .alert-box {
      background: rgba(255, 107, 107, 0.1);
      border-left: 4px solid #ff6b6b;
      padding: 12px;
      margin-bottom: 12px;
      border-radius: 4px;
    }

    .alert-box.success {
      background: rgba(81, 207, 102, 0.1);
      border-left-color: #51cf66;
    }

    .greeting {
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 28px;
      color: white;
    }
  `;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <style>{styles}</style>

      {/* TOPBAR */}
      <div className="topbar">
        <div className="brand">
          <div className="logo">AIT</div>
          <div>
            <div style={{ fontSize: '14px', opacity: 0.95 }}>Parent Portal</div>
            <div style={{ fontSize: '12px', opacity: 0.85 }}>ABC Institute of Technology</div>
          </div>
        </div>

        <div className="top-right">
          <div className="profile-mini" onClick={() => setProfileDropdownVisible(!profileDropdownVisible)}>
            <div className="avatar">{getInitials()}</div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600 }}>{parentData.name}</div>
              <small style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.85)' }}>Parent</small>
            </div>
          </div>
          <button onClick={() => navigate('/')} style={{ background: 'rgba(162,244,249,0.12)', border: '1px solid rgba(162,244,249,0.3)', color: '#A2F4F9', padding: '7px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            ← Back to Home
          </button>
          {profileDropdownVisible && (
            <div className="profile-dropdown">
              <a href="/parent-profile">View Profile</a>
              <a href="/parent-settings">Settings</a>
              <a href="/" onClick={() => {
                localStorage.removeItem("parentData");
                localStorage.removeItem("isLoggedIn");
                navigate('/');
              }}>Logout</a>
            </div>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container">
        <div className="main-content">
          <div className="greeting">Welcome Back, {parentData.name}</div>

          {/* Child Status Overview */}
          <div className="grid">
            <div style={{ flex: 1, padding: '24px' }}>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#A2F4F9', marginBottom: '8px' }}>
                  Welcome, {parentData.name}
                </h2>
                <p style={{ color: '#F7FAFC', opacity: 0.8 }}>
                  Monitoring progress for: <strong style={{ color: '#fff' }}>{childData.name}</strong> ({childData.id})
                </p>
              </div>

              {/* Dashboard Cards Content */}
              {activeMenu === 'dashboard' && (
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                    <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ color: '#A2F4F9', fontSize: '14px', fontWeight: 600 }}>Current GPA</div>
                      <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff' }}>{childData.gpa}</div>
                      <div style={{ fontSize: '13px', color: '#4ade80' }}>↑ 0.2 from last semester</div>
                    </Card>

                    <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ color: '#A2F4F9', fontSize: '14px', fontWeight: 600 }}>Attendance</div>
                      <div style={{ fontSize: '32px', fontWeight: 'bold', color: childData.attendance >= 75 ? '#4ade80' : '#f87171' }}>
                        {childData.attendance}%
                      </div>
                      <div style={{ fontSize: '13px', color: '#F7FAFC', opacity: 0.7 }}>Target: 75%</div>
                    </Card>

                    <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ color: '#A2F4F9', fontSize: '14px', fontWeight: 600 }}>Fees Status</div>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: childData.fees.status === 'Paid' ? '#4ade80' : '#fbbf24' }}>
                        {childData.fees.status}
                      </div>
                      {childData.fees.dueAmount && (
                        <div style={{ fontSize: '13px', color: '#F7FAFC', opacity: 0.7 }}>
                          Due: ₹{childData.fees.dueAmount.toLocaleString('en-IN')} by {childData.fees.dueDate}
                        </div>
                      )}
                    </Card>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
                    <Card style={{ padding: '24px' }}>
                      <h3 style={{ fontSize: '18px', color: '#A2F4F9', marginBottom: '16px', fontWeight: 600 }}>Recent Notifications</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {childData.notifications.map(notif => (
                          <div key={notif.id} style={{
                            padding: '12px 16px',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '8px',
                            borderLeft: `4px solid ${notif.type === 'alert' ? '#f87171' : notif.type === 'reminder' ? '#fbbf24' : '#4ade80'}`
                          }}>
                            <div style={{ fontSize: '14px', color: '#fff', marginBottom: '4px' }}>{notif.message}</div>
                            <div style={{ fontSize: '12px', color: '#F7FAFC', opacity: 0.6 }}>{notif.date}</div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    <Card style={{ padding: '24px' }}>
                      <h3 style={{ fontSize: '18px', color: '#A2F4F9', marginBottom: '16px', fontWeight: 600 }}>Teacher Remarks</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {childData.remarks.map((remark, idx) => (
                          <div key={idx} style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <span style={{ fontWeight: 600, color: '#fff', fontSize: '14px' }}>{remark.subject}</span>
                              <span style={{ fontSize: '12px', color: '#F7FAFC', opacity: 0.6 }}>{remark.date}</span>
                            </div>
                            <p style={{ margin: 0, fontSize: '14px', color: '#F7FAFC', opacity: 0.9, lineHeight: 1.5 }}>
                              "{remark.comment}"
                            </p>
                            <div style={{ marginTop: '8px', fontSize: '12px', color: '#A2F4F9' }}>
                              - {remark.teacher}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
