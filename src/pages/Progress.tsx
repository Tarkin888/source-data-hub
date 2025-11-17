import { useProgress } from '@/contexts/ProgressContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Download, RotateCcw, TrendingUp, CheckCircle2, Circle } from 'lucide-react';
import { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useNavigate } from 'react-router-dom';

const ProgressPage = () => {
  const {
    progress,
    getOverallProgress,
    getPhaseProgress,
    getStreak,
    resetProgress,
  } = useProgress();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  const overallProgress = getOverallProgress();
  const streak = getStreak();
  const hasAssessment = progress.assessments.length > 0;
  const latestAssessment = hasAssessment ? progress.assessments[progress.assessments.length - 1] : null;

  const getLevel = () => {
    if (progress.points < 100) return 'Beginner';
    if (progress.points < 300) return 'Intermediate';
    if (progress.points < 500) return 'Advanced';
    return 'Expert';
  };

  const getNextLevelPoints = () => {
    if (progress.points < 100) return 100;
    if (progress.points < 300) return 300;
    if (progress.points < 500) return 500;
    return 1000;
  };

  const handleReset = () => {
    resetProgress();
    setShowConfetti(false);
  };

  const recentMilestones = progress.milestones.filter((m) => m.achieved).slice(-3);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            Your P29 Journey
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Track your implementation progress and stay on top of your goals
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12 px-4">
        <div className="container mx-auto max-w-6xl space-y-6 md:space-y-8">
          {/* Overall Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between flex-wrap gap-4">
                <span>Overall Progress</span>
                <Badge variant="secondary" className="text-lg px-4 py-1">
                  {getLevel()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Circular Progress */}
                <div className="flex flex-col items-center justify-center py-4 md:py-8">
                  <div className="relative w-48 h-48 md:w-64 md:h-64">
                    <svg className="transform -rotate-90 w-full h-full">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        stroke="hsl(var(--muted))"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        stroke="hsl(var(--primary))"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${overallProgress * 2.83} 283`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-4xl md:text-5xl font-bold text-foreground">{overallProgress}%</span>
                      <span className="text-sm text-muted-foreground">Complete</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Assessment</span>
                      {hasAssessment ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    {hasAssessment && latestAssessment && (
                      <p className="text-sm text-muted-foreground">
                        Score: {latestAssessment.score}/120 • {new Date(latestAssessment.timestamp).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Templates Downloaded</span>
                      <span className="text-sm text-muted-foreground">{progress.downloads.length} of 15</span>
                    </div>
                    <Progress value={(progress.downloads.length / 15) * 100} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Articles Read</span>
                      <span className="text-sm text-muted-foreground">{progress.articlesRead.length} of 5</span>
                    </div>
                    <Progress value={(progress.articlesRead.length / 5) * 100} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Points</span>
                      <span className="text-sm text-muted-foreground">{progress.points} / {getNextLevelPoints()}</span>
                    </div>
                    <Progress value={(progress.points / getNextLevelPoints()) * 100} className="h-2" />
                  </div>

                  {streak > 0 && (
                    <div className="flex items-center gap-2 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                      <span className="text-2xl">🔥</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{streak}-day streak!</p>
                        <p className="text-xs text-muted-foreground">Keep up the momentum</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Phase Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Phase Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 md:space-y-6">
                {[1, 2, 3, 4].map((phase) => {
                  const phaseProgress = getPhaseProgress(phase);
                  return (
                    <div key={phase}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Phase {phase}</span>
                        <Badge
                          variant={phaseProgress === 100 ? 'default' : phaseProgress > 0 ? 'secondary' : 'outline'}
                        >
                          {phaseProgress}%
                        </Badge>
                      </div>
                      <Progress value={phaseProgress} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Milestones */}
          {recentMilestones.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Recent Milestones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentMilestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className="p-4 border rounded-lg bg-gradient-to-br from-primary/5 to-background"
                    >
                      <div className="text-3xl mb-2">{milestone.icon}</div>
                      <h4 className="font-semibold mb-1">{milestone.title}</h4>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {!hasAssessment && (
                  <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <Circle className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-medium">Complete your assessment</p>
                      <p className="text-sm text-muted-foreground">Get personalized recommendations for your P29 journey</p>
                    </div>
                    <Button size="sm" onClick={() => navigate('/assessment')}>Start</Button>
                  </div>
                )}
                
                {progress.downloads.length < 5 && (
                  <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <Circle className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-medium">Download more templates</p>
                      <p className="text-sm text-muted-foreground">Explore our library to accelerate your implementation</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => navigate('/templates')}>Browse</Button>
                  </div>
                )}
                
                {progress.articlesRead.length < 3 && (
                  <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <Circle className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-medium">Read implementation guides</p>
                      <p className="text-sm text-muted-foreground">Learn from best practices and expert insights</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => navigate('/resources')}>Explore</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button variant="outline" className="flex-1 min-h-[48px]">
              <Download className="mr-2 h-4 w-4" />
              Download Progress Report
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="flex-1 min-h-[48px] text-destructive hover:bg-destructive/10">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset Progress
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset all progress?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all your tracked progress, including assessment results, downloaded templates, and completed tasks. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleReset} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Reset Progress
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgressPage;
