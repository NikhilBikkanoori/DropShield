import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

const ParentLogin = () => {
  const navigate = useNavigate();
  const [Username, setUsername] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");


  const handleLogin = async (e, directUsername = null, directPassword = null) => {
    if (e) e.preventDefault();
    setError("");

    const loginUsername = directUsername || Username;
    const loginPassword = directPassword || Password;

    if (!loginUsername) {
      setError("Please enter your Phone number.");
      return;
    }

    if (!loginPassword) {
      setError("Please enter your password.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL || "http://localhost:6000"}/api/parent-admin/login-parent`, {
        Username: loginUsername,
        Password: loginPassword,
      });

      // Store parent data in localStorage
      const parentData = {
        id: response.data.parent._id,
        name: response.data.parent.FullName,
        email: response.data.parent.Email,
        phone: response.data.parent.Phone,
        address: response.data.parent.Address,
        username: response.data.parent.Username,
        studentId: response.data.parent.Student,
      };

      localStorage.setItem("parentData", JSON.stringify(parentData));
      localStorage.setItem("isLoggedIn", "parent");

      // Navigate to dashboard
      navigate("/parent-dashboard");

    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleDirectLogin = () => {
    const parentData = {
      id: "parent-demo-id",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      phone: "9876543210",
      address: "Hyderabad, Telangana",
      username: "parentdemo",
      studentId: "6936d099320ad958d7d13a01",
    };

    localStorage.setItem("parentData", JSON.stringify(parentData));
    localStorage.setItem("isLoggedIn", "parent");
    navigate("/parent-dashboard");
  };

  return (
    <div style={{ background: '#192047', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'Segoe UI', sans-serif" }}>
      <style>{`
        body { margin: 0; font-family: 'Segoe UI', sans-serif; }
        @media(max-width:480px){
          .pl-header{padding:12px 18px !important;}
        }
      `}</style>
      <header className="pl-header" style={{ background: '#262C53', color: '#fff', padding: '15px 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="sl-title" style={{ background: 'linear-gradient(135deg, #192047, #A2F4F9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '1.8em', fontWeight: 'bold' }}>DropShield</h1>
        <button onClick={() => navigate('/')} style={{ background: 'rgba(162,244,249,0.12)', border: '1px solid rgba(162,244,249,0.3)', color: '#A2F4F9', padding: '7px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
          ← Back to Home
        </button>
      </header>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
        <Card className="w-full max-w-[400px] p-8">
          <h2 className="text-center text-[#A2F4F9] mb-6 text-2xl font-semibold">
            <i className="fas fa-user-friends mr-2"></i> Parent Login
          </h2>

          {error && (
            <p className="text-red-500 mb-4 text-center text-sm bg-red-500/10 p-2 rounded-md border border-red-500/20">{error}</p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-2 text-[#A2F4F9] font-medium text-sm">Phone No.</label>
              <Input
                type="text"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-[#A2F4F9] font-medium text-sm">Password</label>
              <Input
                type="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-4"
            >
              Login
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-400 mb-4 text-sm">— OR —</p>
            <Button
              type="button"
              onClick={handleDirectLogin}
              className="w-full bg-[#00C853] hover:bg-[#00E676] text-white border-none"
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

export default ParentLogin;
