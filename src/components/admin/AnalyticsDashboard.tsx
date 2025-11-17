import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Users, FileDown, CheckCircle, TrendingUp, Activity, Award } from 'lucide-react';

interface AnalyticsData {
  visits: {
    total: number;
    unique: number;
    returning: number;
  };
  assessments: {
    started: number;
    completed: number;
    averageScore: number;
    completionRate: number;
  };
  templates: {
    downloads: number;
    uniqueUsers: number;
    topTemplates: Array<{ id: string; name: string; downloads: number }>;
  };
  engagement: {
    averageSessionDuration: number;
    pagesPerSession: number;
    bounceRate: number;
  };
  progress: {
    totalUsers: number;
    activeUsers: number;
    completionRate: number;
  };
}

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('30d');

  useEffect(() => {
    // Load analytics from localStorage
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = () => {
    // In a real implementation, this would fetch from an analytics API
    // For now, we'll compute from localStorage data
    const progress = JSON.parse(localStorage.getItem('p29-progress') || '{}');
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    
    // Mock analytics data (in production, this would come from actual tracking)
    const mockData: AnalyticsData = {
      visits: {
        total: 247,
        unique: 189,
        returning: 58,
      },
      assessments: {
        started: 45,
        completed: progress.assessmentCompleted ? 34 : 0,
        averageScore: 67.5,
        completionRate: 75.6,
      },
      templates: {
        downloads: progress.templatesDownloaded?.length || 0,
        uniqueUsers: 28,
        topTemplates: [
          { id: 'material-control-inventory', name: 'Material Control Inventory', downloads: 12 },
          { id: 'board-reporting-template', name: 'Board Reporting Template', downloads: 9 },
          { id: 'control-description-template', name: 'Control Description Template', downloads: 7 },
        ],
      },
      engagement: {
        averageSessionDuration: 8.4, // minutes
        pagesPerSession: 5.2,
        bounceRate: 32.1,
      },
      progress: {
        totalUsers: 189,
        activeUsers: 67,
        completionRate: 42.3,
      },
    };

    setAnalytics(mockData);
  };

  if (!analytics) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-pulse">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Internal usage metrics and insights</p>
        </div>
        <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as any)}>
          <TabsList>
            <TabsTrigger value="7d">7 Days</TabsTrigger>
            <TabsTrigger value="30d">30 Days</TabsTrigger>
            <TabsTrigger value="all">All Time</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.visits.total}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.visits.unique} unique visitors
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assessments</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.assessments.completed}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.assessments.completionRate.toFixed(1)}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <FileDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.templates.downloads}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.templates.uniqueUsers} unique users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.assessments.averageScore}</div>
            <p className="text-xs text-muted-foreground">out of 120 points</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>User interaction statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avg. Session Duration</span>
                  <span className="font-medium">{analytics.engagement.averageSessionDuration} min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pages per Session</span>
                  <span className="font-medium">{analytics.engagement.pagesPerSession}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Bounce Rate</span>
                  <span className="font-medium">{analytics.engagement.bounceRate}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Progress</CardTitle>
                <CardDescription>Platform completion metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Users</span>
                  <span className="font-medium">{analytics.progress.totalUsers}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Active Users</span>
                  <span className="font-medium">{analytics.progress.activeUsers}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Completion Rate</span>
                  <span className="font-medium">{analytics.progress.completionRate}%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Statistics</CardTitle>
              <CardDescription>Readiness assessment metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Assessments Started</span>
                  <span className="font-medium">{analytics.assessments.started}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Assessments Completed</span>
                  <span className="font-medium">{analytics.assessments.completed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Average Score</span>
                  <span className="font-medium">{analytics.assessments.averageScore} / 120</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Completion Rate</span>
                  <span className="font-medium">{analytics.assessments.completionRate}%</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Score Distribution</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-20 text-sm text-muted-foreground">Red (0-39)</div>
                    <div className="flex-1 bg-red-200 h-6 rounded-md" style={{ width: '15%' }}></div>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 text-sm text-muted-foreground">Amber (40-79)</div>
                    <div className="flex-1 bg-amber-200 h-6 rounded-md" style={{ width: '45%' }}></div>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 text-sm text-muted-foreground">Green (80-120)</div>
                    <div className="flex-1 bg-green-200 h-6 rounded-md" style={{ width: '40%' }}></div>
                    <span className="text-sm font-medium">40%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Template Downloads</CardTitle>
              <CardDescription>Most popular templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.templates.topTemplates.map((template, index) => (
                  <div key={template.id} className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{template.name}</div>
                      <div className="text-sm text-muted-foreground">{template.downloads} downloads</div>
                    </div>
                    <div className="w-24 bg-muted h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${(template.downloads / 12) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
              <CardDescription>How users interact with the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Session Metrics</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Avg. Session Duration</span>
                      <span className="font-medium">{analytics.engagement.averageSessionDuration} min</span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Pages per Session</span>
                      <span className="font-medium">{analytics.engagement.pagesPerSession}</span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Bounce Rate</span>
                      <span className="font-medium">{analytics.engagement.bounceRate}%</span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: '32%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
