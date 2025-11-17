import { Routes, Route, Navigate } from 'react-router-dom';
import { AssessmentProvider } from '@/contexts/AssessmentContext';
import AssessmentIntro from '@/components/assessment/AssessmentIntro';
import AssessmentQuestions from '@/components/assessment/AssessmentQuestions';
import AssessmentResults from '@/pages/AssessmentResults';

const Assessment = () => {
  return (
    <AssessmentProvider>
      <Routes>
        <Route path="/" element={<AssessmentIntro />} />
        <Route path="/questions" element={<AssessmentQuestions />} />
        <Route path="/results" element={<AssessmentResults />} />
        <Route path="*" element={<Navigate to="/assessment" replace />} />
      </Routes>
    </AssessmentProvider>
  );
};

export default Assessment;
