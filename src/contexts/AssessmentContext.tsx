import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AssessmentAnswers {
  [questionId: string]: number;
}

interface AssessmentContextType {
  answers: AssessmentAnswers;
  currentQuestionIndex: number;
  setAnswer: (questionId: string, points: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (index: number) => void;
  resetAssessment: () => void;
  getTotalScore: () => number;
  getDomainScore: (domainId: string, questionIds: string[]) => number;
  isComplete: () => boolean;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

const STORAGE_KEY = 'p29_assessment_answers';

export const AssessmentProvider = ({ children }: { children: ReactNode }) => {
  const [answers, setAnswers] = useState<AssessmentAnswers>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  });
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  const setAnswer = (questionId: string, points: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: points
    }));
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const previousQuestion = () => {
    setCurrentQuestionIndex(prev => Math.max(0, prev - 1));
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const resetAssessment = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getTotalScore = () => {
    return Object.values(answers).reduce((sum, points) => sum + points, 0);
  };

  const getDomainScore = (domainId: string, questionIds: string[]) => {
    return questionIds.reduce((sum, qId) => sum + (answers[qId] || 0), 0);
  };

  const isComplete = () => {
    return Object.keys(answers).length === 30;
  };

  return (
    <AssessmentContext.Provider
      value={{
        answers,
        currentQuestionIndex,
        setAnswer,
        nextQuestion,
        previousQuestion,
        goToQuestion,
        resetAssessment,
        getTotalScore,
        getDomainScore,
        isComplete,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};
