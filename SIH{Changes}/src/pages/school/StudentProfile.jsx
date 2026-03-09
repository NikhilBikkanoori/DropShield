import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSchoolData, getFactorBadges } from './SchoolDataContext.jsx';

const FACTOR_FIELDS = [
  { key: 'academicIssue', label: 'Academic difficulty', group: 'Academic' },
  { key: 'financialIssue', label: 'Financial stress / fees', group: 'Financial' },
  { key: 'familyIssue', label: 'Family / social conflict', group: 'Family / Social' },
  { key: 'healthIssue', label: 'Health / mental health', group: 'Health' },
  { key: 'bullyingIssue', label: 'Bullying / safety', group: 'School environment' },
  { key: 'motivationIssue', label: 'Low interest / no clarity', group: 'Motivation' },
];

const RESPONSIBLES = ['Mentor', 'Counselor', 'Admin', 'Teacher'];
const FACTOR_OPTIONS = ['Academic', 'Financial', 'Family', 'Health', 'Bullying', 'Motivation'];
const STATUS_OPTIONS = ['Planned', 'In Progress', 'Resolved', 'Dropped'];

function Section({ title, action, children }) {
  return (
    <div className="card-block">
      <div className="card-block__head">
        <div>
          <div className="mini-title" style={{ marginBottom: 4 }}>{title}</div>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function PillList({ factors }) {
  const labels = getFactorBadges(factors);
  if (!labels.length) return <span className="muted">None flagged</span>;
  return (
    <div className="chip-row">
      {labels.map((f) => (
        <span key={f} className="chip soft">{f}</span>
      ))}
    </div>
  );
}

function SelfCheck({ student, onChange }) {
  const { selfReport = {} } = student;
  const update = (key, val) => onChange({ [key]: Number(val) });
  const slider = (key, label) => (
    <label className="stack" style={{ gap: 4 }}>
      <span className="muted" style={{ margin: 0 }}>{label}</span>
      <input
        type="range"
        min="1"
        max="5"
        value={selfReport[key] || 3}
        onChange={(e) => update(key, e.target.value)}
      />
      <span className="muted" style={{ fontSize: 12 }}>Current: {selfReport[key] || 3}</span>
    </label>
  );
  return (
    <div className="grid-2">
      {slider('motivation', 'Interest in classes (1-5)')}
      {slider('stress', 'Stress / anxiety about school (1-5)')}
      {slider('safety', 'Feels safe at school (1-5)')}
      {slider('support', 'Has someone to ask for help (1-5)')}
    </div>
  );
}

function ParentInput({ student, onChange }) {
  const { parentInput = {} } = student;
  const select = (key, label, help) => (
    <label className="stack" style={{ gap: 4 }}>
      <span className="muted" style={{ margin: 0 }}>{label}</span>
      <select className="input select" value={parentInput[key] ?? ''} onChange={(e) => onChange({ [key]: Number(e.target.value) })}>
        <option value="" hidden>Select</option>
        <option value={0}>No</option>
        <option value={1}>Sometimes</option>
        <option value={2}>Yes</option>
      </select>
      {help && <span className="hint">{help}</span>}
    </label>
  );
  return (
    <div className="grid-3">
      {select('feesRegular', 'Can manage fees regularly?', 'Parent financial signal')}
      {select('choresLoad', 'Child does work/chores often?', 'Family/social load')}
      {select('healthIssue', 'Any health issues?', 'Health flag')}
    </div>
  );
}

function Interventions({ student, onAdd, onStatus }) {
  const [form, setForm] = useState({ factor: 'Academic', action: '', responsible: 'Mentor', status: 'Planned', nextFollowUp: '' });
  const interventions = student.interventions || [];

  const submit = (e) => {
    e.preventDefault();
    if (!form.action) return;
    onAdd({ ...form, id: `INT-${Date.now()}` });
    setForm({ factor: form.factor, action: '', responsible: form.responsible, status: 'Planned', nextFollowUp: '' });
  };

  return (
    <div className="stack" style={{ gap: 12 }}>
      <form className="grid-4" onSubmit={submit}>
        <label className="stack" style={{ gap: 4 }}>
          <span className="muted" style={{ margin: 0 }}>Factor</span>
          <select className="input select" value={form.factor} onChange={(e) => setForm({ ...form, factor: e.target.value })}>
            {FACTOR_OPTIONS.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </label>
        <label className="stack" style={{ gap: 4 }}>
          <span className="muted" style={{ margin: 0 }}>Action</span>
          <input className="input" value={form.action} onChange={(e) => setForm({ ...form, action: e.target.value })} placeholder="Plan action" />
        </label>
        <label className="stack" style={{ gap: 4 }}>
          <span className="muted" style={{ margin: 0 }}>Responsible</span>
          <select className="input select" value={form.responsible} onChange={(e) => setForm({ ...form, responsible: e.target.value })}>
            {RESPONSIBLES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </label>
        <label className="stack" style={{ gap: 4 }}>
          <span className="muted" style={{ margin: 0 }}>Follow-up date</span>
          <input className="input" type="date" value={form.nextFollowUp} onChange={(e) => setForm({ ...form, nextFollowUp: e.target.value })} />
        </label>
        <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn primary">Add Intervention</button>
        </div>
      </form>

      <div className="table-wrap">
        <table className="simple-table">
          <thead>
            <tr>
              <th>Factor</th>
              <th>Action Planned</th>
              <th>Responsible</th>
              <th>Status</th>
              <th>Follow-up</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {interventions.length === 0 && (
              <tr>
                <td colSpan="6" className="muted" style={{ textAlign: 'center' }}>No interventions yet.</td>
              </tr>
            )}
            {interventions.map((it) => (
              <tr key={it.id}>
                <td>{it.factor}</td>
                <td>{it.action}</td>
                <td>{it.responsible}</td>
                <td>
                  <select className="input select" value={it.status} onChange={(e) => onStatus(it.id, e.target.value)}>
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td>{it.nextFollowUp || '—'}</td>
                <td>
                  <span className={`pill ${it.status === 'Resolved' ? 'risk-low' : it.status === 'In Progress' ? 'risk-med' : 'risk-high'}`}>
                    {it.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { students, updateFactors, updateNotes, updateSelfReport, updateParentInput, addIntervention, updateInterventionStatus } = useSchoolData();
  const student = useMemo(() => students.find((s) => s.id === id), [students, id]);

  const [notesDraft, setNotesDraft] = useState(student?.factors?.notes || '');

  if (!student) {
    return (
      <div className="panel">
        <p className="muted">Student not found.</p>
        <Link to="/school" className="btn ghost">Back</Link>
      </div>
    );
  }

  const toggleFactor = (key) => updateFactors(id, { [key]: !student.factors?.[key] });
  const saveNotes = () => updateNotes(id, notesDraft);

  return (
    <div className="panel">
      <div className="badge">School · Student Profile</div>
      <div className="stack" style={{ gap: 6 }}>
        <h1 className="title">{student.name}</h1>
        <div className="muted" style={{ margin: 0 }}>ID: {student.id}</div>
        <div className="chip-row">
          <span className="chip soft">Attendance {student.attendance}%</span>
          <span className="chip soft">Avg Score {student.avgScore}%</span>
          <span className="chip soft">Fees ₹{(student.feesPending || 0).toLocaleString('en-IN')}</span>
          <span className={`pill ${student.riskBand === 'High' ? 'risk-high' : student.riskBand === 'Medium' ? 'risk-med' : 'risk-low'}`}>
            {student.riskBand} risk — {student.riskScore}
          </span>
        </div>
      </div>

      <div className="stack" style={{ gap: 16, marginTop: 18 }}>
        <Section
          title="Root causes (counselor/mentor)"
          action={<PillList factors={student.factors} />}
        >
          <div className="grid-3">
            {FACTOR_FIELDS.map((f) => (
              <label key={f.key} className="check-card">
                <input type="checkbox" checked={!!student.factors?.[f.key]} onChange={() => toggleFactor(f.key)} />
                <div>
                  <div className="strong">{f.label}</div>
                  <div className="muted" style={{ margin: 0, fontSize: 13 }}>{f.group}</div>
                </div>
              </label>
            ))}
          </div>
          <div className="stack" style={{ gap: 8, marginTop: 10 }}>
            <label className="stack" style={{ gap: 4 }}>
              <span className="muted" style={{ margin: 0 }}>Notes (student in their own words)</span>
              <textarea className="input" rows="3" value={notesDraft} onChange={(e) => setNotesDraft(e.target.value)} />
            </label>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button className="btn primary" onClick={saveNotes}>Save notes</button>
            </div>
          </div>
        </Section>

        <Section title="Student self-check" action={null}>
          <SelfCheck student={student} onChange={(payload) => updateSelfReport(id, payload)} />
        </Section>

        <Section title="Parent input" action={null}>
          <ParentInput student={student} onChange={(payload) => updateParentInput(id, payload)} />
        </Section>

        <Section title="Interventions & follow-up" action={null}>
          <Interventions
            student={student}
            onAdd={(it) => addIntervention(id, it)}
            onStatus={(intId, status) => updateInterventionStatus(id, intId, status)}
          />
        </Section>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/school" className="btn ghost">Back to list</Link>
          <button className="btn primary" onClick={() => navigate('/mentor')}>
            Open Mentor Workspace
          </button>
        </div>
      </div>
    </div>
  );
}
