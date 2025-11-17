# P29 Playbook - QA Testing Checklist

## 1. FUNCTIONAL TESTING

### Navigation
- [ ] Header navigation works on all pages
- [ ] Mobile menu opens/closes correctly
- [ ] Breadcrumbs display correctly on all detail pages
- [ ] Back button (browser) works without breaking app
- [ ] Footer links work
- [ ] All internal links navigate correctly
- [ ] External links open in new tabs
- [ ] Search modal opens with Cmd/Ctrl + K
- [ ] Search modal closes with Escape

### Forms & Inputs
- [ ] Assessment questions accept answers
- [ ] Search inputs accept text
- [ ] Filter dropdowns work
- [ ] Radio buttons selectable
- [ ] Checkboxes toggle correctly
- [ ] Form validation works
- [ ] Required fields prevent submission

### Interactive Elements
- [ ] All buttons clickable and trigger actions
- [ ] Modal open/close works
- [ ] Accordion expand/collapse works
- [ ] Tabs switch correctly
- [ ] Hover states visible
- [ ] Active states visible
- [ ] Disabled states prevent interaction
- [ ] Tooltips appear on hover
- [ ] Dropdown menus work correctly

### Data Display
- [ ] All JSON data loads correctly
- [ ] Phase data displays on roadmap
- [ ] Templates display in library (all 15 templates)
- [ ] FAQs display and expand
- [ ] Glossary terms display alphabetically
- [ ] Resources display in correct tabs (articles, case studies, videos)
- [ ] Assessment questions display correctly (30 questions, 5 domains)
- [ ] Role guides display correctly (6 roles)

### Search Functionality
- [ ] Global search finds templates
- [ ] Global search finds FAQs
- [ ] Global search finds glossary terms
- [ ] Global search finds articles
- [ ] Global search finds pages
- [ ] Recent searches display correctly
- [ ] Search highlighting works
- [ ] Page-specific search filters correctly
- [ ] No results state displays appropriately

### Calculations
- [ ] Assessment scoring: 0 points (all "Not at all")
- [ ] Assessment scoring: 60 points (all "Somewhat")
- [ ] Assessment scoring: 120 points (all "Completely")
- [ ] Domain scores sum correctly
- [ ] Score bands: 0-39 = Red (Not Ready)
- [ ] Score bands: 40-79 = Amber (Partially Ready)
- [ ] Score bands: 80-120 = Green (Ready)
- [ ] Progress percentages calculate correctly
- [ ] Streak calculation works correctly

### Storage & Persistence
- [ ] Assessment answers save to localStorage
- [ ] Assessment answers persist on page reload
- [ ] Task completion saves to localStorage
- [ ] Template downloads tracked in localStorage
- [ ] Article reads tracked in localStorage
- [ ] Progress persists on page reload
- [ ] Milestones persist in localStorage
- [ ] Recent searches persist in localStorage
- [ ] localStorage clears on reset

### Progress Tracking
- [ ] Overall progress calculates correctly
- [ ] Phase progress calculates correctly
- [ ] Task completion tracking works
- [ ] Template download tracking works
- [ ] Article read tracking works
- [ ] Milestone unlocking works
- [ ] Points system calculates correctly
- [ ] Level system works (Beginner/Intermediate/Advanced/Expert)
- [ ] Streak tracking works
- [ ] Reset progress clears all data

## 2. VISUAL TESTING

### Desktop (1920×1080)
- [ ] Homepage renders correctly
- [ ] Roadmap page renders correctly
- [ ] Templates page renders correctly
- [ ] Roles page renders correctly
- [ ] Role detail pages render correctly
- [ ] Resources page renders correctly
- [ ] FAQ page renders correctly
- [ ] Glossary page renders correctly
- [ ] Assessment pages render correctly
- [ ] Progress page renders correctly
- [ ] No horizontal scroll on any page
- [ ] Content centered appropriately
- [ ] Images load correctly
- [ ] Spacing looks professional
- [ ] Cards align properly in grids

### Tablet (768×1024)
- [ ] All pages render correctly
- [ ] Navigation adapts (mobile menu shows)
- [ ] Grids adjust to 2 columns
- [ ] No content overflow
- [ ] Touch targets adequate size
- [ ] Images scale correctly

### Mobile (375×667 - iPhone SE)
- [ ] All pages render correctly
- [ ] Text readable (16px minimum)
- [ ] Buttons tappable (48px minimum)
- [ ] No horizontal scroll
- [ ] Forms usable
- [ ] Mobile menu works
- [ ] Search expands properly
- [ ] Cards stack vertically
- [ ] Assessment questions fit screen

