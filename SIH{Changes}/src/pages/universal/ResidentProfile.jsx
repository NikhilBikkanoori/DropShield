import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUniversalData, getFactorBadges } from './UniversalDataContext.jsx';

const FACTOR_FIELDS = [
  { key: 'academicIssue', label: 'Academic performance decline', group: 'Academic' },
  { key: 'financialIssue', label: 'Financial stress / allowance', group: 'Financial' },
  { key: 'familyIssue', label: 'Family / social conflict', group: 'Family / Social' },
  { key: 'healthIssue', label: 'Physical / mental health', group: 'Health' },
  { key: 'bullyingIssue', label: 'Hierarchy abuse / bullying', group: 'Work environment' },
  { key: 'motivationIssue', label: 'Loss of interest / burnout', group: 'Motivation' },
];

const RESPONSIBLES = ['Program Director', 'Counselor', 'Chief', 'HR'];
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

function SelfCheck({ resident, onChange }) {
  const { selfReport = {} } = resident;
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
      {slider('motivation', 'Motivation to continue (1-5)')}
      {slider('stress', 'Stress / burnout level (1-5)')}
      {slider('safety', 'Safe from harassment (1-5)')}
      {slider('support', 'Has mentor support (1-5)')}
    </div>
  );
}

function ParentInput({ resident, onChange }) {
  const { parentInput = {} } = resident;
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
      {select('feesRegular', 'Financial support adequate?', 'Allowance/stipend signal')}
      {select('choresLoad', 'Heavy personal/family duties?', 'Life stress load')}
      {select('healthIssue', 'Health concerns?', 'Physical or mental health flag')}
    </div>
  );
}

function Interventions({ resident, onAdd, onStatus }) {
  const [form, setForm] = useState({ factor: 'Academic', action: '', responsible: 'Program Director', status: 'Planned', nextFollowUp: '' });
  const interventions = resident.interventions || [];

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

export default function ResidentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { residents, updateFactors, updateNotes, updateSelfReport, updateParentInput, addIntervention, updateInterventionStatus } = useUniversalData();
  const resident = useMemo(() => residents.find((r) => r.id === id), [residents, id]);

  const [notesDraft, setNotesDraft] = useState(resident?.factors?.notes || '');

  if (!resident) {
    return (
      <div className="panel">
        <p className="muted">Resident not found.</p>
        <Link to="/universal" className="btn ghost">Back</Link>
      </div>
    );
  }

  const toggleFactor = (key) => updateFactors(id, { [key]: !resident.factors?.[key] });
  const saveNotes = () => updateNotes(id, notesDraft);

  return (
    <div className="panel">
      <div className="badge">Universal · Resident Profile</div>
      <div className="stack" style={{ gap: 6 }}>
        <h1 className="title">{resident.name}</h1>
        <div className="muted" style={{ margin: 0 }}>{resident.program} | {resident.year}</div>
        <div className="chip-row">
          <span className="chip soft">Exam {resident.examScore}%</span>
          <span className="chip soft">Burnout {resident.burnoutScore.toFixed(1)}</span>
          <span className="chip soft">Attend {resident.attendanceRate}%</span>
          <span className={`pill ${resident.riskBand === 'High' ? 'risk-high' : resident.riskBand === 'Medium' ? 'risk-med' : 'risk-low'}`}>
            {resident.riskBand} risk — {resident.riskScore}
          </span>
        </div>
      </div>

      <div className="stack" style={{ gap: 16, marginTop: 18 }}>
        <Section
          title="Root causes (advisor/chief)"
          action={<PillList factors={resident.factors} />}
        >
          <div className="grid-3">
            {FACTOR_FIELDS.map((f) => (
              <label key={f.key} className="check-card">
                <input type="checkbox" checked={!!resident.factors?.[f.key]} onChange={() => toggleFactor(f.key)} />
                <div>
                  <div className="strong">{f.label}</div>
                  <div className="muted" style={{ margin: 0, fontSize: 13 }}>{f.group}</div>
                </div>
              </label>
            ))}
          </div>
          <div className="stack" style={{ gap: 8, marginTop: 10 }}>
            <label className="stack" style={{ gap: 4 }}>
              <span className="muted" style={{ margin: 0 }}>Notes (resident conversation)</span>
              <textarea className="input" rows="3" value={notesDraft} onChange={(e) => setNotesDraft(e.target.value)} />
            </label>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button className="btn primary" onClick={saveNotes}>Save notes</button>
            </div>
          </div>
        </Section>

        <Section title="Self-reported wellbeing" action={null}>
          <SelfCheck resident={resident} onChange={(payload) => updateSelfReport(id, payload)} />
        </Section>

        <Section title="Support & context input" action={null}>
          <ParentInput resident={resident} onChange={(payload) => updateParentInput(id, payload)} />
        </Section>

        <Section title="Interventions & follow-up" action={null}>
          <Interventions
            resident={resident}
            onAdd={(it) => addIntervention(id, it)}
            onStatus={(intId, status) => updateInterventionStatus(id, intId, status)}
          />
        </Section>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/universal" className="btn ghost">Back to list</Link>
          <button className="btn primary" onClick={() => navigate('/mentor')}>
            Open Mentor Workspace
          </button>
        </div>
      </div>
    </div>
  );
}
