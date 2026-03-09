import { Link, NavLink, Outlet } from 'react-router-dom';
import { SchoolDataProvider } from './SchoolDataContext.jsx';

export default function SchoolLayout() {
  return (
    <SchoolDataProvider>
      <div className="panel">
        <div className="badge">School · Dropout Watch</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <h1 className="title">School Dropout Workflow</h1>
            <p className="muted">Combine core signals with real-life factors, actions, and resolutions.</p>
            <div className="chip-row">
              <span className="chip soft">Layer 1: attendance/marks/fees</span>
              <span className="chip soft">Layer 2: human-observed factors</span>
              <span className="chip soft">Interventions & resolution</span>
            </div>
          </div>
          <Link to="/" className="btn ghost" style={{ whiteSpace: 'nowrap' }}>
            Back to selector
          </Link>
        </div>

        <div className="tab-row">
          <NavLink to="/school" end className={({ isActive }) => (isActive ? 'tab active' : 'tab')}>
            Student list
          </NavLink>
        </div>

        <Outlet />
      </div>
    </SchoolDataProvider>
  );
}
