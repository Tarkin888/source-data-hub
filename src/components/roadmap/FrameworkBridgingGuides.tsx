import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowRight, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

const FrameworkBridgingGuides = () => {
  const frameworks = [
    {
      id: 'sox',
      name: 'SOX 404',
      title: 'SOX → P29 Bridging Guide',
      transferable: [
        'Financial reporting controls (revenue, inventory, payroll, etc.)',
        'Control documentation standards and templates',
        'Testing protocols and evidence collection processes',
        'Control owner assignments for financial processes',
        'GRC platform infrastructure (if implemented)',
        'Audit committee reporting mechanisms',
      ],
      needsUpdate: [
        'Expand from financial-only to operational and reporting controls',
        'Link all controls to board-approved principal risks (not just financial risks)',
        'Add ESG and sustainability controls (not typically in SOX scope)',
        'Extend assurance beyond ICFR to broader risk management',
        'Update materiality criteria to reflect P29 qualitative factors',
        'Enhance board dashboard to cover all material risk domains',
      ],
      approach: 'Use SOX controls as the foundation for your financial domain, then expand to cover operational, compliance, and reporting controls. Typical SOX program has 60-80 controls; P29 will need 40-60 total with 30-40 being non-SOX.',
      timelineSavings: 'Skip most of Phase 1 (4-8 weeks) and parts of Phase 2 (6-8 weeks). Total savings: 10-16 weeks.',
      startingPhase: 'Phase 2 (with validation of existing SOX controls)',
    },
    {
      id: 'iso',
      name: 'ISO 31000',
      title: 'ISO 31000 → P29 Bridging Guide',
      transferable: [
        'Risk management framework and governance structure',
        'Risk identification and assessment processes',
        'Existing principal risk register',
        'Risk appetite statements and thresholds',
        'Risk reporting to board and committees',
        'Three Lines model implementation',
      ],
      needsUpdate: [
        'Map ISO risk processes to COSO control components',
        'Define specific material controls for each principal risk',
        'Add control effectiveness testing protocols',
        'Implement control-level evidence collection',
        'Enhance risk reporting with control status metrics',
        'Link ISO risks explicitly to control activities',
      ],
      approach: 'ISO 31000 provides excellent risk foundation but less prescriptive on controls. Focus on defining specific controls that mitigate each ISO-identified risk. Leverage existing risk register and governance.',
      timelineSavings: 'Skip Phase 1 risk identification (4-6 weeks). Still need full Phase 2 for control definition. Total savings: 4-6 weeks.',
      startingPhase: 'Phase 2 (with existing risk register as input)',
    },
    {
      id: 'coso',
      name: 'COSO 2013',
      title: 'COSO → P29 Bridging Guide',
      transferable: [
        'Internal control framework and principles',
        'Five component structure (Control Environment, Risk Assessment, Control Activities, Information & Communication, Monitoring)',
        'Control documentation and categorization',
        'Existing control library and mappings',
        'Assurance and monitoring processes',
        'Board and management reporting structures',
      ],
      needsUpdate: [
        'Ensure controls are linked to board-approved principal risks',
        'Apply P29-specific materiality criteria to COSO controls',
        'Add operational and ESG controls if not already covered',
        'Validate control ownership assignments meet P29 standards',
        'Update testing protocols to demonstrate operating effectiveness',
        'Enhance board reporting to meet P29 declaration requirements',
      ],
      approach: 'COSO is the closest framework to P29 requirements. Main work is ensuring scope covers all material risks (not just financial) and demonstrating effectiveness. Expect high transferability.',
      timelineSavings: 'Skip most of Phase 1 (8-10 weeks) and significant parts of Phase 2 (8-10 weeks). Total savings: 16-20 weeks.',
      startingPhase: 'Phase 2 or Phase 3 (depending on testing maturity)',
    },
    {
      id: 'cobit',
      name: 'COBIT',
      title: 'COBIT → P29 Bridging Guide',
      transferable: [
        'IT governance and control framework',
        'Technology risk controls and processes',
        'IT control objectives and maturity assessments',
        'Technology-related principal risks',
        'IT audit and assurance practices',
        'Stakeholder reporting mechanisms',
      ],
      needsUpdate: [
        'Expand beyond IT/technology to operational and financial controls',
        'Map COBIT processes to COSO components for P29',
        'Add non-IT material controls (customer, supply chain, ESG)',
        'Integrate IT controls with business process controls',
        'Update materiality criteria beyond technology risks',
        'Broaden board reporting from IT-centric to enterprise-wide',
      ],
      approach: 'COBIT covers technology controls well but P29 requires enterprise-wide view. Use COBIT controls for technology risks, then build out other domains. Typical COBIT program: 40-60% transferable.',
      timelineSavings: 'Limited savings in Phase 1 (2-4 weeks). Some savings in Phase 2 for IT controls. Total savings: 4-8 weeks.',
      startingPhase: 'Phase 1 or Phase 2 (COBIT alone insufficient)',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowRight className="h-5 w-5 text-primary" />
          Framework Bridging Guides
        </CardTitle>
        <CardDescription>
          Leverage your existing framework for P29 compliance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sox" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {frameworks.map((fw) => (
              <TabsTrigger key={fw.id} value={fw.id} className="text-xs">
                {fw.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {frameworks.map((fw) => (
            <TabsContent key={fw.id} value={fw.id} className="space-y-4 mt-4">
              <h3 className="text-xl font-bold">{fw.title}</h3>

              {/* What transfers */}
              <div className="space-y-2">
                <Alert className="border-green-200 bg-green-50 dark:bg-green-950">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-sm font-semibold text-green-900 dark:text-green-100">
                    What Transfers Directly to P29
                  </AlertTitle>
                  <AlertDescription className="text-xs mt-2 text-green-800 dark:text-green-200">
                    <ul className="space-y-1 mt-2">
                      {fw.transferable.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>

              {/* What needs updating */}
              <div className="space-y-2">
                <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertTitle className="text-sm font-semibold text-orange-900 dark:text-orange-100">
                    What Needs Updating for P29
                  </AlertTitle>
                  <AlertDescription className="text-xs mt-2 text-orange-800 dark:text-orange-200">
                    <ul className="space-y-1 mt-2">
                      {fw.needsUpdate.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>

              {/* Implementation approach */}
              <div className="p-4 bg-muted rounded-lg space-y-3">
                <h4 className="text-sm font-semibold">Implementation Approach:</h4>
                <p className="text-xs text-muted-foreground">{fw.approach}</p>
              </div>

              {/* Timeline savings */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border-2 border-primary rounded-lg">
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Badge variant="default">Timeline Savings</Badge>
                  </h4>
                  <p className="text-xs text-muted-foreground">{fw.timelineSavings}</p>
                </div>
                <div className="p-4 border-2 border-primary rounded-lg">
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Badge variant="secondary">Recommended Start</Badge>
                  </h4>
                  <p className="text-xs text-muted-foreground">{fw.startingPhase}</p>
                </div>
              </div>

              {/* Don't duplicate warning */}
              <Alert>
                <XCircle className="h-4 w-4" />
                <AlertTitle className="text-sm font-semibold">⚠️ Don't Duplicate Work</AlertTitle>
                <AlertDescription className="text-sm">
                  If you already have {fw.name} implemented, DO NOT start P29 from scratch. 
                  Use the validation checklists above to determine your starting phase, then adapt 
                  existing documentation and processes rather than rebuilding.
                </AlertDescription>
              </Alert>
            </TabsContent>
          ))}
        </Tabs>

        {/* General guidance */}
        <Alert className="mt-6 border-primary">
          <AlertDescription className="text-sm space-y-2">
            <p className="font-semibold">General Guidance for All Frameworks:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs">
              <li>Complete the Maturity Assessment above to determine your actual starting phase</li>
              <li>Use Phase Skip Validation checklists to confirm you meet prerequisites</li>
              <li>Focus on expanding scope (operational, ESG) rather than rebuilding foundations</li>
              <li>Leverage existing GRC platforms - configure for P29 rather than replacing</li>
              <li>Reuse control documentation templates with P29-specific additions</li>
              <li>Adapt testing protocols to include operating effectiveness evidence</li>
            </ul>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default FrameworkBridgingGuides;
