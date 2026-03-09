import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'school_ctx_v1';

const SAMPLE_STUDENTS = [
  {
    id: 'S-001',
    name: 'Aarav Singh',
    attendance: 68,
    avgScore: 55,
    feesPending: 12000,
    factors: {
      academicIssue: true,
      financialIssue: true,
      familyIssue: false,
      healthIssue: false,
      bullyingIssue: false,
      motivationIssue: true,
      notes: 'Worried about fees; loses focus in class.',
    },
    selfReport: { motivation: 2, stress: 4, safety: 4, support: 3 },
    parentInput: { feesRegular: 1, choresLoad: 2, healthIssue: 0 },
    interventions: [
      {
        id: 'INT-1',
        factor: 'Financial',
        action: 'Scholarship form + fee installment discussion',
        responsible: 'Admin',
        status: 'In Progress',
        nextFollowUp: '2025-12-12',
      },
    ],
  },
  {
    id: 'S-002',
    name: 'Meera Rao',
    attendance: 82,
    avgScore: 38,
    feesPending: 0,
    factors: {
      academicIssue: true,
      financialIssue: false,
      familyIssue: false,
      healthIssue: false,
      bullyingIssue: false,
      motivationIssue: false,
      notes: 'Needs remedial for math and science.',
    },
    selfReport: { motivation: 3, stress: 3, safety: 5, support: 4 },
    parentInput: { feesRegular: 0, choresLoad: 0, healthIssue: 0 },
    interventions: [
      {
        id: 'INT-2',
        factor: 'Academic',
        action: 'Peer tutor + weekly remedial',
        responsible: 'Mentor',
        status: 'Planned',
        nextFollowUp: '2025-12-10',
      },
    ],
  },
  {
    id: 'S-003',
    name: 'Kabir Ali',
    attendance: 90,
    avgScore: 76,
    feesPending: 0,
    factors: {
      academicIssue: false,
      financialIssue: false,
      familyIssue: true,
      healthIssue: false,
      bullyingIssue: false,
      motivationIssue: false,
      notes: 'Family moving; risk of relocation disruption.',
    },
    selfReport: { motivation: 4, stress: 2, safety: 5, support: 4 },
    parentInput: { feesRegular: 0, choresLoad: 1, healthIssue: 0 },
    interventions: [],
  },
];

const SchoolDataContext = createContext(null);

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to parse storage', e);
    return null;
  }
}

function persistState(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save storage', e);
  }
}

function computeRiskScore(student) {
  let score = 0;
  // core signals
  if (student.attendance < 75) score += 20;
  if (student.avgScore < 40) score += 20;
  if (student.feesPending > 0) score += 15;

  // human-observed factors
  const f = student.factors || {};
  if (f.financialIssue) score += 10;
  if (f.familyIssue) score += 8;
  if (f.bullyingIssue) score += 10;
  if (f.healthIssue) score += 7;
  if (f.motivationIssue) score += 5;
  if (f.academicIssue) score += 8;

  // self-report signals (higher stress, lower motivation add risk)
  const s = student.selfReport || {};
  if (s.stress >= 4) score += 5;
  if (s.motivation <= 2) score += 4;
  if (s.safety <= 2) score += 6;

  return score;
}

function bandFromScore(score) {
  if (score >= 61) return 'High';
  if (score >= 31) return 'Medium';
  return 'Low';
}

export function useSchoolData() {
  const ctx = useContext(SchoolDataContext);
  if (!ctx) throw new Error('useSchoolData must be used inside SchoolDataProvider');
  return ctx;
}

export function SchoolDataProvider({ children }) {
  const [students, setStudents] = useState(() => loadState() || SAMPLE_STUDENTS);

  useEffect(() => {
    persistState(students);
  }, [students]);

  const updaters = useMemo(
    () => ({
      updateFactors: (id, updates) => {
        setStudents((prev) =>
          prev.map((s) =>
            s.id === id ? { ...s, factors: { ...(s.factors || {}), ...updates } } : s
          )
        );
      },
      updateNotes: (id, notes) => {
        setStudents((prev) =>
          prev.map((s) => (s.id === id ? { ...s, factors: { ...(s.factors || {}), notes } } : s))
        );
      },
      updateSelfReport: (id, payload) => {
        setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, selfReport: { ...(s.selfReport || {}), ...payload } } : s)));
      },
      updateParentInput: (id, payload) => {
        setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, parentInput: { ...(s.parentInput || {}), ...payload } } : s)));
      },
      addIntervention: (id, intervention) => {
        setStudents((prev) =>
          prev.map((s) => (s.id === id ? { ...s, interventions: [...(s.interventions || []), intervention] } : s))
        );
      },
      updateInterventionStatus: (id, interventionId, status) => {
        setStudents((prev) =>
          prev.map((s) =>
            s.id === id
              ? {
                  ...s,
                  interventions: (s.interventions || []).map((it) => (it.id === interventionId ? { ...it, status } : it)),
                }
              : s
          )
        );
      },
    }),
    []
  );

  const studentsWithRisk = useMemo(
    () =>
      students.map((s) => {
        const score = computeRiskScore(s);
        return { ...s, riskScore: score, riskBand: bandFromScore(score) };
      }),
    [students]
  );

  const value = useMemo(
    () => ({
      students: studentsWithRisk,
      updateFactors: updaters.updateFactors,
      updateNotes: updaters.updateNotes,
      updateSelfReport: updaters.updateSelfReport,
      updateParentInput: updaters.updateParentInput,
      addIntervention: updaters.addIntervention,
      updateInterventionStatus: updaters.updateInterventionStatus,
    }),
    [studentsWithRisk, updaters]
  );

  return <SchoolDataContext.Provider value={value}>{children}</SchoolDataContext.Provider>;
}

export function getFactorBadges(factors) {
  const map = [
    ['financialIssue', 'Financial'],
    ['academicIssue', 'Academic'],
    ['familyIssue', 'Family'],
    ['healthIssue', 'Health'],
    ['bullyingIssue', 'Bullying'],
    ['motivationIssue', 'Motivation'],
  ];
  return map.filter(([key]) => factors?.[key]).map(([, label]) => label);
}
