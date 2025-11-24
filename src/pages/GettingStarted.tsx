import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import SEOHead from '@/components/common/SEOHead';
import { NavLink } from '@/components/NavLink';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import { BookOpen, CheckCircle, FileText, Users, ArrowRight, ClipboardCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function GettingStarted() {
  const navigate = useNavigate();

  const phases = [
    { name: 'Scoping & Governance', duration: '4-6 months', color: 'blue' },
    { name: 'Design & Documentation', duration: '6-8 months', color: 'green' },
    { name: 'Testing & Validation', duration: '6-8 months', color: 'purple' },
    { name: 'Board Preparation', duration: '2-4 months', color: 'orange' }
  ];

  const nextSteps = [
    {
      icon: ClipboardCheck,
      title: 'Take the Readiness Assessment',
      description: 'Complete our 15-minute assessment to understand your current maturity level and identify gaps.',
      link: '/assessment',
      buttonText: 'Start Assessment'
    },
    {
      icon: FileText,
      title: 'Download Templates',
      description: 'Access our library of 15+ templates including control definitions, testing protocols, and board packs.',
      link: '/templates',
      buttonText: 'Browse Templates'
    },
    {
      icon: Users,
      title: 'Explore Role Guides',
      description: 'Get tailored guidance for your specific role: Board, CFO, CRO, Control Owners, or Audit.',
      link: '/roles',
      buttonText: 'View Roles'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Getting Started with Provision 29"
        description="Complete guide to understanding and implementing UK Corporate Governance Code Provision 29. Learn what P29 requires and how to begin your implementation journey."
      />

      <div className="container mx-auto px-4 py-12 max-w-[1200px]">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Getting Started' }
        ]} />

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Getting Started with Provision 29
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Your comprehensive guide to understanding and implementing UK Corporate Governance Code Provision 29
          </p>
        </div>

        {/* What is Provision 29? */}
        <section className="mb-16">
          <Card className="p-8 md:p-12">
            <div className="flex items-start gap-4 mb-6">
              <BookOpen className="w-12 h-12 text-primary flex-shrink-0" />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  What is Provision 29?
                </h2>
              </div>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-base md:text-lg text-muted-foreground mb-4">
                Provision 29 of the UK Corporate Governance Code requires FTSE 350 boards to declare annually that they have established procedures to identify and manage their material controls. This represents a significant shift in UK corporate governance, bringing UK requirements closer to US SOX practices.
              </p>

              <div className="bg-muted/50 p-6 rounded-lg mt-6">
                <h3 className="text-xl font-semibold mb-4">Key Requirements:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Identify material controls:</strong> Determine which controls are material to the company's operations and financial reporting</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Establish procedures:</strong> Create documented processes for identifying, assessing, and monitoring these controls</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Annual board declaration:</strong> Board must make a public statement confirming these procedures are in place</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Effective date:</strong> First declarations required for fiscal years starting on or after January 1, 2026</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* Why It Matters */}
        <section className="mb-16 bg-gray-50 dark:bg-gray-900 -mx-4 px-4 py-12">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Why It Matters
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Regulatory Compliance</h3>
                <p className="text-muted-foreground">
                  Non-compliance may result in regulatory scrutiny, investor concerns, and potential governance challenges. The FRC expects full compliance from all FTSE 350 companies.
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Operational Excellence</h3>
                <p className="text-muted-foreground">
                  P29 implementation strengthens your control environment, improves risk management, and enhances operational resilience across the organization.
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Stakeholder Confidence</h3>
                <p className="text-muted-foreground">
                  Demonstrating robust control procedures builds trust with investors, auditors, and regulators, potentially reducing cost of capital and improving market perception.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Implementation Overview */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Implementation Overview: 4 Phases
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {phases.map((phase, index) => (
              <Card key={phase.name} className="p-6 border-l-4 border-l-primary">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-xl flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{phase.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">Duration: {phase.duration}</p>
                    <p className="text-sm text-muted-foreground">
                      {index === 0 && 'Define scope, establish governance structure, identify material processes and controls.'}
                      {index === 1 && 'Document controls, create testing protocols, develop evidence collection procedures.'}
                      {index === 2 && 'Execute testing plans, document results, remediate control deficiencies.'}
                      {index === 3 && 'Prepare board materials, conduct dry runs, finalize declaration language.'}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" onClick={() => navigate('/roadmap')}>
              View Full Roadmap
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </section>

        {/* Take Your Assessment CTA */}
        <section className="mb-16 bg-primary/5 -mx-4 px-4 py-12">
          <div className="max-w-[800px] mx-auto text-center">
            <ClipboardCheck className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Assess Your Readiness?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Take our comprehensive 15-minute assessment to evaluate your current maturity across 5 key domains and receive a customized implementation plan.
            </p>
            <Button size="lg" onClick={() => navigate('/assessment')} className="text-lg px-8 py-6">
              Start Readiness Assessment
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </section>

        {/* Next Steps */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Your Next Steps
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {nextSteps.map((step) => {
              const IconComponent = step.icon;
              return (
                <Card key={step.title} className="p-6 hover:shadow-lg transition-shadow">
                  <IconComponent className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground mb-6">{step.description}</p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate(step.link)}
                  >
                    {step.buttonText}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Back to Home */}
        <div className="text-center">
          <Button variant="ghost" onClick={() => navigate('/')}>
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
