import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RiskTrendChart from '../components/RiskTrendChart';
import HelpModal from '../components/HelpModal';

const badgeColors = { Low: '#06D6A0', Medium: '#FFD166', High: '#FF6B6B' };

const fallbackData = {
  risk: { score: 68, level: 'Medium', trend: [62, 64, 63, 66, 68, 69, 68, 70], factors: ['Late submissions', 'Low attendance', 'Stress spikes', 'OSCE pending'] },
  academics: {
    subjects: [
      { subject: 'Anatomy', score: 82 },
      { subject: 'Physiology', score: 68 },
      { subject: 'Pathology', score: 58 },
      { subject: 'Pharmacology', score: 74 }
    ],
    scoreComparison: [
      { label: 'Midterm', value: 72, target: 80 },
      { label: 'Quiz', value: 65, target: 70 },
      { label: 'Lab', value: 78, target: 75 },
      { label: 'Project', value: 84, target: 88 }
    ],
    tests: [
      { test: 'Cardio Quiz', score: '18/25', status: 'Needs review' },
      { test: 'Lab Prep', score: '22/25', status: 'On track' },
      { test: 'Midterm', score: '54/80', status: 'Watch' }
    ],
    progress: 0.78
  },
  attendance: {
    percentage: 91,
    absent: 3,
    late: 2,
    days: Array.from({ length: 30 }, (_, i) => {
      const day = i + 1;
      const status = day % 9 === 0 ? 'absent' : day % 7 === 0 ? 'late' : 'present';
      return { day, status };
    })
  },
  wellbeing: { stress: 62 },
  // NEW: Engagement metrics for comprehensive risk analysis
  engagement: {
    assignmentSubmission: 78, // % of assignments submitted on time
    lmsLogins: 42, // Number of LMS logins this month
    forumPosts: 5, // Forum participation
    resourcesAccessed: 23, // Study materials accessed
    classParticipation: 65, // Participation score
    averageResponseTime: 2.3, // Days to submit after assignment posted
    lastActive: '2 hours ago',
    weeklyActivity: [12, 8, 15, 10, 6, 4, 14] // Activity score per day this week
  },
  support: {
    mentorMeetings: 2, // This month
    counselorVisits: 1,
    peerStudyGroups: 1,
    lastMentorMeeting: '5 days ago'
  },
  financial: {
    feesPaid: 90, // percentage
    scholarshipActive: true,
    pendingDues: 5000
  },
  progress: {
    creditsCompleted: 45,
    creditsRequired: 120,
    cgpa: 7.2,
    cgpaTrend: [6.8, 7.0, 7.1, 7.2],
    backlogs: 1
  }
};

const styles = `
  :root{--bg:#0f172a;--panel:#111827;--muted:#9ca3af;--accent:#A2F4F9;--accent2:#FFD166;--danger:#FF6B6B;--success:#06D6A0;--radius:14px;}
  body{margin:0;font-family:Inter,Segoe UI,Helvetica,Arial;background:var(--bg);color:#e5e7eb;}
  .shell{min-height:100vh;background:radial-gradient(circle at 10% 10%, rgba(162,244,249,0.08), transparent 25%), radial-gradient(circle at 80% 20%, rgba(255,209,102,0.08), transparent 25%), #0f172a;}
  .topbar{position:sticky;top:0;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:16px 28px;background:rgba(17,24,39,0.85);backdrop-filter:blur(8px);border-bottom:1px solid rgba(255,255,255,0.06);} 
  .brand{display:flex;align-items:center;gap:10px;font-weight:700;color:#fff;letter-spacing:0.3px;}
  .pill{padding:6px 10px;border-radius:999px;background:rgba(255,255,255,0.08);font-size:12px;color:var(--muted);} 
  .grid{display:grid;gap:14px;}
  .card{background:var(--panel);border:1px solid rgba(255,255,255,0.04);border-radius:var(--radius);padding:16px;box-shadow:0 10px 40px rgba(0,0,0,0.25);} 
  .section-title{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;color:#fff;font-size:18px;font-weight:700;}
  .progress{height:10px;background:rgba(255,255,255,0.08);border-radius:8px;overflow:hidden;}
  .progress span{display:block;height:100%;border-radius:8px;}
  table{width:100%;border-collapse:collapse;color:#e5e7eb;font-size:14px;}
  th,td{padding:10px;border-bottom:1px solid rgba(255,255,255,0.06);text-align:left;}
  th{color:var(--accent);} 
  .chip{padding:6px 10px;border-radius:12px;background:rgba(255,255,255,0.08);font-size:13px;color:#fff;display:inline-flex;align-items:center;gap:6px;} 
  .btn{padding:10px 14px;border-radius:10px;border:none;cursor:pointer;font-weight:700;} 
  .btn.primary{background:var(--accent);color:#0f172a;} 
  .btn.ghost{background:rgba(255,255,255,0.08);color:#fff;border:1px solid rgba(255,255,255,0.08);} 
  input, textarea{background:#0b1222;border:1px solid rgba(255,255,255,0.08);color:#fff;border-radius:10px;padding:10px;font-size:14px;}
  textarea{resize:vertical;}
  @media (max-width:1080px){.stackable{grid-template-columns:1fr!important;}}
`;


