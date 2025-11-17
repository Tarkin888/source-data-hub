import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface ActionCardProps {
  title: string;
  description: string;
  domain: string;
  priority: 'Critical' | 'Important' | 'Optimize';
  effort: string;
  resources?: string[];
}

const ActionCard = ({ title, description, domain, priority, effort, resources }: ActionCardProps) => {
  const [planned, setPlanned] = useState(false);

  const getPriorityStyle = () => {
    switch (priority) {
      case 'Critical':
        return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' };
      case 'Important':
        return { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300' };
      case 'Optimize':
        return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' };
    }
  };

  const priorityStyle = getPriorityStyle();

  return (
    <Card className={`p-6 ${planned ? 'border-primary bg-primary/5' : ''}`}>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className={`${priorityStyle.bg} ${priorityStyle.text} border ${priorityStyle.border}`}>
                {priority}
              </Badge>
              <Badge variant="outline">{domain}</Badge>
            </div>
            <h3 className="text-lg font-bold text-foreground">{title}</h3>
          </div>
        </div>

        <p className="text-muted-foreground">{description}</p>

        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>Est. {effort}</span>
          </div>
        </div>

        {resources && resources.length > 0 && (
          <div className="pt-2 border-t">
            <Button variant="link" className="p-0 h-auto text-primary">
              View Recommended Resources
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </div>
        )}

        <div className="flex items-center space-x-2 pt-2">
          <Checkbox
            id={`planned-${title}`}
            checked={planned}
            onCheckedChange={(checked) => setPlanned(checked as boolean)}
          />
          <label
            htmlFor={`planned-${title}`}
            className="text-sm font-medium cursor-pointer text-foreground"
          >
            Mark as planned
          </label>
        </div>
      </div>
    </Card>
  );
};

export default ActionCard;
