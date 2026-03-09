import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const palette = { bg: '#0b1222', panel: '#0f172a', border: 'rgba(255,255,255,0.08)', accent: '#A2F4F9', warn: '#FFD166', danger: '#FF6B6B', success: '#06D6A0' };

const styles = `
  :root{--panel:${palette.panel};--border:${palette.border};--accent:${palette.accent};--warn:${palette.warn};--danger:${palette.danger};--success:${palette.success};--muted:#94a3b8;--radius:14px;}
  body{background:${palette.bg};color:#e5e7eb;}
  .shell{min-height:100vh;background:radial-gradient(circle at 10% 10%, rgba(162,244,249,0.08), transparent 22%), radial-gradient(circle at 80% 0%, rgba(255,209,102,0.07), transparent 25%), ${palette.bg};}
  .card{background:var(--panel);border:1px solid var(--border);border-radius:var(--radius);padding:14px;box-shadow:0 12px 40px rgba(0,0,0,0.25);} 
  .grid{display:grid;gap:12px;}
  .pill{padding:6px 10px;border-radius:999px;background:rgba(255,255,255,0.06);color:#fff;font-size:12px;}
  .btn{padding:10px 12px;border-radius:10px;border:none;font-weight:700;cursor:pointer;}
  .btn.ghost{background:rgba(255,255,255,0.08);color:#fff;}
  .btn.primary{background:var(--accent);color:${palette.bg};}
  .chip{padding:6px 10px;border-radius:10px;background:rgba(255,255,255,0.08);color:#fff;font-size:12px;display:inline-flex;align-items:center;gap:6px;}
  @media(max-width:1080px){.stack{grid-template-columns:1fr!important;}}
`;

const fallback = {
  student: { name: 'Your Child', grade: '7', attendance: 96, mentor: 'Ms. Priya' },
  attendance: Array.from({ length: 30 }, (_, i) => ({ day: i + 1, status: (i + 1) % 7 === 0 ? 'absent' : (i + 1) % 5 === 0 ? 'late' : 'present' })),
  assignments: [
    { subject: 'Math', task: 'Worksheet 12', due: 'Tomorrow', status: 'Pending' },
    { subject: 'Science', task: 'Chapter 3 summary', due: 'Fri', status: 'In progress' },
    { subject: 'English', task: 'Reading log', due: 'Mon', status: 'Done' }
  ],
  notifications: [
    { text: 'New assignment posted for Science', time: '1h ago' },
    { text: 'Mentor suggests reading support', time: '3h ago' },
    { text: 'Attendance is stable', time: '1d ago' }
  ],
  recommendations: ['Encourage 20 min reading nightly', 'Set a consistent bedtime routine', 'Check in on the science project'],
  bookings: [{ date: '2024-01-12', time: '14:00', topic: 'Science help', status: 'Completed' }],
  notes: [
    { date: '2024-02-01', note: 'Improved focus after breakfast.' },
    { date: '2024-02-05', note: 'Struggles with long reading assignments.' }
  ]
};

