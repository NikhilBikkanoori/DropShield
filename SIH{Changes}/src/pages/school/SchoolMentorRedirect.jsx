import { Link, useLocation, useNavigate } from 'react-router-dom';

function getReasonLabel(reason) {
  switch (reason) {
    case 'financial':
      return 'Financial Constraints';
    case 'attendance':
      return 'Low Attendance';
    case 'academic':
      return 'Academic Difficulty';
    case 'wellbeing':
      return 'Wellbeing / Social';
    default:
      return 'General Support';
  }
}

export default function SchoolMentorRedirect() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const reason = params.get('reason') || '';
  const label = getReasonLabel(reason);

  return (
    <div className="callout" style={{ marginTop: 12, flexDirection: 'column', alignItems: 'flex-start' }}>
      <div>
        <div className="mini-title">Forwarded to Mentor</div>
        <div className="mini-body">Reason captured: <b>{label}</b></div>
        <div className="mini-body" style={{ marginTop: 6 }}>
          We will open the mentor workspace so they can pick up this case. You can also return to adjust the reason.
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button className="btn primary" onClick={() => navigate('/mentor')}>
          Open Mentor Workspace
        </button>
        <Link to="/school" className="btn ghost">
          Back to reasons
        </Link>
      </div>
    </div>
  );
}
