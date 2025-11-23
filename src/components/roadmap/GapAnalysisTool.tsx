import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileSpreadsheet, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GapAnalysisTool = () => {
  const exampleScenarios = [
    {
      requirement: 'Material Control Inventory (25-100 controls)',
      currentState: 'We have SOX controls (80 financial controls)',
      gap: 'Missing operational and reporting controls',
      remediation: 'Expand MCI to include non-financial controls linked to principal risks',
      timeline: '4-6 weeks',
      priority: 'High',
    },
    {
      requirement: 'GRC Platform for P29',
      currentState: 'We have GRC platform for SOX only',
      gap: 'Platform not configured for P29 requirements',
      remediation: 'Configure additional workflows, extend control library, add P29 dashboards',
      timeline: '8-12 weeks',
      priority: 'High',
    },
    {
      requirement: 'Control Testing History',
      currentState: 'We test SOX controls but not operational',
      gap: 'No testing protocols for operational/reporting controls',
      remediation: 'Define testing protocols for non-SOX controls, conduct baseline testing',
      timeline: '12-16 weeks',
      priority: 'Critical',
    },
    {
      requirement: 'Board Reporting Dashboard',
      currentState: 'We have financial control reporting only',
      gap: 'No integrated view of all P29 material controls',
      remediation: 'Build comprehensive dashboard covering all control domains',
      timeline: '6-8 weeks',
      priority: 'Medium',
    },
    {
      requirement: 'Control Owner Training',
      currentState: 'SOX control owners trained',
      gap: 'Operational control owners not trained on P29 requirements',
      remediation: 'Develop and deliver P29-specific training program',
      timeline: '4-6 weeks',
      priority: 'Medium',
    },
  ];

  const handleDownload = () => {
    if (import.meta.env.DEV) {
      console.log('Download Gap Analysis Template');
    }
    // In production, this would trigger actual template download
    alert('Gap Analysis Template download will be available soon. This Excel template includes formulas, conditional formatting, and examples for all common scenarios.');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-primary" />
              Gap Analysis Tool
            </CardTitle>
            <CardDescription className="mt-2">
              Identify gaps between P29 requirements and your current state
            </CardDescription>
          </div>
          <Button onClick={handleDownload} size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download Template
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Instructions */}
        <div className="p-4 bg-muted rounded-lg text-sm space-y-2">
          <p className="font-semibold">How to use this tool:</p>
          <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
            <li>Download the Excel template (includes all P29 requirements pre-populated)</li>
            <li>Complete the "Your Current State" column for each requirement</li>
            <li>Identify gaps where your current state doesn't meet P29 requirements</li>
            <li>Define specific remediation actions and realistic timelines</li>
            <li>Prioritize based on criticality and dependencies</li>
          </ol>
        </div>

        {/* Example scenarios table */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Example Gap Analysis Scenarios:</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[180px]">P29 Requirement</TableHead>
                  <TableHead className="min-w-[150px]">Your Current State</TableHead>
                  <TableHead className="min-w-[150px]">Gap</TableHead>
                  <TableHead className="min-w-[200px]">Remediation Action</TableHead>
                  <TableHead className="min-w-[100px]">Timeline</TableHead>
                  <TableHead>Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exampleScenarios.map((scenario, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium text-sm">{scenario.requirement}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{scenario.currentState}</TableCell>
                    <TableCell className="text-xs">{scenario.gap}</TableCell>
                    <TableCell className="text-xs">{scenario.remediation}</TableCell>
                    <TableCell className="text-xs">{scenario.timeline}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          scenario.priority === 'Critical'
                            ? 'destructive'
                            : scenario.priority === 'High'
                            ? 'default'
                            : 'secondary'
                        }
                        className="text-xs"
                      >
                        {scenario.priority}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Common scenarios callouts */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <h4 className="text-sm font-semibold mb-2 text-blue-900 dark:text-blue-100">
              Scenario: "We have SOX but not operational controls"
            </h4>
            <p className="text-xs text-muted-foreground mb-2">
              <strong>Gap:</strong> SOX covers financial reporting but P29 requires operational and ESG controls.
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Action:</strong> Expand control inventory by linking principal risks to operational processes. 
              Typical addition: 20-30 new controls beyond SOX scope.
            </p>
          </div>

          <div className="p-4 border rounded-lg bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800">
            <h4 className="text-sm font-semibold mb-2 text-orange-900 dark:text-orange-100">
              Scenario: "We have a GRC platform but it's not P29-configured"
            </h4>
            <p className="text-xs text-muted-foreground mb-2">
              <strong>Gap:</strong> Platform configured for SOX workflows, not P29 board reporting.
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Action:</strong> Add P29-specific workflows, expand dashboards, configure board reporting. 
              Typical effort: 8-12 weeks with vendor support.
            </p>
          </div>

          <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
            <h4 className="text-sm font-semibold mb-2 text-green-900 dark:text-green-100">
              Scenario: "We have controls documented but no testing history"
            </h4>
            <p className="text-xs text-muted-foreground mb-2">
              <strong>Gap:</strong> Controls exist on paper but no evidence of operating effectiveness.
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Action:</strong> Start Phase 3 immediately - define testing protocols and conduct baseline testing. 
              Minimum dry run: 6-8 weeks before live period.
            </p>
          </div>

          <div className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
            <h4 className="text-sm font-semibold mb-2 text-purple-900 dark:text-purple-100">
              Scenario: "We have ISO 31000 but not COSO"
            </h4>
            <p className="text-xs text-muted-foreground mb-2">
              <strong>Gap:</strong> Framework alignment acceptable but may need control categorization adjustments.
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Action:</strong> Map ISO processes to P29 requirements. No framework change needed - 
              just demonstrate alignment in documentation.
            </p>
          </div>
        </div>

        {/* Download CTA */}
        <div className="p-6 bg-primary/5 border-2 border-primary rounded-lg text-center">
          <h4 className="font-semibold mb-2">Ready to assess your gaps?</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Download our comprehensive Gap Analysis Template (Excel) with:
          </p>
          <ul className="text-xs text-left inline-block text-muted-foreground mb-4 space-y-1">
            <li>✓ All P29 requirements pre-populated</li>
            <li>✓ Drop-down menus for priority levels</li>
            <li>✓ Auto-calculating timeline summaries</li>
            <li>✓ Built-in examples for common scenarios</li>
          </ul>
          <div>
            <Button onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download Gap Analysis Template
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GapAnalysisTool;