const ParentDashboard = () => {
  const [data, setData] = useState(fallback);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete math worksheet', done: false },
    { id: 2, text: 'Practice spelling words', done: true }
  ]);
  const [booking, setBooking] = useState({ date: '', time: '', topic: '' });
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/dashboard/parent/demo');
        setData((prev)=>({...prev,...res.data}));
      } catch (e) {
        // fallback remains
      }
    };
    load();
  }, []);

  const attendanceLegend = useMemo(()=>({ present:'rgba(6,214,160,0.18)', late:'rgba(255,209,102,0.22)', absent:'rgba(255,107,107,0.18)' }), []);

  const addTask = () => {
    if(!newTask.trim()) return;
    setTasks([...tasks,{id:Date.now(),text:newTask.trim(),done:false}]);
    setNewTask('');
  };

  const submitBooking = (e) => {
    e.preventDefault();
    if(!booking.date||!booking.time||!booking.topic) return;
    setData((prev)=>({...prev,bookings:[...(prev.bookings||[]),{...booking,status:'Upcoming'}]}));
    setBooking({date:'',time:'',topic:''});
  };

  return (
    <div className="shell">
      <style>{styles}</style>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'18px'}} className="grid stack">
        <div className="card" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <div style={{fontSize:22,fontWeight:800}}>Parent Dashboard</div>
            <div style={{color:'var(--muted)'}}>Stay in sync with learning, attendance, and mentor updates.</div>
          </div>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <span className="pill">Grade {data.student.grade}</span>
            <span className="pill">Mentor: {data.student.mentor}</span>
          </div>
        </div>

        <div className="card" style={{display:'flex',gap:10,flexWrap:'wrap'}}>
          {['overview','attendance','assignments','mentor'].map((tab)=>(
            <button key={tab} className="btn ghost" style={{background: activeTab===tab?'rgba(162,244,249,0.15)':'rgba(255,255,255,0.06)',border:`1px solid ${activeTab===tab?palette.accent:'transparent'}`}} onClick={()=>setActiveTab(tab)}>{tab}</button>
          ))}
        </div>

        <div className="card" style={{display:'grid',gap:12}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <span style={{fontWeight:700}}>Why children drop out</span>
            <span className="pill">Universal reasons</span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:8}}>
            {["No clear purpose","Academic pressure","Financial strain","Mental health","Poor teaching","Family/social pressure","Distractions"].map((r)=>(
              <div key={r} className="card" style={{background:'rgba(255,107,107,0.06)',border:'1px solid rgba(255,107,107,0.12)',fontSize:'13px'}}>{r}</div>
            ))}
          </div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:6}}>
            <span style={{fontWeight:700}}>How you can help</span>
            <span className="pill">Daily actions</span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:8}}>
            {["Clarify their why—freedom, stability, self-respect","Watch basics—one concept a day, not everything","Routine—1–2 hours, same time, phone away","Ask early—mentor, teacher, counselor before marks dip","Mental health—sleep, meals, safe conversations","Money strain—surface fees/transport issues quickly","Family duties—plan flexible study windows","If they pause—keep them learning something, however small"].map((tip)=>(
              <div key={tip} className="card" style={{background:'rgba(6,214,160,0.06)',border:'1px solid rgba(6,214,160,0.12)',fontSize:'13px'}}>{tip}</div>
            ))}
          </div>
        </div>

        {activeTab==='overview' && (
          <div className="grid stack" style={{gridTemplateColumns:'1.2fr 1fr',gap:12}}>
            <div className="grid" style={{gap:12}}>
              <div className="card" style={{display:'grid',gap:8}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span>Mentor updates</span>
                  <span className="pill">Latest</span>
                </div>
                {(data.notifications||[]).slice(0,3).map((n,idx)=>(
                  <div key={idx} className="card" style={{background:'rgba(255,255,255,0.04)'}}>
                    <div style={{fontWeight:700}}>{n.text}</div>
                    <small style={{color:'var(--muted)'}}>{n.time}</small>
                  </div>
                ))}
              </div>
              <div className="card">
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                  <span>Mentor recommendations</span>
                  <button className="btn ghost" style={{padding:'6px 10px'}}>Acknowledge all</button>
                </div>
                <div className="grid" style={{gap:8}}>
                  {data.recommendations.map((rec,idx)=>(
                    <div key={idx} className="card" style={{background:'rgba(255,255,255,0.04)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <span>{rec}</span>
                      <button className="btn primary" style={{padding:'6px 10px'}}>Done</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card">
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span>Home tasks</span>
                  <div style={{display:'flex',gap:8}}>
                    <input value={newTask} onChange={(e)=>setNewTask(e.target.value)} placeholder="Add a task" style={{background:'#0b1222',border:'1px solid var(--border)',color:'#fff',borderRadius:10,padding:'8px'}} />
                    <button className="btn primary" onClick={addTask}>Add</button>
                  </div>
                </div>
                <div className="grid" style={{gap:8}}>
                  {tasks.map((t)=>(
                    <label key={t.id} style={{display:'flex',gap:8,alignItems:'center',background:'rgba(255,255,255,0.04)',padding:8,borderRadius:10}}>
                      <input type="checkbox" checked={t.done} onChange={()=>setTasks(tasks.map(x=>x.id===t.id?{...x,done:!x.done}:x))} />
                      <span style={{textDecoration:t.done?'line-through':'none'}}>{t.text}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid" style={{gap:12}}>
              <div className="card">
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <span>Attendance snapshot</span>
                  <span className="pill">{data.student.attendance}%</span>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:6,marginTop:10}}>
                  {data.attendance.map((d)=>(
                    <div key={d.day} style={{padding:'10px 0',textAlign:'center',borderRadius:8,background:attendanceLegend[d.status]}}>{d.day}</div>
                  ))}
                </div>
              </div>
              <div className="card">
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                  <span>Learning notes</span>
                  <button className="btn ghost" style={{padding:'6px 10px'}}>Add</button>
                </div>
                <div className="grid" style={{gap:8}}>
                  {data.notes.map((n,idx)=>(
                    <div key={idx} className="card" style={{background:'rgba(255,255,255,0.04)'}}>
                      <div>{n.note}</div>
                      <small style={{color:'var(--muted)'}}>{n.date}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab==='attendance' && (
          <div className="card">
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <span>Attendance</span>
              <div style={{display:'flex',gap:8,color:'var(--muted)',fontSize:13}}>
                <span className="chip" style={{background:attendanceLegend.present}}>Present</span>
                <span className="chip" style={{background:attendanceLegend.late}}>Late</span>
                <span className="chip" style={{background:attendanceLegend.absent}}>Absent</span>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:6,marginTop:10}}>
              {data.attendance.map((d)=>(
                <div key={d.day} style={{padding:'12px 0',textAlign:'center',borderRadius:8,background:attendanceLegend[d.status]}}>{d.day}</div>
              ))}
            </div>
          </div>
        )}

        {activeTab==='assignments' && (
          <div className="card">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span>Assignments</span>
              <button className="btn ghost" style={{padding:'6px 10px'}}>View all</button>
            </div>
            <table style={{width:'100%',marginTop:10,borderCollapse:'collapse',color:'#e5e7eb'}}>
              <thead>
                <tr><th style={{textAlign:'left',padding:8}}>Subject</th><th style={{textAlign:'left',padding:8}}>Task</th><th style={{textAlign:'left',padding:8}}>Due</th><th style={{textAlign:'left',padding:8}}>Status</th></tr>
              </thead>
              <tbody>
                {data.assignments.map((a,idx)=>(
                  <tr key={idx} style={{borderTop:'1px solid var(--border)'}}>
                    <td style={{padding:8}}>{a.subject}</td>
                    <td style={{padding:8}}>{a.task}</td>
                    <td style={{padding:8}}>{a.due}</td>
                    <td style={{padding:8}}><span className="chip" style={{background:a.status==='Done'?'rgba(6,214,160,0.2)':a.status==='Pending'?'rgba(255,209,102,0.2)':'rgba(162,244,249,0.2)'}}>{a.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab==='mentor' && (
          <div className="grid stack" style={{gridTemplateColumns:'1fr 1fr',gap:12}}>
            <div className="card">
              <div style={{fontWeight:700,marginBottom:8}}>Book time with mentor</div>
              <form className="grid" style={{gap:10}} onSubmit={submitBooking}>
                <input type="date" value={booking.date} onChange={(e)=>setBooking({...booking,date:e.target.value})} style={{background:'#0b1222',border:'1px solid var(--border)',color:'#fff',borderRadius:10,padding:10}} />
                <input type="time" value={booking.time} onChange={(e)=>setBooking({...booking,time:e.target.value})} style={{background:'#0b1222',border:'1px solid var(--border)',color:'#fff',borderRadius:10,padding:10}} />
                <input type="text" placeholder="Topic" value={booking.topic} onChange={(e)=>setBooking({...booking,topic:e.target.value})} style={{background:'#0b1222',border:'1px solid var(--border)',color:'#fff',borderRadius:10,padding:10}} />
                <button className="btn primary" type="submit">Schedule</button>
              </form>
            </div>
            <div className="card">
              <div style={{fontWeight:700,marginBottom:8}}>Recent bookings</div>
              <div className="grid" style={{gap:8}}>
                {data.bookings.map((b,idx)=>(
                  <div key={idx} className="card" style={{background:'rgba(255,255,255,0.04)',display:'flex',justifyContent:'space-between'}}>
                    <div>
                      <div style={{fontWeight:700}}>{b.topic || 'Topic TBD'}</div>
                      <small style={{color:'var(--muted)'}}>{b.date} at {b.time}</small>
                    </div>
                    <span className="pill" style={{background:b.status==='Completed'?'rgba(6,214,160,0.2)':'rgba(255,209,102,0.2)',color:b.status==='Completed'?palette.success:palette.warn}}>{b.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentDashboard;