const Ring = ({ value, label, color }) => {
  const circumference = 2 * Math.PI * 80;
  const offset = (1 - value) * circumference;
  return (
    <svg width="200" height="200" style={{ display: 'block', margin: '0 auto' }}>
      <circle cx="100" cy="100" r="80" stroke="rgba(255,255,255,0.08)" strokeWidth="16" fill="none" />
      <circle cx="100" cy="100" r="80" stroke={color} strokeWidth="16" fill="none" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
      <text x="100" y="95" textAnchor="middle" fill="#fff" fontSize="26" fontWeight="700">{Math.round(value * 100)}%</text>
      <text x="100" y="120" textAnchor="middle" fill="var(--muted)" fontSize="12">{label}</text>
    </svg>
  );
};

const Dashboard = () => {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // New state for enhanced features
  const [purpose, setPurpose] = useState(() => localStorage.getItem('myPurpose') || '');
  const [todayFocus, setTodayFocus] = useState(() => localStorage.getItem('todayFocus') || '');
  const [studyStreak, setStudyStreak] = useState(() => parseInt(localStorage.getItem('studyStreak') || '0'));
  const [studyLog, setStudyLog] = useState(() => JSON.parse(localStorage.getItem('studyLog') || '[]'));
  const [selectedMood, setSelectedMood] = useState(null);
  const [helpRequest, setHelpRequest] = useState('');
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [pauseMode, setPauseMode] = useState(() => localStorage.getItem('pauseMode') === 'true');
  const [badges, setBadges] = useState(() => JSON.parse(localStorage.getItem('badges') || '["First Login"]'));
  const [dailyCheckin, setDailyCheckin] = useState(() => {
    const last = localStorage.getItem('lastCheckin');
    return last === new Date().toDateString();
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5000/api/dashboard/student/demo');
        setData((prev) => ({ ...prev, ...(res.data || {}) }));
        setError('');
      } catch (err) {
        setError('Live data unavailable, showing sample.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Save purpose to localStorage
  const savePurpose = () => {
    localStorage.setItem('myPurpose', purpose);
    if (!badges.includes('Purpose Set')) {
      const newBadges = [...badges, 'Purpose Set'];
      setBadges(newBadges);
      localStorage.setItem('badges', JSON.stringify(newBadges));
    }
  };

  // Save today's focus concept
  const saveTodayFocus = () => {
    localStorage.setItem('todayFocus', todayFocus);
  };

  // Log study session
  const logStudySession = (minutes) => {
    const today = new Date().toDateString();
    const newLog = [...studyLog, { date: today, minutes }];
    setStudyLog(newLog);
    localStorage.setItem('studyLog', JSON.stringify(newLog));

    // Update streak
    const lastEntry = studyLog[studyLog.length - 1];
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (!lastEntry || lastEntry.date === yesterday || lastEntry.date === today) {
      const newStreak = studyStreak + 1;
      setStudyStreak(newStreak);
      localStorage.setItem('studyStreak', newStreak.toString());

      // Badge for streaks
      if (newStreak === 7 && !badges.includes('7-Day Streak')) {
        const newBadges = [...badges, '7-Day Streak'];
        setBadges(newBadges);
        localStorage.setItem('badges', JSON.stringify(newBadges));
      }
    }
  };

  // Daily check-in
  const doCheckin = () => {
    localStorage.setItem('lastCheckin', new Date().toDateString());
    setDailyCheckin(true);
    if (!badges.includes('Daily Warrior')) {
      const newBadges = [...badges, 'Daily Warrior'];
      setBadges(newBadges);
      localStorage.setItem('badges', JSON.stringify(newBadges));
    }
  };

  // Toggle pause mode
  const togglePauseMode = () => {
    const newMode = !pauseMode;
    setPauseMode(newMode);
    localStorage.setItem('pauseMode', newMode.toString());
  };

  // Send help request
  const sendHelpRequest = (type) => {
    alert(`Help request sent to ${type}! They will reach out soon.`);
    setShowHelpModal(false);
    setHelpRequest('');
  };

  const badgeColor = badgeColors[data.risk.level] || badgeColors.Medium;
  const trendScaled = useMemo(() => data.risk.trend.map((v) => Math.max(20, Math.min(130, v))), [data.risk.trend]);

  // Calculate weekly study time
  const weeklyStudyTime = useMemo(() => {
    const weekAgo = Date.now() - 7 * 86400000;
    return studyLog.filter(l => new Date(l.date).getTime() > weekAgo).reduce((sum, l) => sum + l.minutes, 0);
  }, [studyLog]);

  return (
    <div className="shell">
      <style>{styles}</style>
      <HelpModal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />

      <div className="topbar">
        <div className="brand">
          <span style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.08)', display: 'grid', placeItems: 'center' }}>SD</span>
          <span>Student Dashboard</span>
          <span className="pill">Live + demo</span>
          {pauseMode && <span className="pill" style={{ background: 'rgba(255,209,102,0.2)', color: '#FFD166' }}>⏸️ Pause Mode</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {loading && <span className="pill">Syncing...</span>}
          {error && <span className="pill" style={{ color: '#fbbf24' }}>{error}</span>}
          <button className="btn ghost" onClick={() => setShowHelpModal(true)}>🆘 Get Help</button>
          <button className="btn ghost" onClick={() => navigate('/counseling')}>Counseling</button>
          <button className="btn ghost" onClick={() => navigate('/')}>← Back to Home</button>
          <button className="btn primary">Mentor View</button>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '20px auto', padding: '0 18px' }} className="grid stackable" >

        {/* Daily Check-in & Pause Mode Banner */}
        {!dailyCheckin && (
          <div className="card" style={{ background: 'linear-gradient(135deg, rgba(6,214,160,0.15), rgba(17,24,39,0.9))', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px' }}>
            <div>
              <strong>👋 Good morning!</strong> Check in to start your day and maintain your streak.
            </div>
            <button className="btn primary" onClick={doCheckin}>✅ I'm Here Today</button>
          </div>
        )}

        {/* Badges & Celebrations */}
        <div className="card" style={{ background: 'linear-gradient(135deg, rgba(255,209,102,0.08), rgba(17,24,39,0.9))' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontWeight: 800 }}>🏆 Your Badges & Achievements</span>
            <span className="pill">{badges.length} earned</span>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {badges.map((badge) => (
              <div key={badge} className="chip" style={{ background: 'rgba(255,209,102,0.15)', color: '#FFD166', padding: '8px 14px', fontSize: 14 }}>
                {badge === 'First Login' && '🎉'}
                {badge === 'Purpose Set' && '🎯'}
                {badge === '7-Day Streak' && '🔥'}
                {badge === 'Daily Warrior' && '⚔️'}
                {badge}
              </div>
            ))}
          </div>
          {studyStreak > 0 && (
            <div style={{ marginTop: 12, color: 'var(--accent)' }}>
              🔥 Current Study Streak: <strong>{studyStreak} days</strong> — Keep it going!
            </div>
          )}
        </div>

        {/* Personal Purpose Statement */}
        <div className="card" style={{ background: 'linear-gradient(135deg, rgba(162,244,249,0.12), rgba(17,24,39,0.9))' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontWeight: 800 }}>🎯 My Personal Purpose Statement</span>
            <span className="pill">Why I'm here</span>
          </div>
          <textarea
            placeholder="Write your one-sentence purpose... Why are you studying? What do you want to become? (e.g., 'I want to become a software engineer to support my family and solve real problems')"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            rows={3}
            style={{ width: '100%', padding: 12, borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', marginBottom: 12 }}
          />
          <button className="btn primary" onClick={savePurpose}>💾 Save My Purpose</button>
          {purpose && <div style={{ marginTop: 10, padding: 12, background: 'rgba(6,214,160,0.1)', borderRadius: 8, borderLeft: '3px solid var(--success)' }}>Your purpose: "{purpose}"</div>}
        </div>

        {/* One-Concept-a-Day Focus */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontWeight: 800 }}>📖 One Concept Today</span>
            <span className="pill">Small wins daily</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center' }}>
            <input
              placeholder="What's the ONE concept you'll master today? (e.g., 'Understand how loops work')"
              value={todayFocus}
              onChange={(e) => setTodayFocus(e.target.value)}
              style={{ padding: 12, borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
            />
            <button className="btn primary" onClick={saveTodayFocus}>Set Focus</button>
          </div>
          {todayFocus && (
            <div style={{ marginTop: 12, padding: 16, background: 'rgba(162,244,249,0.1)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>Today's Focus:</strong> {todayFocus}
              </div>
              <button className="btn ghost" onClick={() => { setTodayFocus(''); localStorage.removeItem('todayFocus'); }}>✅ Done!</button>
            </div>
          )}
        </div>

        {/* Daily Routine Tracker */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontWeight: 800 }}>⏰ Daily Routine Tracker</span>
            <span className="pill">This week: {weeklyStudyTime} mins</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 12 }}>
            <button className="btn ghost" style={{ padding: '16px', height: 'auto', flexDirection: 'column' }} onClick={() => logStudySession(30)}>
              <span style={{ fontSize: 24 }}>📚</span>
              <span>30 min study</span>
            </button>
            <button className="btn ghost" style={{ padding: '16px', height: 'auto', flexDirection: 'column' }} onClick={() => logStudySession(60)}>
              <span style={{ fontSize: 24 }}>📖</span>
              <span>1 hour study</span>
            </button>
            <button className="btn ghost" style={{ padding: '16px', height: 'auto', flexDirection: 'column' }} onClick={() => logStudySession(90)}>
              <span style={{ fontSize: 24 }}>🎯</span>
              <span>90 min focus</span>
            </button>
            <button className="btn ghost" style={{ padding: '16px', height: 'auto', flexDirection: 'column' }} onClick={() => logStudySession(120)}>
              <span style={{ fontSize: 24 }}>🏆</span>
              <span>2 hour deep</span>
            </button>
          </div>
          <div style={{ marginTop: 12, color: 'var(--muted)', fontSize: 13 }}>
            💡 Tip: Keep your phone in another room during study sessions for better focus.
          </div>
        </div>

        {/* Financial Status & Alerts */}
        <div className="card" style={{ background: 'linear-gradient(135deg, rgba(255,107,107,0.05), rgba(17,24,39,0.9))' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontWeight: 800 }}>💰 Financial Status & Support</span>
            <span className="pill" style={{ background: 'rgba(6,214,160,0.15)', color: 'var(--success)' }}>Fees: Paid</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12 }}>
            <div className="card" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div style={{ fontWeight: 700 }}>Semester Fees</div>
              <div style={{ fontSize: 22, color: 'var(--success)', marginTop: 4 }}>₹45,000 / ₹50,000</div>
              <small style={{ color: 'var(--muted)' }}>Due: March 15, 2025</small>
            </div>
            <div className="card" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div style={{ fontWeight: 700 }}>Scholarship Status</div>
              <div style={{ color: 'var(--accent)', marginTop: 4 }}>Merit-based: Eligible</div>
              <small style={{ color: 'var(--muted)' }}>Apply by Feb 28</small>
            </div>
            <div className="card" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div style={{ fontWeight: 700 }}>Emergency Fund</div>
              <div style={{ color: '#FFD166', marginTop: 4 }}>Available on request</div>
              <button className="btn ghost" style={{ marginTop: 8, fontSize: 12 }}>Learn more</button>
            </div>
          </div>
        </div>

        {/* Emergency Support Contacts */}
        <div className="card" style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontWeight: 800 }}>🚨 Emergency Support</span>
            <span className="pill" style={{ background: 'rgba(255,107,107,0.2)', color: '#FF6B6B' }}>24/7 Available</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 12 }}>
            <div className="card" style={{ background: 'rgba(255,255,255,0.04)', textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>📞</div>
              <div style={{ fontWeight: 700 }}>Campus Helpline</div>
              <div style={{ color: 'var(--accent)' }}>1800-XXX-XXXX</div>
            </div>
            <div className="card" style={{ background: 'rgba(255,255,255,0.04)', textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>💬</div>
              <div style={{ fontWeight: 700 }}>Mental Health</div>
              <div style={{ color: 'var(--accent)' }}>iCall: 9152987821</div>
            </div>
            <div className="card" style={{ background: 'rgba(255,255,255,0.04)', textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>👨‍🏫</div>
              <div style={{ fontWeight: 700 }}>Academic Dean</div>
              <div style={{ color: 'var(--accent)' }}>dean@college.edu</div>
            </div>
            <div className="card" style={{ background: 'rgba(255,255,255,0.04)', textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>🏥</div>
              <div style={{ fontWeight: 700 }}>Health Center</div>
              <div style={{ color: 'var(--accent)' }}>Ext: 1234</div>
            </div>
          </div>
        </div>

        {/* Pause Mode Toggle */}
        <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 800 }}>⏸️ Pause Mode</div>
            <small style={{ color: 'var(--muted)' }}>Taking a break? Enable pause mode to mute notifications and adjust expectations. It's okay to rest.</small>
          </div>
          <button
            className={`btn ${pauseMode ? 'primary' : 'ghost'}`}
            onClick={togglePauseMode}
            style={{ minWidth: 120 }}
          >
            {pauseMode ? '▶️ Resume' : '⏸️ Pause'}
          </button>
        </div>

        {/* Universal Dropout Reasons */}
        <div className="card" style={{ background: 'linear-gradient(135deg, rgba(162,244,249,0.08), rgba(17,24,39,0.9))', display: 'grid', gap: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 800 }}>Why students drop out</div>
            <span className="pill">Universal reasons</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 8 }}>
            {["No clarity or purpose", "Academic pressure & fear", "Financial strain", "Mental health issues", "Poor learning environment", "Family/social pressure", "Daily distractions"].map((reason) => (
              <div key={reason} className="card" style={{ background: 'rgba(255,107,107,0.06)', border: '1px solid rgba(255,107,107,0.15)', fontSize: '13px' }}>{reason}</div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
            <div style={{ fontWeight: 800 }}>How to stay enrolled</div>
            <span className="pill">Practical steps</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 10 }}>
            {["Write your one-sentence purpose", "Accept struggle as normal—stay longer", "Fix basics one concept at a time", "Ask for help early—mentor, peer, counselor", "Keep a simple daily routine (1–2h, phone away)", "Protect sleep and meals; mind first, marks next", "If you pause, keep learning something small"].map((tip) => (
              <div key={tip} className="card" style={{ background: 'rgba(6,214,160,0.06)', border: '1px solid rgba(6,214,160,0.15)', fontSize: '13px' }}>{tip}</div>
            ))}
          </div>
        </div>

        <div className="card" style={{ display: 'grid', gap: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 800 }}>Explore interests & build a roadmap</span>
            <button className="btn ghost" onClick={() => navigate('/counseling')}>Open counseling</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 10 }}>
            <div className="card" style={{ background: 'rgba(255,255,255,0.04)' }}>Pick an interest area → see skills → get a stepwise plan.</div>
            <div className="card" style={{ background: 'rgba(255,255,255,0.04)' }}>Track weekly progress; adjust when life events happen.</div>
            <div className="card" style={{ background: 'rgba(255,255,255,0.04)' }}>Blend academics + career goals so effort always feels purposeful.</div>
          </div>
        </div>

        <div className="card">
          <div className="section-title">
            <span>📊 Risk Analysis</span>
            <span className="chip" style={{ background: `${badgeColor}22`, color: badgeColor }}>Overall: {data.risk.level} Risk</span>
          </div>

          {/* Main Risk Score + Engagement Score Side by Side */}
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div className="card" style={{ background: 'linear-gradient(145deg, rgba(162,244,249,0.08), rgba(17,24,39,0.9))', textAlign: 'center' }}>
              <Ring value={data.risk.score / 100} label="Dropout Risk Score" color={badgeColor} />
            </div>
            <div className="card" style={{ background: 'linear-gradient(145deg, rgba(6,214,160,0.08), rgba(17,24,39,0.9))', textAlign: 'center' }}>
              <Ring value={(data.engagement?.assignmentSubmission || 78) / 100} label="Engagement Score" color="var(--success)" />
            </div>
          </div>

          {/* LMS & Task Completion Metrics */}
          <div style={{ fontWeight: 700, marginBottom: 12 }}>📝 LMS Activity & Task Completion</div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 10, marginBottom: 16 }}>
            <div className="card" style={{ background: 'rgba(162,244,249,0.06)', textAlign: 'center', padding: 12 }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent)' }}>{data.engagement?.assignmentSubmission || 78}%</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Tasks Completed</div>
            </div>
            <div className="card" style={{ background: 'rgba(6,214,160,0.06)', textAlign: 'center', padding: 12 }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--success)' }}>{data.engagement?.lmsLogins || 42}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>LMS Logins (month)</div>
            </div>
            <div className="card" style={{ background: 'rgba(255,209,102,0.06)', textAlign: 'center', padding: 12 }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#FFD166' }}>{data.engagement?.resourcesAccessed || 23}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Resources Accessed</div>
            </div>
            <div className="card" style={{ background: 'rgba(255,107,107,0.06)', textAlign: 'center', padding: 12 }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: data.engagement?.averageResponseTime <= 2 ? 'var(--success)' : 'var(--danger)' }}>{data.engagement?.averageResponseTime || 2.3}d</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Avg Submit Time</div>
            </div>
          </div>

          {/* Weekly Activity Chart */}
          <div style={{ fontWeight: 700, marginBottom: 12 }}>📅 Weekly LMS Activity</div>
          <div className="card" style={{ background: 'rgba(255,255,255,0.02)', padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: 80 }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                const activity = (data.engagement?.weeklyActivity || [12, 8, 15, 10, 6, 4, 14])[i];
                const height = Math.max(10, activity * 4);
                return (
                  <div key={day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }}>
                    <div style={{
                      width: '60%',
                      height: `${height}px`,
                      background: activity >= 10 ? 'var(--success)' : activity >= 6 ? '#FFD166' : 'var(--danger)',
                      borderRadius: 4
                    }} />
                    <small style={{ color: 'var(--muted)', fontSize: 11 }}>{day}</small>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Risk Trend + Alerts */}
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, color: 'var(--muted)' }}>
                <span>7-Day Risk Trend</span>
                <span>Last active: {data.engagement?.lastActive || '2h ago'}</span>
              </div>
              <RiskTrendChart data={data.risk.trend} color={badgeColor} />
            </div>
            <div className="card" style={{ background: 'rgba(255,107,107,0.05)' }}>
              <div style={{ fontWeight: 700, marginBottom: 10 }}>⚠️ Risk Alerts</div>
              <div style={{ display: 'grid', gap: 8 }}>
                {data.risk.factors.map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'rgba(255,107,107,0.1)', borderRadius: 8, fontSize: 13 }}>
                    <span style={{ color: 'var(--danger)' }}>●</span>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="section-title">
              <span>Academic Performance</span>
            </div>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr 0.9fr', gap: 12 }}>
              <div className="card" style={{ display: 'grid', gap: 10 }}>
                {data.academics.subjects.map((s) => (
                  <div key={s.subject} className="card" style={{ background: 'rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{s.subject}</div>
                      <small style={{ color: 'var(--muted)' }}>Subject score</small>
                    </div>
                    <span style={{ fontSize: 22, color: 'var(--accent)' }}>{s.score}</span>
                  </div>
                ))}
              </div>
              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>Score Comparison</span>
                  <span style={{ color: 'var(--muted)' }}>Avg vs target</span>
                </div>
                {data.academics.scoreComparison.map((row) => (
                  <div key={row.label} style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                      <span>{row.label}</span>
                      <span>{row.value}%</span>
                    </div>
                    <div className="progress" style={{ height: 10 }}><span style={{ width: `${row.value}%`, background: 'var(--accent)' }} /></div>
                    <div className="progress" style={{ height: 6, marginTop: 6, background: 'rgba(255,255,255,0.04)' }}><span style={{ width: `${row.target}%`, background: 'rgba(255,209,102,0.8)' }} /></div>
                  </div>
                ))}
              </div>
              <div className="card">
                <table>
                  <thead><tr><th>Test</th><th>Score</th><th>Status</th></tr></thead>
                  <tbody>
                    {data.academics.tests.map((t) => (
                      <tr key={t.test}>
                        <td>{t.test}</td>
                        <td>{t.score}</td>
                        <td style={{ color: t.status === 'On track' ? 'var(--success)' : 'var(--accent2)' }}>{t.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Ring value={data.academics.progress} label="Overall performance" color="var(--accent)" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="section-title"><span>Attendance</span></div>
            <div className="grid" style={{ gridTemplateColumns: '1.1fr 0.9fr 1fr', gap: 12 }}>
              <div className="card" style={{ padding: 12 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 6 }}>
                  {data.attendance.days.map(({ day, status }) => (
                    <div key={day} style={{ padding: '10px 0', textAlign: 'center', borderRadius: 8, background: status === 'present' ? 'rgba(6,214,160,0.15)' : status === 'late' ? 'rgba(255,209,102,0.2)' : 'rgba(255,107,107,0.18)', fontSize: 13 }}>{day}
                    </div>
                  ))}
                </div>
              </div>
              <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <Ring value={data.attendance.percentage / 100} label="Attendance" color="var(--success)" />
                <div style={{ display: 'flex', gap: 10 }}>
                  <span className="chip" style={{ background: 'rgba(255,107,107,0.15)', color: 'var(--danger)' }}>Absent: {data.attendance.absent}</span>
                  <span className="chip" style={{ background: 'rgba(255,209,102,0.15)', color: 'var(--accent2)' }}>Late: {data.attendance.late}</span>
                </div>
              </div>
              <div className="card" style={{ display: 'grid', gap: 10 }}>
                {[{ label: 'Morning check-ins', value: 'On time 92%' }, { label: 'Lecture presence', value: 'Attended 88%' }, { label: 'Lab compliance', value: 'Late 2x this week' }].map((item) => (
                  <div key={item.label} className="card" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <div style={{ fontWeight: 700 }}>{item.label}</div>
                    <small style={{ color: 'var(--muted)' }}>{item.value}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="section-title"><span>Well-Being</span></div>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              <div className="card">
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Mood</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['😀', '🙂', '😐', '😟', '😫'].map((mood) => (
                    <button key={mood} className="btn ghost" style={{ fontSize: 20 }}>{mood}</button>
                  ))}
                </div>
              </div>
              <div className="card">
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Stress meter</div>
                <div className="progress" style={{ height: 14 }}><span style={{ width: `${data.wellbeing.stress}%`, background: 'linear-gradient(90deg,#06D6A0,#FF6B6B)' }} /></div>
                <small style={{ color: 'var(--muted)' }}>Self-reported stress today</small>
              </div>
              <div className="card">
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Burnout self-check</div>
                <form className="grid" style={{ gap: 8 }}>
                  <input placeholder="Energy level (1-10)" />
                  <textarea placeholder="Biggest stressor" rows={3}></textarea>
                  <button className="btn primary" type="button">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

