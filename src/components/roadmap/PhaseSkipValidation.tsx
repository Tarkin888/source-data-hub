import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface ValidationItem {
  id: string;
  item: string;
  critical: boolean;
}

interface PhaseSkipValidationProps {
  phaseNumber: number;
}

const validationData = {
  1: {
    title: 'Phase 1 Already Complete?',
    description: 'Validate these outputs before skipping to Phase 2',
    items: [
      { id: 'p1_board_approval', item: 'Board has formally approved Material Control Inventory', critical: true },
      { id: 'p1_materiality', item: 'Materiality criteria documented with quantitative and qualitative thresholds', critical: true },
      { id: 'p1_mci_size', item: 'MCI contains 25-100 controls (not >100 which indicates over-scoping)', critical: true },
      { id: 'p1_risk_mapping', item: 'All principal risks mapped to at least one material control', critical: true },
      { id: 'p1_gap_assessment', item: 'Gap assessment completed with remediation priorities identified', critical: false },
      { id: 'p1_steering', item: 'Steering committee established with active executive sponsorship', critical: true },
      { id: 'p1_budget', item: 'Budget and resources secured for Phase 2-4', critical: true },
      { id: 'p1_grc_vendor', item: 'GRC platform vendor selection initiated or completed', critical: false },
    ],
    advice: 'If all CRITICAL items are checked, you can proceed to Phase 2. Review any unchecked items - they may create issues later.',
  },
  2: {
    title: 'Phase 2 Already Complete?',
    description: 'Validate control documentation quality before proceeding to Phase 3',
    items: [
      { id: 'p2_definitions', item: 'All material controls have formal definitions (who, what, how often)', critical: true },
      { id: 'p2_ownership', item: 'Named individuals (not departments) assigned as control owners', critical: true },
      { id: 'p2_ownership_ack', item: 'Control owners have formally acknowledged ownership in writing', critical: true },
      { id: 'p2_effectiveness', item: 'Effectiveness criteria defined with quantified, measurable thresholds', critical: true },
      { id: 'p2_framework', item: 'All controls mapped to COSO 2013 or ISO 31000 framework', critical: false },
      { id: 'p2_testing_protocols', item: 'Testing protocols documented by control type', critical: true },
      { id: 'p2_remediation', item: 'Design gaps from Phase 1 remediated or on track', critical: true },
      { id: 'p2_grc_progress', item: 'GRC platform implementation progressing (even if not complete)', critical: true },
    ],
    advice: 'Controls documentation quality is critical for Phase 3 testing. If any CRITICAL items are unchecked, complete them before proceeding.',
  },
  3: {
    title: 'Phase 3 Already Complete?',
    description: 'Validate assurance infrastructure before entering Phase 4 live period',
    items: [
      { id: 'p3_platform_live', item: 'GRC platform operational with control library migrated', critical: true },
      { id: 'p3_assurance_map', item: 'Assurance mapping completed across 1st, 2nd, 3rd lines', critical: true },
      { id: 'p3_raci', item: 'Three Lines of Defence RACI matrix approved and communicated', critical: false },
      { id: 'p3_training', item: 'All control owners trained on execution and self-assessment', critical: true },
      { id: 'p3_dashboard', item: 'Board dashboard tested and approved by Audit Committee', critical: true },
      { id: 'p3_dry_run', item: 'Dry run completed (6-8 weeks) with results presented to board', critical: true },
      { id: 'p3_lessons', item: 'Dry run findings documented and improvements implemented', critical: true },
      { id: 'p3_protocols', item: 'Evidence collection processes tested and proven', critical: true },
    ],
    advice: 'Phase 3 validates your readiness for full-year evidence collection. Do NOT skip the dry run - it\'s essential for identifying issues before the live period.',
  },
};

