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

const riskTone = { low: palette.success, medium: palette.warn, high: palette.danger };

const fallback = {
  roster: [
    { name: 'Aarav Mehta', program: 'B.Tech CSE', risk: 'medium', tags: ['Attendance','CGPA','Sleep'], gpa: [7.9,7.6,7.4,7.2,7.1,7.0,6.9], attendance:[92,89,85,82,80,78,76], actions:[{label:'Peer study',status:'Pending'},{label:'Sleep module',status:'In-progress'},{label:'Attendance tracker',status:'Pending'}], notes:['Struggled with DBMS midterm','Late to 3 classes last week','Stress about internships'] },
    { name: 'Meera Kulkarni', program: 'B.Sc. Psychology', risk: 'high', tags: ['Wellbeing','Assignments'], gpa: [8.1,8.0,7.9,7.7,7.5,7.3,7.2], attendance:[95,94,93,90,88,85,82], actions:[{label:'Counselling referral',status:'In-progress'},{label:'Assignment planner',status:'Done'},{label:'Sleep coaching',status:'Pending'}], notes:['Anxiety before presentations','Missed 2 assignment deadlines','Breathing exercises help'] },
    { name: 'Zara Khan', program: 'BBA', risk: 'low', tags: ['Attendance'], gpa: [8.4,8.5,8.5,8.4,8.3,8.3,8.2], attendance:[91,90,90,89,88,88,87], actions:[{label:'Leadership workshop',status:'Pending'},{label:'Attendance nudge',status:'Done'}], notes:['Interested in marketing minor','Misses morning classes','Open to peer accountability'] }
  ],
  counters:{monitoring:12,signals:{attendance:3,assignments:2,wellbeing:1}},
  cadence:['Intro & rapport','Assessment','Action plan','Closure']
};

const Line = ({ data, color }) => {
  const maxVal = Math.max(...data) + 5;
  const points = data.map((v,i)=>`${(i/(data.length-1))*100},${120 - (v/maxVal)*100}`).join(' ');
  return (
    <svg height="120" width="100%">
      <polyline fill="none" stroke={color} strokeWidth="3" points={points} />
    </svg>
  );
};

