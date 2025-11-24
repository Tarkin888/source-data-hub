import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Cookie } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('p29_cookie_consent');
    if (!hasConsented) {
      // Show banner after 2 seconds
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('p29_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('p29_cookie_consent', 'declined');
    localStorage.setItem('p29_analytics_opt_out', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in">
      <Card className="max-w-4xl mx-auto p-6 shadow-2xl border-2">
        <div className="flex items-start gap-4">
          <Cookie className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">Cookie & Privacy Notice</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We use local storage to track your progress and improve your experience. No data is sent to external servers. 
              Your analytics data stays private and in your control. You can opt out at any time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleAccept} size="sm">
                Accept & Continue
              </Button>
              <Button onClick={handleDecline} variant="outline" size="sm">
                Decline Tracking
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.open('/analytics-dashboard', '_blank')}
              >
                Learn More
              </Button>
            </div>
          </div>

          <button
            onClick={handleDecline}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </Card>
    </div>
  );
}
