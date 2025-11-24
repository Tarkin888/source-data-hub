import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  getAnalyticsSummary, 
  clearAnalyticsData, 
  optOutOfAnalytics, 
  optInToAnalytics, 
  hasOptedOut,
  logAnalyticsSummary
} from '@/utils/analytics';
import { BarChart3, Eye, MousePointer, Scroll, AlertCircle, Download } from 'lucide-react';

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState(getAnalyticsSummary());
  const [isOptedOut, setIsOptedOut] = useState(hasOptedOut());

  useEffect(() => {
    // Refresh analytics data
    setAnalyticsData(getAnalyticsSummary());
    setIsOptedOut(hasOptedOut());
  }, []);

  const handleOptOut = () => {
    optOutOfAnalytics();
    setIsOptedOut(true);
    setAnalyticsData(null);
  };

  const handleOptIn = () => {
    optInToAnalytics();
    setIsOptedOut(false);
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all analytics data? This action cannot be undone.')) {
      clearAnalyticsData();
      setAnalyticsData(null);
    }
  };

  const handleExportSummary = () => {
    logAnalyticsSummary();
    alert('Analytics summary exported to console. Open browser DevTools (F12) to view.');
  };

  if (isOptedOut) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You have opted out of analytics tracking. No data is being collected.
          </AlertDescription>
        </Alert>
        
        <div className="mt-6">
          <Button onClick={handleOptIn} variant="outline">
            Opt In to Analytics
          </Button>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="p-8 text-center">
          <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Analytics Data</h2>
          <p className="text-muted-foreground mb-6">
            Start browsing the site to see your analytics data
          </p>
        </Card>
      </div>
    );
  }

  const conversionRate = analyticsData.visitCount > 0 
    ? (analyticsData.ctaClicks.length / analyticsData.visitCount * 100).toFixed(1)
    : '0.0';

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Privacy-focused tracking of your P29 Playbook journey
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExportSummary} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleClearData} variant="outline" size="sm">
            Clear Data
          </Button>
          <Button onClick={handleOptOut} variant="destructive" size="sm">
            Opt Out
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold">Total Visits</h3>
          </div>
          <p className="text-3xl font-bold">{analyticsData.visitCount}</p>
          <p className="text-xs text-muted-foreground mt-1">
            First visit: {new Date(analyticsData.firstVisit).toLocaleDateString()}
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <MousePointer className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold">CTA Clicks</h3>
          </div>
          <p className="text-3xl font-bold">{analyticsData.ctaClicks.length}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Conversion rate: {conversionRate}%
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Scroll className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold">Max Scroll</h3>
          </div>
          <p className="text-3xl font-bold">{analyticsData.maxScrollDepth}%</p>
          <p className="text-xs text-muted-foreground mt-1">
            of page viewed
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold">Features Viewed</h3>
          </div>
          <p className="text-3xl font-bold">{analyticsData.featuresViewed.length}</p>
          <p className="text-xs text-muted-foreground mt-1">
            out of 6 features
          </p>
        </Card>
      </div>

      {/* Journey Selection */}
      {analyticsData.journeySelected && (
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold mb-3">Your Journey Path</h3>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium">
              {analyticsData.journeySelected === 'starting' && 'Just Starting'}
              {analyticsData.journeySelected === 'progress' && 'In Progress'}
              {analyticsData.journeySelected === 'ready' && 'Almost Ready'}
            </div>
            <p className="text-sm text-muted-foreground">
              Selected journey path
            </p>
          </div>
        </Card>
      )}

      {/* CTA Clicks Detail */}
      {analyticsData.ctaClicks.length > 0 && (
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">CTA Click History</h3>
          <div className="space-y-2">
            {analyticsData.ctaClicks.slice(-5).reverse().map((click, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">{click.cta}</p>
                  <p className="text-xs text-muted-foreground">Location: {click.location}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(click.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
          {analyticsData.ctaClicks.length > 5 && (
            <p className="text-xs text-muted-foreground mt-2">
              Showing last 5 of {analyticsData.ctaClicks.length} total clicks
            </p>
          )}
        </Card>
      )}

      {/* Features Viewed */}
      {analyticsData.featuresViewed.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Features You've Explored</h3>
          <div className="flex flex-wrap gap-2">
            {analyticsData.featuresViewed.map((feature, i) => (
              <div key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                {feature}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Privacy Notice */}
      <Alert className="mt-8">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Privacy Notice:</strong> All analytics data is stored locally in your browser. No data is transmitted to external servers. You can opt out or clear your data at any time using the buttons above.
        </AlertDescription>
      </Alert>
    </div>
  );
}
