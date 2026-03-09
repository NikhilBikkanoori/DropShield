import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'universal_ctx_v1';

const SAMPLE_RESIDENTS = [
  {
    id: 'RES-001',
    name: 'Dr. Arun Kumar',
    program: 'MD General Surgery',
    year: 'PG-2',
    examScore: 62,
    publicationsCount: 1,
    attendanceRate: 72,
    burnoutScore: 4.2,
    factors: {
      academicIssue: false,
      financialIssue: true,
      familyIssue: true,
      healthIssue: true,
      bullyingIssue: false,
      motivationIssue: true,
      notes: 'Under pressure; considering exit; family duties weighing.',
    },
    selfReport: { motivation: 2, stress: 5, safety: 4, support: 2 },
    parentInput: { feesRegular: 1, choresLoad: 2, healthIssue: 1 },
    interventions: [
      {
        id: 'INT-101',
        factor: 'Financial',
        action: 'Discuss salary/allowance adjustments',
        responsible: 'Program Director',
        status: 'In Progress',
        nextFollowUp: '2025-12-15',
      },
    ],
  },
  {
    id: 'RES-002',
    name: 'Dr. Priya Shah',
    program: 'MD Pediatrics',
    year: 'PG-1',
    examScore: 78,
    publicationsCount: 3,
    attendanceRate: 85,
    burnoutScore: 2.1,
    factors: {
      academicIssue: false,
      financialIssue: false,
      familyIssue: false,
      healthIssue: false,
      bullyingIssue: false,
      motivationIssue: false,
      notes: 'Strong performer; no concerns.',
    },
    selfReport: { motivation: 5, stress: 2, safety: 5, support: 5 },
    parentInput: { feesRegular: 0, choresLoad: 0, healthIssue: 0 },
    interventions: [],
  },
  {
    id: 'RES-003',
    name: 'Dr. Vikram Singh',
    program: 'MD Orthopedics',
    year: 'PG-3',
    examScore: 55,
    publicationsCount: 0,
    attendanceRate: 68,
    burnoutScore: 4.8,
    factors: {
      academicIssue: true,
      financialIssue: false,
      familyIssue: true,
      healthIssue: true,
      bullyingIssue: true,
      motivationIssue: true,
      notes: 'High burnout; conflicts with seniors; considering exit.',
    },
    selfReport: { motivation: 1, stress: 5, safety: 2, support: 2 },
    parentInput: { feesRegular: 0, choresLoad: 1, healthIssue: 1 },
    interventions: [
      {
        id: 'INT-102',
        factor: 'Health',
        action: 'Mandatory counseling + mental health support',
        responsible: 'Chief',
        status: 'Planned',
        nextFollowUp: '2025-12-10',
      },
    ],
  },
];

const UniversalDataContext = createContext(null);

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

function computeRiskScore(resident) {
  let score = 0;
  // core signals (medical-specific)
  if (resident.attendanceRate < 75) score += 15;
  if (resident.examScore < 60) score += 20;
  if (resident.burnoutScore >= 4) score += 20;
  if (resident.publicationsCount < 1) score += 10;

  // human-observed factors
  const f = resident.factors || {};
  if (f.financialIssue) score += 10;
  if (f.familyIssue) score += 8;
  if (f.bullyingIssue) score += 12;
  if (f.healthIssue) score += 15;
  if (f.motivationIssue) score += 8;
  if (f.academicIssue) score += 8;

  // self-report signals
  const s = resident.selfReport || {};
  if (s.stress >= 4) score += 6;
  if (s.motivation <= 2) score += 5;
  if (s.safety <= 2) score += 8;

  return score;
}

function bandFromScore(score) {
  if (score >= 70) return 'High';
  if (score >= 40) return 'Medium';
  return 'Low';
}

export function useUniversalData() {
  const ctx = useContext(UniversalDataContext);
  if (!ctx) throw new Error('useUniversalData must be used inside UniversalDataProvider');
  return ctx;
}

export function UniversalDataProvider({ children }) {
  const [residents, setResidents] = useState(() => loadState() || SAMPLE_RESIDENTS);

  useEffect(() => {
    persistState(residents);
  }, [residents]);

  const updaters = useMemo(
    () => ({
      updateFactors: (id, updates) => {
        setResidents((prev) =>
          prev.map((r) =>
            r.id === id ? { ...r, factors: { ...(r.factors || {}), ...updates } } : r
          )
        );
      },
      updateNotes: (id, notes) => {
        setResidents((prev) =>
          prev.map((r) => (r.id === id ? { ...r, factors: { ...(r.factors || {}), notes } } : r))
        );
      },
      updateSelfReport: (id, payload) => {
        setResidents((prev) => prev.map((r) => (r.id === id ? { ...r, selfReport: { ...(r.selfReport || {}), ...payload } } : r)));
      },
      updateParentInput: (id, payload) => {
        setResidents((prev) => prev.map((r) => (r.id === id ? { ...r, parentInput: { ...(r.parentInput || {}), ...payload } } : r)));
      },
      addIntervention: (id, intervention) => {
        setResidents((prev) =>
          prev.map((r) => (r.id === id ? { ...r, interventions: [...(r.interventions || []), intervention] } : r))
        );
      },
      updateInterventionStatus: (id, interventionId, status) => {
        setResidents((prev) =>
          prev.map((r) =>
            r.id === id
              ? {
                  ...r,
                  interventions: (r.interventions || []).map((it) => (it.id === interventionId ? { ...it, status } : it)),
                }
              : r
          )
        );
      },
    }),
    []
  );

  const residentsWithRisk = useMemo(
    () =>
      residents.map((r) => {
        const score = computeRiskScore(r);
        return { ...r, riskScore: score, riskBand: bandFromScore(score) };
      }),
    [residents]
  );

  const value = useMemo(
    () => ({
      residents: residentsWithRisk,
      updateFactors: updaters.updateFactors,
      updateNotes: updaters.updateNotes,
      updateSelfReport: updaters.updateSelfReport,
      updateParentInput: updaters.updateParentInput,
      addIntervention: updaters.addIntervention,
      updateInterventionStatus: updaters.updateInterventionStatus,
    }),
    [residentsWithRisk, updaters]
  );

  return <UniversalDataContext.Provider value={value}>{children}</UniversalDataContext.Provider>;
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
