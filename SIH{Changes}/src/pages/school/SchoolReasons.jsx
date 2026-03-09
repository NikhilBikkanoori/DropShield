import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const REASONS = [
  {
    id: 'financial',
    title: 'Financial Constraints',
    detail: 'Fees pending, books, transport, or housing challenges.',
    actions: ['Set up fee relief', 'Schedule finance counseling', 'Share scholarship links'],
  },
  {
    id: 'attendance',
    title: 'Low Attendance',
    detail: 'Absences due to health, commute, or motivation issues.',
    actions: ['Call guardian', 'Create attendance plan', 'Track weekly check-ins'],
  },
  {
    id: 'academic',
    title: 'Academic Difficulty',
    detail: 'Struggling with concepts, assignments, or exam prep.',
    actions: ['Assign peer tutor', 'Plan remedial sessions', 'Share study kits'],
  },
  {
    id: 'wellbeing',
    title: 'Wellbeing / Social',
    detail: 'Stress, bullying, or mental health concerns impacting school.',
    actions: ['Escalate to counselor', 'Set safe-space check-ins', 'Monitor mood weekly'],
  },
];

export default function SchoolReasons() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected) return;
    navigate('/school/mentor?reason=' + selected);
  };

  return (
    <div>
      <div className="cards-grid">
        {REASONS.map((r) => (
          <button
            key={r.id}
            type="button"
            className={`mini-card selectable ${selected === r.id ? 'is-selected' : ''}`}
            onClick={() => setSelected(r.id)}
          >
            <div className="mini-title">{r.title}</div>
            <div className="mini-body">{r.detail}</div>
            <div className="mini-body" style={{ marginTop: 8, fontSize: 13 }}>
              Suggested steps: {r.actions.join(' · ')}
            </div>
          </button>
        ))}
      </div>

      <div style={{ height: 16 }} />
      <form className="form" onSubmit={handleSubmit}>
        <div className="hint">Select a primary reason to notify a mentor.</div>
        <button type="submit" className="btn primary" disabled={!selected}>
          Send to Mentor
        </button>
      </form>
    </div>
  );
}
