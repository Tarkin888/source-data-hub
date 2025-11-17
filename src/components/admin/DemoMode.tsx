import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Presentation, Settings, Zap, Eye, EyeOff } from 'lucide-react';

interface DemoModeProps {
  onDemoModeChange?: (enabled: boolean) => void;
}

const DemoMode = ({ onDemoModeChange }: DemoModeProps) => {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [autoProgress, setAutoProgress] = useState(false);
  const [showTooltips, setShowTooltips] = useState(true);
  const [hideProgress, setHideProgress] = useState(false);

  useEffect(() => {
    // Load demo mode state from localStorage
    const savedDemoMode = localStorage.getItem('demoMode') === 'true';
    const savedAutoProgress = localStorage.getItem('demoAutoProgress') === 'true';
    const savedShowTooltips = localStorage.getItem('demoShowTooltips') !== 'false';
    const savedHideProgress = localStorage.getItem('demoHideProgress') === 'true';
    
    setIsDemoMode(savedDemoMode);
    setAutoProgress(savedAutoProgress);
    setShowTooltips(savedShowTooltips);
    setHideProgress(savedHideProgress);
  }, []);

  const toggleDemoMode = (enabled: boolean) => {
    setIsDemoMode(enabled);
    localStorage.setItem('demoMode', String(enabled));
    onDemoModeChange?.(enabled);

    if (!enabled) {
      // Reset demo settings when turning off
      setAutoProgress(false);
      setShowTooltips(true);
      setHideProgress(false);
      localStorage.removeItem('demoAutoProgress');
      localStorage.removeItem('demoShowTooltips');
      localStorage.removeItem('demoHideProgress');
    }
  };

  const toggleAutoProgress = (enabled: boolean) => {
    setAutoProgress(enabled);
    localStorage.setItem('demoAutoProgress', String(enabled));
  };

  const toggleShowTooltips = (enabled: boolean) => {
    setShowTooltips(enabled);
    localStorage.setItem('demoShowTooltips', String(enabled));
  };

  const toggleHideProgress = (enabled: boolean) => {
    setHideProgress(enabled);
    localStorage.setItem('demoHideProgress', String(enabled));
  };

  const resetDemoData = () => {
    if (confirm('This will clear all progress and reset the platform to a fresh state. Continue?')) {
      // Clear all localStorage except demo mode settings
      const demoSettings = {
        demoMode: localStorage.getItem('demoMode'),
        demoAutoProgress: localStorage.getItem('demoAutoProgress'),
        demoShowTooltips: localStorage.getItem('demoShowTooltips'),
        demoHideProgress: localStorage.getItem('demoHideProgress'),
      };

      localStorage.clear();

      // Restore demo settings
      Object.entries(demoSettings).forEach(([key, value]) => {
        if (value) localStorage.setItem(key, value);
      });

      // Reload page to reset state
      window.location.reload();
    }
  };

  const simulateProgress = () => {
    // Simulate some progress for demo purposes
    const progress = {
      assessmentCompleted: true,
      assessmentDate: Date.now(),
      assessmentScore: 75,
      assessmentScores: { governance: 15, risk: 18, controls: 12, assurance: 16, technology: 14 },
      templatesDownloaded: [
        { templateId: 'material-control-inventory', timestamp: Date.now() - 86400000 },
        { templateId: 'control-description-template', timestamp: Date.now() - 172800000 },
        { templateId: 'board-reporting-template', timestamp: Date.now() - 259200000 },
      ],
      tasksCompleted: {
        'board-director': {
          phase1: { 'task-1-1': true, 'task-1-2': true },
          phase2: { 'task-2-1': true },
        },
      },
      articlesRead: [
        { articleId: 'article-1', timestamp: Date.now() - 86400000 },
      ],
      visitedDays: [Date.now(), Date.now() - 86400000, Date.now() - 172800000],
      points: 175,
      milestones: ['first_assessment', 'first_download'],
    };

    localStorage.setItem('p29-progress', JSON.stringify(progress));
    alert('Demo progress data has been added. Reload the page to see the changes.');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Presentation className="h-5 w-5 text-primary" />
          <CardTitle>Demo Mode</CardTitle>
        </div>
        <CardDescription>
          Configure settings for vendor demos and presentations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Demo Mode Toggle */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
          <div className="space-y-1">
            <Label htmlFor="demo-mode" className="text-base font-medium">
              Enable Demo Mode
            </Label>
            <p className="text-sm text-muted-foreground">
              Activate special features for demonstrations
            </p>
          </div>
          <Switch
            id="demo-mode"
            checked={isDemoMode}
            onCheckedChange={toggleDemoMode}
          />
        </div>

        {/* Demo Mode Options */}
        {isDemoMode && (
          <div className="space-y-4 pl-4 border-l-2 border-primary/20">
            {/* Auto Progress */}
            <div className="flex items-center justify-between">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <Label htmlFor="auto-progress" className="font-medium">
                    Auto Progress
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Automatically advance through slides/sections
                </p>
              </div>
              <Switch
                id="auto-progress"
                checked={autoProgress}
                onCheckedChange={toggleAutoProgress}
              />
            </div>

            {/* Show Tooltips */}
            <div className="flex items-center justify-between">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-blue-500" />
                  <Label htmlFor="show-tooltips" className="font-medium">
                    Show Tooltips
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Display helpful tooltips during demo
                </p>
              </div>
              <Switch
                id="show-tooltips"
                checked={showTooltips}
                onCheckedChange={toggleShowTooltips}
              />
            </div>

            {/* Hide Progress Widget */}
            <div className="flex items-center justify-between">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <EyeOff className="h-4 w-4 text-gray-500" />
                  <Label htmlFor="hide-progress" className="font-medium">
                    Hide Progress Widget
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Hide user progress to show clean interface
                </p>
              </div>
              <Switch
                id="hide-progress"
                checked={hideProgress}
                onCheckedChange={toggleHideProgress}
              />
            </div>
          </div>
        )}

        {/* Demo Actions */}
        {isDemoMode && (
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="h-4 w-4 text-muted-foreground" />
              <Label className="text-sm font-medium text-muted-foreground">
                Demo Actions
              </Label>
            </div>
            
            <Button
              onClick={simulateProgress}
              variant="outline"
              className="w-full justify-start"
            >
              <Zap className="h-4 w-4 mr-2" />
              Simulate User Progress
            </Button>

            <Button
              onClick={resetDemoData}
              variant="outline"
              className="w-full justify-start text-destructive hover:text-destructive"
            >
              <Settings className="h-4 w-4 mr-2" />
              Reset to Fresh State
            </Button>
          </div>
        )}

        {/* Demo Tips */}
        {isDemoMode && (
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
            <h4 className="font-medium text-sm text-blue-900 dark:text-blue-100 mb-2">
              Demo Tips
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Clear browser cache before starting a demo</li>
              <li>• Use vendor URL parameter: ?vendor=readinow</li>
              <li>• Prepare assessment results in advance</li>
              <li>• Test screen sharing before the demo</li>
              <li>• Have backup browser tabs ready</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DemoMode;