const MentorDashboard = () => {
  const [data, setData] = useState(fallback);
  const [selected, setSelected] = useState(0);
  const [stage, setStage] = useState(0);
  const [notes, setNotes] = useState({ intro:'', assessment:'', action:'', closure:'' });
  const student = data.roster[selected];

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/dashboard/mentor/demo');
        setData((prev)=>({...prev,...res.data}));
      } catch (e) {
        // fallback remains
      }
    };
    load();
  }, []);

  useEffect(() => {
    setStage(0);
    setNotes({ intro:'', assessment:'', action:'', closure:'' });
  }, [selected]);

  const stageKey = useMemo(()=>['intro','assessment','action','closure'][stage], [stage]);

  return (
    <div className="shell">
      <style>{styles}</style>
      <div style={{maxWidth:1280,margin:'0 auto',padding:'18px'}} className="grid stack" >
        <div className="card" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <div style={{fontSize:22,fontWeight:800}}>Mentor Command</div>
            <div style={{color:'var(--muted)'}}>Intervene early. Track academics + wellbeing.</div>
          </div>
          <div style={{display:'flex',gap:10}}>
            <span className="pill">{data.counters.monitoring} students monitored</span>
            <button className="btn ghost">Sync SIS</button>
          </div>
        </div>

        <div className="card" style={{display:'grid',gap:12}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <span style={{fontWeight:700}}>Universal dropout reasons</span>
            <span className="pill">Awareness</span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:8}}>
            {["No clarity/purpose","Academic overload","Financial problems","Mental health","Poor teaching","Family pressure","Daily distractions"].map((r)=> (
              <div key={r} className="card" style={{background:'rgba(255,107,107,0.06)',border:'1px solid rgba(255,107,107,0.12)',fontSize:'13px'}}>{r}</div>
            ))}
          </div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:6}}>
            <span style={{fontWeight:700}}>Coaching responses</span>
            <span className="pill">Act early</span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:8}}>
            {["Help them define a one-line why","Sequence basics before advanced","Flag fees/transport issues early","Watch for stress, loneliness, burnout","Co-create flexible study plans","Use varied methods and micro-wins","Design simple phone-off routines","Normalize struggle, celebrate small wins","Route to counseling for interest/roadmap"].map((t)=> (
              <div key={t} className="card" style={{background:'rgba(6,214,160,0.06)',border:'1px solid rgba(6,214,160,0.12)',fontSize:'13px'}}>{t}</div>
            ))}
          </div>
        </div>

        <div className="grid" style={{gridTemplateColumns:'320px 1fr',gap:12}}>
          <div className="grid" style={{gap:12}}>
            <div className="card" style={{display:'grid',gap:8}}>
              <div style={{color:'var(--muted)',fontSize:14}}>At-risk students</div>
              <div className="grid" style={{gap:8}}>
                {data.roster.map((s,idx)=>(
                  <button key={s.name} onClick={()=>setSelected(idx)} style={{textAlign:'left',padding:10,borderRadius:12,border: idx===selected?`1px solid ${riskTone[s.risk]}`:'1px solid var(--border)',background: idx===selected?'rgba(162,244,249,0.08)':'rgba(255,255,255,0.03)',cursor:'pointer'}}>
                    <div style={{display:'flex',justifyContent:'space-between',fontWeight:700}}>
                      <span>{s.name}</span>
                      <span className="pill" style={{background:`${riskTone[s.risk]}22`,color:riskTone[s.risk],padding:'4px 8px'}}>{s.risk}</span>
                    </div>
                    <div style={{color:'var(--muted)',fontSize:13}}>{s.program}</div>
                    <div style={{display:'flex',gap:6,marginTop:6,flexWrap:'wrap'}}>
                      {s.tags.map((t)=>(<span key={t} className="chip" style={{background:'rgba(255,255,255,0.06)',fontSize:11}}>{t}</span>))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="card" style={{display:'grid',gap:6}}>
              <div style={{color:'var(--muted)',fontSize:14}}>Signals</div>
              <div style={{display:'grid',gap:6}}>
                <div style={{display:'flex',justifyContent:'space-between'}}><span>Attendance dips</span><span style={{color:palette.warn}}>{data.counters.signals.attendance}</span></div>
                <div style={{display:'flex',justifyContent:'space-between'}}><span>Assignment overdue</span><span style={{color:palette.danger}}>{data.counters.signals.assignments}</span></div>
                <div style={{display:'flex',justifyContent:'space-between'}}><span>Wellbeing flags</span><span style={{color:palette.success}}>{data.counters.signals.wellbeing}</span></div>
              </div>
            </div>
          </div>

          <div className="grid" style={{gap:12}}>
            <div className="card" style={{display:'grid',gap:12}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <div style={{fontSize:20,fontWeight:800}}>{student.name}</div>
                  <div style={{color:'var(--muted)'}}>{student.program}</div>
                </div>
                <div style={{display:'flex',gap:8}}>
                  <span className="pill" style={{background:`${riskTone[student.risk]}22`,color:riskTone[student.risk]}}>{student.risk} risk</span>
                  <button className="btn ghost">Profile</button>
                  <button className="btn primary">Nudge</button>
                </div>
              </div>

              <div className="grid" style={{gridTemplateColumns:'1fr 1fr',gap:10}}>
                <div className="card">
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                    <span style={{color:'var(--muted)'}}>GPA trend</span>
                    <span style={{color:'var(--muted)'}}>7 weeks</span>
                  </div>
                  <Line data={student.gpa} color={palette.accent} />
                </div>
                <div className="card">
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                    <span style={{color:'var(--muted)'}}>Attendance</span>
                    <span style={{color:'var(--muted)'}}>7 weeks</span>
                  </div>
                  <Line data={student.attendance} color={palette.warn} />
                </div>
              </div>

              <div className="card" style={{display:'grid',gap:10}}>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <span>Interventions</span>
                  <button className="btn ghost" style={{padding:'6px 10px'}}>Assign</button>
                </div>
                <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:8}}>
                  {student.actions.map((a)=>(
                    <div key={a.label} className="card" style={{background:'rgba(255,255,255,0.04)'}}>
                      <div style={{fontWeight:700}}>{a.label}</div>
                      <div style={{color:'var(--muted)',fontSize:13}}>{a.status}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card" style={{display:'grid',gap:10}}>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <span>Recent observations</span>
                  <button className="btn ghost" style={{padding:'6px 10px'}}>Add note</button>
                </div>
                <div className="grid" style={{gap:8}}>
                  {student.notes.map((n,i)=>(
                    <div key={i} className="card" style={{background:'rgba(255,255,255,0.04)'}}>{n}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card" style={{display:'grid',gap:12}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span>Meeting assistant</span>
                <div style={{display:'flex',gap:8}}>
                  <button className="btn ghost" onClick={()=>setStage(0)}>Restart</button>
                  <button className="btn primary" onClick={()=>setStage((s)=>Math.min(s+1, data.cadence.length-1))}>{stage===data.cadence.length-1?'Finish':'Next stage'}</button>
                </div>
              </div>
              <div className="grid" style={{gridTemplateColumns:`repeat(${data.cadence.length},1fr)`,gap:8}}>
                {data.cadence.map((c,idx)=>(
                  <div key={c} className="card" style={{background: idx===stage?'rgba(162,244,249,0.15)':'rgba(255,255,255,0.03)',border: idx===stage?`1px solid ${palette.accent}`:'1px solid var(--border)',textAlign:'center',fontSize:13}}>{c}</div>
                ))}
              </div>
              <div>
                <label style={{color:'var(--muted)',fontSize:13}}>Notes for {data.cadence[stage]}</label>
                <textarea value={notes[stageKey]} onChange={(e)=>setNotes({...notes,[stageKey]:e.target.value})} rows={4} style={{width:'100%',marginTop:6,background:'#0b1222',border:'1px solid var(--border)',color:'#fff',borderRadius:12,padding:10}} placeholder="Add key talking points..." />
              </div>
              <div style={{display:'flex',justifyContent:'space-between',color:'var(--muted)',fontSize:13}}>
                <span>Stage {stage+1} of {data.cadence.length}</span>
                <span>Autosaves locally</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
