const StudentAdmin = require('../models/StudentAdmin');
const MarksAdmin = require('../models/MarksAdmin');
const FeesAdmin = require('../models/FeesAdmin');
const ParentAdmin = require('../models/ParentAdmin');
const FacultyAdmin = require('../models/Facultyadmin');

const studentSample = {
  risk: {
    score: 68,
    level: 'Medium',
    trend: [62, 64, 63, 66, 68, 69, 68, 70],
    factors: ['Late submissions', 'Low attendance', 'Stress spikes', 'OSCE pending']
  },
  academics: {
    subjects: [
      { subject: 'Anatomy', score: 82 },
      { subject: 'Physiology', score: 68 },
      { subject: 'Pathology', score: 58 },
      { subject: 'Pharmacology', score: 74 }
    ],
    scoreComparison: [
      { label: 'Midterm', value: 72, target: 80 },
      { label: 'Quiz', value: 65, target: 70 },
      { label: 'Lab', value: 78, target: 75 },
      { label: 'Project', value: 84, target: 88 }
    ],
    tests: [
      { test: 'Cardio Quiz', score: '18/25', status: 'Needs review' },
      { test: 'Lab Prep', score: '22/25', status: 'On track' },
      { test: 'Midterm', score: '54/80', status: 'Watch' }
    ],
    progress: 0.78
  },
  clinical: {
    competencies: ['Vitals assessment', 'Airway management', 'PPE usage', 'Basic suturing', 'History taking'],
    stations: [
      { station: 'Airway', score: 82 },
      { station: 'Trauma', score: 66 },
      { station: 'Pediatrics', score: 74 }
    ],
    feedback: [
      { title: 'Pediatrics', note: 'Engaged, needs faster charting.' },
      { title: 'ICU', note: 'Calm under pressure, watch infection control.' },
      { title: 'ER', note: 'Good triage questions, improve handovers.' }
    ],
    gaps: ['Airway depth', 'Hand hygiene', 'Drug dosage calc']
  },
  attendance: {
    percentage: 91,
    absent: 3,
    late: 2,
    days: Array.from({ length: 30 }, (_, i) => {
      const day = i + 1;
      const status = day % 9 === 0 ? 'absent' : day % 7 === 0 ? 'late' : 'present';
      return { day, status };
    })
  },
  engagement: {
    timeline: [
      { time: '08:20', event: 'Watched ECG module' },
      { time: '10:05', event: 'Uploaded lab report' },
      { time: '14:15', event: 'Quiz attempt: Pathology' },
      { time: '19:40', event: 'Discussion: Cardio case' }
    ],
    studyHours: [
      { day: 'Mon', hrs: 3.5 },
      { day: 'Tue', hrs: 2.1 },
      { day: 'Wed', hrs: 4.0 },
      { day: 'Thu', hrs: 3.2 },
      { day: 'Fri', hrs: 2.8 },
      { day: 'Sat', hrs: 1.9 }
    ],
    resources: [
      { label: 'Videos', value: 45, color: '#A2F4F9' },
      { label: 'PDFs', value: 30, color: '#FFD166' },
      { label: 'Quizzes', value: 25, color: '#06D6A0' }
    ]
  },
  recommendations: {
    suggestions: [
      'Revise cardiology cases before Friday.',
      'Attempt OSCE mock station once this week.',
      'Book a 15-min mentor chat about stress.'
    ],
    resources: [
      { title: 'Video: Shock basics', type: 'Video', link: '#' },
      { title: 'PDF: ICU protocols', type: 'PDF', link: '#' },
      { title: 'Module: Infection control', type: 'Module', link: '#' }
    ],
    actions: [
      { label: 'Submit lab notes', done: false },
      { label: 'Practice OSCE airway', done: false },
      { label: 'Watch pharmacology recap', done: true }
    ]
  },
  planner: {
    events: [
      { title: 'Lab simulation', date: 'Thu 3 PM' },
      { title: 'Mentor meeting', date: 'Fri 9 AM' },
      { title: 'Clinical round', date: 'Mon 8 AM' }
    ],
    countdownDays: 12,
    todos: ['Flashcards: cardio', 'OSCE mock with peer', 'Upload vitals log'],
    reminders: [
      { label: 'Push notifications', on: true },
      { label: 'Email digest', on: false },
      { label: 'SMS alerts', on: false }
    ]
  },
  communication: {
    chat: [
      { from: 'Mentor', text: 'Please upload the lab notes by Friday.' },
      { from: 'You', text: 'Will do. Also need help with airway station.' },
      { from: 'Mentor', text: 'Join the 5 PM OSCE prep room.' }
    ],
    history: [
      { title: 'Weekly check-in', time: 'Today 09:00' },
      { title: 'Attendance review', time: 'Yesterday' },
      { title: 'OSCE debrief', time: 'Mon 4 PM' }
    ]
  },
  wellbeing: {
    stress: 62
  }
};

