import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEFAULT_MENTOR, COUNSELING_STUDENT_DATA } from '../data/mockData';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input'; // Assuming an Input component is also needed based on the new code

const STORAGE_KEY = "mentor_portal_v1";

const cloneMentor = (m) => JSON.parse(JSON.stringify(m));
const rupee = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

const parseSimpleCsv = (text) => {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length);
  if (!lines.length) return [];
  const headers = lines[0].split(",").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const cols = line.split(",");
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = cols[idx] ? cols[idx].trim() : "";
    });
    return obj;
  });
};

const MentorDashboard = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard"); // Changed to 'dashboard' to match new code
  const [mentor, setMentor] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : cloneMentor(DEFAULT_MENTOR);
    } catch (e) {
      console.error("Failed to load mentor state", e);
      return cloneMentor(DEFAULT_MENTOR);
    }
  });
  const [today, setToday] = useState(() => new Date().toDateString());
  const [modal, setModal] = useState({ open: false, title: "", body: "" }); // Kept for other modals, but new action modal uses separate state
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [newStudentName, setNewStudentName] = useState("");
  const importStudentsRef = useRef(null);
  const importExamsRef = useRef(null);
  const importFeesRef = useRef(null);

  const riskPieRef = useRef(null);
  const attendanceDistRef = useRef(null);
  const feeBarsRef = useRef(null);
  const perfLineRef = useRef(null);
  const perfBarSmallRef = useRef(null);
  const perfLineSmallRef = useRef(null);

  // New state for action modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [actionType, setActionType] = useState('message');
  const [actionNotes, setActionNotes] = useState('');

  const riskData = useMemo(() => {
    const ATT_THRESH = 75;
    const FAIL_SCORE = 40;
    const ATTEMPT_THRESH = 3;
    const FEE_THRESH = 1;

    const result = mentor.mentees.map((s) => {
      const scores = s.scores && s.scores.length ? s.scores.map(Number).filter((x) => !Number.isNaN(x)) : s.exams ? s.exams.map((e) => Number(e.marks)).filter((x) => !Number.isNaN(x)) : [];
      const avgScore = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : s.gpa ? Number(s.gpa) * 10 : null;
      const attempts = s.attempts || (s.attempts_arr ? Math.max(...s.attempts_arr) : 0);
      const feesPending = s.finance ? (s.finance.total || 0) - (s.finance.paid || 0) + (s.finance.others || 0) : 0;
      const attendance = Number(s.attendance || 0);

      const issues = [];
      if (attendance < ATT_THRESH) issues.push("attendance");
      if (avgScore !== null && avgScore < FAIL_SCORE) issues.push("academics");
      if (attempts >= ATTEMPT_THRESH) issues.push("attempts");
      if (feesPending >= FEE_THRESH) issues.push("financial");

      let risk = "Low";
      if (issues.length >= 2 || (avgScore !== null && avgScore < 30)) risk = "High";
      else if (issues.length === 1) risk = "Medium";

      return { id: s.id, name: s.name, attendance, avgScore, attempts, feesPending, issues, risk };
    });

    const order = { High: 3, Medium: 2, Low: 1 };
    result.sort((a, b) => (order[b.risk] !== order[a.risk] ? order[b.risk] - order[a.risk] : (b.avgScore || 0) - (a.avgScore || 0)));
    return result;
  }, [mentor]);

  // Mock data for the new dashboard layout
  const mentorData = useMemo(() => {
    // This is a placeholder for actual mentor data, using mock data for now
    return {
      notifications: [
        { type: 'alert', text: 'High risk student John Doe needs attention.', time: '2 hours ago' },
        { type: 'message', text: 'Meeting scheduled with Jane Smith.', time: 'Yesterday' },
        { type: 'warning', text: 'Upcoming deadline for project submissions.', time: '3 days ago' },
      ],
      // Assuming students are part of mentor.mentees, but adding riskLevel for display
      students: mentor.mentees.map(s => {
        const risk = riskData.find(r => r.id === s.id);
        return {
          ...s,
          riskLevel: risk ? risk.risk : 'Low',
          riskScore: risk ? (risk.risk === 'High' ? 80 : risk.risk === 'Medium' ? 50 : 20) : 20, // Placeholder score
          lastCheckin: '2023-10-26', // Placeholder
        };
      })
    };
  }, [mentor, riskData]);

  const stats = useMemo(() => {
    const totalStudents = mentorData.students.length;
    const highRisk = mentorData.students.filter(s => s.riskLevel === 'High').length;
    const mediumRisk = mentorData.students.filter(s => s.riskLevel === 'Medium').length;
    const lowRisk = mentorData.students.filter(s => s.riskLevel === 'Low').length;
    return { totalStudents, highRisk, mediumRisk, lowRisk };
  }, [mentorData.students]);

  const [sortBy, setSortBy] = useState('risk'); // Default sort
  const sortedStudents = useMemo(() => {
    let students = [...mentorData.students];
    if (sortBy === 'risk') {
      const riskOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
      students.sort((a, b) => riskOrder[b.riskLevel] - riskOrder[a.riskLevel]);
    } else if (sortBy === 'name') {
      students.sort((a, b) => a.name.localeCompare(b.name));
    }
    return students;
  }, [mentorData.students, sortBy]);

  const studentList = useMemo(() => {
    return mentor.mentees.map(s => {
      const risk = riskData.find(r => r.id === s.id);
      return {
        ...s,
        riskLevel: risk ? risk.risk : 'Low',
        riskScore: risk ? (risk.risk === 'High' ? 80 : risk.risk === 'Medium' ? 50 : 20) : 20, // Placeholder score
        lastCheckin: '2023-10-26', // Placeholder
      };
    });
  }, [mentor.mentees, riskData]);


  const mentorDataLS = useMemo(() => {
    try {
      const raw = localStorage.getItem("mentorData");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error("mentorData parse fail", e);
      return null;
    }
  }, []);

  const profileName = mentorDataLS?.name || mentor.name;
  const profileDept = mentorDataLS?.dept || mentor.dept || "CSE";
  const profileEmail = mentorDataLS?.email || "mentor.sharma@ait.edu";
  const profileInitials = (profileName || "").split(" ").map((p) => p[0]).slice(0, 2).join("") || "S";

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mentor));
  }, [mentor]);

  useEffect(() => {
    const handler = () => setToday(new Date().toDateString());
    const id = setInterval(handler, 60 * 1000);
    return () => clearInterval(id);
  }, []);


  const riskSummaryText = useMemo(() => {
    const counts = riskData.reduce((acc, r) => {
      acc[r.risk] = (acc[r.risk] || 0) + 1;
      return acc;
    }, {});
    return `High: ${counts.High || 0}, Med: ${counts.Medium || 0}, Low: ${counts.Low || 0}`;
  }, [riskData]);

  const filteredRisk = useMemo(() => {
    return riskData.filter((r) => {
      if (riskFilter !== "all") {
        const rf = riskFilter === "high" ? "High" : riskFilter === "medium" ? "Medium" : "Low";
        if (r.risk !== rf) return false;
      }
      if (!search) return true;
      return (r.name && r.name.toLowerCase().includes(search.toLowerCase())) || (r.id && r.id.toLowerCase().includes(search.toLowerCase()));
    });
  }, [riskData, riskFilter, search]);

  const addStudent = () => {
    const name = newStudentName.trim();
    if (!name) return alert("Enter name");
    const id = `21CSE${Math.floor(Math.random() * 900 + 100)}`;
    const newMentor = cloneMentor(mentor);
    newMentor.mentees.push({ id, name, gpa: 7.0, attendance: 75, finance: { total: 50000, paid: 0, others: 0 }, assignments: [], exams: [], scores: [], attempts: [] });
    setMentor(newMentor);
    setNewStudentName("");
  };

  const removeStudent = (id) => {
    if (!window.confirm(`Remove student ${id}?`)) return;
    const newMentor = cloneMentor(mentor);
    newMentor.mentees = newMentor.mentees.filter((s) => s.id !== id);
    newMentor.submissions = newMentor.submissions.filter((s) => s.studId !== id);
    newMentor.exams = newMentor.exams.filter((e) => e.studId !== id);
    setMentor(newMentor);
  };

  const saveAttendance = () => {
    const newMentor = cloneMentor(mentor);
    newMentor.mentees.forEach((s) => {
      const present = newMentor.attendanceToday?.[s.id];
      if (present !== undefined) {
        s.attendance = present ? Math.min(100, s.attendance + 1) : Math.max(0, s.attendance - 1);
      }
    });
    setMentor(newMentor);
    alert("Attendance saved.");
  };

  const handleAttendanceToggle = (studId, checked) => {
    setMentor((prev) => {
      const next = cloneMentor(prev);
      next.attendanceToday = { ...next.attendanceToday, [studId]: checked };
      return next;
    });
  };

  const createAssignment = (title, course, due) => {
    if (!title) return alert("Enter title");
    const id = `A${Math.floor(Math.random() * 9000 + 100)}`;
    const next = cloneMentor(mentor);
    next.assignments.push({ id, title, course, due });
    setMentor(next);
  };

  const gradeSubmission = (studId, assignId, grade) => {
    const g = Number(grade);
    if (Number.isNaN(g)) return alert("Enter numeric grade");
    const next = cloneMentor(mentor);
    const sub = next.submissions.find((s) => s.studId === studId && s.assignId === assignId);
    if (sub) sub.grade = g;
    const student = next.mentees.find((m) => m.id === studId);
    if (student) {
      student.scores = student.scores || [];
      student.scores.push(g * 10);
      student.gpa = Math.min(10, Math.max(0, ((student.gpa || 0) + g / 10) / 2 + 0.2));
    }
    setMentor(next);
    alert("Graded.");
  };

  // New function to open the action modal
  const openActionModal = (student) => {
    setSelectedStudent(student);
    setActionType('message');
    setActionNotes('');
    setModalOpen(true);
  };

  // New function to submit the action
  const submitAction = () => {
    console.log(`Action for ${selectedStudent.name}: ${actionType} - ${actionNotes}`);
    alert(`Action "${actionType}" submitted for ${selectedStudent.name}. Notes: ${actionNotes}`);
    setModalOpen(false);
  };

  const openModal = (title, body) => setModal({ open: true, title, body });
  const closeModal = () => setModal({ open: false, title: "", body: "" });

  const importCsv = async (file, kind) => {
    if (!file) return;
    const text = await file.text();
    const rows = parseSimpleCsv(text);
    const next = cloneMentor(mentor);
    if (kind === "students") {
      rows.forEach((r) => {
        const id = (r.student_id || r.id || r.roll || r.Roll || "").toString().trim();
        if (!id) return;
        let s = next.mentees.find((x) => x.id === id);
        if (!s) {
          s = {
            id,
            name: r.name || "",
            gpa: Number(r.gpa) || 0,
            attendance: Number(r.attendance_pct || r.attendance) || 0,
            finance: { total: 0, paid: 0, others: 0 },
            assignments: [],
            exams: [],
            scores: [],
            attempts: []
          };
          next.mentees.push(s);
        } else {
          s.name = s.name || r.name || s.name;
          s.gpa = Number.isNaN(Number(r.gpa)) ? s.gpa : Number(r.gpa);
          s.attendance = r.attendance_pct || r.attendance ? Number(r.attendance_pct || r.attendance) : s.attendance;
        }
      });
    }
    if (kind === "exams") {
      rows.forEach((r) => {
        const id = (r.student_id || r.id || "").toString().trim();
        if (!id) return;
        const stud = next.mentees.find((x) => x.id === id);
        const marks = Number(r.marks || r.score);
        const attempts = Number(r.attempts || r.attempt || 0);
        if (stud) {
          stud.exams = stud.exams || [];
          stud.exams.push({ subject: r.subject || r.sub || "Exam", marks: Number.isNaN(marks) ? null : marks });
          if (!Number.isNaN(marks)) {
            stud.scores = stud.scores || [];
            stud.scores.push(marks);
          }
          if (!Number.isNaN(attempts) && attempts > 0) {
            stud.attempts = Math.max(stud.attempts || 0, attempts);
            stud.attempts_arr = stud.attempts_arr || [];
            stud.attempts_arr.push(attempts);
          }
        } else {
          const s = { id, name: r.name || "", gpa: 0, attendance: 0, finance: { total: 0, paid: 0, others: 0 }, assignments: [], exams: [], scores: [], attempts: [] };
          if (!Number.isNaN(marks)) {
            s.scores.push(marks);
            s.exams.push({ subject: r.subject || "Exam", marks });
          }
          if (!Number.isNaN(attempts) && attempts > 0) {
            s.attempts = attempts;
            s.attempts_arr = [attempts];
          }
          next.mentees.push(s);
        }
      });
    }
    if (kind === "fees") {
      rows.forEach((r) => {
        const id = (r.student_id || r.id || "").toString().trim();
        if (!id) return;
        const stud = next.mentees.find((x) => x.id === id);
        const total = Number(r.total || r.total_fee || r.total_fees || r.total_amount || 0);
        const paid = Number(r.paid || r.paid_amount || r.paid_fees || 0);
        const others = Number(r.others || r.other || r.fees_due || 0);
        if (stud) {
          stud.finance = stud.finance || { total: 0, paid: 0, others: 0 };
          stud.finance.total = total || stud.finance.total;
          stud.finance.paid = paid || stud.finance.paid;
          stud.finance.others = others || stud.finance.others;
        } else {
          next.mentees.push({ id, name: r.name || "", gpa: 0, attendance: 0, finance: { total, paid, others }, assignments: [], exams: [], scores: [], attempts: [] });
        }
      });
    }
    setMentor(next);
    alert("Import complete");
  };

  const exportRiskCSV = () => {
    const rows = riskData.map((r) => ({
      student_id: r.id,
      name: r.name,
      attendance: r.attendance,
      avg_score: r.avgScore !== null ? r.avgScore.toFixed(1) : "",
      attempts: r.attempts || 0,
      fees_pending: r.feesPending,
      issues: r.issues.join("|"),
      risk: r.risk
    }));
    const header = Object.keys(rows[0] || {}).join(",");
    const body = rows.map((r) => Object.values(r).join(",")).join("\n");
    const csv = `${header}\n${body}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "risk_export.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const drawCanvas = (canvas, drawer) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(300, Math.floor(rect.width));
    const height = Math.max(160, Math.floor(rect.height));
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawer(ctx, width, height);
  };

  const drawRiskPie = () => {
    drawCanvas(riskPieRef.current, (ctx, W, H) => {
      const counts = { High: 0, Medium: 0, Low: 0 };
      riskData.forEach((r) => {
        counts[r.risk] = (counts[r.risk] || 0) + 1;
      });
      const values = [counts.High, counts.Medium, counts.Low];
      const colors = ["#ff6b6b", "#f59e0b", "#16a34a"];
      const total = values.reduce((a, b) => a + b, 0) || 1;
      const cx = W / 2;
      const cy = H / 2;
      const r = Math.min(W, H) / 4;
      let angle = -Math.PI / 2;
      values.forEach((v, i) => {
        const slice = (v / total) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, angle, angle + slice);
        ctx.closePath();
        ctx.fillStyle = colors[i];
        ctx.fill();
        angle += slice;
      });
      ctx.fillStyle = "#fff";
      ctx.font = "12px Arial";
      ctx.fillText(`High: ${counts.High}`, 10, H - 30);
      ctx.fillText(`Medium: ${counts.Medium}`, 10, H - 14);
      ctx.fillText(`Low: ${counts.Low}`, W - 80, H - 22);
    });
  };

  const drawAttendanceDist = () => {
    drawCanvas(attendanceDistRef.current, (ctx, W, H) => {
      const arr = mentor.mentees.map((m) => Number(m.attendance || 0));
      const a = arr.filter((x) => x > 75).length;
      const b = arr.filter((x) => x <= 75 && x >= 60).length;
      const d = arr.filter((x) => x < 60).length;
      const values = [a, b, d];
      const colors = ["#6a34d8", "#7b3fe4", "#ff6b6b"];
      const total = a + b + d || 1;
      const cx = W / 2;
      const cy = H / 2;
      const r = Math.min(W, H) / 4;
      let angle = -Math.PI / 2;
      values.forEach((v, i) => {
        const slice = (v / total) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, angle, angle + slice);
        ctx.closePath();
        ctx.fillStyle = colors[i];
        ctx.fill();
        angle += slice;
      });
      ctx.beginPath();
      ctx.fillStyle = "#fff";
      ctx.arc(cx, cy, r * 0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = "12px Arial";
      ctx.fillText(`>75%: ${a}`, 10, H - 30);
      ctx.fillText(`60-75%: ${b}`, 10, H - 14);
      ctx.fillText(`<60%: ${d}`, W - 110, H - 30);
    });
  };

  const drawFeeBars = () => {
    drawCanvas(feeBarsRef.current, (ctx, W, H) => {
      const vals = mentor.mentees.map((m) => (m.finance && m.finance.paid ? m.finance.paid : 0));
      const labels = mentor.mentees.map((m) => m.name.split(" ")[0]);
      const max = Math.max(...vals, 1);
      const paddingLeft = 20;
      const paddingBottom = 40;
      const availableW = W - paddingLeft - 20;
      const barW = Math.floor((availableW / vals.length) * 0.6);
      labels.forEach((lab, i) => {
        const x = paddingLeft + i * (barW + 20);
        const h = (vals[i] / max) * (H - paddingBottom - 20);
        ctx.fillStyle = "#7b3fe4";
        ctx.fillRect(x, H - paddingBottom - h, barW, h);
        ctx.fillStyle = "#fff";
        ctx.font = "12px Arial";
        ctx.fillText(lab, x, H - 12);
        ctx.fillText(rupee(vals[i]), x, H - paddingBottom - h - 6);
      });
    });
  };

  const drawPerfLine = () => {
    drawCanvas(perfLineRef.current, (ctx, W, H) => {
      const labels = mentor.mentees.map((m) => m.name.split(" ")[0]);
      const vals = mentor.mentees.map((m) => Number(m.gpa || 0));
      const paddingLeft = 40;
      const paddingTop = 20;
      const paddingBottom = 40;
      const availableW = W - paddingLeft - 20;
      const step = availableW / Math.max(1, vals.length - 1);
      ctx.strokeStyle = "#6a34d8";
      ctx.lineWidth = 2;
      ctx.beginPath();
      vals.forEach((v, i) => {
        const x = paddingLeft + i * step;
        const y = paddingTop + (1 - v / 10) * (H - paddingTop - paddingBottom);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#6a34d8";
      ctx.lineWidth = 1;
      vals.forEach((v, i) => {
        const x = paddingLeft + i * step;
        const y = paddingTop + (1 - v / 10) * (H - paddingTop - paddingBottom);
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });
      ctx.fillStyle = "#fff";
      ctx.font = "12px Arial";
      labels.forEach((lab, i) => {
        const x = paddingLeft + i * step;
        ctx.fillText(lab, x - 10, H - 12);
      });
    });
  };

  const drawPerfBarSmall = () => {
    drawCanvas(perfBarSmallRef.current, (ctx, W, H) => {
      const subjects = ["Math", "OS", "DBMS"];
      const vals = subjects.map((s, i) => 60 + i * 10);
      const paddingLeft = 30;
      const paddingBottom = 30;
      const availableW = W - paddingLeft - 20;
      const barW = Math.floor((availableW / vals.length) * 0.6);
      vals.forEach((v, i) => {
        const x = paddingLeft + i * (barW + 20);
        const h = (v / 100) * (H - paddingBottom - 20);
        ctx.fillStyle = "#6a34d8";
        ctx.fillRect(x, H - paddingBottom - h, barW, h);
        ctx.fillStyle = "#fff";
        ctx.font = "12px Arial";
        ctx.fillText(subjects[i], x, H - 8);
        ctx.fillText(`${v}%`, x, H - paddingBottom - h - 6);
      });
    });
  };

  const drawPerfLineSmall = () => {
    drawCanvas(perfLineSmallRef.current, (ctx, W, H) => {
      const labels = mentor.mentees.map((m) => m.name.split(" ")[0]);
      const vals = mentor.mentees.map((m) => m.gpa);
      const paddingLeft = 30;
      const paddingTop = 16;
      const paddingBottom = 30;
      const availableW = W - paddingLeft - 20;
      const step = availableW / Math.max(1, vals.length - 1);
      ctx.strokeStyle = "#6a34d8";
      ctx.lineWidth = 2;
      ctx.beginPath();
      vals.forEach((v, i) => {
        const x = paddingLeft + i * step;
        const y = paddingTop + (1 - v / 10) * (H - paddingTop - paddingBottom);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#6a34d8";
      ctx.lineWidth = 1;
      vals.forEach((v, i) => {
        const x = paddingLeft + i * step;
        const y = paddingTop + (1 - v / 10) * (H - paddingTop - paddingBottom);
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });
    });
  };

  useEffect(() => {
    if (activePage === "analyticsPage") {
      drawRiskPie();
      drawAttendanceDist();
      drawFeeBars();
      drawPerfLine();
    }
  }, [activePage, mentor, riskData]);

  useEffect(() => {
    drawPerfBarSmall();
    drawPerfLineSmall();
  }, [mentor]);

  useEffect(() => {
    const onResize = () => {
      if (activePage === "analyticsPage") {
        drawRiskPie();
        drawAttendanceDist();
        drawFeeBars();
        drawPerfLine();
      }
      drawPerfBarSmall();
      drawPerfLineSmall();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activePage, mentor]);

  // Removed the old `styles` constant as the new code uses Tailwind CSS classes

  const navigateTo = (page) => {
    setActivePage(page);
  };

  const logout = () => {
    alert("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="bg-[var(--bg)] min-h-screen">
      <style>{`
        :root {
          --bg: #070b1d;
          --card: #151b3d;
          --soft: #1c2555;
          --muted: #8e99bc;
          --accent: #A2F4F9;
          --danger: #ff6b6b;
          --warning: #fbbf24;
          --success: #10b981;
          --glass: rgba(255, 255, 255, 0.03);
          --border: rgba(255, 255, 255, 0.08);
          --sidebar-w: 260px;
        }

        body {
          background: var(--bg);
          color: #e2e8f0;
          overflow-x: hidden;
        }

        .topbar {
          background: rgba(21, 27, 61, 0.8);
          backdrop-filter: blur(12px);
          padding: 12px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 1000;
          border-bottom: 1px solid var(--border);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--accent), #34d399);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          color: var(--bg);
        }

        .container {
          display: flex;
          max-width: 1600px;
          margin: 0 auto;
          position: relative;
        }

        .sidebar {
          width: var(--sidebar-w);
          background: rgba(21, 27, 61, 0.5);
          backdrop-filter: blur(8px);
          border-right: 1px solid var(--border);
          padding: 30px 20px;
          height: calc(100vh - 65px);
          position: sticky;
          top: 65px;
          overflow-y: auto;
        }

        .sidebar h2 {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--muted);
          margin-bottom: 24px;
          font-weight: 700;
        }

        .nav-item {
          display: flex;
          align-items: center;
          padding: 10px 14px;
          color: #94a3b8;
          text-decoration: none;
          border-radius: 10px;
          margin-bottom: 6px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 14px;
          font-weight: 500;
        }

        .nav-item:hover {
          background: var(--glass);
          color: white;
          transform: translateX(4px);
        }

        .nav-item.active {
          background: linear-gradient(90deg, rgba(162, 244, 249, 0.1), transparent);
          color: var(--accent);
          border-left: 3px solid var(--accent);
          font-weight: 600;
        }

        .main {
          flex: 1;
          padding: 32px 40px;
          min-width: 0;
        }

        .card {
          background: var(--card);
          border-radius: 20px;
          padding: 24px;
          border: 1px solid var(--border);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          transition: transform 0.3s ease;
        }

        .welcome {
          background: radial-gradient(circle at top right, rgba(162, 244, 249, 0.1), transparent), var(--card);
          padding: 40px;
          margin-bottom: 32px;
          border-bottom: 2px solid rgba(162, 244, 249, 0.2);
        }

        .welcome h2 {
           font-size: 28px;
           margin: 0;
           font-weight: 800;
           background: linear-gradient(to right, #fff, var(--accent));
           -webkit-background-clip: text;
           -webkit-text-fill-color: transparent;
        }

        .btn {
          padding: 10px 24px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn:hover {
          filter: brightness(1.1);
          transform: translateY(-2px);
        }

        .btn.primary { background: var(--accent); color: var(--bg); }
        .btn.secondary { background: var(--soft); color: white; }
        .btn.ghost { background: transparent; border: 1px solid var(--border); color: white; }

        .tag {
          padding: 8px 16px;
          border-radius: 10px;
          background: rgba(162, 244, 249, 0.1);
          color: var(--accent);
          font-size: 13px;
          font-weight: 600;
          border: 1px solid rgba(162, 244, 249, 0.2);
        }

        table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 8px;
        }

        th {
          color: var(--muted);
          font-weight: 600;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 12px;
        }

        tbody tr {
          background: rgba(255, 255, 255, 0.02);
          transition: background 0.2s ease;
        }

        tbody tr:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        td {
          padding: 16px 12px;
          font-size: 14px;
        }

        td:first-child { border-top-left-radius: 12px; border-bottom-left-radius: 12px; }
        td:last-child { border-top-right-radius: 12px; border-bottom-right-radius: 12px; }

        .risk-badge {
          padding: 4px 12px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .status-dot {
           width: 8px;
           height: 8px;
           border-radius: 50%;
           display: inline-block;
           margin-right: 6px;
        }

        @media (max-width: 1024px) {
           .sidebar { width: 80px; padding: 30px 10px; }
           .sidebar h2, .nav-item span { display: none; }
           .container { padding: 0; }
        }

        @media (max-width: 768px) {
          .topbar { padding: 12px 20px; }
          .container { flex-direction: column; }
          .sidebar { width: 100%; height: auto; position: static; display: flex; overflow-x: auto; gap: 8px; padding: 10px 20px; }
          .nav-item { margin-bottom: 0; white-space: nowrap; }
          .main { padding: 20px; }
          .welcome { padding: 24px; }
        }
      `}</style>

      {/* Topbar */}
      <div className="topbar">
        <div className="brand">
          <div className="logo">AIT</div>
          <div>
            <div style={{ fontSize: 14, opacity: 0.95 }}>ABC Institute of Technology</div>
            <div style={{ fontSize: 12, opacity: 0.85 }}>Mentor Dashboard</div>
          </div>
        </div>

        <div className="top-right">
          <div className="muted" id="todaySmall">{today}</div>
          <div className="profile-mini" title={profileName}>
            <div className="avatar" style={{ width: 34, height: 34, background: "var(--c4)", color: "var(--c3)" }}>{profileInitials}</div>
            <div style={{ color: "#ffffffff" }}>
              {profileName}
              <br />
              <small style={{ opacity: 0.9, color: "#fff" }}>Mentor • {profileDept}</small>
            </div>
          </div>
        </div>
      </div>

      {/* Container */}
      <div className="container">
        {/* Sidebar */}
        <aside className="sidebar" id="sidebar">
          <h2>Mentor Menu</h2>

          {[
            ["dashboard", "Dashboard"], // Changed to 'dashboard'
            ["analyticsPage", "Analytics"],
            ["profilePage", "Profile"],
            ["studentsPage", "Students"],
            ["attendancePage", "Attendance"],
            ["assignmentsPage", "Assignments"],
            ["submissionsPage", "Submissions"],
            ["examsPage", "Exams & Results"],
            ["performancePage", "Performance"],
            ["noticesPage", "Notices"],
            ["feesPage", "Fees Overview"]
          ].map(([key, label]) => (
            <a
              key={key}
              className={`nav-item ${activePage === key ? "active" : ""}`}
              onClick={() => navigateTo(key)}
            >
              {label}
            </a>
          ))}

          <hr style={{ border: "none", height: 1, background: "rgba(255,255,255,0.03)", margin: "10px 0" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label className="nav-item" style={{ cursor: "default" }}>Import CSVs</label>
            <input ref={importStudentsRef} type="file" accept=".csv" style={{ color: "transparent" }} />
            <input ref={importExamsRef} type="file" accept=".csv" style={{ color: "transparent" }} />
            <input ref={importFeesRef} type="file" accept=".csv" style={{ color: "transparent" }} />
            <button className="btn ghost" onClick={async () => {
              await importCsv(importStudentsRef.current?.files?.[0], "students");
              await importCsv(importExamsRef.current?.files?.[0], "exams");
              await importCsv(importFeesRef.current?.files?.[0], "fees");
            }}>Import Selected</button>
            <button className="btn" onClick={exportRiskCSV}>Export Risk CSV</button>
            <button className="btn ghost" onClick={() => { console.log(cloneMentor(mentor)); alert("State logged to console (debug)."); }}>Debug State</button>
            <a className="nav-item" onClick={logout}>Logout</a>
          </div>
        </aside>

        {/* Main */}
        <main className="main">
          <div className="grid">

            {/* Welcome card - kept for consistency, but new dashboard replaces its content */}
            <div className="card welcome" style={{ gridColumn: "1 / -1" }}>
              <div>
                <h2 id="welcomeTitle">Mentor Dashboard</h2>
                <div className="muted">Manage mentees, attendance, submissions and analytics</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <div className="tag" id="riskSummaryTag">Risk: <span id="riskSummary">{riskSummaryText}</span></div>
                <button className="btn ghost" onClick={() => openModal("Export", "Exporting aggregated mentor report. Use Export Risk CSV in the sidebar to download risk list.")}>Export Report</button>
                <button className="btn primary" onClick={() => openModal("Post Notice", "Use Notices page to post.")}>Post Notice</button>
              </div>
            </div>

            {/* MENTOR DASHBOARD MAIN */}
            {activePage === 'dashboard' && (
              <main className="main" id="dashboardPage">
                <div className="dashboard-content">
                  <div className="dashboard-header flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                    <h2 className="dashboard-title text-[#A2F4F9] text-xl font-bold m-0 text-left">Academic Risk Dashboard - Mentor View</h2>
                    <Button variant="ghost">Generate Report</Button>
                  </div>

                  {/* Top Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="p-5 flex flex-col justify-center text-center">
                      <div className="text-3xl mb-3">👥</div>
                      <div className="text-2xl font-bold mb-1">{stats.totalStudents}</div>
                      <div className="text-sm text-gray-400">Total Students</div>
                    </Card>
                    <Card className="p-5 flex flex-col justify-center text-center">
                      <div className="text-3xl mb-3 text-[#FF6B6B]">⚠️</div>
                      <div className="text-2xl font-bold mb-1">{stats.highRisk}</div>
                      <div className="text-sm text-gray-400">High Risk</div>
                    </Card>
                    <Card className="p-5 flex flex-col justify-center text-center">
                      <div className="text-3xl mb-3 text-[#FFD166]">⚠️</div>
                      <div className="text-2xl font-bold mb-1">{stats.mediumRisk}</div>
                      <div className="text-sm text-gray-400">Medium Risk</div>
                    </Card>
                  </div>

                  {/* Student Risk List */}
                  <Card className="p-5 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-[#A2F4F9] text-lg font-bold m-0 text-left">Students at Risk</h3>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setSortBy('risk')}>Sort by Risk</Button>
                        <Button variant="ghost" size="sm" onClick={() => setSortBy('name')}>Sort by Name</Button>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-[#A2F4F9] text-sm">
                            <th className="p-2 py-3">Student Name</th>
                            <th className="p-2 py-3">ID</th>
                            <th className="p-2 py-3">Risk Level</th>
                            <th className="p-2 py-3">GPA</th>
                            <th className="p-2 py-3">Attendance</th>
                            <th className="p-2 py-3 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedStudents.map((s, idx) => (
                            <tr key={idx} className="border-b border-white/10 hover:bg-white/5 transition-colors text-sm">
                              <td className="p-2 py-3 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs">{s.name.charAt(0)}</div>
                                {s.name}
                              </td>
                              <td className="p-2 py-3 text-gray-400">{s.id}</td>
                              <td className="p-2 py-3">
                                <span
                                  className="px-2 py-1 rounded-full text-xs font-semibold"
                                  style={{
                                    background: s.riskLevel === 'High' ? 'rgba(255,107,107,0.2)' : s.riskLevel === 'Medium' ? 'rgba(255,209,102,0.2)' : 'rgba(6,214,160,0.2)',
                                    color: s.riskLevel === 'High' ? '#FF6B6B' : s.riskLevel === 'Medium' ? '#FFD166' : '#06D6A0'
                                  }}
                                >
                                  {s.riskScore}% {s.riskLevel}
                                </span>
                              </td>
                              <td className="p-2 py-3">{s.gpa}</td>
                              <td className="p-2 py-3">{s.attendance}%</td>
                              <td className="p-2 py-3 text-center">
                                <Button size="sm" variant="secondary" onClick={() => openActionModal(s)}>Action</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>

                  {/* Performance Trends Chart Placeholder */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-5">
                      <h3 className="text-[#A2F4F9] text-lg font-bold m-0 mb-4 text-left">Risk Distribution</h3>
                      <div className="flex h-[200px] items-end justify-center gap-4 pt-4">
                        <div className="w-16 bg-[#FF6B6B] rounded-t-md relative flex items-center justify-center text-[#262C53] font-bold" style={{ height: `${(stats.highRisk / stats.totalStudents) * 100}%`, minHeight: '30px' }}>
                          <span className="absolute -top-6 text-white text-xs">{stats.highRisk}</span>
                        </div>
                        <div className="w-16 bg-[#FFD166] rounded-t-md relative flex items-center justify-center text-[#262C53] font-bold" style={{ height: `${(stats.mediumRisk / stats.totalStudents) * 100}%`, minHeight: '30px' }}>
                          <span className="absolute -top-6 text-white text-xs">{stats.mediumRisk}</span>
                        </div>
                        <div className="w-16 bg-[#06D6A0] rounded-t-md relative flex items-center justify-center text-[#262C53] font-bold" style={{ height: `${(stats.lowRisk / stats.totalStudents) * 100}%`, minHeight: '30px' }}>
                          <span className="absolute -top-6 text-white text-xs">{stats.lowRisk}</span>
                        </div>
                      </div>
                      <div className="flex justify-center gap-4 mt-2 text-xs text-gray-400">
                        <span>High</span>
                        <span>Medium</span>
                        <span>Low</span>
                      </div>
                    </Card>

                    <Card className="p-5">
                      <h3 className="text-[#A2F4F9] text-lg font-bold m-0 mb-4 text-left">Recent Notifications</h3>
                      <div className="space-y-3">
                        {mentorData.notifications.map((n, i) => (
                          <div key={i} className="flex gap-3 text-sm items-start p-2 hover:bg-white/5 rounded-md transition-colors">
                            <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${n.type === 'alert' ? 'bg-[#FF6B6B]' : n.type === 'message' ? 'bg-[#A2F4F9]' : 'bg-[#FFD166]'}`}></div>
                            <div>
                              <div className="text-gray-200">{n.text}</div>
                              <div className="text-xs text-gray-500 mt-1">{n.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                </div>
              </main>
            )}

            {/* Analytics page */}
            {activePage === "analyticsPage" && (
              <section className="card" id="analyticsPage" style={{ display: "block", gridColumn: "1 / -1" }}>
                <h3>Analytics</h3>
                <p className="muted">Quick analytics for your mentees. Charts are rendered when this page is opened.</p>

                <div className="sp-12"></div>

                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 320 }} className="card">
                    <h4 style={{ margin: "6px 0" }}>Risk Distribution</h4>
                    <canvas ref={riskPieRef} id="riskPie"></canvas>
                  </div>

                  <div style={{ flex: 1, minWidth: 320 }} className="card">
                    <h4 style={{ margin: "6px 0" }}>Attendance Distribution</h4>
                    <canvas ref={attendanceDistRef} id="attendanceDist"></canvas>
                  </div>

                  <div style={{ flex: 1, minWidth: 320 }} className="card">
                    <h4 style={{ margin: "6px 0" }}>Fees Collected</h4>
                    <canvas ref={feeBarsRef} id="feeBars"></canvas>
                  </div>

                  <div style={{ flex: 1, minWidth: 320 }} className="card">
                    <h4 style={{ margin: "6px 0" }}>GPA / Performance Trend</h4>
                    <canvas ref={perfLineRef} id="perfLine"></canvas>
                  </div>
                </div>
              </section>
            )}

            {/* Profile */}
            {activePage === "profilePage" && (
              <section className="card" id="profilePage" style={{ display: "block", gridColumn: "1 / -1" }}>
                <h3>Profile</h3>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p><b>{profileName}</b></p>
                    <p className="muted">Department: {profileDept}</p>
                    <p className="muted">Email: {profileEmail}</p>
                  </div>
                  <div>
                    <button className="btn primary" onClick={() => openModal("Edit Profile", "Edit profile.")}>Edit</button>
                  </div>
                </div>
              </section>
            )}

            {/* Students */}
            {activePage === "studentsPage" && (
              <section className="card" id="studentsPage" style={{ display: "block", gridColumn: "1 / -1" }}>
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                  <h2 className="text-[#A2F4F9] text-xl font-bold m-0 text-left">Your Students</h2>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search by name or ID..."
                      className="w-48"
                    />
                    <Button variant="ghost">Filter</Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {studentList.map(s => (
                    <Card key={s.id} className="p-5 cursor-pointer hover:-translate-y-1 hover:border-[#A2F4F9]/30 transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-sm">{s.name.charAt(0)}</div>
                          <div>
                            <div className="font-bold">{s.name}</div>
                            <div className="text-xs text-gray-400">{s.id}</div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-gray-300">
                        <div className="flex justify-between">
                          <span>Risk Level:</span>
                          <span className="font-semibold" style={{ color: s.riskLevel === 'High' ? '#FF6B6B' : s.riskLevel === 'Medium' ? '#FFD166' : '#06D6A0' }}>{s.riskLevel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>GPA:</span>
                          <span>{s.gpa}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Attendance:</span>
                          <span>{s.attendance}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Last Check-in:</span>
                          <span>{s.lastCheckin}</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/10 flex gap-2">
                        <Button size="sm" variant="ghost" className="flex-1" onClick={() => openActionModal(s)}>Action</Button>
                        <Button size="sm" variant="secondary" className="flex-1">Profile</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Attendance */}
            {activePage === "attendancePage" && (
              <section className="card" id="attendancePage" style={{ display: "block", gridColumn: "1 / -1" }}>
                <h3>Mark Attendance (Today)</h3>
                <div style={{ height: 8 }}></div>
                <table>
                  <thead><tr><th>Student</th><th>Roll</th><th>Present</th></tr></thead>
                  <tbody id="attendanceTable">
                    {mentor.mentees.map((s) => {
                      const checked = !!mentor.attendanceToday?.[s.id];
                      return (
                        <tr key={s.id}>
                          <td>{s.name}</td>
                          <td>{s.id}</td>
                          <td><input type="checkbox" checked={checked} onChange={(e) => handleAttendanceToggle(s.id, e.target.checked)} /></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div style={{ height: 12 }}></div>
                <button className="btn primary" onClick={saveAttendance}>Save Attendance</button>
              </section>
            )}

            {/* Assignments */}
            {activePage === "assignmentsPage" && (
              <section className="card" id="assignmentsPage" style={{ display: "block", gridColumn: "1 / -1" }}>
                <h3>Assignments</h3>
                <table>
                  <thead><tr><th>Assignment</th><th>Course</th><th>Due</th><th>Action</th></tr></thead>
                  <tbody id="assignmentsTable">
                    {mentor.assignments.map((a) => (
                      <tr key={a.id}>
                        <td>{a.title}</td>
                        <td>{a.course || "-"}</td>
                        <td>{a.due}</td>
                        <td><button className="btn ghost" onClick={() => openModal("Assignment", `${a.title} — details.`)}>View</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ height: 12 }}></div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input id="newAssnTitle" className="input" placeholder="Assignment title" />
                  <input id="newAssnCourse" className="input" placeholder="Course code" />
                  <input id="newAssnDue" className="input" placeholder="Due date" />
                  <button className="btn primary" onClick={() => {
                    const t = document.getElementById("newAssnTitle").value;
                    const c = document.getElementById("newAssnCourse").value;
                    const d = document.getElementById("newAssnDue").value;
                    createAssignment(t, c, d);
                  }}>Create</button>
                </div>
              </section>
            )}

            {/* Submissions */}
            {activePage === "submissionsPage" && (
              <section className="card" id="submissionsPage" style={{ display: "block", gridColumn: "1 / -1" }}>
                <h3>Submissions</h3>
                <table>
                  <thead><tr><th>Student</th><th>Assignment</th><th>Status</th><th>Grade</th><th>Action</th></tr></thead>
                  <tbody id="submissionsTable">
                    {mentor.submissions.map((su) => {
                      const stud = mentor.mentees.find((m) => m.id === su.studId) || { name: su.studId };
                      const assn = mentor.assignments.find((a) => a.id === su.assignId) || { title: su.assignId };
                      return (
                        <tr key={`${su.studId}-${su.assignId}`}>
                          <td>{stud.name}</td>
                          <td>{assn.title}</td>
                          <td>{su.status}</td>
                          <td>{su.grade === null ? "-" : su.grade}</td>
                          <td>
                            <button className="btn ghost" onClick={() => openModal("Submission", (
                              <div>
                                <div><b>Student:</b> {su.studId}</div>
                                <div><b>Assignment:</b> {su.assignId}</div>
                                <div><b>File:</b> {su.file || "—"}</div>
                                <div style={{ height: 10 }}></div>
                                <div style={{ display: "flex", gap: 8 }}>
                                  <input id="gradeInput" className="input" placeholder="Grade (0-10)" />
                                  <button className="btn primary" onClick={() => {
                                    const val = document.getElementById("gradeInput").value;
                                    gradeSubmission(su.studId, su.assignId, val);
                                    closeModal();
                                  }}>Grade</button>
                                </div>
                              </div>
                            ))}>Open</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </section>
            )}

            {/* Exams */}
            {activePage === "examsPage" && (
              <section className="card" id="examsPage" style={{ display: "block", gridColumn: "1 / -1" }}>
                <h3>Exams & Results</h3>
                <table>
                  <thead><tr><th>Student</th><th>Subject</th><th>Marks</th><th>Result</th></tr></thead>
                  <tbody id="examsTable">
                    {mentor.exams.map((e, idx) => {
                      const stud = mentor.mentees.find((m) => m.id === e.studId);
                      return (
                        <tr key={`${e.studId}-${idx}`}>
                          <td>{stud ? stud.name : e.studId}</td>
                          <td>{e.subject}</td>
                          <td>{e.marks}%</td>
                          <td>{e.marks < 50 ? "Fail" : e.marks < 65 ? "Pass" : "Good"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </section>
            )}

            {/* Performance */}
            {activePage === "performancePage" && (
              <section className="card" id="performancePage" style={{ display: "block", gridColumn: "1 / -1" }}>
                <h3>Performance Analysis</h3>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 320 }}><canvas ref={perfBarSmallRef} id="perfBarSmall"></canvas></div>
                  <div style={{ flex: 1, minWidth: 320 }}><canvas ref={perfLineSmallRef} id="perfLineSmall"></canvas></div>
                </div>
              </section>
            )}

            {/* Notices */}
            {activePage === "noticesPage" && (
              <section className="card" id="noticesPage" style={{ display: "block", gridColumn: "1 / -1" }}>
                <h3>Notices & Announcements</h3>
                <div id="noticesList">
                  {mentor.notices.map((n) => (
                    <div key={n.id} style={{ marginBottom: 8 }}>
                      <div style={{ background: "var(--soft)", padding: 10, borderRadius: 8 }}>
                        <b>{n.title}</b>
                        <div className="muted" style={{ fontSize: 13 }}>{n.date}</div>
                        <div style={{ marginTop: 8 }}>{n.body}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Fees */}
            {activePage === "feesPage" && (
              <section className="card" id="feesPage" style={{ display: "block", gridColumn: "1 / -1" }}>
                <h3>Fees Overview</h3>
                <table>
                  <thead><tr><th>Student</th><th>FEE DUE STATUS</th></tr></thead>
                  <tbody id="feesTable">
                    {mentor.mentees.map((s) => {
                      // const pending = (s.finance?.total || 0) - (s.finance?.paid || 0) + (s.finance?.others || 0);
                      var fee_due = "YES"
                      return (
                        <tr key={s.id}>
                          <td>{s.name}</td>
                          {/* <td>{rupee(s.finance?.total || 0)}</td> */}
                          {/* <td>{rupee(s.finance?.paid || 0)}</td> */}
                          <td>{(fee_due)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </section>
            )}

          </div> {/* grid */}
        </main>
      </div> {/* container */}

      {/* Modal */}
      {modal.open && (
        <div id="modal" style={{ position: "fixed", left: 0, top: 0, width: "100%", height: "100%", background: "rgba(17,11,34,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "var(--card)", padding: 18, borderRadius: 10, maxWidth: 720, width: "92%", boxShadow: "0 12px 36px rgba(0,0,0,0.25)", color: "var(--text-dark)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 id="modalTitle">{modal.title}</h3>
              <button onClick={closeModal} style={{ border: "none", background: "transparent", fontSize: 20, cursor: "pointer", color: "var(--text-dark)" }}>✕</button>
            </div>
            <div id="modalBody" style={{ marginTop: 12, color: "var(--text-dark)" }}>{modal.body}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorDashboard;
