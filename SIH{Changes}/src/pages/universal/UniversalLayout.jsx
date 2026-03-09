import { Link, NavLink, Outlet } from 'react-router-dom';
import { UniversalDataProvider } from './UniversalDataContext.jsx';

export default function UniversalLayout() {
  return (
    <UniversalDataProvider>
      <div className="panel">
        <div className="badge">Universal · Medical Training Track</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <h1 className="title">Resident Dropout Prevention</h1>
            <p className="muted">Monitor burnout, exam performance, and wellbeing across medical residents and practitioners.</p>
            <div className="chip-row">
              <span className="chip soft">Burnout tracking</span>
              <span className="chip soft">Program completion risk</span>
              <span className="chip soft">Counselor interventions</span>
            </div>
          </div>
          <Link to="/" className="btn ghost" style={{ whiteSpace: 'nowrap' }}>
            Back to selector
          </Link>
        </div>

        <div className="tab-row">
          <NavLink to="/universal" end className={({ isActive }) => (isActive ? 'tab active' : 'tab')}>
            Resident list
          </NavLink>
        </div>

        <Outlet />
      </div>
    </UniversalDataProvider>
  );
}
