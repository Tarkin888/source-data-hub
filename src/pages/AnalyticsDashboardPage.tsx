import SEOHead from '@/components/common/SEOHead';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';

export default function AnalyticsDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Analytics Dashboard - P29 Playbook"
        description="View your personal analytics dashboard showing your P29 implementation journey progress and interactions."
      />

      <div className="container mx-auto px-4 py-12">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Analytics Dashboard' }
        ]} />

        <AnalyticsDashboard />
      </div>
    </div>
  );
}
