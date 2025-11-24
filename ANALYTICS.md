# Landing Page Analytics Implementation

## Overview
Privacy-focused analytics system for tracking user engagement on the P29 Playbook landing page. All data is stored locally in the browser with no external transmission.

## Features Tracked

### 1. Page Views
- Tracks when users visit the landing page
- Records visit count and timestamps
- Location: HeroSection component on mount

### 2. Journey Selection
- Tracks which implementation journey users select:
  - "Just Starting" (starting)
  - "In Progress" (progress)  
  - "Almost Ready" (ready)
- Stored in localStorage for persistence
- Location: JourneySelector component

### 3. CTA Clicks
- Tracks all call-to-action button clicks
- Records: button text, location on page, timestamp
- Locations tracked:
  - Hero section CTAs
  - Features grid CTA
  - Social proof section CTAs

### 4. Feature Interest
- Tracks when users hover over feature cards
- Identifies which features generate most interest
- Location: FeaturesGrid component

### 5. Timeline Alert Dismissal
- Tracks when users dismiss the deadline alert
- Monitors repeated dismissals
- Location: TimelineAlert component

### 6. Scroll Depth
- Tracks how far users scroll: 25%, 50%, 75%, 100%
- Debounced to fire max once per second
- Identifies where users drop off
- Location: Home page component

## Data Storage

All analytics data is stored in localStorage under the key `p29_analytics`:

```typescript
{
  userId: string;              // Anonymous user ID
  journeySelected: string | null;
  visitCount: number;
  firstVisit: string;          // ISO timestamp
  lastVisit: string;           // ISO timestamp
  ctaClicks: Array<{
    cta: string;
    location: string;
    timestamp: string;
  }>;
  featuresViewed: string[];
  maxScrollDepth: number;      // 0-100
  alertDismissals: number;
}
```

## Privacy Features

### Do Not Track Support
- Respects browser DNT settings
- No tracking if DNT is enabled

### Opt-Out Mechanism
- Users can opt out via Analytics Dashboard
- Opt-out preference stored in localStorage
- All data cleared on opt-out

### Cookie Consent
- Banner appears on first visit
- Clear explanation of data usage
- Accept/Decline options provided
- Respects user choice

### Data Control
- Users can view all collected data
- Export analytics summary to console
- Clear all data at any time
- No external data transmission

## Accessing Analytics

### For Users
1. Visit `/analytics-dashboard` route
2. View personal analytics summary
3. Export, clear, or opt out of tracking

### For Developers
```javascript
import { 
  getAnalyticsSummary,
  logAnalyticsSummary,
  clearAnalyticsData,
  optOutOfAnalytics,
  optInToAnalytics
} from '@/utils/analytics';

// Get analytics data
const data = getAnalyticsSummary();

// Log summary to console
logAnalyticsSummary();

// Clear all data
clearAnalyticsData();

// Opt out/in
optOutOfAnalytics();
optInToAnalytics();
```

## Metrics Calculated

### Conversion Rate
```
(Total CTA Clicks / Total Visits) × 100
```

### Popular Journey Path
Most frequently selected journey type

### Average Scroll Depth
Maximum scroll depth reached by users

### Feature Engagement
Features viewed/hovered by users

### Alert Dismissal Rate
Frequency of timeline alert dismissals

## Console Logging

All analytics events are logged to console in development:

```
[Analytics] page_view { timestamp, page, userId, visitCount }
[Analytics] journey_selected { timestamp, journeyType, userId }
[Analytics] cta_click { timestamp, ctaName, location, userId }
[Analytics] feature_viewed { timestamp, featureName, userId }
[Analytics] alert_dismissed { timestamp, userId, totalDismissals }
[Analytics] scroll_depth { timestamp, depth, userId }
```

## Production Integration

To integrate with a backend analytics service:

1. Replace `logEvent()` function in `src/utils/analytics.ts`
2. Add API endpoint for analytics ingestion
3. Ensure GDPR/privacy compliance
4. Update privacy policy

Example:
```typescript
const logEvent = (eventName: string, properties?: Record<string, any>) => {
  if (!isTrackingAllowed()) return;
  
  // Send to backend
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: eventName,
      properties,
      timestamp: new Date().toISOString()
    })
  });
};
```

## Testing Analytics

### View Current Data
```javascript
// In browser console
import { logAnalyticsSummary } from '@/utils/analytics';
logAnalyticsSummary();
```

### Clear Test Data
```javascript
// In browser console
localStorage.removeItem('p29_analytics');
localStorage.removeItem('p29_analytics_opt_out');
localStorage.removeItem('p29_cookie_consent');
```

### Simulate Events
1. Navigate to landing page
2. Click journey cards
3. Click CTA buttons
4. Scroll through page
5. Dismiss timeline alert
6. Check `/analytics-dashboard`

## Privacy Compliance

✅ No PII collected  
✅ Respects Do Not Track  
✅ User opt-out available  
✅ Data stored locally  
✅ Cookie consent banner  
✅ Clear data policy  
✅ Transparent tracking  

## Future Enhancements

- [ ] A/B testing support
- [ ] Heatmap visualization
- [ ] Session replay (privacy-focused)
- [ ] Funnel analysis
- [ ] Cohort tracking
- [ ] Export to CSV/PDF
- [ ] Backend integration
- [ ] Real-time dashboard
- [ ] Comparative analytics
- [ ] Goal tracking

## Support

For questions or issues with analytics:
- Check browser console for logged events
- Visit `/analytics-dashboard` for data summary
- Review localStorage for stored data
- Verify tracking is enabled (not opted out)
