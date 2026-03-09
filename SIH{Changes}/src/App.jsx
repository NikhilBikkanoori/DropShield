import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import OrgPage from './pages/OrgPage.jsx';
import MentorPlaceholder from './pages/MentorPlaceholder.jsx';
import SchoolLayout from './pages/school/SchoolLayout.jsx';
import SchoolDashboard from './pages/school/SchoolDashboard.jsx';
import StudentProfile from './pages/school/StudentProfile.jsx';
import UniversalLayout from './pages/universal/UniversalLayout.jsx';
import UniversalDashboard from './pages/universal/UniversalDashboard.jsx';
import ResidentProfile from './pages/universal/ResidentProfile.jsx';

function AppShell({ children }) {
  return (
    <div className="app-bg">
      <div className="backdrop-gradient" />
      <div className="app-shell">{children}</div>
    </div>
  );
}

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/school" element={<SchoolLayout />}>
          <Route index element={<SchoolDashboard />} />
          <Route path="student/:id" element={<StudentProfile />} />
        </Route>
        <Route path="/universal" element={<UniversalLayout />}>
          <Route index element={<UniversalDashboard />} />
          <Route path="resident/:id" element={<ResidentProfile />} />
        </Route>
        <Route
          path="/engineering"
          element={<OrgPage title="Engineering Institute" detail="Route to the engineering experience. Hook this to the full mentor portal when ready." />}
        />
        <Route
          path="/other"
          element={<OrgPage title="Other Education Org" detail="Customize this path for colleges, skill academies, or partners." />}
        />
        <Route path="/mentor" element={<MentorPlaceholder />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
