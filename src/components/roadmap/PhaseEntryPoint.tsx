import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface PhaseEntryPointProps {
  phaseId: number;
  phaseName: string;
}

const phaseEntryData = {
  1: {
    prerequisites: [
      'Executive sponsorship secured',
      'Project team assembled',
      'Initial budget approved',
    ],
    quickStart: [
      'Week 1: Schedule emergency board workshop to secure P29 commitment',
      'Week 1-2: Review existing risk register and control documentation',
      'Week 2: Establish steering committee and governance structure',
      'Week 2-4: Draft materiality criteria and decision tree',
    ],
    catchUp: [
      'Fast-track board engagement - one intensive workshop vs. multiple meetings',
      'Leverage existing risk framework - don\'t start from scratch',
      'Use external consultants to accelerate materiality definition',
    ],
  },
  2: {
    prerequisites: [
      'Board-approved Material Control Inventory (25-100 controls)',
      'Materiality criteria documented and approved',
      'Principal risks mapped to material controls',
      'Budget and resources secured for Phase 2',
    ],
    quickStart: [
      'Week 1: Validate Phase 1 outputs meet P29 standards (use validation checklist)',
      'Week 1-2: Formalize control definitions using standardized templates',
      'Week 2-4: Assign named control owners and secure ownership acknowledgement',
      'Week 3-6: Define effectiveness criteria with quantified thresholds',
    ],
    catchUp: [
      'If you have SOX controls: Map them to P29 requirements rather than starting fresh',
      'If you have ISO 31000: Use existing risk-control linkages as foundation',
      'Use control documentation templates to speed up formalization',
      'Run parallel workshops with multiple control owners simultaneously',
    ],
  },
  3: {
    prerequisites: [
      'All material controls formally documented',
      'Control ownership confirmed in writing',
      'Effectiveness criteria defined for each control',
      'Framework mapping (COSO/ISO) completed',
    ],
    quickStart: [
      'Week 1: Validate Phase 2 outputs (control quality assessment)',
      'Week 1-3: Establish Three Lines of Defence RACI matrix',
      'Week 2-4: Complete assurance mapping across all controls',
      'Week 3-8: Deploy or configure GRC platform',
    ],
    catchUp: [
      'If you have a GRC platform already: Configure for P29 rather than buying new',
      'If you have testing protocols: Adapt them for P29 effectiveness criteria',
      'Use pre-configured platform templates to speed deployment',
      'Run compressed dry run (4 weeks instead of 6-8 weeks)',
    ],
  },
  4: {
    prerequisites: [
      'GRC platform operational',
      'Testing protocols defined and approved',
      'Dry run completed with lessons learned documented',
      'Board dashboard tested and approved',
    ],
    quickStart: [
      'Week 1: Validate Phase 3 outputs and dry run results',
      'Week 1-2: Address all dry run findings and gaps',
      'Week 2-4: Train all control owners on live procedures',
      'Week 3-4: Final board presentation on readiness',
    ],
    catchUp: [
      'If starting Phase 4 late: Prioritize highest-risk controls for Q1 evidence',
      'Deploy interim manual processes if platform isn\'t fully ready',
      'Accept some control testing will happen concurrently with live operation',
      'Plan for potential qualified declaration in first year',
    ],
  },
};

const PhaseEntryPoint = ({ phaseId, phaseName }: PhaseEntryPointProps) => {
  const data = phaseEntryData[phaseId as keyof typeof phaseEntryData];

  if (!data) return null;

  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <ArrowRight className="h-5 w-5 text-primary" />
          Starting at Phase {phaseId}?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Prerequisites */}
        <div>
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle className="text-sm font-semibold">Prerequisites Check</AlertTitle>
            <AlertDescription className="text-xs mt-2">
              <p className="mb-2">Before starting Phase {phaseId}, ensure you have:</p>
              <ul className="space-y-1">
                {data.prerequisites.map((prereq, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3 w-3 mt-0.5 flex-shrink-0 text-primary" />
                    <span>{prereq}</span>
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        </div>

        {/* Quick Start */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">Quick Start</Badge>
            <span className="text-xs font-semibold">Your first 2-4 weeks:</span>
          </div>
          <ul className="text-xs space-y-2 text-muted-foreground">
            {data.quickStart.map((activity, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-primary font-semibold mt-0.5">→</span>
                <span>{activity}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Catch-up Considerations */}
        <div className="space-y-2">
          <Alert variant="default" className="border-orange-200 bg-orange-50 dark:bg-orange-950">
            <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            <AlertTitle className="text-sm font-semibold text-orange-900 dark:text-orange-100">
              Catch-up Considerations
            </AlertTitle>
            <AlertDescription className="text-xs mt-2 text-orange-800 dark:text-orange-200">
              <p className="mb-2">If you're joining late or need to accelerate:</p>
              <ul className="space-y-1">
                {data.catchUp.map((consideration, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-orange-600 dark:text-orange-400 font-bold mt-0.5">•</span>
                    <span>{consideration}</span>
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhaseEntryPoint;
