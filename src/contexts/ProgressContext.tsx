import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface TaskProgress {
  [roleId: string]: {
    [phaseKey: string]: {
      [taskId: string]: boolean;
    };
  };
}

interface TemplateDownload {
  templateId: string;
  timestamp: number;
}

interface ArticleRead {
  articleId: string;
  timestamp: number;
}

interface AssessmentRecord {
  completed: boolean;
  timestamp: number;
  score: number;
  domainScores: { [domain: string]: number };
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  icon: string;
  achieved: boolean;
  timestamp?: number;
}

interface ProgressData {
  tasks: TaskProgress;
  downloads: TemplateDownload[];
  articlesRead: ArticleRead[];
  assessments: AssessmentRecord[];
  visitDates: string[];
  milestones: Milestone[];
  points: number;
}

interface ProgressContextType {
  progress: ProgressData;
  trackTaskCompletion: (roleId: string, phaseKey: string, taskId: string, completed: boolean) => void;
  trackTemplateDownload: (templateId: string) => void;
  trackArticleRead: (articleId: string) => void;
  trackAssessmentCompletion: (score: number, domainScores: { [domain: string]: number }) => void;
  trackVisit: () => void;
  isTemplateDownloaded: (templateId: string) => boolean;
  isArticleRead: (articleId: string) => boolean;
  getTaskProgress: (roleId: string, phaseKey: string) => { completed: number; total: number };
  getOverallProgress: () => number;
  getPhaseProgress: (phase: number) => number;
  getStreak: () => number;
  checkMilestones: () => void;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = 'p29-progress';

const initialProgress: ProgressData = {
  tasks: {},
  downloads: [],
  articlesRead: [],
  assessments: [],
  visitDates: [],
  milestones: [
    { id: 'first-assessment', title: 'First Assessment', description: 'Completed your first P29 assessment', icon: '🎉', achieved: false },
    { id: 'all-phase1-templates', title: 'Phase 1 Complete', description: 'Downloaded all Phase 1 templates', icon: '🎯', achieved: false },
    { id: '10-tasks', title: 'Task Master', description: 'Completed 10 tasks', icon: '✓', achieved: false },
    { id: 'all-articles', title: 'Avid Reader', description: 'Read all articles', icon: '📚', achieved: false },
    { id: '7-day-streak', title: '7-Day Streak', description: 'Visited 7 days in a row', icon: '🔥', achieved: false },
  ],
  points: 0,
};

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState<ProgressData>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return { ...initialProgress, ...JSON.parse(stored) };
      } catch {
        return initialProgress;
      }
    }
    return initialProgress;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const trackTaskCompletion = (roleId: string, phaseKey: string, taskId: string, completed: boolean) => {
    setProgress((prev) => {
      const tasks = { ...prev.tasks };
      if (!tasks[roleId]) tasks[roleId] = {};
      if (!tasks[roleId][phaseKey]) tasks[roleId][phaseKey] = {};
      tasks[roleId][phaseKey][taskId] = completed;

      const pointsChange = completed ? 5 : -5;
      return { ...prev, tasks, points: Math.max(0, prev.points + pointsChange) };
    });
  };

  const trackTemplateDownload = (templateId: string) => {
    setProgress((prev) => {
      if (prev.downloads.some((d) => d.templateId === templateId)) return prev;
      return {
        ...prev,
        downloads: [...prev.downloads, { templateId, timestamp: Date.now() }],
        points: prev.points + 10,
      };
    });
  };

  const trackArticleRead = (articleId: string) => {
    setProgress((prev) => {
      if (prev.articlesRead.some((a) => a.articleId === articleId)) return prev;
      return {
        ...prev,
        articlesRead: [...prev.articlesRead, { articleId, timestamp: Date.now() }],
        points: prev.points + 15,
      };
    });
  };

  const trackAssessmentCompletion = (score: number, domainScores: { [domain: string]: number }) => {
    setProgress((prev) => {
      const isFirstAssessment = prev.assessments.length === 0;
      return {
        ...prev,
        assessments: [
          ...prev.assessments,
          { completed: true, timestamp: Date.now(), score, domainScores },
        ],
        points: prev.points + (isFirstAssessment ? 100 : 50),
      };
    });
  };

  const trackVisit = () => {
    const today = new Date().toDateString();
    setProgress((prev) => {
      if (prev.visitDates.includes(today)) return prev;
      return {
        ...prev,
        visitDates: [...prev.visitDates, today],
      };
    });
  };

  const isTemplateDownloaded = (templateId: string) => {
    return progress.downloads.some((d) => d.templateId === templateId);
  };

  const isArticleRead = (articleId: string) => {
    return progress.articlesRead.some((a) => a.articleId === articleId);
  };

  const getTaskProgress = (roleId: string, phaseKey: string) => {
    const tasks = progress.tasks[roleId]?.[phaseKey] || {};
    const completed = Object.values(tasks).filter(Boolean).length;
    const total = Object.keys(tasks).length;
    return { completed, total };
  };

  const getOverallProgress = () => {
    const assessmentWeight = progress.assessments.length > 0 ? 30 : 0;
    const templateWeight = (progress.downloads.length / 15) * 30;
    const taskWeight = (Object.values(progress.tasks).reduce((acc, role) => {
      return acc + Object.values(role).reduce((acc2, phase) => {
        return acc2 + Object.values(phase).filter(Boolean).length;
      }, 0);
    }, 0) / 50) * 30;
    const articleWeight = (progress.articlesRead.length / 5) * 10;
    
    return Math.min(100, Math.round(assessmentWeight + templateWeight + taskWeight + articleWeight));
  };

  const getPhaseProgress = (phase: number) => {
    const phaseTemplates = progress.downloads.filter((d) => d.templateId.includes(`phase${phase}`));
    const phaseTasks = Object.values(progress.tasks).reduce((acc, role) => {
      const phaseKey = `phase${phase}`;
      return acc + Object.values(role[phaseKey] || {}).filter(Boolean).length;
    }, 0);
    
    return Math.min(100, Math.round(((phaseTemplates.length + phaseTasks) / 10) * 100));
  };

  const getStreak = () => {
    const dates = progress.visitDates.map((d) => new Date(d).getTime()).sort((a, b) => b - a);
    let streak = 0;
    const today = new Date().setHours(0, 0, 0, 0);
    
    for (let i = 0; i < dates.length; i++) {
      const expectedDate = today - (i * 24 * 60 * 60 * 1000);
      if (Math.abs(dates[i] - expectedDate) < 24 * 60 * 60 * 1000) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const checkMilestones = () => {
    setProgress((prev) => {
      const milestones = [...prev.milestones];
      
      // First assessment
      if (prev.assessments.length > 0 && !milestones.find((m) => m.id === 'first-assessment')?.achieved) {
        const idx = milestones.findIndex((m) => m.id === 'first-assessment');
        milestones[idx] = { ...milestones[idx], achieved: true, timestamp: Date.now() };
      }
      
      // 10 tasks
      const totalTasks = Object.values(prev.tasks).reduce((acc, role) => {
        return acc + Object.values(role).reduce((acc2, phase) => {
          return acc2 + Object.values(phase).filter(Boolean).length;
        }, 0);
      }, 0);
      if (totalTasks >= 10 && !milestones.find((m) => m.id === '10-tasks')?.achieved) {
        const idx = milestones.findIndex((m) => m.id === '10-tasks');
        milestones[idx] = { ...milestones[idx], achieved: true, timestamp: Date.now() };
      }
      
      // All articles
      if (prev.articlesRead.length >= 5 && !milestones.find((m) => m.id === 'all-articles')?.achieved) {
        const idx = milestones.findIndex((m) => m.id === 'all-articles');
        milestones[idx] = { ...milestones[idx], achieved: true, timestamp: Date.now() };
      }
      
      // 7-day streak
      if (getStreak() >= 7 && !milestones.find((m) => m.id === '7-day-streak')?.achieved) {
        const idx = milestones.findIndex((m) => m.id === '7-day-streak');
        milestones[idx] = { ...milestones[idx], achieved: true, timestamp: Date.now() };
      }
      
      return { ...prev, milestones };
    });
  };

  const resetProgress = () => {
    setProgress(initialProgress);
    localStorage.removeItem(STORAGE_KEY);
  };

  useEffect(() => {
    trackVisit();
  }, []);

  useEffect(() => {
    checkMilestones();
  }, [progress.assessments, progress.downloads, progress.tasks, progress.articlesRead]);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        trackTaskCompletion,
        trackTemplateDownload,
        trackArticleRead,
        trackAssessmentCompletion,
        trackVisit,
        isTemplateDownloaded,
        isArticleRead,
        getTaskProgress,
        getOverallProgress,
        getPhaseProgress,
        getStreak,
        checkMilestones,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
};
