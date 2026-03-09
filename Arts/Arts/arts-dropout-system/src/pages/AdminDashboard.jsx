import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Rajesh Kumar', role: 'Student', email: 'rajesh@example.com', status: 'Active' },
    { id: 2, name: 'Priya Singh', role: 'Mentor', email: 'priya@example.com', status: 'Active' },
    { id: 3, name: 'Amit Patel', role: 'Student', email: 'amit@example.com', status: 'At Risk' },
    { id: 4, name: 'Neha Sharma', role: 'Parent', email: 'neha@example.com', status: 'Active' },
    { id: 5, name: 'Vikram Das', role: 'Mentor', email: 'vikram@example.com', status: 'Active' },
  ]);

  const [students, setStudents] = useState([
    { id: 1, name: 'Rajesh Kumar', attendance: '85%', gpa: '3.2', riskLevel: 'Low', mentor: 'Priya Singh' },
    { id: 2, name: 'Amit Patel', attendance: '55%', gpa: '2.1', riskLevel: 'High', mentor: 'Vikram Das' },
    { id: 3, name: 'Sneha Roy', attendance: '92%', gpa: '3.8', riskLevel: 'Low', mentor: 'Priya Singh' },
  ]);

  const [activeTab, setActiveTab] = useState('overview');
  const [deleteUser, setDeleteUser] = useState(null);
  const [showAddUser, setShowAddUser] = useState(false);

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

    .admin-container {
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
      box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
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

    .sidebar-menu {
      display: flex;
      flex-direction: column;
      gap: 10px;
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
      margin-top: auto;
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
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(0, 212, 255, 0.2);
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
      font-size: 2rem;
      font-weight: 800;
      background: linear-gradient(135deg, var(--c4), var(--c2));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      color: var(--text-light);
      font-size: 0.9rem;
    }

    .table-container {
      background: rgba(26, 35, 50, 0.8);
      border-radius: 12px;
      border: 1px solid rgba(0, 212, 255, 0.2);
      overflow: hidden;
      margin-bottom: 1rem;
      max-height: 60vh;
      overflow-y: auto;
      box-sizing: border-box;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    thead {
      background: rgba(0, 212, 255, 0.1);
      border-bottom: 2px solid rgba(0, 212, 255, 0.3);
    }

    th {
      padding: 10px;
      text-align: left;
      color: var(--c4);
      font-weight: 700;
    }

    td {
      padding: 10px;
      border-bottom: 1px solid rgba(0, 212, 255, 0.1);
      color: var(--text-light);
    }

    tr:hover {
      background: rgba(0, 212, 255, 0.05);
    }

    .status-badge {
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
    }

    .status-active {
      background: rgba(76, 175, 80, 0.2);
      color: #4caf50;
    }

    .status-atrisk {
      background: rgba(255, 107, 157, 0.2);
      color: #FF6B9D;
    }

    .action-icons {
      display: flex;
      gap: 10px;
    }

    .icon-btn {
      padding: 6px 12px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.85rem;
      transition: all 0.3s ease;
    }

    .edit-btn {
      background: rgba(0, 212, 255, 0.2);
      color: var(--c4);
    }

    .edit-btn:hover {
      background: rgba(0, 212, 255, 0.4);
    }

    .delete-btn {
      background: rgba(255, 107, 157, 0.2);
      color: var(--c2);
    }

    .delete-btn:hover {
      background: rgba(255, 107, 157, 0.4);
    }

    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: rgba(26, 35, 50, 0.95);
      padding: 30px;
      border-radius: 12px;
      border: 1px solid rgba(0, 212, 255, 0.3);
      min-width: 400px;
      max-width: 600px;
    }

    .modal-content h2 {
      color: var(--c4);
      margin-bottom: 20px;
      font-size: 1.5rem;
    }

    .form-group {
      margin-bottom: 15px;
    }

    .form-group label {
      display: block;
      color: var(--text-light);
      margin-bottom: 5px;
      font-weight: 600;
    }

    .form-group input,
    .form-group select {
      width: 100%;
      padding: 10px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(0, 212, 255, 0.3);
      border-radius: 6px;
      color: var(--text-dark);
      font-size: 0.95rem;
    }

    .form-group input::placeholder {
      color: var(--text-light);
    }

    .modal-actions {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }

    .modal-actions button {
      flex: 1;
      padding: 10px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .confirm-btn {
      background: linear-gradient(135deg, var(--c4), var(--c5));
      color: white;
    }

    .cancel-btn {
      background: rgba(107, 95, 255, 0.2);
      color: var(--c5);
    }

    .tabs {
      display: flex;
      gap: 10px;
      margin-bottom: 0.8rem;
      border-bottom: 2px solid rgba(0, 212, 255, 0.2);
      padding-bottom: 8px;
    }

    .tab {
      padding: 10px 20px;
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

    .risk-chart {
      background: rgba(26, 35, 50, 0.8);
      padding: 20px;
      border-radius: 12px;
      border: 1px solid rgba(0, 212, 255, 0.2);
      margin-bottom: 2rem;
    }

    .risk-bar {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 20px;
    }

    .risk-label {
      min-width: 80px;
      color: var(--text-light);
      font-weight: 600;
    }

    .risk-progress {
      flex: 1;
      height: 25px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      overflow: hidden;
    }

    .risk-fill {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 0.8rem;
      font-weight: 600;
      transition: width 0.5s ease;
    }

    .risk-low {
      background: linear-gradient(90deg, #4caf50, #45a049);
    }

    .risk-medium {
      background: linear-gradient(90deg, #ff9800, #e68900);
    }

    .risk-high {
      background: linear-gradient(90deg, #ff6b9d, #ff4757);
    }
  `;

  const handleDeleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
    setDeleteUser(null);
  };

  return (
    <div style={{ background: '#0f1419', minHeight: '100vh' }}>
      <style>{styles}</style>
      <div className="admin-container">
        <div className="dashboard-frame">
        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="sidebar-logo">📊 Admin</div>
          <div className="sidebar-menu">
            <div
              className={`sidebar-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              📈 Overview
            </div>
            <div
              className={`sidebar-item ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              👥 Manage Users
            </div>
            <div
              className={`sidebar-item ${activeTab === 'students' ? 'active' : ''}`}
              onClick={() => setActiveTab('students')}
            >
              🎓 Student Analytics
            </div>
            <div
              className={`sidebar-item ${activeTab === 'alerts' ? 'active' : ''}`}
              onClick={() => setActiveTab('alerts')}
            >
              🔔 System Alerts
            </div>
            <div
              className={`sidebar-item ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('reports')}
            >
              📑 Reports
            </div>
          </div>
          <Link to="/">
            <button className="logout-btn" style={{ width: '100%' }}>← Back to Home</button>
          </Link>
        </div>

        {/* MAIN CONTENT */}
        <div className="main-content">
          {activeTab === 'overview' && (
            <>
              <div className="header">
                <h1>Admin Dashboard</h1>
                <button className="action-btn">System Settings</button>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-value">485</div>
                  <div className="stat-label">Total Students</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">42</div>
                  <div className="stat-label">Active Mentors</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">127</div>
                  <div className="stat-label">Active Parents</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">23%</div>
                  <div className="stat-label">At-Risk Students</div>
                </div>
              </div>

              <div className="risk-chart">
                <h2 style={{ color: '#00D4FF', marginBottom: '20px' }}>Dropout Risk Distribution</h2>
                <div className="risk-bar">
                  <div className="risk-label">Low Risk</div>
                  <div className="risk-progress">
                    <div className="risk-fill risk-low" style={{ width: '65%' }}>65%</div>
                  </div>
                </div>
                <div className="risk-bar">
                  <div className="risk-label">Medium Risk</div>
                  <div className="risk-progress">
                    <div className="risk-fill risk-medium" style={{ width: '22%' }}>22%</div>
                  </div>
                </div>
                <div className="risk-bar">
                  <div className="risk-label">High Risk</div>
                  <div className="risk-progress">
                    <div className="risk-fill risk-high" style={{ width: '13%' }}>13%</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'users' && (
            <>
              <div className="header">
                <h1>Manage Users</h1>
                <button className="action-btn" onClick={() => setShowAddUser(true)}>+ Add User</button>
              </div>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.role}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`status-badge ${user.status === 'Active' ? 'status-active' : 'status-atrisk'}`}>
                            {user.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-icons">
                            <button className="icon-btn edit-btn">Edit</button>
                            <button className="icon-btn delete-btn" onClick={() => setDeleteUser(user.id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'students' && (
            <>
              <div className="header">
                <h1>Student Analytics</h1>
              </div>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>Attendance</th>
                      <th>GPA</th>
                      <th>Risk Level</th>
                      <th>Assigned Mentor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(student => (
                      <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.attendance}</td>
                        <td>{student.gpa}</td>
                        <td>
                          <span className={`status-badge ${student.riskLevel === 'Low' ? 'status-active' : 'status-atrisk'}`}>
                            {student.riskLevel}
                          </span>
                        </td>
                        <td>{student.mentor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'alerts' && (
            <>
              <div className="header">
                <h1>System Alerts</h1>
              </div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Alert Type</th>
                      <th>Student/User</th>
                      <th>Message</th>
                      <th>Priority</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>⚠️ Low Attendance</td>
                      <td>Amit Patel</td>
                      <td>Attendance dropped to 55%</td>
                      <td><span className="status-badge status-atrisk">High</span></td>
                      <td>Dec 8, 2025</td>
                    </tr>
                    <tr>
                      <td>📉 Grade Drop</td>
                      <td>Rahul Singh</td>
                      <td>GPA decreased from 3.5 to 2.8</td>
                      <td><span className="status-badge status-atrisk">Medium</span></td>
                      <td>Dec 7, 2025</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'reports' && (
            <>
              <div className="header">
                <h1>Reports</h1>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                <div style={{ background: 'rgba(26, 35, 50, 0.8)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(0, 212, 255, 0.2)' }}>
                  <h3 style={{ color: '#00D4FF', marginBottom: '10px' }}>Monthly Report</h3>
                  <p style={{ color: '#B8C5D6', marginBottom: '15px' }}>Generate comprehensive monthly analytics</p>
                  <button className="action-btn" style={{ width: '100%' }}>Download</button>
                </div>
                <div style={{ background: 'rgba(26, 35, 50, 0.8)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(0, 212, 255, 0.2)' }}>
                  <h3 style={{ color: '#00D4FF', marginBottom: '10px' }}>Intervention Report</h3>
                  <p style={{ color: '#B8C5D6', marginBottom: '15px' }}>Track mentor intervention outcomes</p>
                  <button className="action-btn" style={{ width: '100%' }}>Download</button>
                </div>
                <div style={{ background: 'rgba(26, 35, 50, 0.8)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(0, 212, 255, 0.2)' }}>
                  <h3 style={{ color: '#00D4FF', marginBottom: '10px' }}>Risk Assessment Report</h3>
                  <p style={{ color: '#B8C5D6', marginBottom: '15px' }}>Detailed risk analysis and predictions</p>
                  <button className="action-btn" style={{ width: '100%' }}>Download</button>
                </div>
              </div>
            </>
          )}
        </div>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteUser && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Delete</h2>
            <p style={{ color: '#B8C5D6', marginBottom: '20px' }}>Are you sure you want to delete this user?</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setDeleteUser(null)}>Cancel</button>
              <button className="confirm-btn" onClick={() => handleDeleteUser(deleteUser)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD USER MODAL */}
      {showAddUser && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New User</h2>
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Enter full name" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter email address" />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select>
                <option>Student</option>
                <option>Mentor</option>
                <option>Parent</option>
              </select>
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowAddUser(false)}>Cancel</button>
              <button className="confirm-btn" onClick={() => setShowAddUser(false)}>Add User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
