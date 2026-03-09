import Navbar from "../components/Navbar.jsx";
import TeacherComplaintReplyBox from "../components/TeacherComplaintReplyBox.jsx";
import RiskPieChart from "../components/RiskPieChart";

const TeacherDashboard = () => {
  // Class overall risk level
  const classRisk = {
    level: "High",    // "Low", "Medium", or "High"
    percentage: 30    // Percentage of students at this risk level
  };

  return (
    <>
      <Navbar role="teacher" />
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Risk Analysis */}
        <RiskPieChart 
          riskLevel={classRisk.level} 
          percentage={classRisk.percentage} 
        />

        {/* Complaint Reply Box */}
        <TeacherComplaintReplyBox />
      </div>
    </>
  );
};

export default TeacherDashboard;