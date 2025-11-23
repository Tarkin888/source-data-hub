import React, { createContext, useContext, useState, useEffect } from 'react';

export type MaturityLevel = 'level1' | 'level2' | 'level3' | 'level4';

interface MaturityQuestion {
  id: string;
  question: string;
  helpText?: string;
}

interface MaturityContextType {
  answers: Record<string, boolean>;
  setAnswer: (id: string, value: boolean) => void;
  getMaturityLevel: () => MaturityLevel;
  getScore: () => number;
  resetAssessment: () => void;
}

const MaturityContext = createContext<MaturityContextType | undefined>(undefined);

export const maturityQuestions: MaturityQuestion[] = [
  {
    id: 'principal_risks',
    question: 'Do you have board-approved principal risks?',
    helpText: 'A formal register of strategic and operational risks approved by the board',
  },
  {
    id: 'control_framework',
    question: 'Do you have an existing control framework (SOX, ISO, etc.)?',
    helpText: 'Documented internal controls aligned to a recognized framework',
  },
  {
    id: 'grc_platform',
    question: 'Do you have a GRC platform operational?',
    helpText: 'Technology platform for governance, risk, and compliance management',
  },
  {
    id: 'material_controls',
    question: 'Have you defined material controls linked to principal risks?',
    helpText: 'Controls identified as material based on specific criteria',
  },
  {
    id: 'control_ownership',
    question: 'Have you assigned control ownership?',
    helpText: 'Named individuals responsible for each material control',
  },
  {
    id: 'control_testing',
    question: 'Have you conducted control testing in past 12 months?',
    helpText: 'Evidence of design and operating effectiveness testing',
  },
  {
    id: 'evidence_processes',
    question: 'Do you have evidence collection processes?',
    helpText: 'Systematic approach to collecting and storing control evidence',
  },
  {
    id: 'board_reporting',
    question: 'Have you tested board reporting dashboards?',
    helpText: 'Proven mechanism for reporting control effectiveness to the board',
  },
];

export const MaturityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [answers, setAnswers] = useState<Record<string, boolean>>(() => {
    const stored = localStorage.getItem('p29-maturity-assessment');
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem('p29-maturity-assessment', JSON.stringify(answers));
  }, [answers]);

  const setAnswer = (id: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const getScore = (): number => {
    return Object.values(answers).filter(Boolean).length;
  };

  const getMaturityLevel = (): MaturityLevel => {
    const score = getScore();
    if (score <= 2) return 'level1';
    if (score <= 4) return 'level2';
    if (score <= 6) return 'level3';
    return 'level4';
  };

  const resetAssessment = () => {
    setAnswers({});
    localStorage.removeItem('p29-maturity-assessment');
  };

  return (
    <MaturityContext.Provider
      value={{
        answers,
        setAnswer,
        getMaturityLevel,
        getScore,
        resetAssessment,
      }}
    >
      {children}
    </MaturityContext.Provider>
  );
};

export const useMaturity = () => {
  const context = useContext(MaturityContext);
  if (context === undefined) {
    throw new Error('useMaturity must be used within a MaturityProvider');
  }
  return context;
};
