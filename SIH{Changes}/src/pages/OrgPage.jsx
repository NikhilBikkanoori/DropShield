import { Link } from 'react-router-dom';

export default function OrgPage({ title, detail }) {
  return (
    <div className="panel">
      <div className="badge">{title} · Workspace</div>
      <h1 className="title">{title}</h1>
      <p className="muted">{detail}</p>
      <div className="callout">
        <div>
          <div className="mini-title">Next</div>
          <div className="mini-body">Replace this placeholder with your actual {title.toLowerCase()} experience.</div>
        </div>
        <Link to="/" className="btn ghost">
          Back to selector
        </Link>
      </div>
    </div>
  );
}