### Mobile (320×568 - Small phone)
- [ ] All pages render correctly
- [ ] Content doesn't break
- [ ] Everything still accessible
- [ ] Text doesn't truncate awkwardly
- [ ] Buttons still tappable

## 3. BROWSER TESTING

### Chrome (Latest)
- [ ] Desktop: Full user journey works
- [ ] Mobile: Full user journey works
- [ ] Console: No JavaScript errors
- [ ] Layout: No CSS issues
- [ ] Fonts: Load correctly
- [ ] Images: Load correctly

### Firefox (Latest)
- [ ] Desktop: Full user journey works
- [ ] Console: No JavaScript errors
- [ ] Layout: No CSS issues
- [ ] Flexbox/Grid: Renders correctly

### Safari (Latest)
- [ ] Desktop: Full user journey works
- [ ] iOS: Full user journey works
- [ ] Console: No JavaScript errors
- [ ] Layout: No CSS issues
- [ ] Fixed positioning: Works correctly
- [ ] Flexbox: Renders correctly

### Edge (Latest)
- [ ] Desktop: Full user journey works
- [ ] Console: No JavaScript errors
- [ ] CSS custom properties: Work correctly

## 4. ACCESSIBILITY TESTING

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Focus indicators visible (blue outline)
- [ ] Tab order logical
- [ ] Enter key activates buttons/links
- [ ] Space bar activates buttons
- [ ] Escape key closes modals/search
- [ ] Arrow keys navigate dropdowns
- [ ] Arrow keys navigate search results
- [ ] Skip to main content link works

### Screen Reader Testing
Test with NVDA (Windows), JAWS (Windows), or VoiceOver (Mac/iOS):
- [ ] All images have descriptive alt text
- [ ] Form inputs have associated labels
- [ ] Buttons have accessible names
- [ ] Links have descriptive text
- [ ] Dynamic content changes announced
- [ ] Modal focus trapped correctly
- [ ] Navigation landmarks present
- [ ] Headings hierarchy logical
- [ ] Lists properly marked up

### Color Contrast
Use WebAIM Contrast Checker:
- [ ] Body text meets WCAG AA (4.5:1)
- [ ] Large text meets WCAG AA (3:1)
- [ ] Button text sufficient contrast
- [ ] Link text sufficient contrast
- [ ] Phase colors accessible
- [ ] Badge text readable
- [ ] Focus indicators visible
- [ ] Hover states visible

### ARIA Implementation
- [ ] ARIA labels on icon buttons
- [ ] ARIA expanded on accordions
- [ ] ARIA live regions for search
- [ ] ARIA roles on custom components
- [ ] ARIA hidden on decorative elements

## 5. PERFORMANCE TESTING

### Load Time (Throttled 3G)
- [ ] Homepage loads < 3 seconds
- [ ] Roadmap loads < 2 seconds
- [ ] Templates loads < 2 seconds
- [ ] Assessment loads < 2 seconds
- [ ] Images lazy load correctly
- [ ] No blocking resources

### Lighthouse Audit
Run in Chrome DevTools (Incognito mode):
- [ ] Performance: 90+ score
- [ ] Accessibility: 95+ score
- [ ] Best Practices: 95+ score
- [ ] SEO: 90+ score

### Bundle Size
Check in Network tab:
- [ ] Total JS bundle < 500KB (gzipped)
- [ ] Total CSS < 100KB (gzipped)
- [ ] Fonts < 200KB
- [ ] Images optimized (WebP/compressed)
- [ ] No duplicate dependencies

### Runtime Performance
- [ ] Smooth scrolling (60fps)
- [ ] Animations smooth (transitions 300ms)
- [ ] No layout shifts
- [ ] No memory leaks
- [ ] Search results instant (< 100ms)

## 6. USER FLOW TESTING

### Flow 1: New User Journey
1. [ ] Land on homepage - clear value proposition visible
2. [ ] Read "What is P29?" section
3. [ ] See progress widget (0% complete)
4. [ ] Click "Start Readiness Assessment" CTA
5. [ ] See assessment intro page
6. [ ] Click "Start Assessment"
7. [ ] Answer all 30 questions (6 per domain)
8. [ ] See domain transitions between domains
9. [ ] Complete final question
10. [ ] View results page with score
11. [ ] See radar chart visualization
12. [ ] See domain breakdowns
13. [ ] See priority actions
14. [ ] Download PDF report (if implemented)
15. [ ] Click recommended template
16. [ ] Return to homepage - see progress updated

### Flow 2: Board Director Journey
1. [ ] Click "Roles" in navigation
2. [ ] See 6 role cards
3. [ ] Click "Board Director" card
4. [ ] See breadcrumb: Home > Roles > Board Director
5. [ ] Read role overview
6. [ ] View timeline (4 phases)
7. [ ] Expand Phase 1 tasks
8. [ ] Check off a task - see progress update
9. [ ] Click "Download All Templates" button
10. [ ] See related resources section
11. [ ] Return to Roles page via breadcrumb

