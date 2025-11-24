import SEOHead from '@/components/common/SEOHead';
import HeroSection from '@/components/landing/HeroSection';
import JourneySelector from '@/components/landing/JourneySelector';
import FeaturesGrid from '@/components/landing/FeaturesGrid';
import TimelineAlert from '@/components/landing/TimelineAlert';
import SocialProofCTA from '@/components/landing/SocialProofCTA';
import CookieConsent from '@/components/analytics/CookieConsent';
import { useEffect } from 'react';
import { trackScrollDepth } from '@/utils/analytics';

export default function Home() {
  // Track scroll depth
  useEffect(() => {
    const scrollDepthTracked = {
      25: false,
      50: false,
      75: false,
      100: false,
    };

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

      // Track 25% depth
      if (scrollPercent >= 25 && !scrollDepthTracked[25]) {
        scrollDepthTracked[25] = true;
        trackScrollDepth(25);
      }

      // Track 50% depth
      if (scrollPercent >= 50 && !scrollDepthTracked[50]) {
        scrollDepthTracked[50] = true;
        trackScrollDepth(50);
      }

      // Track 75% depth
      if (scrollPercent >= 75 && !scrollDepthTracked[75]) {
        scrollDepthTracked[75] = true;
        trackScrollDepth(75);
      }

      // Track 100% depth
      if (scrollPercent >= 99 && !scrollDepthTracked[100]) {
        scrollDepthTracked[100] = true;
        trackScrollDepth(100);
      }
    };

    // Debounce scroll events (fire max once per second)
    let scrollTimeout: NodeJS.Timeout;
    const debouncedScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 1000);
    };

    window.addEventListener('scroll', debouncedScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', debouncedScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);
  return (
    <>
      <SEOHead
        title="P29 Implementation Playbook | UK Corporate Governance"
        description="Complete 24-month roadmap for Provision 29 compliance. Templates, guidance, and tools for January 2026 deadline."
        canonical={window.location.origin}
      />

      <main>
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
        >
          Skip to main content
        </a>

        {/* Sticky deadline alert */}
        <TimelineAlert 
          sticky={true}
          showDismiss={true}
          deadline="2026-01-01"
        />

        {/* Main content sections */}
        <div id="main-content">
          {/* Hero - Full width */}
          <HeroSection />

          {/* Journey Selector */}
          <JourneySelector />

          {/* Features Grid */}
          <FeaturesGrid />

          {/* Final CTA with Social Proof */}
          <SocialProofCTA />
        </div>

        {/* Cookie Consent Banner */}
        <CookieConsent />
      </main>
    </>
  );
}
