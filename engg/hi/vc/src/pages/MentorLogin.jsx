import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

const MentorLogin = () => {
  const navigate = useNavigate();
  const [mentorId, setMentorId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async (e, directUsername = null, directPassword = null) => {
    if (e) e.preventDefault();
    setError("");
    setLoading(true);

    const loginUsername = directUsername || mentorId;
    const loginPassword = directPassword || password;

    if (!loginUsername) {
      setError("Please enter your Faculty ID.");
      setLoading(false);
      return;
    }

    if (!loginPassword) {
      setError("Please enter your password.");
      setLoading(false);
      return;
    }

    try {
      console.log("Attempting login with:", { username: loginUsername, password: loginPassword });

      // Login
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL || "http://localhost:6000"} /api/faculty - admin / login - faculty`, {
        username: loginUsername,
        password: loginPassword,
      });

      console.log("Login response:", res.data);

      if (!res.data) {
        setError("No response from server");
        return;
      }

      // Store mentor data from login response
      const mentorData = {
        id: res.data.faculty.id,
        username: res.data.faculty.username,
        name: res.data.faculty.FullName,
      };

      localStorage.setItem("mentorData", JSON.stringify(mentorData));
      localStorage.setItem("isLoggedIn", "mentor");

      console.log("Login successful, navigating...");
      navigate("/mentor-dashboard");

    } catch (err) {
      console.error("Full error object:", err);
      console.error("Error response:", err.response?.data);
      const errorMsg = err.response?.data?.message || err.message || "Login failed";
      console.error("Setting error to:", errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDirectLogin = () => {
    const mentorData = {
      id: "mentor-demo-id",
      username: "demoFaculty",
      name: "Prof. Sharma",
    };

    localStorage.setItem("mentorData", JSON.stringify(mentorData));
    localStorage.setItem("isLoggedIn", "mentor");
    navigate("/mentor-dashboard");
  };

  return (
    <div style={{ background: '#192047', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Add global styles to remove margin and set base font */}
      <style>{`
        body { margin: 0; font - family: 'Segoe UI', sans - serif; }
@media(max - width: 480px) {
          .ml - header{ padding: 12px 18px!important; }
}
`}</style>
      <header className="ml-header" style={{ background: '#262C53', color: '#fff', padding: '15px 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="sl-title" style={{ background: 'linear-gradient(135deg, #192047, #A2F4F9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '1.8em', fontWeight: 'bold' }}>DropShield</h1>
        <button onClick={() => navigate('/')} style={{ background: 'rgba(162,244,249,0.12)', border: '1px solid rgba(162,244,249,0.3)', color: '#A2F4F9', padding: '7px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
          ← Back to Home
        </button>
      </header>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
        <Card className="w-full max-w-[400px] p-8">
          <h2 className="text-center text-[#A2F4F9] mb-6 text-2xl font-semibold">
            <i className="fas fa-chalkboard-teacher mr-2"></i> Faculty/Mentor Login
          </h2>

          {error && (
            <p className="text-red-500 mb-4 text-center text-sm bg-red-500/10 p-2 rounded-md border border-red-500/20">{error}</p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-2 text-[#A2F4F9] font-medium text-sm">Faculty ID</label>
              <Input
                type="text"
                value={mentorId}
                onChange={(e) => setMentorId(e.target.value)}
                placeholder="Enter your Faculty ID"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block mb-2 text-[#A2F4F9] font-medium text-sm">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-4"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-400 mb-4 text-sm">— OR —</p>
            <Button
              type="button"
              onClick={handleDirectLogin}
              className="w-full bg-[#00C853] hover:bg-[#00E676] text-white border-none"
              disabled={loading}
            >
              🚀 Direct Login (Demo)
            </Button>
          </div>
        </Card>
      </div>

      <footer style={{ background: '#262C53', color: '#fff', textAlign: 'center', padding: '20px' }}>
        <p>&copy; 2025 Dropout Prediction & Counselling System</p>
      </footer>
    </div>
  );
};

export default MentorLogin;