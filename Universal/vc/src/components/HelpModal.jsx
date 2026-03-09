import React from 'react';

const HelpModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const styles = `
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.2s ease-out;
    }
    .modal-content {
      background: #192047;
      border: 1px solid rgba(162, 244, 249, 0.2);
      border-radius: 16px;
      padding: 24px;
      width: 90%;
      max-width: 500px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
      position: relative;
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .modal-title {
      font-size: 20px;
      font-weight: 700;
      color: #A2F4F9;
    }
    .close-btn {
      background: none;
      border: none;
      color: #bcc2de;
      font-size: 24px;
      cursor: pointer;
    }
    .help-section {
      margin-bottom: 20px;
    }
    .help-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 10px;
      margin-bottom: 10px;
      text-decoration: none;
      color: #fff;
      transition: background 0.2s;
    }
    .help-item:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    .help-icon {
      font-size: 20px;
      width: 32px;
      text-align: center;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <style>{styles}</style>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">Resources & Support</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="help-section">
                    <button type="button" className="help-item" style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
                        <span className="help-icon">📞</span>
                        <div>
                            <div style={{ fontWeight: 600 }}>Emergency Helpline</div>
                            <small style={{ color: '#bcc2de' }}>24/7 support for urgent needs</small>
                        </div>
                    </button>
                    <button type="button" className="help-item" style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
                        <span className="help-icon">💬</span>
                        <div>
                            <div style={{ fontWeight: 600 }}>Counselor Chat</div>
                            <small style={{ color: '#bcc2de' }}>Talk to an academic advisor</small>
                        </div>
                    </button>
                    <button type="button" className="help-item" style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
                        <span className="help-icon">📚</span>
                        <div>
                            <div style={{ fontWeight: 600 }}>Student Handbook</div>
                            <small style={{ color: '#bcc2de' }}>Policies and procedures</small>
                        </div>
                    </button>
                    <button type="button" className="help-item" style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
                        <span className="help-icon">📧</span>
                        <div>
                            <div style={{ fontWeight: 600 }}>Email Support</div>
                            <small style={{ color: '#bcc2de' }}>Response within 24 hours</small>
                        </div>
                    </button>
                </div>

                <button
                    className="btn primary"
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', marginTop: '10px' }}
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default HelpModal;
