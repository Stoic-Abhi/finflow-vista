import { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: string
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: LucideIcon
  gradient?: string
  className?: string
}

export function MetricCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  gradient,
  className
}: MetricCardProps) {
  return (
    <Card className={cn(
      "transition-smooth hover:shadow-xl hover:scale-105 border-0 bg-gradient-to-br from-card via-card to-muted/30 backdrop-blur-sm",
      className
    )}>
      <CardContent className="p-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          <Icon className="w-full h-full" />
        </div>
        
        <div className="flex items-center justify-between relative z-10">
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {change && (
              <div className={cn(
                "text-sm font-medium flex items-center px-3 py-1 rounded-full w-fit",
                changeType === 'positive' && "bg-success/10 text-success border border-success/20",
                changeType === 'negative' && "bg-destructive/10 text-destructive border border-destructive/20",
                changeType === 'neutral' && "bg-muted text-muted-foreground border border-muted"
              )}>
                {change}
              </div>
            )}
          </div>
          <div className={cn(
            "w-16 h-16 rounded-xl flex items-center justify-center shadow-lg transition-transform hover:scale-110",
            gradient || "gradient-primary"
          )}>
            <Icon className="w-8 h-8 text-white drop-shadow-sm" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}