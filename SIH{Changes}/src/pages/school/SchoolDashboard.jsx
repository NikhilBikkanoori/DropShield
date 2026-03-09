import { Link } from 'react-router-dom';
import { useSchoolData, getFactorBadges } from './SchoolDataContext.jsx';

function RiskPill({ band }) {
  const color = band === 'High' ? 'risk-high' : band === 'Medium' ? 'risk-med' : 'risk-low';
  return <span className={`pill ${color}`}>{band}</span>;
}

export default function SchoolDashboard() {
  const { students } = useSchoolData();
  return (
    <div style={{ marginTop: 12 }}>
      <div className="table-wrap">
        <table className="simple-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Attendance</th>
              <th>Avg Score</th>
              <th>Fees Pending</th>
              <th>Factors</th>
              <th>Risk</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className={`row-${s.riskBand.toLowerCase()}`}>
                <td>
                  <div className="stack">
                    <div className="strong">{s.name}</div>
                    <div className="muted" style={{ margin: 0 }}>{s.id}</div>
                  </div>
                </td>
                <td>{s.attendance}%</td>
                <td>{s.avgScore}%</td>
                <td>₹{(s.feesPending || 0).toLocaleString('en-IN')}</td>
                <td>
                  <div className="chip-row">
                    {getFactorBadges(s.factors).length ? (
                      getFactorBadges(s.factors).map((f) => (
                        <span key={f} className="chip soft">{f}</span>
                      ))
                    ) : (
                      <span className="muted" style={{ fontSize: 13 }}>None flagged</span>
                    )}
                  </div>
                </td>
                <td>
                  <RiskPill band={s.riskBand} />
                  <div className="muted" style={{ fontSize: 12 }}>Score {s.riskScore}</div>
                </td>
                <td>
                  <Link to={`/school/student/${s.id}`} className="btn ghost" style={{ fontSize: 14 }}>
                    Open
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
