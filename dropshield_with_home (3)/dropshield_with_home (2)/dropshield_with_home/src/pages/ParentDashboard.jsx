import Navbar from "../components/Navbar";
import StudentInfoCard from "../components/StudentInfoCard";
import MarksTable from "../components/MarksTable";
import AttendanceTable from "../components/AttendanceTable";
import ContactTeacherSection from "../components/ContactTeacherSection";
import ParentComplaintBox from "../components/ParentComplaintBox";
import ParentReasoningBox from "../components/ParentReasoningBox";
import RiskPieChart from "../components/RiskPieChart";

const ParentDashboard = () => {
  
  // -------------------
  // FRONTEND-ONLY DUMMY DATA
  // -------------------
  const studentInfo = {
    name: "Rohit Sharma",
    rollNo: "20A31A05C1",
    className: "3rd Year CSE-A",
    presentDays: 120,
    absentDays: 6
  };

  // Single risk level for the student
  const studentRisk = {
    level: "Medium", // Can be "Low", "Medium", or "High"
    percentage: 65   // Out of 100%
  };

  const marks = [
    { subject: "Maths", Optained: 90, total: 100 },
    { subject: "DBMS", Optained: 85, total: 100 }
  ];

  const attendance = [
    { date: "2024-12-01", status: "Present" },
    { date: "2024-12-02", status: "Absent" },
    { date: "2024-12-03", status: "Present" }
  ];

  return (
    <>
      <Navbar />

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 1️⃣ Student Details */}
        <StudentInfoCard info={studentInfo} />

        {/* 2️⃣ Single Risk Analysis */}
        <RiskPieChart 
          riskLevel={studentRisk.level} 
          percentage={studentRisk.percentage} 
        />

        {/* 3️⃣ Marks Table */}
        <MarksTable marks={marks} />

        {/* 4️⃣ Attendance Table */}
        <AttendanceTable attendance={attendance} />

        {/* 5️⃣ Contact Teacher */}
        <ContactTeacherSection />

        {/* 6️⃣ Complaint Box */}
        <ParentComplaintBox />

        {/* 7️⃣ Messages from Teacher */}
        <ParentReasoningBox />

      </div>
    </>
  );
};

export default ParentDashboard;