export const DEFAULT_MENTOR = {
    id: "mentor-1",
    name: "Prof. Sharma",
    dept: "CSE",
    mentees: [
        { id: "21CSE046", name: "Ravi Mehta", gpa: 6.8, attendance: 60, finance: { total: 50000, paid: 20000, others: 500 }, assignments: [], exams: [{ subject: "Math", marks: 42 }], scores: [42], attempts: [] },
        { id: "21CSE048", name: "Rohan Das", gpa: 3.2, attendance: 85, finance: { total: 0, paid: 0, others: 0 }, assignments: [], exams: [{ subject: "Math", marks: 32 }], scores: [32], attempts: [] },
        { id: "21CSE047", name: "Zara Singh", gpa: 9.0, attendance: 88, finance: { total: 50000, paid: 50000, others: 0 }, assignments: [], exams: [{ subject: "Math", marks: 92 }], scores: [92], attempts: [] },
        { id: "21CSE049", name: "Ankit Rao", gpa: 5.0, attendance: 65, finance: { total: 40000, paid: 15000, others: 2000 }, assignments: [], exams: [{ subject: "DBMS", marks: 28 }], scores: [28], attempts: [] },
        { id: "21CSE050", name: "Meena Patil", gpa: 4.2, attendance: 70, finance: { total: 30000, paid: 10000, others: 0 }, assignments: [], exams: [{ subject: "OS", marks: 35 }], scores: [35], attempts: [] },
        { id: "21CSE051", name: "Kunal Yadav", gpa: 8.0, attendance: 62, finance: { total: 0, paid: 0, others: 0 }, assignments: [], exams: [{ subject: "CN", marks: 75 }], scores: [75], attempts: [] },
        { id: "21CSE052", name: "Isha Sharma", gpa: 7.5, attendance: 90, finance: { total: 45000, paid: 25000, others: 0 }, assignments: [], exams: [{ subject: "OS", marks: 80 }], scores: [80], attempts: [] },
        { id: "21CSE053", name: "Rahul Nair", gpa: 3.0, attendance: 85, finance: { total: 0, paid: 0, others: 0 }, assignments: [], exams: [{ subject: "DBMS", marks: 25 }], scores: [25], attempts: [] },
        { id: "21CSE054", name: "Sneha Gupta", gpa: 9.1, attendance: 92, finance: { total: 60000, paid: 60000, others: 0 }, assignments: [], exams: [{ subject: "Math", marks: 95 }], scores: [95], attempts: [] },
        { id: "21CSE055", name: "Vikram Singh", gpa: 8.5, attendance: 88, finance: { total: 50000, paid: 50000, others: 0 }, assignments: [], exams: [{ subject: "CN", marks: 85 }], scores: [85], attempts: [] },
        { id: "21CSE056", name: "Pooja Reddy", gpa: 8.8, attendance: 93, finance: { total: 55000, paid: 55000, others: 0 }, assignments: [], exams: [{ subject: "OS", marks: 89 }], scores: [89], attempts: [] },
        { id: "21CSE057", name: "Arjun Verma", gpa: 4.0, attendance: 58, finance: { total: 50000, paid: 15000, others: 1000 }, assignments: [], exams: [{ subject: "Math", marks: 30 }], scores: [30], attempts: [] },
        { id: "21CSE058", name: "Divya Menon", gpa: 5.5, attendance: 62, finance: { total: 45000, paid: 20000, others: 500 }, assignments: [], exams: [{ subject: "DBMS", marks: 40 }], scores: [40], attempts: [] },
        { id: "21CSE059", name: "Harsh Jain", gpa: 7.8, attendance: 80, finance: { total: 20000, paid: 10000, others: 0 }, assignments: [], exams: [{ subject: "CN", marks: 76 }], scores: [76], attempts: [] }
    ],
    assignments: [
        { id: "A1", title: "Integrals HW", course: "Math", due: "2025-09-28" },
        { id: "A2", title: "Process Sync", course: "OS", due: "2025-09-20" }
    ],
    submissions: [
        { studId: "21CSE046", assignId: "A1", status: "Pending", grade: null, file: "" },
        { studId: "21CSE047", assignId: "A2", status: "Submitted", grade: 9, file: "sync_zara.zip" }
    ],
    exams: [
        { studId: "21CSE046", subject: "Math", marks: 42 },
        { studId: "21CSE047", subject: "Math", marks: 92 },
        { studId: "21CSE048", subject: "Math", marks: 32 }
    ],
    notices: [{ id: 1, title: "Meeting", body: "Mentor meeting tomorrow 4pm", date: "2025-09-20" }],
    attendanceToday: {}
};

