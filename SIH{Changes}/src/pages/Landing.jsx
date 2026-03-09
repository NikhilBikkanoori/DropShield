import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OPTION_MAP = {
  school: 'http://localhost:9000/',
  universal: 'http://localhost:3000/',
  arts: 'http://localhost:3005/',
  engi: 'http://localhost:3001/',
  mentor: '/mentor',
  other: '/other',
};

export default function Landing() {
  const navigate = useNavigate();
  const [choice, setChoice] = useState('');
  const [error, setError] = useState('');

  const options = useMemo(
    () => [
      { value: 'school', label: 'School' },
      { value: 'universal', label: 'Universal' },
      { value: 'arts', label: 'Arts' },
      { value: 'engi', label: 'Engineering Institute' },
      { value: 'mentor', label: 'Mentor Portal (demo)' },
      { value: 'other', label: 'Other Education Org' },
    ],
    []
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!choice) {
      setError('Choose an organization to continue.');
      return;
    }
    setError('');
    const target = OPTION_MAP[choice];
    // External link for engineering goes via full page navigation
    if (target.startsWith('http')) {
      window.location.href = target;
      return;
    }
    navigate(target);
  };

  return (
    <div className="panel">
      <div className="badge">AI Guidance · Dropout Prevention</div>
      <h1 className="title">AI Drop Out Prediction And Counseling System</h1>
      <p className="muted">
        Choose your organization type to launch the tailored dropout prediction and counseling workspace. Each path routes you to the
        experience designed for your context.
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <label className="label" htmlFor="org">
          Organization type
        </label>
        <select
          id="org"
          name="org"
          value={choice}
          onChange={(e) => setChoice(e.target.value)}
          className="input select"
          required
        >
          <option value="" hidden>
            Select your organization
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <button type="submit" className="btn primary">
          Submit
        </button>
        <div className="hint">You will be redirected to the relevant flow after selection.</div>
        <div className="error-text" role="alert">
          {error}
        </div>
      </form>

      <div className="cards-grid">
        <div className="mini-card">
          <div className="mini-title">School</div>
          <div className="mini-body">Student rosters, attendance, and counseling notes tailored for K-12.</div>
        </div>
        <div className="mini-card">
          <div className="mini-title">Universal</div>
          <div className="mini-body">Dropout prediction for any education organization or institution.</div>
        </div>
        <div className="mini-card">
          <div className="mini-title">Arts</div>
          <div className="mini-body">Specialized dropout tracking for arts and humanities programs.</div>
        </div>
        <div className="mini-card">
          <div className="mini-title">Engineering</div>
          <div className="mini-body">Plug in the mentor portal for program analytics and submissions.</div>
        </div>
        <div className="mini-card">
          <div className="mini-title">Other orgs</div>
          <div className="mini-body">Extend to colleges, skill academies, or partner institutions.</div>
        </div>
      </div>
    </div>
  );
}