const mentorSample = {
  mentor: { name: 'Prof. Sharma', dept: 'CSE', email: 'mentor.sharma@ait.edu' },
  cohort: {
    heat: Array.from({ length: 12 }, (_, i) => ({ label: `Week ${i + 1}`, risk: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)] })),
    riskList: [
      { id: '21CSE046', name: 'Ravi Mehta', risk: 'High', avg: 42, attendance: 60 },
      { id: '21CSE047', name: 'Zara Singh', risk: 'Low', avg: 92, attendance: 88 },
      { id: '21CSE048', name: 'Rohan Das', risk: 'Medium', avg: 55, attendance: 85 }
    ],
    distribution: { high: 4, medium: 6, low: 8 }
  },
  student: {
    profile: { name: 'Ravi Mehta', id: '21CSE046', year: 'Year 3', photo: '', risk: 'High' },
    riskTrend: [50, 52, 55, 60, 64, 66, 62],
    radar: [72, 65, 80, 58, 69],
    attendance: [82, 75, 90, 88, 80, 70, 92],
    feedback: ['Engaged during rounds', 'Needs quicker documentation', 'Good empathy with patients'],
    incidents: [{ date: '2025-08-01', type: 'Punctuality', note: 'Late to lab' }]
  },
  competency: {
    map: [
      { skill: 'Airway', status: 'Good' },
      { skill: 'IV Lines', status: 'Gap' },
      { skill: 'Vitals', status: 'Good' },
      { skill: 'Suturing', status: 'Gap' }
    ],
    progress: [
      { label: 'Technical', value: 72 },
      { label: 'Communication', value: 80 },
      { label: 'Professionalism', value: 68 }
    ],
    alerts: ['Practice sterile technique', 'Observe 2 more airway stations']
  },
  alerts: [
    { title: 'High risk student', body: 'Ravi flagged for low scores', severity: 'High' },
    { title: 'Low attendance', body: '3 mentees < 75%', severity: 'Medium' }
  ],
  mentorship: {
    meetingNotes: '',
    goals: [
      { title: 'Improve OSCE timing', deadline: 'Oct 12' },
      { title: 'Attendance above 85%', deadline: 'Oct 25' }
    ],
    tasks: [
      { title: 'Assign airway drill', assignee: 'Ravi' },
      { title: 'Share cardio deck', assignee: 'Zara' }
    ],
    improvement: 0.64
  },
  assessment: {
    rubric: [
      { criterion: 'Knowledge', weight: 40 },
      { criterion: 'Skills', weight: 40 },
      { criterion: 'Attitude', weight: 20 }
    ],
    score: 75,
    comment: ''
  }
};

const parentSample = {
  parent: { name: 'Parent', email: 'parent@example.com' },
  child: { name: 'Ravi Mehta', roll: '21CSE046', class: 'Year 3', risk: 'High', attendance: 82, grade: 'B-' },
  performance: {
    grades: [
      { subject: 'Math', score: 68 },
      { subject: 'Algorithms', score: 65 },
      { subject: 'DBMS', score: 72 },
      { subject: 'Networks', score: 70 }
    ],
    exams: [
      { exam: 'Midterm', score: '54/80', status: 'Needs work' },
      { exam: 'Quiz', score: '18/25', status: 'On track' }
    ],
    attendance: 0.86
  },
  alerts: [
    { title: 'Low attendance', detail: 'Below 75% last month', severity: 'High', read: false },
    { title: 'Exam dip', detail: 'Midterm score below average', severity: 'Medium', read: false },
    { title: 'All assignments on time', detail: 'Great consistency', severity: 'Low', read: true }
  ],
  faqs: [
    { q: 'How to improve attendance?', a: 'Encourage morning check-ins and set reminders.' },
    { q: 'Who to contact for mentoring?', a: 'Use the contact mentor button to schedule a call.' }
  ]
};

