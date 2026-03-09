import { Link } from 'react-router-dom';
import { useUniversalData, getFactorBadges } from './UniversalDataContext.jsx';

function RiskPill({ band }) {
  const color = band === 'High' ? 'risk-high' : band === 'Medium' ? 'risk-med' : 'risk-low';
  return <span className={`pill ${color}`}>{band}</span>;
}

export default function UniversalDashboard() {
  const { residents } = useUniversalData();
  return (
    <div style={{ marginTop: 12 }}>
      <div className="table-wrap">
        <table className="simple-table">
          <thead>
            <tr>
              <th>Resident</th>
              <th>Program</th>
              <th>Year</th>
              <th>Exam Score</th>
              <th>Burnout</th>
              <th>Factors</th>
              <th>Risk</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {residents.map((r) => (
              <tr key={r.id} className={`row-${r.riskBand.toLowerCase()}`}>
                <td>
                  <div className="stack">
                    <div className="strong">{r.name}</div>
                    <div className="muted" style={{ margin: 0 }}>{r.id}</div>
                  </div>
                </td>
                <td>{r.program}</td>
                <td>{r.year}</td>
                <td>{r.examScore}%</td>
                <td>
                  <span className={r.burnoutScore >= 4 ? 'pill risk-high' : r.burnoutScore >= 2.5 ? 'pill risk-med' : 'pill risk-low'}>
                    {r.burnoutScore.toFixed(1)}
                  </span>
                </td>
                <td>
                  <div className="chip-row">
                    {getFactorBadges(r.factors).length ? (
                      getFactorBadges(r.factors).map((f) => (
                        <span key={f} className="chip soft">{f}</span>
                      ))
                    ) : (
                      <span className="muted" style={{ fontSize: 13 }}>None flagged</span>
                    )}
                  </div>
                </td>
                <td>
                  <RiskPill band={r.riskBand} />
                  <div className="muted" style={{ fontSize: 12 }}>Score {r.riskScore}</div>
                </td>
                <td>
                  <Link to={`/universal/resident/${r.id}`} className="btn ghost" style={{ fontSize: 14 }}>
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