const PhaseSkipValidation = ({ phaseNumber }: PhaseSkipValidationProps) => {
  const data = validationData[phaseNumber as keyof typeof validationData];
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  if (!data) return null;

  const criticalItems = data.items.filter(i => i.critical);
  const nonCriticalItems = data.items.filter(i => !i.critical);
  
  const criticalChecked = criticalItems.filter(i => checkedItems[i.id]).length;
  const totalCritical = criticalItems.length;
  const allCriticalChecked = criticalChecked === totalCritical;

  const allChecked = data.items.filter(i => checkedItems[i.id]).length;
  const totalItems = data.items.length;

  return (
    <Card className="border-2 border-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {allCriticalChecked ? (
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-orange-600" />
          )}
          {data.title}
        </CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold">Validation Progress:</span>
            <Badge variant={allCriticalChecked ? "default" : "secondary"}>
              {allChecked} / {totalItems} Complete
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground">
            Critical items: {criticalChecked} / {totalCritical}
          </div>
        </div>

        {/* Critical items */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="destructive" className="text-xs">CRITICAL</Badge>
            <span className="text-xs font-semibold">Must be complete to skip this phase</span>
          </div>
          {criticalItems.map((item) => (
            <div key={item.id} className="flex items-start space-x-3 p-3 rounded-lg border-2 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30">
              <Checkbox
                id={item.id}
                checked={checkedItems[item.id] || false}
                onCheckedChange={(checked) =>
                  setCheckedItems((prev) => ({ ...prev, [item.id]: checked as boolean }))
                }
                className="mt-1"
              />
              <label
                htmlFor={item.id}
                className="text-sm leading-none cursor-pointer flex-1"
              >
                {item.item}
              </label>
            </div>
          ))}
        </div>

        {/* Non-critical items */}
        {nonCriticalItems.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">RECOMMENDED</Badge>
              <span className="text-xs font-semibold">Important but not blockers</span>
            </div>
            {nonCriticalItems.map((item) => (
              <div key={item.id} className="flex items-start space-x-3 p-3 rounded-lg border bg-muted/30">
                <Checkbox
                  id={item.id}
                  checked={checkedItems[item.id] || false}
                  onCheckedChange={(checked) =>
                    setCheckedItems((prev) => ({ ...prev, [item.id]: checked as boolean }))
                  }
                  className="mt-1"
                />
                <label
                  htmlFor={item.id}
                  className="text-sm leading-none cursor-pointer flex-1"
                >
                  {item.item}
                </label>
              </div>
            ))}
          </div>
        )}

        {/* Advice */}
        <Alert variant={allCriticalChecked ? "default" : "destructive"}>
          {allCriticalChecked ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
          <AlertDescription className="text-sm">
            {allCriticalChecked ? (
              <span className="font-semibold text-green-900 dark:text-green-100">
                ✓ All critical items complete. You can proceed to Phase {phaseNumber + 1}.
              </span>
            ) : (
              <span>{data.advice}</span>
            )}
          </AlertDescription>
        </Alert>

        {/* What to review */}
        <div className="p-4 bg-muted/50 rounded-lg text-sm space-y-2">
          <p className="font-semibold">What to review from Phase {phaseNumber} before proceeding:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs">
            {phaseNumber === 1 && (
              <>
                <li>Review materiality criteria - are they still appropriate?</li>
                <li>Check MCI for any controls that should be added/removed</li>
                <li>Update risk mappings if principal risks have changed</li>
                <li>Refresh steering committee charter if membership changed</li>
              </>
            )}
            {phaseNumber === 2 && (
              <>
                <li>Quality-check control documentation for clarity and completeness</li>
                <li>Re-confirm control ownership with any personnel changes</li>
                <li>Review effectiveness criteria for measurability</li>
                <li>Update framework mappings if controls have changed</li>
              </>
            )}
            {phaseNumber === 3 && (
              <>
                <li>Review dry run findings and verify all improvements implemented</li>
                <li>Re-test GRC platform workflows with real-world scenarios</li>
                <li>Validate board dashboard still meets Audit Committee needs</li>
                <li>Refresh training materials for any process changes</li>
              </>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhaseSkipValidation;
