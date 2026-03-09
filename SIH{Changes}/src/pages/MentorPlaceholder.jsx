import { Link } from 'react-router-dom';

export default function MentorPlaceholder() {
  return (
    <div className="panel">
      <div className="badge">Mentor Portal · Demo</div>
      <h1 className="title">Mentor Dashboard Shell</h1>
      <p className="muted">
        This route is ready to host the mentor experience you shared. Port your existing HTML (mentor.html) into React components or
        load it via an iframe if you want a quick preview.
      </p>
      <div className="callout">
        <div>
          <div className="mini-title">What to do next</div>
          <div className="mini-body">Split the mentor UI into components (sidebar, cards, charts) and hydrate them with real data.</div>
        </div>
        <Link to="/" className="btn ghost">
          Back to selector
        </Link>
      </div>
    </div>
  );
}
