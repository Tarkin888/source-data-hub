import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAssessment } from '@/contexts/AssessmentContext';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import DomainTransition from './DomainTransition';
import SEOHead from '@/components/common/SEOHead';
import assessmentData from '@/data/assessment.json';
import { ArrowRight } from 'lucide-react';

const AssessmentQuestions = () => {
  const navigate = useNavigate();
  const { answers, currentQuestionIndex, setAnswer, nextQuestion, previousQuestion, goToQuestion } = useAssessment();
  const [showTransition, setShowTransition] = useState(false);
  const [transitionData, setTransitionData] = useState<{
    previousDomain: string;
    nextDomain: { name: string; icon: string };
  } | null>(null);

  // Flatten all questions
  const allQuestions = assessmentData.domains.flatMap((domain) =>
    domain.questions.map((q) => ({
      ...q,
      domainName: domain.name,
      domainColor: domain.color,
      domainId: domain.id,
      domainIcon: domain.icon,
    }))
  );

  const currentQuestion = allQuestions[currentQuestionIndex];
  const selectedAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const selectedOptionIndex = currentQuestion && selectedAnswer !== undefined
    ? currentQuestion.options.findIndex(opt => opt.points === selectedAnswer).toString()
    : undefined;

  // Find current domain index
  const getCurrentDomainIndex = () => {
    let questionCount = 0;
    for (let i = 0; i < assessmentData.domains.length; i++) {
      questionCount += assessmentData.domains[i].questions.length;
      if (currentQuestionIndex < questionCount) {
        return i;
      }
    }
    return assessmentData.domains.length - 1;
  };

  const handleNext = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      const currentDomainIndex = getCurrentDomainIndex();
      
      // Check if next question is in a new domain
      let nextQuestionCount = 0;
      for (let i = 0; i <= currentDomainIndex; i++) {
        nextQuestionCount += assessmentData.domains[i].questions.length;
      }
      
      if (currentQuestionIndex + 1 === nextQuestionCount && currentDomainIndex < assessmentData.domains.length - 1) {
        // Show transition
        setTransitionData({
          previousDomain: assessmentData.domains[currentDomainIndex].name,
          nextDomain: {
            name: assessmentData.domains[currentDomainIndex + 1].name,
            icon: assessmentData.domains[currentDomainIndex + 1].icon,
          },
        });
        setShowTransition(true);
      } else {
        nextQuestion();
      }
    } else {
      // Assessment complete - navigate to results
      navigate('/assessment/results');
    }
  };

  const handleTransitionComplete = () => {
    setShowTransition(false);
    setTransitionData(null);
    nextQuestion();
  };

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`Assessment Question ${currentQuestionIndex + 1} of 30`}
        description={`P29 readiness assessment - ${currentQuestion.domainName}: ${currentQuestion.question}`}
        noindex={true}
      />
      <ProgressBar
        currentQuestion={currentQuestionIndex}
        totalQuestions={allQuestions.length}
        currentDomain={currentQuestion.domainName}
        totalDomains={getCurrentDomainIndex() + 1}
        onBack={previousQuestion}
        canGoBack={currentQuestionIndex > 0}
      />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <QuestionCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          selectedValue={selectedOptionIndex}
          onSelect={(value, points) => setAnswer(currentQuestion.id, points)}
          domainName={currentQuestion.domainName}
          domainColor={currentQuestion.domainColor}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={allQuestions.length}
        />

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={selectedAnswer === undefined}
          >
            {currentQuestionIndex === allQuestions.length - 1 ? 'View Results' : 'Next Question'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {showTransition && transitionData && (
        <DomainTransition
          previousDomain={transitionData.previousDomain}
          nextDomain={transitionData.nextDomain}
          onComplete={handleTransitionComplete}
        />
      )}
    </div>
  );
};

export default AssessmentQuestions;
