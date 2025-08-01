import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface BudgetItem {
  id: string
  category: string
  allocated: number
  spent: number
  color: string
}

const mockBudgets: BudgetItem[] = [
  {
    id: '1',
    category: 'Food & Dining',
    allocated: 800,
    spent: 650,
    color: 'bg-red-500'
  },
  {
    id: '2',
    category: 'Transportation',
    allocated: 400,
    spent: 320,
    color: 'bg-orange-500'
  },
  {
    id: '3',
    category: 'Entertainment',
    allocated: 300,
    spent: 280,
    color: 'bg-yellow-500'
  },
  {
    id: '4',
    category: 'Bills & Utilities',
    allocated: 600,
    spent: 580,
    color: 'bg-green-500'
  },
  {
    id: '5',
    category: 'Shopping',
    allocated: 500,
    spent: 150,
    color: 'bg-blue-500'
  }
]

export function BudgetProgress() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-destructive'
    if (percentage >= 75) return 'bg-warning'
    return 'bg-success'
  }

  const getStatusBadge = (percentage: number) => {
    if (percentage >= 100) return { text: 'Over Budget', variant: 'destructive' as const }
    if (percentage >= 90) return { text: 'Almost Full', variant: 'destructive' as const }
    if (percentage >= 75) return { text: 'On Track', variant: 'secondary' as const }
    return { text: 'Good', variant: 'default' as const }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Overview</CardTitle>
        <p className="text-sm text-muted-foreground">
          Monthly budget progress
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {mockBudgets.map((budget) => {
          const percentage = (budget.spent / budget.allocated) * 100
          const remaining = budget.allocated - budget.spent
          const status = getStatusBadge(percentage)

          return (
            <div key={budget.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={cn("w-3 h-3 rounded-full", budget.color)} />
                  <span className="font-medium text-foreground">{budget.category}</span>
                  <Badge variant={status.variant} className="text-xs">
                    {status.text}
                  </Badge>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-foreground">
                    {formatCurrency(budget.spent)}
                  </span>
                  <span className="text-muted-foreground"> / {formatCurrency(budget.allocated)}</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <Progress 
                  value={Math.min(percentage, 100)} 
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{percentage.toFixed(1)}% used</span>
                  <span className={cn(
                    "font-medium",
                    remaining >= 0 ? "text-success" : "text-destructive"
                  )}>
                    {remaining >= 0 ? formatCurrency(remaining) : `${formatCurrency(Math.abs(remaining))} over`} remaining
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}