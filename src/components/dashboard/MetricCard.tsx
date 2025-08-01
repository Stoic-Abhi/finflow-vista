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
    <Card className={cn("transition-smooth hover:shadow-lg", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {change && (
              <p className={cn(
                "text-sm font-medium flex items-center",
                changeType === 'positive' && "text-success",
                changeType === 'negative' && "text-destructive",
                changeType === 'neutral' && "text-muted-foreground"
              )}>
                {change}
              </p>
            )}
          </div>
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center",
            gradient || "bg-primary"
          )}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}