export const SAMPLE_PARENT_DATA = [
    {
        parent: {
            name: "Rajesh Kumar",
            email: "rajesh.kumar@email.com",
            phone: "9876543210",
            address: "Hyderabad, Telangana",
            studentId: "6936d099320ad958d7d13a01"
        },
        student: {
            id: "S001",
            name: "Arjun Kumar",
            rollNo: "CSE001",
            department: "CSE",
            gpa: "8.4",
            attendance: 82,
            fees: { status: "Paid", dueAmount: 0, dueDate: "-" },
            notifications: [
                { id: 1, type: "reminder", message: "Mid-term exams starting next week", date: "2024-10-15" },
                { id: 2, type: "success", message: "Tuition fee payment received", date: "2024-10-01" }
            ],
            remarks: [
                { subject: "Mathematics", comment: "Exceptional performance in calculus.", teacher: "Dr. Sharma", date: "2024-10-10" }
            ]
        }
    },
    {
        parent: {
            name: "Priya Sharma",
            email: "priya.sharma@email.com",
            phone: "9123456789",
            address: "Bangalore, Karnataka",
            studentId: "6936d099320ad958d7d13a02"
        },
        student: {
            id: "S002",
            name: "Aditya Sharma",
            rollNo: "CSE002",
            department: "CSE",
            gpa: "7.2",
            attendance: 78,
            fees: { status: "Paid", dueAmount: 0, dueDate: "-" },
            notifications: [],
            remarks: []
        }
    },
    {
        parent: {
            name: "Anita Patel",
            email: "anita.patel@email.com",
            phone: "9234567890",
            address: "Mumbai, Maharashtra",
            studentId: "6936d099320ad958d7d13a03"
        },
        student: {
            id: "S003",
            name: "Isha Patel",
            rollNo: "CSE003",
            department: "CSE",
            gpa: "9.1",
            attendance: 95,
            fees: { status: "Paid", dueAmount: 0, dueDate: "-" },
            notifications: [],
            remarks: []
        }
    },
    {
        parent: {
            name: "Vikram Singh",
            email: "vikram.singh@email.com",
            phone: "9345678901",
            address: "Delhi, India",
            studentId: "6936d099320ad958d7d13a04"
        },
        student: {
            id: "S004",
            name: "Rohan Singh",
            rollNo: "CSE004",
            department: "CSE",
            gpa: "6.5",
            attendance: 65,
            fees: { status: "Pending", dueAmount: 15000, dueDate: "2024-11-01" },
            notifications: [
                { id: 1, type: "alert", message: "Attendance below 75%", date: "2024-10-20" }
            ],
            remarks: []
        }
    },
    {
        parent: {
            name: "Deepa Gupta",
            email: "deepa.gupta@email.com",
            phone: "9456789012",
            address: "Pune, Maharashtra",
            studentId: "6936d099320ad958d7d13a05"
        },
        student: {
            id: "S005",
            name: "Zara Gupta",
            rollNo: "CSE005",
            department: "CSE",
            gpa: "8.8",
            attendance: 80,
            fees: { status: "Paid", dueAmount: 0, dueDate: "-" },
            notifications: [],
            remarks: []
        }
    }
];

export const COUNSELING_STUDENT_DATA = {
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

export const INITIAL_ACTIONS_DATA = [
    { id: '1', title: 'Complete Math integrals assignment', category: 'Assignment', priority: 'High', due: '2024-12-28', status: 'pending' },
    { id: '2', title: 'Attend extra Math class', category: 'Attendance', priority: 'High', due: '2024-12-27', status: 'pending' },
    { id: '3', title: 'Review Weak Areas (Math & Physics)', category: 'Goal', priority: 'High', due: '2024-12-30', status: 'pending' }
];