const safeJson = (res, payload) => res.json(payload || {});

exports.getStudentDashboard = async (req, res) => {
  const { id } = req.params;
  if (id === 'demo') return safeJson(res, studentSample);

  try {
    const student = await StudentAdmin.findById(id).lean();
    if (!student) return safeJson(res, studentSample);

    const marks = await MarksAdmin.findOne({ Student: student._id }).lean();
    const fees = await FeesAdmin.findOne({ Student: student._id }).lean();

    const subjects = marks
      ? [
          { subject: marks.Subject1, score: marks.Subject1Marks },
          { subject: marks.Subject2, score: marks.Subject2Marks },
          { subject: marks.Subject3, score: marks.Subject3Marks },
          { subject: marks.Subject4, score: marks.Subject4Marks },
          { subject: marks.Subject5, score: marks.Subject5Marks }
        ].filter((s) => s.subject)
      : studentSample.academics.subjects;

    const pendingFees = fees ? Math.max(0, (fees.Amount || 0) - (fees.Paid || 0)) : 0;
    const attendance = student.Attendance || student.attendance || 80;
    const riskScore = Math.min(95, Math.max(35, 70 - attendance * 0.1 + pendingFees * 0.0005));

    return safeJson(res, {
      ...studentSample,
      risk: {
        ...studentSample.risk,
        score: Math.round(riskScore),
        level: riskScore > 70 ? 'High' : riskScore > 50 ? 'Medium' : 'Low'
      },
      academics: {
        ...studentSample.academics,
        subjects
      },
      attendance: studentSample.attendance
    });
  } catch (err) {
    console.error('getStudentDashboard error', err);
    return safeJson(res, studentSample);
  }
};

exports.getMentorDashboard = async (req, res) => {
  const { id } = req.params;
  if (id === 'demo') return safeJson(res, mentorSample);

  try {
    const mentor = await FacultyAdmin.findById(id).lean();
    if (!mentor) return safeJson(res, mentorSample);

    const mentees = await StudentAdmin.find({ Mentor: mentor._id }).lean();
    const riskList = mentees.slice(0, 10).map((s) => ({
      id: s.RollNo || s._id,
      name: s.FullName,
      risk: 'Medium',
      avg: 70,
      attendance: 80
    }));

    return safeJson(res, {
      ...mentorSample,
      mentor: { name: mentor.name || mentor.FullName || 'Mentor', dept: mentor.dept || mentor.department, email: mentor.email },
      cohort: {
        ...mentorSample.cohort,
        riskList,
        distribution: {
          high: Math.max(1, Math.round(riskList.length * 0.2)),
          medium: Math.max(1, Math.round(riskList.length * 0.4)),
          low: Math.max(1, Math.round(riskList.length * 0.4))
        }
      }
    });
  } catch (err) {
    console.error('getMentorDashboard error', err);
    return safeJson(res, mentorSample);
  }
};

exports.getParentDashboard = async (req, res) => {
  const { id } = req.params;
  if (id === 'demo') return safeJson(res, parentSample);

  try {
    const parent = await ParentAdmin.findById(id).populate('Student').lean();
    if (!parent) return safeJson(res, parentSample);

    const child = parent.Student;
    const marks = await MarksAdmin.findOne({ Student: child?._id }).lean();

    const grades = marks
      ? [
          { subject: marks.Subject1, score: marks.Subject1Marks },
          { subject: marks.Subject2, score: marks.Subject2Marks },
          { subject: marks.Subject3, score: marks.Subject3Marks },
          { subject: marks.Subject4, score: marks.Subject4Marks },
          { subject: marks.Subject5, score: marks.Subject5Marks }
        ].filter((g) => g.subject)
      : parentSample.performance.grades;

    return safeJson(res, {
      ...parentSample,
      parent: { name: parent.FullName, email: parent.Email },
      child: {
        name: child?.FullName || parentSample.child.name,
        roll: child?.RollNo || parentSample.child.roll,
        class: child?.Department || parentSample.child.class,
        risk: parentSample.child.risk,
        attendance: child?.Attendance || parentSample.child.attendance,
        grade: parentSample.child.grade
      },
      performance: {
        ...parentSample.performance,
        grades
      }
    });
  } catch (err) {
    console.error('getParentDashboard error', err);
    return safeJson(res, parentSample);
  }
};
