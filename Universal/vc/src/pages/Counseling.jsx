import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Counseling = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('interestPage');
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const toggleProfileDropdown = () => setProfileDropdownVisible(!profileDropdownVisible);
  const [actions, setActions] = useState([
    { id: '1', title: 'Complete Math integrals assignment', category: 'Assignment', priority: 'High', due: '2024-12-28', status: 'pending' },
    { id: '2', title: 'Attend extra Math class', category: 'Attendance', priority: 'High', due: '2024-12-27', status: 'pending' },
    { id: '3', title: 'Review Weak Areas (Math & Physics)', category: 'Goal', priority: 'High', due: '2024-12-30', status: 'pending' }
  ]);
  const [goals, setGoals] = useState([]);
  const [uploadedResources, setUploadedResources] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('prio');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Assignment');
  const [newTaskPriority, setNewTaskPriority] = useState('High');
  const [newTaskDue, setNewTaskDue] = useState('');
  const [googleSearch, setGoogleSearch] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const [interest, setInterest] = useState('');
  const [skillLevel, setSkillLevel] = useState('Beginner');
  const [timeline, setTimeline] = useState('6 months');
  const [goal, setGoal] = useState('');
  const [roadmap, setRoadmap] = useState([]);
  const [savedRoadmaps, setSavedRoadmaps] = useState([]);
  const [currentRoadmapName, setCurrentRoadmapName] = useState('');
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalDeadline, setNewGoalDeadline] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');

  const studentData = {
    name: 'Alice Kumar',
    dept: 'CSE',
    year: '2nd Yr',
    id: '21CSE045',
    mentors: [
      { id: 1, name: 'Dr. Rajesh Kumar', subject: 'Mathematics', message: 'Your algebra score is improving! Keep practicing.', avatar: 'RK' },
      { id: 2, name: 'Prof. Priya Singh', subject: 'Physics', message: 'Attend the extra classes for better understanding.', avatar: 'PS' },
      { id: 3, name: 'Ms. Anjali Verma', subject: 'English', message: 'Great improvement in writing skills!', avatar: 'AV' }
    ],
    subjects: [
      { name: 'Mathematics', score: 42, target: 70, weakTopics: ['Integrals', 'Calculus'] },
      { name: 'Data Structures', score: 65, target: 75, weakTopics: ['Trees', 'Graphs'] },
      { name: 'Operating Systems', score: 58, target: 70, weakTopics: ['Process Sync', 'Memory Management'] }
    ]
  };

  const getDueLabel = (due) => {
    if (!due) return '';
    const today = new Date();
    const dd = new Date(due);
    const diff = Math.ceil((dd - today) / (1000 * 60 * 60 * 24));
    if (diff > 1) return `${diff} days`;
    if (diff === 1) return 'Tomorrow';
    if (diff === 0) return 'Today';
    return 'Overdue';
  };

  const getPriorityDot = (priority) => {
    if (priority === 'High') return 'prio-high';
    if (priority === 'Medium') return 'prio-med';
    return 'prio-low';
  };

  const getPriorityPill = (priority) => {
    if (priority === 'High') return 'pill high';
    if (priority === 'Medium') return 'pill med';
    return 'pill low';
  };

  const getBadgeClass = (category) => {
    const map = {
      'Assignment': 'badge-assignment',
      'Attendance': 'badge-attendance',
      'Exam': 'badge-exam',
      'Project': 'badge-project',
      'Wellness': 'badge-wellness',
      'Goal': 'badge-goal',
      'Personal': 'badge-personal'
    };
    return map[category] || 'badge-personal';
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) {
      alert('Please enter a task title');
      return;
    }
    setActions([...actions, {
      id: Date.now().toString(),
      title: newTaskTitle,
      category: newTaskCategory,
      priority: newTaskPriority,
      due: newTaskDue,
      status: 'pending'
    }]);
    setNewTaskTitle('');
    setNewTaskDue('');
  };

  const handleMarkDone = (id) => {
    setActions(actions.map(a => a.id === id ? { ...a, status: 'done' } : a));
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Delete this task?')) {
      setActions(actions.filter(a => a.id !== id));
    }
  };

  const handleAddGoal = () => {
    if (!newGoalTitle || !newGoalDeadline || !newGoalTarget) {
      alert('Please fill all fields');
      return;
    }
    setGoals([...goals, {
      id: Date.now().toString(),
      title: newGoalTitle,
      deadline: newGoalDeadline,
      target: parseInt(newGoalTarget),
      current: 0
    }]);
    setNewGoalTitle('');
    setNewGoalDeadline('');
    setNewGoalTarget('');
  };

  const handleGoogleSearch = () => {
    if (googleSearch.trim()) {
      window.open('https://www.google.com/search?q=' + encodeURIComponent(googleSearch), '_blank');
      setSearchHistory([googleSearch, ...searchHistory]);
      setGoogleSearch('');
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      setUploadedResources([...uploadedResources, {
        id: Date.now().toString(),
        name: file.name
      }]);
    });
  };

  const filteredActions = () => {
    let result = actions.slice();
    if (filterCategory !== 'all') result = result.filter(a => a.category === filterCategory);
    if (sortBy === 'prio') {
      const order = { High: 0, Medium: 1, Low: 2 };
      result.sort((a, b) => order[a.priority] - order[b.priority]);
    } else if (sortBy === 'due') {
      result.sort((a, b) => (a.due || '9999-12-31').localeCompare(b.due || '9999-12-31'));
    }
    return result;
  };

  const progressPercent = actions.length > 0 ? Math.round((actions.filter(a => a.status === 'done').length / actions.length) * 100) : 0;

  const roadmapLibrary = {
    "Data Science": {
      steps: ["Learn Python + basic stats", "Pandas/Numpy hands-on", "SQL querying", "Intro ML: regression + classification", "Portfolio: 2 mini projects", "Share work + seek feedback"],
      resources: ["https://www.coursera.org/learn/python-for-data-analysis", "https://www.kaggle.com/learn", "https://pandas.pydata.org/docs/", "Book: 'Hands-On ML' by Aurélien Géron"],
      difficulty: "Medium",
      timePerWeek: "10-15 hrs",
      certification: "Google Data Analytics Certificate",
      jobTitles: ["Data Analyst", "Data Scientist", "ML Engineer"],
      successRate: "78%"
    },
    "Web Development": {
      steps: ["HTML/CSS basics", "JavaScript fundamentals", "Frontend framework (React)", "APIs + auth basics", "Build and deploy a small app", "Document learnings weekly"],
      resources: ["https://www.freecodecamp.org/learn/responsive-web-design/", "https://javascript.info/", "https://react.dev/learn", "https://www.netlify.com/ (free hosting)"],
      difficulty: "Medium",
      timePerWeek: "12-18 hrs",
      certification: "Meta Front-End Developer",
      jobTitles: ["Frontend Developer", "Full Stack Developer", "Web Developer"],
      successRate: "82%"
    },
    "Cybersecurity": {
      steps: ["Networking fundamentals", "Linux + command line", "OWASP Top 10", "Try hack boxes / labs", "Document findings", "Pick a niche (cloud/app)"],
      resources: ["https://www.tryhackme.com/", "https://www.hackthebox.com/", "https://www.coursera.org/learn/cybersecurity", "OWASP Top 10 Guide"],
      difficulty: "Hard",
      timePerWeek: "15-20 hrs",
      certification: "CompTIA Security+",
      jobTitles: ["Security Analyst", "Penetration Tester", "Security Engineer"],
      successRate: "65%"
    },
    "Mobile App Development": {
      steps: ["Pick platform (Android/iOS/Cross)", "Learn Kotlin/Swift or Flutter", "Build UI with navigation", "Connect to backend/APIs", "Publish a simple app", "Collect user feedback"],
      resources: ["https://www.udacity.com/course/android-developer-nanodegree", "https://www.appbrewery.co/p/flutter-development-bootcamp-with-dart/", "https://developer.apple.com/swift/"],
      difficulty: "Medium-Hard",
      timePerWeek: "14-16 hrs",
      certification: "Android/iOS Developer Certification",
      jobTitles: ["Mobile App Developer", "iOS Developer", "Android Developer"],
      successRate: "71%"
    },
    "AI/Machine Learning": {
      steps: ["Math foundations (linear algebra, probability)", "Python + libraries (sklearn, TensorFlow)", "Build & evaluate models", "Work on Kaggle datasets", "Study deep learning basics", "Deploy a simple model"],
      resources: ["https://www.deeplearning.ai/", "https://www.fast.ai/", "https://www.tensorflow.org/learn", "Andrew Ng's ML Specialization"],
      difficulty: "Hard",
      timePerWeek: "18-25 hrs",
      certification: "TensorFlow Developer Certificate",
      jobTitles: ["ML Engineer", "AI Researcher", "Deep Learning Engineer"],
      successRate: "58%"
    },
    "Cloud Computing": {
      steps: ["Understand cloud basics (AWS/Azure/GCP)", "Learn virtualization & containers", "Deploy a simple app on cloud", "Study networking & security", "Get a foundational certification", "Build a cloud portfolio"],
      resources: ["https://aws.amazon.com/training/", "https://www.coursera.org/learn/cloud-computing-basics", "https://cloud.google.com/training"],
      difficulty: "Medium",
      timePerWeek: "12-14 hrs",
      certification: "AWS Solutions Architect Associate",
      jobTitles: ["Cloud Engineer", "Cloud Architect", "DevOps Engineer"],
      successRate: "75%"
    },
    "UI/UX Design": {
      steps: ["Learn design principles", "Master Figma or Adobe XD", "Study user research methods", "Create wireframes & prototypes", "Build a portfolio of 3 projects", "Seek design critiques"],
      resources: ["https://www.interaction-design.org/", "https://www.figma.com/resources/learn-design/", "https://www.nngroup.com/articles/"],
      difficulty: "Medium",
      timePerWeek: "10-14 hrs",
      certification: "Google UX Design Certificate",
      jobTitles: ["UI Designer", "UX Designer", "Product Designer"],
      successRate: "79%"
    },
    "Content Writing": {
      steps: ["Read widely & analyze styles", "Practice daily writing (blogs, journals)", "Learn SEO basics", "Create a portfolio blog", "Pitch to publications", "Build an audience"],
      resources: ["https://www.coursera.org/learn/writing", "https://www.moz.com/learn/seo", "Medium.com", "HubSpot Content Academy"],
      difficulty: "Easy",
      timePerWeek: "8-12 hrs",
      certification: "HubSpot Content Marketing Certificate",
      jobTitles: ["Content Writer", "Technical Writer", "Copywriter"],
      successRate: "85%"
    },
    "Finance & Investing": {
      steps: ["Understand personal finance basics", "Learn stock market fundamentals", "Study financial statements", "Practice paper trading", "Read classic investing books", "Track your portfolio"],
      resources: ["https://www.investopedia.com/", "https://www.coursera.org/learn/finance-for-non-financial", "Intelligent Investor by Benjamin Graham"],
      difficulty: "Medium",
      timePerWeek: "10-12 hrs",
      certification: "CFAP - Certified Financial Planner",
      jobTitles: ["Financial Analyst", "Investment Advisor", "Portfolio Manager"],
      successRate: "72%"
    },
    "Entrepreneurship": {
      steps: ["Identify a problem worth solving", "Validate idea with users", "Build an MVP", "Learn basic marketing", "Pitch to mentors/investors", "Iterate based on feedback"],
      resources: ["https://www.ycombinator.com/startup-school/", "Lean Startup by Eric Ries", "https://www.coursera.org/learn/entrepreneurship"],
      difficulty: "Hard",
      timePerWeek: "20-30 hrs",
      certification: "Self-driven (Build your startup!)",
      jobTitles: ["Entrepreneur", "Startup Founder", "Business Owner"],
      successRate: "35%"
    },
    "Public Speaking": {
      steps: ["Join Toastmasters or similar", "Practice short speeches weekly", "Record and review yourself", "Learn storytelling techniques", "Speak at local events", "Get feedback and iterate"],
      resources: ["https://www.toastmasters.org/", "https://www.coursera.org/learn/professional-communication", "TED Talks Analysis"],
      difficulty: "Easy",
      timePerWeek: "5-8 hrs",
      certification: "Toastmasters Competent Communicator",
      jobTitles: ["Public Speaker", "Trainer", "Corporate Communicator"],
      successRate: "88%"
    },
    "Healthcare/Medicine": {
      steps: ["Master foundational sciences", "Shadow professionals", "Volunteer in healthcare settings", "Prepare for entrance exams", "Build soft skills (empathy, communication)", "Stay updated with research"],
      resources: ["https://www.Khan Academy.com/science", "Medical textbooks", "Research journals"],
      difficulty: "Hard",
      timePerWeek: "25-30 hrs",
      certification: "Medical License (country-specific)",
      jobTitles: ["Doctor", "Surgeon", "Healthcare Professional"],
      successRate: "45%"
    },
    "Teaching/Education": {
      steps: ["Learn pedagogy basics", "Practice explaining concepts simply", "Create lesson plans", "Tutor or volunteer teach", "Get feedback from learners", "Explore ed-tech tools"],
      resources: ["https://www.coursera.org/learn/learning-how-to-learn", "https://www.edx.org/course/pedagogy", "Teaching blogs and communities"],
      difficulty: "Medium",
      timePerWeek: "12-16 hrs",
      certification: "Teaching Certificate (country-specific)",
      jobTitles: ["Teacher", "Tutor", "Educator"],
      successRate: "80%"
    }
  };

  const buildRoadmap = () => {
    if (!interest) {
      alert('Please select an interest');
      return;
    }
    const roadmapData = roadmapLibrary[interest];
    const goalStep = goal ? [`📍 Your Goal: ${goal}`] : [];
    setRoadmap([...goalStep, ...roadmapData.steps]);
    setCurrentRoadmapName(`${interest} (${skillLevel}, ${timeline})`);
  };

  const saveRoadmap = () => {
    if (roadmap.length === 0) {
      alert('Generate a roadmap first!');
      return;
    }
    const name = prompt('Name this roadmap:', currentRoadmapName) || currentRoadmapName;
    setSavedRoadmaps([...savedRoadmaps, {
      id: Date.now().toString(),
      name,
      interest,
      skillLevel,
      timeline,
      goal,
      steps: roadmap,
      savedDate: new Date().toLocaleDateString()
    }]);
    alert('Roadmap saved!');
  };

  const mentorDatabase = {
    "Data Science": { name: "Dr. Ankit Sharma", expertise: "ML & Data Analytics", avatar: "AS", message: "Let's build your ML portfolio!" },
    "Web Development": { name: "Prof. Ravi Kumar", expertise: "Full-Stack Development", avatar: "RK", message: "I'll guide you through React & Node.js" },
    "Cybersecurity": { name: "Ms. Priya Singh", expertise: "Network Security", avatar: "PS", message: "Ethical hacking is a great career path" },
    "Mobile App Development": { name: "Dev Patel", expertise: "Flutter & Kotlin", avatar: "DP", message: "Let's build your first mobile app" },
    "AI/Machine Learning": { name: "Dr. Vikram Gupta", expertise: "Deep Learning", avatar: "VG", message: "Neural networks are fascinating!" },
    "Cloud Computing": { name: "Cloud Expert Michael", expertise: "AWS & Azure", avatar: "CM", message: "Cloud skills are in high demand" },
    "UI/UX Design": { name: "Designer Lisa Chen", expertise: "Product Design", avatar: "LC", message: "User experience is everything" },
    "Content Writing": { name: "Rahul Writer", expertise: "Technical Writing", avatar: "RW", message: "Great storytelling attracts readers" },
    "Finance & Investing": { name: "Investor Rohan", expertise: "Stock Market", avatar: "IR", message: "Smart investing starts early" },
    "Entrepreneurship": { name: "Founder Zainab", expertise: "Startup Strategy", avatar: "FZ", message: "Let's turn your idea into reality" },
    "Public Speaking": { name: "Coach Sarah", expertise: "Communication", avatar: "CS", message: "Your voice matters!" },
    "Healthcare/Medicine": { name: "Dr. Amit Verma", expertise: "Medical Science", avatar: "AV", message: "Healthcare is a noble profession" },
    "Teaching/Education": { name: "Prof. Elena Rodriguez", expertise: "Pedagogy", avatar: "ER", message: "Teaching shapes the future" }
  };

  const clearCompleted = () => {
    if (window.confirm('Clear all completed actions?')) {
      setActions(actions.filter(a => a.status !== 'done'));
    }
  };

  return (
    <div style={{ background: '#192047', minHeight: '100vh', color: '#F7FAFC', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        :root { --c1: #192047; --c2: #FFD1D8; --c3: #262C53; --c4: #A2F4F9; --text-dark: #F7FAFC; --muted: #7b7b8a; --soft: #1a2349; --success: #16a34a; --warning: #f59e0b; --danger: #ff6b6b; --info: #3b82f6; }
        * { box-sizing: border-box; margin: 0; }
        .topbar { background: #262C53; color: #fff; padding: 14px 20px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 8px 24px rgba(34,11,89,0.12); position: sticky; top: 0; z-index: 40; }
        .brand { display: flex; align-items: center; gap: 12px; }
        .logo { width: 44px; height: 44px; border-radius: 10px; background: rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; }
        .top-right { display: flex; align-items: center; gap: 20px; position: relative; }
        .muted { color: #7b7b8a; }
        .profile-mini { display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.12); padding: 6px 10px; border-radius: 999px; cursor: pointer; position: relative; }
        .profile-mini .avatar { width: 34px; height: 34px; border-radius: 50%; background: #A2F4F9; color: #262C53; display: flex; align-items: center; justify-content: center; font-weight: 700; }
        .profile-dropdown { position: absolute; top: 45px; right: 0; background: #262C53; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 8px 0; min-width: 150px; z-index: 100; display: none; }
        .profile-dropdown.show { display: block; }
        .profile-dropdown button { display: block; width: 100%; padding: 10px 16px; border: none; background: transparent; color: #F7FAFC; cursor: pointer; text-align: left; font-size: 14px; font-family: inherit; }
        .profile-dropdown button:hover { background: rgba(255,255,255,0.1); }
        .container { display: flex; gap: 18px; padding: 20px; max-width: 1400px; margin: 20px auto; }
        aside.sidebar { width: 240px; border-radius: 14px; padding: 16px; background: #262C53; flex-shrink: 0; height: fit-content; max-height: calc(100vh - 100px); overflow-y: auto; }
        .sidebar h2 { font-size: 14px; margin: 0 0 12px 0; color: #A2F4F9; }
        .nav-item { display: block; padding: 10px; border-radius: 10px; margin-bottom: 8px; color: #7b7b8a; cursor: pointer; border: none; width: 100%; text-align: left; font-family: inherit; background: transparent; transition: all 0.2s; }
        .nav-item.active { background: #A2F4F9; color: #262C53; font-weight: 600; }
        .nav-item:hover { background: rgba(255,255,255,0.06); color: #A2F4F9; }
        main.main { flex: 1; overflow-y: auto; max-height: calc(100vh - 100px); }
        .grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 18px; }
        .card { background: #262C53; padding: 16px; border-radius: 12px; box-shadow: 0 6px 20px rgba(15,12,36,0.06); }
        .stat-card { background: #1a2349; padding: 16px; border-radius: 10px; text-align: center; }
        .stat-number { font-size: 24px; font-weight: 700; margin: 8px 0; color: #A2F4F9; }
        .stat-label { font-size: 12px; color: #7b7b8a; }
        .progress-bar { height: 8px; background: #1a2349; border-radius: 10px; overflow: hidden; margin: 8px 0; }
        .progress-fill { height: 100%; background: #A2F4F9; transition: width 0.3s; }
        .btn { padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; transition: all 0.2s; font-family: inherit; font-size: 14px; }
        .btn.primary { background: #A2F4F9; color: #262C53; }
        .btn.secondary { background: #3b82f6; color: white; }
        .btn.success { background: #16a34a; color: white; }
        .btn.ghost { background: #1a2349; border: 1px solid rgba(255,255,255,0.1); color: #F7FAFC; }
        .btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
        .task { display: flex; justify-content: space-between; gap: 12px; padding: 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.02); align-items: center; margin-bottom: 8px; background: linear-gradient(180deg, rgba(255,255,255,0.01), transparent); }
        .task-left { display: flex; gap: 12px; align-items: center; flex: 1; min-width: 0; }
        .task-body { min-width: 0; flex: 1; }
        .task-body h4 { margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 14px; font-weight: 600; }
        .task-meta { font-size: 12px; color: #7b7b8a; margin-top: 4px; }
        .dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .prio-high { background: linear-gradient(90deg, #ff6b6b, #ff8b8b); }
        .prio-med { background: linear-gradient(90deg, #f59e0b, #ffc786); }
        .prio-low { background: linear-gradient(90deg, #16a34a, #9ef0b5); }
        .pill { padding: 6px 8px; border-radius: 999px; font-size: 13px; display: inline-block; white-space: nowrap; margin-right: 4px; }
        .pill.high { background: rgba(246,85,85,0.08); color: #ff6b6b; }
        .pill.med { background: rgba(255,159,67,0.08); color: #f59e0b; }
        .pill.low { background: rgba(40,199,111,0.08); color: #16a34a; }
        .badge { padding: 4px 8px; border-radius: 6px; font-size: 12px; display: inline-block; margin-right: 8px; }
        .badge-assignment { background: rgba(96,211,255,0.08); color: #A2F4F9; }
        .badge-goal { background: rgba(120,210,160,0.08); color: #34b28a; }
        input, select, textarea { background: #1a2349; border: 1px solid rgba(255,255,255,0.04); padding: 8px; border-radius: 8px; color: #F7FAFC; font-family: inherit; width: 100%; margin-bottom: 8px; }
        input:focus, select:focus, textarea:focus { outline: none; border-color: #A2F4F9; }
        .mentor-card { background: #1a2349; padding: 12px; border-radius: 8px; margin-bottom: 12px; border-left: 3px solid #A2F4F9; display: flex; gap: 12px; align-items: flex-start; }
        .mentor-avatar { width: 40px; height: 40px; border-radius: 50%; background: #A2F4F9; color: #262C53; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; }
        .mood-options { display: flex; gap: 8px; margin: 12px 0; }
        .mood-option { flex: 1; padding: 12px; border-radius: 8px; text-align: center; cursor: pointer; background: #1a2349; border: none; color: #F7FAFC; font-family: inherit; transition: all 0.2s; font-size: 24px; }
        .mood-option:hover { transform: scale(1.05); background: #262C53; }
        .mood-option.selected { background: #A2F4F9; color: #262C53; font-weight: 600; }
        .risk-indicator { padding: 8px 16px; border-radius: 20px; font-weight: 700; font-size: 14px; display: inline-block; }
        .risk-medium { background: #f59e0b; color: black; }
        .pyq-card { background: #1a2349; padding: 12px; border-radius: 8px; cursor: pointer; text-align: center; transition: all 0.2s; border: none; color: #F7FAFC; font-family: inherit; }
        .pyq-card:hover { transform: translateY(-2px); background: #262C53; }
        hr { border: none; height: 1px; background: rgba(255,255,255,0.03); margin: 10px 0; }
        h2 { margin: 0 0 12px 0; }
        h3 { margin-top: 0; }
        h4 { margin: 0 0 12px 0; }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 8px; border-bottom: 1px solid rgba(255,255,255,0.1); font-weight: 600; font-size: 12px; }
        td { padding: 8px; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 13px; }
        .row { display: flex; gap: 12px; margin-bottom: 12px; }
        .flex-1 { flex: 1; }
        small { font-size: 12px; color: #7b7b8a; }
      `}
      </style>

      {/* Topbar */}
      <div className="topbar">
        <div className="brand">
          <div className="logo">AIT</div>
          <div style={{ fontSize: '14px', opacity: 0.95 }}>ABC Institute of Technology</div>
        </div>
        <div className="top-right">
          <div className="muted">{new Date().toDateString()}</div>
          <div className="profile-mini" onClick={toggleProfileDropdown}>
            <div className="avatar">A</div>
            <div>{studentData.name}<br /><small>{studentData.dept}, {studentData.year}</small></div>
            {profileDropdownVisible && (
              <div className="profile-dropdown show">
                <button>Profile</button>
                <button>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="container">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2>Navigation</h2>
          {[
            { id: 'interestPage', label: '🧭 Interest Explorer', icon: '🧭' },
            { id: 'actionsPage', label: '✅ Suggested Actions', icon: '✅' },
            { id: 'goalsPage', label: '🎯 Goal Setting', icon: '🎯' },
            { id: 'resourcesPage', label: '📚 Resources', icon: '📚' }
          ].map(item => (
            <button key={item.id} className={`nav-item ${activePage === item.id ? 'active' : ''}`} onClick={() => setActivePage(item.id)}>
              {item.label}
            </button>
          ))}
          <hr />
          <div style={{ padding: '12px', background: '#1a2349', borderRadius: '10px', marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', color: '#7b7b8a', marginBottom: '8px' }}>Your Learning Journey</div>
            <div style={{ fontSize: '14px', marginBottom: '8px', fontWeight: 700 }}>In Progress</div>
            <div style={{ fontSize: '12px', marginBottom: '8px' }}>{interest || 'Pick an interest'}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '11px' }}>
              <div style={{ background: 'rgba(162,244,249,0.15)', padding: '4px 8px', borderRadius: '6px' }}>{skillLevel}</div>
              <div style={{ background: 'rgba(255,209,102,0.15)', padding: '4px 8px', borderRadius: '6px' }}>{timeline}</div>
            </div>
          </div>
          {savedRoadmaps.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', color: '#A2F4F9', marginBottom: '8px', fontWeight: 700 }}>Saved Roadmaps</div>
              {savedRoadmaps.slice(0, 3).map(rm => (
                <div key={rm.id} style={{ fontSize: '11px', padding: '6px', background: '#1a2349', borderRadius: '6px', marginBottom: '4px', cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={rm.name}>
                  {rm.name}
                </div>
              ))}
            </div>
          )}
          <button className="btn primary" style={{ width: '100%', marginTop: '12px' }}>Request Mentor</button>
          <button className="nav-item" onClick={() => navigate('/')} style={{ marginTop: '8px', color: '#A2F4F9' }}>← Back to Home</button>
          <button className="nav-item" onClick={() => navigate('/dashboard')} style={{ marginTop: '4px' }}>Back to Dashboard</button>
        </aside>

        {/* Main Content */}
        <main className="main">
          <div className="grid">

            {/* INTEREST EXPLORER PAGE - MAIN FOCUS */}
            {activePage === 'interestPage' && (
              <>
                {/* Hero Section */}
                <section className="card" style={{ gridColumn: '1 / -1', background: 'linear-gradient(135deg, rgba(162,244,249,0.15) 0%, rgba(255,209,102,0.1) 100%)', padding: '32px', marginBottom: '20px' }}>
                  <div style={{ maxWidth: '700px' }}>
                    <h2 style={{ margin: '0 0 12px 0', fontSize: '32px' }}>🧭 Explore Your Career Interests</h2>
                    <p style={{ margin: '0', color: '#7b7b8a', fontSize: '16px', lineHeight: '1.6' }}>
                      Discover 13 different career paths. Pick your interest, set your skill level, choose your timeline, and get a personalized, actionable roadmap with resources, mentors, and success metrics.
                    </p>
                  </div>
                </section>

                {/* Selection Controls */}
                <section className="card" style={{ gridColumn: '1 / -1', marginBottom: '20px' }}>
                  <h3>Step 1: Select Your Interest</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                    {Object.keys(roadmapLibrary).map(interestName => (
                      <button
                        key={interestName}
                        onClick={() => setInterest(interestName)}
                        style={{
                          padding: '16px',
                          borderRadius: '10px',
                          border: interest === interestName ? '2px solid #A2F4F9' : '1px solid rgba(255,255,255,0.1)',
                          background: interest === interestName ? 'rgba(162,244,249,0.15)' : '#1a2349',
                          color: '#F7FAFC',
                          cursor: 'pointer',
                          fontWeight: interest === interestName ? 700 : 500,
                          fontSize: '14px',
                          textAlign: 'center',
                          transition: 'all 0.2s'
                        }}
                      >
                        {interestName}
                      </button>
                    ))}
                  </div>

                  {interest && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px', marginTop: '24px' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Step 2: Skill Level</label>
                        <select value={skillLevel} onChange={(e) => setSkillLevel(e.target.value)} style={{ width: '100%' }}>
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option>Advanced</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Step 3: Timeline</label>
                        <select value={timeline} onChange={(e) => setTimeline(e.target.value)} style={{ width: '100%' }}>
                          <option>3 months</option>
                          <option>6 months</option>
                          <option>1 year</option>
                          <option>2 years</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Step 4: Personal Goal (Optional)</label>
                        <input type="text" placeholder="e.g., Build a portfolio" value={goal} onChange={(e) => setGoal(e.target.value)} />
                      </div>
                    </div>
                  )}

                  {interest && (
                    <button className="btn primary" onClick={buildRoadmap} style={{ width: '100%', padding: '12px', fontSize: '16px', fontWeight: 700 }}>
                      ✨ Generate My Personalized Roadmap
                    </button>
                  )}
                </section>

                {/* Interest Metrics */}
                {interest && roadmapLibrary[interest] && (
                  <section className="card" style={{ gridColumn: '1 / -1', marginBottom: '20px' }}>
                    <h3>{interest} - Quick Stats</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
                      <div className="stat-card">
                        <div style={{ fontSize: '12px', color: '#7b7b8a' }}>Difficulty Level</div>
                        <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '8px' }}>{roadmapLibrary[interest].difficulty}</div>
                      </div>
                      <div className="stat-card">
                        <div style={{ fontSize: '12px', color: '#7b7b8a' }}>Time Commitment</div>
                        <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '8px' }}>{roadmapLibrary[interest].timePerWeek}</div>
                      </div>
                      <div className="stat-card">
                        <div style={{ fontSize: '12px', color: '#7b7b8a' }}>Success Rate</div>
                        <div style={{ fontSize: '18px', fontWeight: 700, marginTop: '8px', color: '#16a34a' }}>{roadmapLibrary[interest].successRate}</div>
                      </div>
                      <div className="stat-card">
                        <div style={{ fontSize: '12px', color: '#7b7b8a' }}>Certification</div>
                        <div style={{ fontSize: '13px', fontWeight: 700, marginTop: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{roadmapLibrary[interest].certification}</div>
                      </div>
                    </div>
                    <div style={{ marginTop: '16px' }}>
                      <h4 style={{ marginBottom: '8px' }}>Career Opportunities</h4>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {roadmapLibrary[interest].jobTitles.map((job, idx) => (
                          <span key={idx} className="pill med">{job}</span>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {/* Generated Roadmap */}
                {roadmap.length > 0 && (
                  <section className="card" style={{ gridColumn: '1 / -1', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <h3 style={{ margin: 0 }}>📍 Your Personalized Roadmap</h3>
                      <button className="btn primary" onClick={saveRoadmap} style={{ padding: '8px 16px' }}>💾 Save Roadmap</button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                      {roadmap.map((step, idx) => (
                        <div key={idx} style={{ background: 'linear-gradient(135deg, rgba(162,244,249,0.1) 0%, rgba(255,255,255,0.03) 100%)', border: '1px solid rgba(162,244,249,0.2)', padding: '16px', borderRadius: '10px', position: 'relative' }}>
                          <div style={{ position: 'absolute', top: '-12px', left: '16px', background: '#262C53', padding: '4px 8px', borderRadius: '12px', fontWeight: 700, color: '#A2F4F9', fontSize: '12px' }}>Step {idx + 1}</div>
                          <div style={{ marginTop: '12px', lineHeight: '1.5' }}>{step}</div>
                          <input type="checkbox" style={{ marginTop: '12px', width: '18px', height: '18px', cursor: 'pointer' }} />
                        </div>
                      ))}
                    </div>

                    {roadmapLibrary[interest] && (
                      <>
                        <h4 style={{ marginBottom: '12px' }}>📚 Learning Resources</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                          {roadmapLibrary[interest].resources.map((resource, idx) => (
                            <a key={idx} href={resource} target="_blank" rel="noopener noreferrer" style={{
                              padding: '12px',
                              background: '#1a2349',
                              border: '1px solid rgba(162,244,249,0.2)',
                              borderRadius: '8px',
                              color: '#A2F4F9',
                              textDecoration: 'none',
                              fontSize: '13px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              transition: 'all 0.2s'
                            }} onMouseEnter={(e) => e.target.style.background = '#262C53'} onMouseLeave={(e) => e.target.style.background = '#1a2349'}>
                              🔗 {resource.split('/').slice(-1)[0] || resource}
                            </a>
                          ))}
                        </div>

                        <h4 style={{ marginBottom: '12px' }}>👨‍🏫 Your Recommended Mentor</h4>
                        {mentorDatabase[interest] && (
                          <div style={{ background: '#1a2349', padding: '16px', borderRadius: '10px', borderLeft: '4px solid #A2F4F9', display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#A2F4F9', color: '#262C53', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '18px', flexShrink: 0 }}>
                              {mentorDatabase[interest].avatar}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 700, fontSize: '16px' }}>{mentorDatabase[interest].name}</div>
                              <div style={{ fontSize: '13px', color: '#7b7b8a' }}>{mentorDatabase[interest].expertise}</div>
                              <div style={{ marginTop: '8px', fontSize: '14px' }}>{mentorDatabase[interest].message}</div>
                            </div>
                            <button className="btn primary" style={{ padding: '8px 16px', flexShrink: 0 }}>Request Mentor</button>
                          </div>
                        )}

                        {/* ADDITIONAL SUBSECTIONS */}

                        {/* 1. Weekly Milestones */}
                        <h4 style={{ marginTop: '20px', marginBottom: '12px' }}>📅 Weekly Milestones Breakdown</h4>
                        <div style={{ background: '#1a2349', padding: '16px', borderRadius: '10px', marginBottom: '20px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                            {roadmap.slice(0, 6).map((step, idx) => {
                              const weeksPerStep = Math.ceil(parseInt(timeline.split(' ')[0]) / roadmap.length);
                              return (
                                <div key={idx} style={{ background: 'rgba(162,244,249,0.1)', border: '1px solid rgba(162,244,249,0.2)', padding: '12px', borderRadius: '8px' }}>
                                  <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>Week {(idx * weeksPerStep) + 1}-{((idx + 1) * weeksPerStep)}</div>
                                  <div style={{ fontSize: '12px', color: '#7b7b8a' }}>{step.substring(0, 50)}...</div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* 2. Skill Assessment */}
                        <h4 style={{ marginBottom: '12px' }}>🎯 Skill Level Assessment</h4>
                        <div style={{ background: '#1a2349', padding: '16px', borderRadius: '10px', marginBottom: '20px' }}>
                          <div style={{ marginBottom: '12px' }}>
                            <label style={{ fontWeight: 600, marginBottom: '8px', display: 'block' }}>Rate your current knowledge in {interest}</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              {[1, 2, 3, 4, 5].map((level) => (
                                <button key={level} className="btn ghost" style={{ flex: 1, padding: '8px', fontWeight: 700 }}>
                                  {level}
                                </button>
                              ))}
                            </div>
                            <small style={{ color: '#7b7b8a', display: 'block', marginTop: '8px' }}>1 = Beginner, 5 = Expert</small>
                          </div>
                        </div>

                        {/* 3. Prerequisites */}
                        <h4 style={{ marginBottom: '12px' }}>📋 Prerequisites & Requirements</h4>
                        <div style={{ background: '#1a2349', padding: '16px', borderRadius: '10px', marginBottom: '20px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div>
                              <div style={{ fontWeight: 700, marginBottom: '8px' }}>Required Knowledge</div>
                              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#7b7b8a' }}>
                                <li>Basic problem-solving</li>
                                <li>Computer fundamentals</li>
                                <li>Internet & tools</li>
                              </ul>
                            </div>
                            <div>
                              <div style={{ fontWeight: 700, marginBottom: '8px' }}>Helpful (Optional)</div>
                              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#7b7b8a' }}>
                                <li>Prior coding experience</li>
                                <li>Project management basics</li>
                                <li>Soft skills</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* 4. Time Estimate Per Step */}
                        <h4 style={{ marginBottom: '12px' }}>⏱️ Time Estimate Per Step</h4>
                        <div style={{ background: '#1a2349', padding: '16px', borderRadius: '10px', marginBottom: '20px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                            <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(162,244,249,0.1)', borderRadius: '8px' }}>
                              <div style={{ fontWeight: 700, fontSize: '18px', color: '#A2F4F9' }}>40-60h</div>
                              <small style={{ color: '#7b7b8a' }}>Foundation Phase</small>
                            </div>
                            <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(162,244,249,0.1)', borderRadius: '8px' }}>
                              <div style={{ fontWeight: 700, fontSize: '18px', color: '#A2F4F9' }}>80-120h</div>
                              <small style={{ color: '#7b7b8a' }}>Building Skills</small>
                            </div>
                            <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(162,244,249,0.1)', borderRadius: '8px' }}>
                              <div style={{ fontWeight: 700, fontSize: '18px', color: '#A2F4F9' }}>60-100h</div>
                              <small style={{ color: '#7b7b8a' }}>Project & Polish</small>
                            </div>
                          </div>
                          <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(255,209,102,0.1)', borderRadius: '8px', fontSize: '13px', color: '#FFD166' }}>
                            📊 Total: ~200-300 hours ({timeline} timeline)
                          </div>
                        </div>

                        {/* 5. Estimated Cost */}
                        <h4 style={{ marginBottom: '12px' }}>💰 Cost Analysis</h4>
                        <div style={{ background: '#1a2349', padding: '16px', borderRadius: '10px', marginBottom: '20px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div style={{ padding: '12px', background: 'rgba(6,214,160,0.1)', borderRadius: '8px', borderLeft: '3px solid var(--success)' }}>
                              <div style={{ fontWeight: 700, color: 'var(--success)' }}>Free Resources Available</div>
                              <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px', fontSize: '12px' }}>
                                <li>YouTube tutorials</li>
                                <li>freeCodeCamp</li>
                                <li>Open-source tools</li>
                              </ul>
                            </div>
                            <div style={{ padding: '12px', background: 'rgba(162,244,249,0.1)', borderRadius: '8px', borderLeft: '3px solid #A2F4F9' }}>
                              <div style={{ fontWeight: 700, color: '#A2F4F9' }}>Optional Premium (₹5,000-₹50,000)</div>
                              <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px', fontSize: '12px' }}>
                                <li>Certification courses</li>
                                <li>1-on-1 mentoring</li>
                                <li>Advanced tools</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* 6. Community Stats & Success Stories */}
                        <h4 style={{ marginBottom: '12px' }}>🌟 Success Stories & Community Stats</h4>
                        <div style={{ background: '#1a2349', padding: '16px', borderRadius: '10px', marginBottom: '20px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                            <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(6,214,160,0.1)', borderRadius: '8px' }}>
                              <div style={{ fontWeight: 700, fontSize: '24px', color: 'var(--success)' }}>87%</div>
                              <small style={{ color: '#7b7b8a' }}>Completion Rate</small>
                            </div>
                            <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(6,214,160,0.1)', borderRadius: '8px' }}>
                              <div style={{ fontWeight: 700, fontSize: '24px', color: 'var(--success)' }}>2,400+</div>
                              <small style={{ color: '#7b7b8a' }}>Students in this path</small>
                            </div>
                            <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(6,214,160,0.1)', borderRadius: '8px' }}>
                              <div style={{ fontWeight: 700, fontSize: '24px', color: 'var(--success)' }}>⭐ 4.8/5</div>
                              <small style={{ color: '#7b7b8a' }}>Average rating</small>
                            </div>
                          </div>
                          <div style={{ padding: '12px', background: 'rgba(255,209,102,0.1)', borderRadius: '8px' }}>
                            <div style={{ fontWeight: 700, marginBottom: '8px' }}>💬 Recent Success Story</div>
                            <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.5' }}>"Started as a complete beginner 6 months ago. Now landed a job as {interest}! The roadmap was super clear and the mentor support was invaluable." - <strong>Arjun, India</strong></p>
                          </div>
                        </div>

                        {/* 7. Career Opportunities - Real Jobs */}
                        <h4 style={{ marginBottom: '12px' }}>💼 Real Job Opportunities</h4>
                        <div style={{ background: '#1a2349', padding: '16px', borderRadius: '10px', marginBottom: '20px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                            {[
                              { title: 'Junior Developer', salary: '₹3-5 LPA', exp: '0-2 years' },
                              { title: 'Senior Developer', salary: '₹8-15 LPA', exp: '3-5 years' },
                              { title: 'Tech Lead', salary: '₹15-25 LPA', exp: '5+ years' },
                              { title: 'Freelance Expert', salary: '₹50k-2L/project', exp: 'Flexible' }
                            ].map((job, idx) => (
                              <div key={idx} style={{ padding: '12px', background: 'rgba(162,244,249,0.1)', border: '1px solid rgba(162,244,249,0.2)', borderRadius: '8px' }}>
                                <div style={{ fontWeight: 700 }}>{job.title}</div>
                                <div style={{ fontSize: '12px', color: '#A2F4F9', marginTop: '4px' }}>{job.salary}</div>
                                <small style={{ color: '#7b7b8a' }}>Exp: {job.exp}</small>
                              </div>
                            ))}
                          </div>
                          <button className="btn ghost" style={{ width: '100%', marginTop: '12px', padding: '8px' }}>🔗 View Job Postings on LinkedIn</button>
                        </div>

                        {/* 8. Progress Tracker */}
                        <h4 style={{ marginBottom: '12px' }}>📊 Your Progress Tracker</h4>
                        <div style={{ background: '#1a2349', padding: '16px', borderRadius: '10px', marginBottom: '20px' }}>
                          <div style={{ marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                              <span>Overall Progress</span>
                              <span style={{ fontWeight: 700 }}>0%</span>
                            </div>
                            <div className="progress-bar" style={{ height: '12px' }}><div className="progress-fill" style={{ width: '0%' }}></div></div>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '8px', fontSize: '12px' }}>
                            <div style={{ textAlign: 'center', padding: '8px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px' }}>
                              <div style={{ fontWeight: 700 }}>0/6</div>
                              <small>Steps Done</small>
                            </div>
                            <div style={{ textAlign: 'center', padding: '8px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px' }}>
                              <div style={{ fontWeight: 700 }}>0h</div>
                              <small>Hours Logged</small>
                            </div>
                            <div style={{ textAlign: 'center', padding: '8px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px' }}>
                              <div style={{ fontWeight: 700 }}>0</div>
                              <small>Projects Done</small>
                            </div>
                          </div>
                        </div>

                        {/* 9. Difficulty Progress */}
                        <h4 style={{ marginBottom: '12px' }}>📈 Difficulty Progression</h4>
                        <div style={{ background: '#1a2349', padding: '16px', borderRadius: '10px', marginBottom: '20px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '120px' }}>
                            {['Phase 1\nFoundation', 'Phase 2\nLearning', 'Phase 3\nBuilding', 'Phase 4\nExpertise'].map((phase, idx) => (
                              <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: idx === 0 ? '#A2F4F9' : 'rgba(162,244,249,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px', color: idx === 0 ? '#262C53' : '#A2F4F9' }}>
                                  {idx + 1}
                                </div>
                                <div style={{ fontSize: '10px', textAlign: 'center', marginTop: '8px', color: '#7b7b8a' }}>{phase}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 10. Skill Badges */}
                        <h4 style={{ marginBottom: '12px' }}>🏆 Skill Badges You Can Earn</h4>
                        <div style={{ background: '#1a2349', padding: '16px', borderRadius: '10px', marginBottom: '20px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
                            {['Foundation Badge', 'Learner Badge', 'Developer Badge', 'Expert Badge', 'Contributor Badge', 'Mentor Badge'].map((badge, idx) => (
                              <div key={idx} style={{ textAlign: 'center', padding: '12px', background: 'rgba(255,209,102,0.1)', border: '1px solid rgba(255,209,102,0.2)', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,209,102,0.15)'}>
                                <div style={{ fontSize: '24px', marginBottom: '4px' }}>🏅</div>
                                <small style={{ color: '#FFD166' }}>{badge}</small>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 11. Monthly Check-in */}
                        <h4 style={{ marginBottom: '12px' }}>📅 Monthly Check-in & Adjustments</h4>
                        <div style={{ background: '#1a2349', padding: '16px', borderRadius: '10px', marginBottom: '20px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div>
                              <div style={{ fontWeight: 700, marginBottom: '8px' }}>Next Check-in</div>
                              <div style={{ fontSize: '14px', color: '#A2F4F9' }}>Jan 9, 2026</div>
                              <small style={{ color: '#7b7b8a' }}>1 month from now</small>
                            </div>
                            <div>
                              <button className="btn primary" style={{ width: '100%', padding: '8px' }}>📝 Review Progress Now</button>
                            </div>
                          </div>
                          <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(162,244,249,0.1)', borderRadius: '8px', fontSize: '13px' }}>
                            💡 Tip: Adjust your roadmap based on life changes. It's okay to slow down or accelerate!
                          </div>
                        </div>

                        {/* 12. Roadmap Comparison */}
                        <h4 style={{ marginBottom: '12px' }}>⚖️ Compare With Other Paths</h4>
                        <div style={{ background: '#1a2349', padding: '16px', borderRadius: '10px', marginBottom: '20px' }}>
                          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Compare {interest} with:</label>
                          <select style={{ width: '100%', marginBottom: '12px' }}>
                            <option>Select another interest...</option>
                            {Object.keys(roadmapLibrary).filter(k => k !== interest).slice(0, 5).map((k) => (
                              <option key={k}>{k}</option>
                            ))}
                          </select>
                          <button className="btn ghost" style={{ width: '100%', padding: '8px' }}>📊 Compare Paths</button>
                        </div>

                        {/* 13. Peer Learning Groups */}
                        <h4 style={{ marginBottom: '12px' }}>👥 Join Peer Learning Groups</h4>
                        <div style={{ background: '#1a2349', padding: '16px', borderRadius: '10px', marginBottom: '20px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                            <div style={{ padding: '12px', background: 'rgba(6,214,160,0.1)', borderRadius: '8px', textAlign: 'center' }}>
                              <div style={{ fontWeight: 700, color: 'var(--success)' }}>🔥 Active Groups</div>
                              <div style={{ fontSize: '18px', fontWeight: 700 }}>24</div>
                            </div>
                            <div style={{ padding: '12px', background: 'rgba(162,244,249,0.1)', borderRadius: '8px', textAlign: 'center' }}>
                              <div style={{ fontWeight: 700, color: '#A2F4F9' }}>👨‍👩‍👧‍👦 Members</div>
                              <div style={{ fontSize: '18px', fontWeight: 700 }}>2,400+</div>
                            </div>
                            <div style={{ padding: '12px', background: 'rgba(255,209,102,0.1)', borderRadius: '8px', textAlign: 'center' }}>
                              <div style={{ fontWeight: 700, color: '#FFD166' }}>💬 Weekly</div>
                              <div style={{ fontSize: '18px', fontWeight: 700 }}>Discord</div>
                            </div>
                          </div>
                          <button className="btn primary" style={{ width: '100%', marginTop: '12px', padding: '8px' }}>🔗 Join Community</button>
                        </div>

                        {/* 14. Industry Insights */}
                        <h4 style={{ marginBottom: '12px' }}>🔮 Industry Insights & Trends</h4>
                        <div style={{ background: '#1a2349', padding: '16px', borderRadius: '10px', marginBottom: '20px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div style={{ padding: '12px', background: 'rgba(6,214,160,0.1)', borderRadius: '8px' }}>
                              <div style={{ fontWeight: 700, marginBottom: '8px' }}>🚀 Growth Trend</div>
                              <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--success)' }}>↑ 45%</div>
                              <small style={{ color: '#7b7b8a' }}>Jobs growing yearly in this field</small>
                            </div>
                            <div style={{ padding: '12px', background: 'rgba(162,244,249,0.1)', borderRadius: '8px' }}>
                              <div style={{ fontWeight: 700, marginBottom: '8px' }}>💵 Salary Trend</div>
                              <div style={{ fontSize: '28px', fontWeight: 700, color: '#A2F4F9' }}>↑ 12%</div>
                              <small style={{ color: '#7b7b8a' }}>Avg salary increase annually</small>
                            </div>
                          </div>
                          <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', fontSize: '13px', lineHeight: '1.5' }}>
                            📰 <strong>Hot Skills in 2025:</strong> AI Integration, Cloud Architecture, Data Privacy, Automation. These will boost your {interest} career significantly!
                          </div>
                        </div>
                      </>
                    )}
                  </section>
                )}

                {/* Saved Roadmaps */}
                {savedRoadmaps.length > 0 && (
                  <section className="card" style={{ gridColumn: '1 / -1' }}>
                    <h3>💾 Your Saved Roadmaps</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
                      {savedRoadmaps.map((rm) => (
                        <div key={rm.id} style={{ background: '#1a2349', padding: '16px', borderRadius: '10px', borderTop: '3px solid #A2F4F9' }}>
                          <div style={{ fontWeight: 700, marginBottom: '8px' }}>{rm.name}</div>
                          <div style={{ fontSize: '12px', color: '#7b7b8a', marginBottom: '8px' }}>
                            <div>📅 Saved: {rm.savedDate}</div>
                            <div>⏱️ {rm.timeline} • 📊 {rm.skillLevel}</div>
                          </div>
                          <button className="btn ghost" style={{ width: '100%', padding: '6px', fontSize: '12px' }}>View Roadmap</button>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}

            {/* Actions Page */}
            {activePage === 'actionsPage' && (
              <section className="card" style={{ gridColumn: '1 / -1' }}>
                <h3>✅ Suggested Actions — Your Task List</h3>
                <p style={{ color: '#7b7b8a', marginBottom: '12px' }}>Create, track, and manage your action items with priority, deadlines, and categories.</p>

                <div style={{ marginBottom: '12px' }}>
                  <div className="row" style={{ marginBottom: '12px' }}>
                    <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} style={{ flex: 1 }}>
                      <option value="all">All categories</option>
                      <option value="Assignment">Assignments</option>
                      <option value="Attendance">Attendance</option>
                      <option value="Goal">Goals</option>
                    </select>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ flex: 1, marginLeft: '12px' }}>
                      <option value="prio">Sort by Priority</option>
                      <option value="due">Sort by Due Date</option>
                    </select>
                    <button className="btn ghost" onClick={clearCompleted} style={{ marginLeft: '12px' }}>Clear Done</button>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                    <input type="text" placeholder="New task title" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} />
                    <select value={newTaskCategory} onChange={(e) => setNewTaskCategory(e.target.value)}>
                      <option>Assignment</option>
                      <option>Attendance</option>
                      <option>Goal</option>
                    </select>
                    <select value={newTaskPriority} onChange={(e) => setNewTaskPriority(e.target.value)}>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    <input type="date" value={newTaskDue} onChange={(e) => setNewTaskDue(e.target.value)} />
                    <button className="btn primary" onClick={handleAddTask}>Add Action</button>
                  </div>
                </div>

                {filteredActions().map(task => (
                  <div key={task.id} className="task">
                    <div className="task-left">
                      <div className={`dot ${getPriorityDot(task.priority)}`}></div>
                      <div className="task-body">
                        <h4>{task.title}</h4>
                        <div className="task-meta">
                          <span className={`badge ${getBadgeClass(task.category)}`}>{task.category}</span>
                          <span className={getPriorityPill(task.priority)}>{task.priority}</span>
                          {task.due && <span style={{ marginLeft: '8px' }}>{getDueLabel(task.due)}</span>}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className={`btn ${task.status === 'pending' ? 'ghost' : 'success'}`} onClick={() => handleMarkDone(task.id)} style={{ padding: '4px 8px', fontSize: '12px' }}>
                        {task.status === 'pending' ? 'Done' : 'Undo'}
                      </button>
                      <button className="btn ghost" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* Goal Setting Page */}
            {activePage === 'goalsPage' && (
              <section className="card" style={{ gridColumn: '1 / -1' }}>
                <h2>🎯 Goal Setting & Tracking</h2>
                <p style={{ color: '#7b7b8a', marginBottom: '20px' }}>Set SMART goals and track your progress towards success</p>

                <div style={{ background: '#1a2349', padding: '16px', borderRadius: '10px', marginBottom: '20px' }}>
                  <h3>Create New Goal</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <input type="text" placeholder="Goal title" value={newGoalTitle} onChange={(e) => setNewGoalTitle(e.target.value)} />
                    <input type="date" value={newGoalDeadline} onChange={(e) => setNewGoalDeadline(e.target.value)} />
                    <input type="number" placeholder="Target value" value={newGoalTarget} onChange={(e) => setNewGoalTarget(e.target.value)} />
                  </div>
                  <button className="btn primary" onClick={handleAddGoal} style={{ width: '100%' }}>Add Goal</button>
                </div>

                <h3>Your Goals</h3>
                {goals.length === 0 ? (
                  <div style={{ color: '#7b7b8a', padding: '20px', textAlign: 'center', background: '#1a2349', borderRadius: '10px' }}>No goals yet. Create your first goal above!</div>
                ) : (
                  goals.map(goal => (
                    <div key={goal.id} style={{ background: '#1a2349', padding: '16px', borderRadius: '10px', marginBottom: '12px', borderLeft: '4px solid #A2F4F9' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <h4>{goal.title}</h4>
                        <span style={{ fontWeight: 'bold', color: '#A2F4F9' }}>{goal.current}/{goal.target}</span>
                      </div>
                      <div className="progress-bar"><div className="progress-fill" style={{ width: `${(goal.current / goal.target) * 100}%` }}></div></div>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                        <button className="btn ghost" style={{ flex: 1, padding: '6px', fontSize: '12px' }} onClick={() => { const idx = goals.indexOf(goal); const newGoals = [...goals]; newGoals[idx].current = Math.min(newGoals[idx].current + 5, newGoals[idx].target); setGoals(newGoals); }}>+5%</button>
                        <button className="btn ghost" style={{ flex: 1, padding: '6px', fontSize: '12px' }}>Delete</button>
                      </div>
                    </div>
                  ))
                )}
              </section>
            )}

            {/* Resources Page */}
            {activePage === 'resourcesPage' && (
              <section className="card" style={{ gridColumn: '1 / -1' }}>
                <h2>📚 Learning Resources</h2>
                <p style={{ color: '#7b7b8a', marginBottom: '20px' }}>Access curated materials, upload files, and search for learning content</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                  <div style={{ background: '#1a2349', padding: '16px', borderRadius: '10px' }}>
                    <h3>📂 Upload Resources</h3>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Add files from your computer:</label>
                    <input type="file" multiple onChange={handleFileUpload} style={{ marginTop: '8px' }} />
                    {uploadedResources.length > 0 && (
                      <div style={{ marginTop: '12px' }}>
                        <h4>Uploaded Files ({uploadedResources.length})</h4>
                        {uploadedResources.map(resource => (
                          <div key={resource.id} style={{ padding: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>📄 {resource.name}</span>
                            <button className="btn ghost" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => setUploadedResources(uploadedResources.filter(r => r.id !== resource.id))}>Delete</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div style={{ background: '#1a2349', padding: '16px', borderRadius: '10px' }}>
                    <h3>🔎 Search Online</h3>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Find resources on Google:</label>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                      <input type="text" placeholder="Enter topic..." value={googleSearch} onChange={(e) => setGoogleSearch(e.target.value)} style={{ flex: 1 }} />
                      <button className="btn primary" onClick={handleGoogleSearch}>Search</button>
                    </div>
                    {searchHistory.length > 0 && (
                      <div style={{ marginTop: '12px' }}>
                        <h4>Search History</h4>
                        {searchHistory.map((item, idx) => (
                          <div key={idx} style={{ padding: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ cursor: 'pointer', color: '#A2F4F9' }} onClick={() => { setGoogleSearch(item); handleGoogleSearch(); }}>🔗 {item}</span>
                            <button className="btn ghost" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => { const newHistory = searchHistory.filter((_, i) => i !== idx); setSearchHistory(newHistory); }}>Delete</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <h3>📖 Popular Learning Platforms</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                  {[
                    { name: 'Coursera', url: 'https://coursera.org', desc: 'University-level courses' },
                    { name: 'Udemy', url: 'https://udemy.com', desc: 'Affordable skill courses' },
                    { name: 'Khan Academy', url: 'https://khanacademy.org', desc: 'Free learning for all' },
                    { name: 'LinkedIn Learning', url: 'https://linkedin.com/learning', desc: 'Professional development' },
                    { name: 'Codecademy', url: 'https://codecademy.com', desc: 'Programming basics' },
                    { name: 'freeCodeCamp', url: 'https://freecodecamp.org', desc: 'Web dev & coding' }
                  ].map((platform, idx) => (
                    <a key={idx} href={platform.url} target="_blank" rel="noopener noreferrer" style={{
                      padding: '16px',
                      background: '#1a2349',
                      border: '1px solid rgba(162,244,249,0.2)',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      color: '#F7FAFC',
                      transition: 'all 0.2s'
                    }} onMouseEnter={(e) => e.currentTarget.style.background = '#262C53'} onMouseLeave={(e) => e.currentTarget.style.background = '#1a2349'}>
                      <div style={{ fontWeight: 700, marginBottom: '4px' }}>{platform.name}</div>
                      <div style={{ fontSize: '12px', color: '#7b7b8a' }}>{platform.desc}</div>
                    </a>
                  ))}
                </div>

                <h3>🆘 Emergency Contacts & Support</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  {[
                    { name: 'Campus Counselling', phone: '555-1234', email: 'counselling@college.edu' },
                    { name: 'Academic Advisor', phone: '555-5678', email: 'advisor@college.edu' },
                    { name: '24/7 Crisis Line', phone: 'iCall: 9152987821', email: 'Available 24/7' }
                  ].map((contact, idx) => (
                    <div className="stat-card" key={idx} style={{ textAlign: 'left' }}>
                      <strong>{contact.name}</strong>
                      <div style={{ fontSize: '12px', marginTop: '8px' }}>📞 {contact.phone}</div>
                      <div style={{ fontSize: '12px', color: '#7b7b8a' }}>📧 {contact.email}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Academic Recovery Page */}
            {activePage === 'academicPage' && (
              <section className="card" style={{ gridColumn: '1 / -1' }}>
                <h2>Academic Recovery Plan</h2>
                <p style={{ color: '#7b7b8a', marginBottom: '20px' }}>Personalized plan to improve your academic performance</p>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                  <div>
                    <h3>Weak Subjects Analysis</h3>
                    {studentData.subjects.map((subject, idx) => (
                      <div key={idx} style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span>{subject.name}</span>
                          <span>{subject.score}% / {subject.target}%</span>
                        </div>
                        <div className="progress-bar"><div className="progress-fill" style={{ width: `${(subject.score / subject.target) * 100}%` }}></div></div>
                        <div style={{ fontSize: '12px', color: '#7b7b8a', marginTop: '4px' }}>
                          Weak areas: {subject.weakTopics.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3>Resources</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <button className="btn ghost">📹 Recorded Lectures</button>
                      <button className="btn ghost">📝 Practice Tests</button>
                      <button className="btn ghost">📚 Study Material</button>
                      <button className="btn ghost">👥 Find Study Buddy</button>
                    </div>

                    <div style={{ marginTop: '24px', padding: '16px', background: '#1a2349', borderRadius: '10px' }}>
                      <h4>Peer Tutor Matching</h4>
                      <p style={{ margin: '0 0 12px 0', fontSize: '14px' }}>We've found potential study buddies who excel in your weak subjects.</p>
                      <button className="btn primary" style={{ width: '100%' }}>Connect with Peer</button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Attendance Tracker Page */}
            {activePage === 'attendancePage' && (
              <section className="card" style={{ gridColumn: '1 / -1' }}>
                <h2>Attendance Recovery</h2>
                <p style={{ color: '#7b7b8a', marginBottom: '20px' }}>Track and improve your class attendance</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <h3>Current Status</h3>
                    <div style={{ background: '#1a2349', padding: '16px', borderRadius: '10px', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span>Current Attendance</span>
                        <span style={{ fontWeight: 'bold' }}>68%</span>
                      </div>
                      <div className="progress-bar"><div className="progress-fill" style={{ width: '68%' }}></div></div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '16px 0 8px 0' }}>
                        <span>Target Attendance</span>
                        <span style={{ fontWeight: 'bold' }}>75%</span>
                      </div>
                      <div className="progress-bar"><div className="progress-fill" style={{ width: '75%' }}></div></div>
                    </div>

                    <h3>Attendance Goals</h3>
                    <div style={{ background: '#1a2349', padding: '16px', borderRadius: '10px', marginBottom: '12px' }}>
                      <div style={{ fontWeight: '600', marginBottom: '8px' }}>Short-term Goal</div>
                      <div style={{ fontSize: '14px' }}>Attend 3 out of the next 4 classes to reach 72% attendance</div>
                    </div>
                    <div style={{ background: '#1a2349', padding: '16px', borderRadius: '10px' }}>
                      <div style={{ fontWeight: '600', marginBottom: '8px' }}>Long-term Goal</div>
                      <div style={{ fontSize: '14px' }}>Maintain 85% attendance for 4 consecutive weeks</div>
                    </div>
                  </div>

                  <div>
                    <h3>Catch-Up Options</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                      <button className="btn ghost">📹 Watch Recorded Lectures</button>
                      <button className="btn ghost">🎓 Schedule Make-up Class</button>
                      <button className="btn ghost">🔄 Request Alternate Batch</button>
                    </div>

                    <h3>Weekly Attendance Streak</h3>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                      {[{ day: 'Mon', status: '✓', color: '#16a34a' }, { day: 'Tue', status: '✓', color: '#16a34a' }, { day: 'Wed', status: '✗', color: '#ff6b6b' }, { day: 'Thu', status: '✓', color: '#16a34a' }, { day: 'Fri', status: '?', color: '#f59e0b' }].map((item, idx) => (
                        <div key={idx} style={{ flex: 1, textAlign: 'center', padding: '12px', background: item.color, borderRadius: '8px' }}>
                          <div style={{ fontSize: '12px' }}>{item.day}</div>
                          <div style={{ fontWeight: '700' }}>{item.status}</div>
                        </div>
                      ))}
                    </div>

                    <button className="btn primary" style={{ width: '100%' }}>Set Daily Reminder</button>
                  </div>
                </div>
              </section>
            )}

            {/* Mental Wellness Page */}
            {activePage === 'wellnessPage' && (
              <section className="card" style={{ gridColumn: '1 / -1' }}>
                <h2>Mental Wellness Center</h2>
                <p style={{ color: '#7b7b8a', marginBottom: '20px' }}>Your space for emotional well-being and stress management</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <h3>How are you feeling today?</h3>
                    <div className="mood-options">
                      {[{ emoji: '😊', label: 'Great' }, { emoji: '🙂', label: 'Good' }, { emoji: '😐', label: 'Okay' }, { emoji: '😔', label: 'Struggling' }, { emoji: '😢', label: 'Need Help' }].map((mood, idx) => (
                        <button key={idx} className={`mood-option ${selectedMood === idx ? 'selected' : ''}`} onClick={() => setSelectedMood(idx)}>
                          {mood.emoji}<br />{mood.label}
                        </button>
                      ))}
                    </div>

                    <h3 style={{ marginTop: '24px' }}>Quick Stress Relief</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <button className="btn ghost">🫁 Breathing Exercise</button>
                      <button className="btn ghost">☕ Take a Break</button>
                      <button className="btn ghost">🎵 Relaxing Sounds</button>
                      <button className="btn ghost">🧘 Mindfulness Tip</button>
                    </div>
                  </div>

                  <div>
                    <h3>Support Resources</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                      <button className="btn secondary">📞 Book Counselor Session</button>
                      <button className="btn ghost">📚 Wellness Resources</button>
                      <button className="btn ghost">👥 Join Support Group</button>
                      <button className="btn ghost">🆘 Emergency Help</button>
                    </div>

                    <h3>Your Wellness Streak</h3>
                    <div style={{ background: '#1a2349', padding: '16px', borderRadius: '10px', textAlign: 'center' }}>
                      <div style={{ fontSize: '32px', fontWeight: '700', color: '#16a34a' }}>5</div>
                      <div style={{ fontSize: '14px', color: '#7b7b8a' }}>Days of consistent wellness check-ins</div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Risk Assessment Page */}
            {activePage === 'riskPage' && (
              <section className="card" style={{ gridColumn: '1 / -1' }}>
                <h2>Student Dropout Risk Assessment</h2>
                <p style={{ color: '#7b7b8a', marginBottom: '20px' }}>Early identification and intervention for at-risk students</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '18px', marginBottom: '20px' }}>
                  <div className="stat-card">
                    <div>Risk Level</div>
                    <div className="stat-number">Medium</div>
                    <div style={{ fontSize: '14px' }}>45% probability</div>
                  </div>
                  <div className="stat-card">
                    <div>Intervention Status</div>
                    <div className="stat-number">Active</div>
                    <div style={{ fontSize: '14px' }}>2 programs enrolled</div>
                  </div>
                  <div className="stat-card">
                    <div>Progress Trend</div>
                    <div className="stat-number">📈 Improving</div>
                    <div style={{ fontSize: '14px' }}>+12% last month</div>
                  </div>
                </div>

                <h4>Risk Factors Breakdown</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {[{ label: 'Academic Performance', risk: 45 }, { label: 'Attendance', risk: 32 }, { label: 'Assignment Completion', risk: 38 }, { label: 'Mental Wellness', risk: 25 }].map((item, idx) => (
                    <div className="stat-card" key={idx}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span>{item.label}</span>
                        <span>{item.risk}%</span>
                      </div>
                      <div className="progress-bar"><div className="progress-fill" style={{ width: `${item.risk}%` }}></div></div>
                    </div>
                  ))}
                </div>

                <h4 style={{ marginTop: '20px' }}>Intervention Recommendations</h4>
                <div style={{ background: '#1a2349', padding: '16px', borderRadius: '8px' }}>
                  {[
                    'Attend weekly mentor sessions for academic support',
                    'Participate in attendance improvement program',
                    'Complete all pending assignments',
                    'Join peer study groups',
                    'Schedule counseling sessions'
                  ].map((rec, idx) => (
                    <div key={idx} style={{ padding: '10px', marginBottom: '8px', borderLeft: '3px solid #A2F4F9', background: 'rgba(162,244,249,0.1)', borderRadius: '0 8px 8px 0' }}>
                      {rec}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Support Network Page */}
            {activePage === 'supportPage' && (
              <section className="card" style={{ gridColumn: '1 / -1' }}>
                <h2>Your Support Network</h2>
                <p style={{ color: '#7b7b8a', marginBottom: '20px' }}>Connect with people who can help you succeed</p>

                {studentData.mentors.map(mentor => (
                  <div key={mentor.id} className="mentor-card">
                    <div className="mentor-avatar">{mentor.avatar}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600' }}>{mentor.name}</div>
                      <div style={{ fontSize: '12px', color: '#7b7b8a' }}>{mentor.subject} Mentor</div>
                      <div style={{ marginTop: '8px', fontSize: '13px' }}>{mentor.message}</div>
                    </div>
                    <button className="btn primary" style={{ padding: '8px 12px', fontSize: '12px' }}>Contact</button>
                  </div>
                ))}
              </section>
            )}

            {/* Goal Setting Page */}
            {activePage === 'goalsPage' && (
              <section className="card" style={{ gridColumn: '1 / -1' }}>
                <h2>Goal Setting & Tracking</h2>
                <p style={{ color: '#7b7b8a', marginBottom: '20px' }}>Set and track your academic and personal goals</p>

                <div style={{ background: '#1a2349', padding: '16px', borderRadius: '10px', marginBottom: '20px' }}>
                  <h3>Create New Goal</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <input type="text" placeholder="Goal title" value={newGoalTitle} onChange={(e) => setNewGoalTitle(e.target.value)} />
                    <input type="date" value={newGoalDeadline} onChange={(e) => setNewGoalDeadline(e.target.value)} />
                    <input type="number" placeholder="Target value" value={newGoalTarget} onChange={(e) => setNewGoalTarget(e.target.value)} />
                  </div>
                  <button className="btn primary" onClick={handleAddGoal} style={{ width: '100%' }}>Add Goal</button>
                </div>

                <h3>Your Goals</h3>
                {goals.map(goal => (
                  <div key={goal.id} style={{ background: '#1a2349', padding: '16px', borderRadius: '10px', marginBottom: '12px', borderLeft: '4px solid #A2F4F9' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h4>{goal.title}</h4>
                      <span style={{ fontWeight: 'bold', color: '#A2F4F9' }}>{goal.current}/{goal.target}</span>
                    </div>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: `${(goal.current / goal.target) * 100}%` }}></div></div>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                      <button className="btn ghost" style={{ flex: 1, padding: '6px', fontSize: '12px' }} onClick={() => { const idx = goals.indexOf(goal); const newGoals = [...goals]; newGoals[idx].current = Math.min(newGoals[idx].current + 5, newGoals[idx].target); setGoals(newGoals); }}>+5%</button>
                      <button className="btn ghost" style={{ flex: 1, padding: '6px', fontSize: '12px' }}>Delete</button>
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* Resources Page */}
            {activePage === 'resourcesPage' && (
              <section className="card" style={{ gridColumn: '1 / -1' }}>
                <h2>Learning Resources</h2>
                <p style={{ color: '#7b7b8a', marginBottom: '20px' }}>Access materials to help with your studies and preparation</p>

                <h3>Previous Year Question Papers</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                  {['Mathematics', 'Data Structures', 'Operating Systems', 'DBMS', 'Computer Networks', 'Algorithms'].map((subject, idx) => (
                    <button key={idx} className="pyq-card" style={{ padding: '16px' }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>{subject}</div>
                      <div style={{ fontSize: '12px', color: '#7b7b8a' }}>2024, 2023, 2022</div>
                    </button>
                  ))}
                </div>

                <h3>Emergency Contacts</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  {[{ name: 'Campus Counselling', phone: '555-1234', email: 'counselling@ait.edu' }, { name: 'Academic Advisor', phone: 'Dr. Sharma: 555-5678', email: 'r.sharma@ait.edu' }, { name: '24/7 Crisis Line', phone: '555-9012', email: 'Available anytime' }].map((contact, idx) => (
                    <div className="stat-card" key={idx} style={{ textAlign: 'left' }}>
                      <strong>{contact.name}</strong>
                      <div style={{ fontSize: '12px', marginTop: '8px' }}>{contact.phone}</div>
                      <div style={{ fontSize: '12px', color: '#7b7b8a' }}>{contact.email}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Upload & Search Page */}
            {activePage === 'uploadPage' && (
              <section className="card" style={{ gridColumn: '1 / -1' }}>
                <h2>Learning Resources</h2>
                <p style={{ color: '#7b7b8a', marginBottom: '20px' }}>Upload or search study materials</p>

                <div style={{ marginBottom: '20px' }}>
                  <label><strong>📂 Upload from your computer:</strong></label>
                  <input type="file" multiple onChange={handleFileUpload} style={{ marginTop: '8px' }} />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label><strong>🔎 Search on Google:</strong></label>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <input type="text" placeholder="Enter topic..." value={googleSearch} onChange={(e) => setGoogleSearch(e.target.value)} style={{ flex: 1 }} />
                    <button className="btn primary" onClick={handleGoogleSearch}>Search</button>
                  </div>
                </div>

                {searchHistory.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <h3>📜 Search History</h3>
                    {searchHistory.map((item, idx) => (
                      <div key={idx} style={{ padding: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ cursor: 'pointer', color: '#A2F4F9' }} onClick={() => { setGoogleSearch(item); handleGoogleSearch(); }}>{item}</span>
                        <button className="btn ghost" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => { const newHistory = searchHistory.filter((_, i) => i !== idx); setSearchHistory(newHistory); }}>Delete</button>
                      </div>
                    ))}
                  </div>
                )}

                <h3>📘 Your Uploaded Resources</h3>
                {uploadedResources.length === 0 ? (
                  <div style={{ color: '#7b7b8a', padding: '16px', textAlign: 'center' }}>No resources uploaded yet</div>
                ) : (
                  uploadedResources.map(resource => (
                    <div key={resource.id} style={{ padding: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>{resource.name}</span>
                      <button className="btn ghost" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => setUploadedResources(uploadedResources.filter(r => r.id !== resource.id))}>Delete</button>
                    </div>
                  ))
                )}
              </section>
            )}

          </div>
        </main>
      </div>
    </div>
  );

};

export default Counseling;