### Flow 3: Template Discovery
1. [ ] Click "Templates" in navigation
2. [ ] See all 15 templates
3. [ ] Use search: type "Material Control"
4. [ ] See filtered results (2 templates)
5. [ ] Filter by Phase 1
6. [ ] See Phase 1 templates only
7. [ ] Click template card
8. [ ] View template detail modal
9. [ ] See template information
10. [ ] Click "Download Template" button
11. [ ] Verify download tracked in progress
12. [ ] Close modal
13. [ ] Clear filters
14. [ ] See all templates again

### Flow 4: Search & Discovery
1. [ ] Press Cmd/Ctrl + K
2. [ ] Search modal opens
3. [ ] Type "risk"
4. [ ] See categorized results
5. [ ] Navigate with arrow keys
6. [ ] Press Enter on result
7. [ ] Navigate to selected content
8. [ ] Open search again
9. [ ] See recent searches
10. [ ] Click recent search to repeat

### Flow 5: Vendor Customization
1. [ ] Visit site with `?vendor=readinow`
2. [ ] Verify ReadiNow logo displays in header
3. [ ] Verify ReadiNow colors applied (check primary color)
4. [ ] See custom tagline
5. [ ] See custom intro message
6. [ ] Complete assessment
7. [ ] Verify ReadiNow recommendations in results
8. [ ] See ReadiNow CTA button
9. [ ] Click CTA - verify link works
10. [ ] See ReadiNow contact card

### Flow 6: Progress Tracking
1. [ ] Visit Progress page
2. [ ] See overall progress (initially 0%)
3. [ ] Complete assessment
4. [ ] Return to Progress page
5. [ ] See progress increased
6. [ ] See milestone unlocked modal
7. [ ] Download a template
8. [ ] Return to Progress page
9. [ ] See download tracked
10. [ ] Check off tasks
11. [ ] See phase progress update
12. [ ] Reset progress
13. [ ] Verify all data cleared

## 7. EDGE CASES & ERROR STATES

### Empty States
- [ ] No search results - shows helpful message
- [ ] No templates match filters - shows clear filters button
- [ ] No FAQs in category - shows empty state
- [ ] No bookmarks saved - shows guidance
- [ ] No progress tracked - shows get started message

### Error Boundaries
- [ ] Component error caught and displayed gracefully
- [ ] Console errors don't crash app
- [ ] "Return to Home" button works
- [ ] "Refresh Page" button works

### Loading States
- [ ] Skeleton loaders show while content loads
- [ ] No flash of unstyled content (FOUC)
- [ ] Loading states match content layout

### Data Validation
- [ ] Invalid vendor parameter shows default branding
- [ ] Missing JSON data handled gracefully
- [ ] Malformed localStorage data handled
- [ ] Invalid route shows 404 page

## 8. SEO & META TAGS

### Every Page
- [ ] Has unique `<title>` tag
- [ ] Has meta description
- [ ] Has Open Graph tags (og:title, og:description, og:image)
- [ ] Has Twitter Card tags
- [ ] Has canonical URL
- [ ] Title under 60 characters
- [ ] Description under 160 characters

### Sitemap
- [ ] sitemap.xml exists at /sitemap.xml
- [ ] Contains all public pages
- [ ] Valid XML format
- [ ] Priority values set appropriately

### Robots
- [ ] robots.txt exists
- [ ] Allows crawling
- [ ] Links to sitemap

## BUG TRACKING FORMAT

When bugs are found, document as:

```
**Page:** [Page name]
**Issue:** [Clear description of the problem]
**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected:** [What should happen]
**Actual:** [What actually happens]
**Browser/Device:** [e.g., Chrome Desktop / Safari iOS 16]
**Screenshot:** [Link or attachment if applicable]
**Priority:** Critical / High / Medium / Low
**Assigned:** [Name]
**Status:** Open / In Progress / Testing / Closed
```

## TESTING SCHEDULE

### Sprint 1 (Days 1-2)
- Functional testing (all features)
- Visual testing (desktop/tablet/mobile)

### Sprint 2 (Days 3-4)
- Browser testing (all browsers)
- Accessibility testing

### Sprint 3 (Days 5-6)
- Performance testing
- User flow testing
- Edge case testing

### Sprint 4 (Day 7)
- Bug fixes
- Regression testing
- Final sign-off

## SIGN-OFF

Testing completed by: _________________
Date: _________________
Production ready: [ ] Yes [ ] No

Notes:
_______________________________________
_______________________________________
_______________________________________
