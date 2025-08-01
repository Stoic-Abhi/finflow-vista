import { Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function Budgets() {
  const budgets = [
    {
      id: '1',
      category: 'Food & Dining',
      allocated: 800,
      spent: 650,
      period: 'Monthly',
      color: 'bg-red-500'
    },
    {
      id: '2',
      category: 'Transportation',
      allocated: 400,
      spent: 320,
      period: 'Monthly',
      color: 'bg-orange-500'
    },
    {
      id: '3',
      category: 'Entertainment',
      allocated: 300,
      spent: 280,
      period: 'Monthly',
      color: 'bg-yellow-500'
    },
    {
      id: '4',
      category: 'Bills & Utilities',
      allocated: 600,
      spent: 580,
      period: 'Monthly',
      color: 'bg-green-500'
    },
    {
      id: '5',
      category: 'Shopping',
      allocated: 500,
      spent: 150,
      period: 'Monthly',
      color: 'bg-blue-500'
    }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const getStatusBadge = (percentage: number) => {
    if (percentage >= 100) return { text: 'Over Budget', variant: 'destructive' as const }
    if (percentage >= 90) return { text: 'Almost Full', variant: 'destructive' as const }
    if (percentage >= 75) return { text: 'On Track', variant: 'secondary' as const }
    return { text: 'Good', variant: 'default' as const }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Budgets</h1>
          <p className="text-muted-foreground">Monitor and manage your spending limits</p>
        </div>
        <Button className="gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Create Budget
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-2">Total Allocated</p>
              <p className="text-3xl font-bold text-foreground">{formatCurrency(2600)}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-2">Total Spent</p>
              <p className="text-3xl font-bold text-destructive">{formatCurrency(1980)}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-2">Remaining</p>
              <p className="text-3xl font-bold text-success">{formatCurrency(620)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.allocated) * 100
          const remaining = budget.allocated - budget.spent
          const status = getStatusBadge(percentage)

          return (
            <Card key={budget.id} className="transition-smooth hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={cn("w-4 h-4 rounded-full", budget.color)} />
                  <div>
                    <CardTitle className="text-lg">{budget.category}</CardTitle>
                    <p className="text-sm text-muted-foreground">{budget.period}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={status.variant} className="text-xs">
                    {status.text}
                  </Badge>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-foreground">
                    {formatCurrency(budget.spent)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    of {formatCurrency(budget.allocated)}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <Progress value={Math.min(percentage, 100)} className="h-3" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {percentage.toFixed(1)}% used
                    </span>
                    <span className={cn(
                      "font-medium",
                      remaining >= 0 ? "text-success" : "text-destructive"
                    )}>
                      {remaining >= 0 
                        ? `${formatCurrency(remaining)} left`
                        : `${formatCurrency(Math.abs(remaining))} over`
                      }
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Avg. Daily</p>
                      <p className="font-medium">{formatCurrency(budget.spent / 15)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Days Left</p>
                      <p className="font-medium">16 days</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}