import { Plus, Target, Calendar, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function Goals() {
  const goals = [
    {
      id: '1',
      title: 'Vacation Fund',
      description: 'Trip to Japan next summer',
      targetAmount: 5000,
      currentAmount: 3200,
      targetDate: '2024-06-01',
      category: 'Travel'
    },
    {
      id: '2',
      title: 'Emergency Fund',
      description: '6 months of expenses',
      targetAmount: 15000,
      currentAmount: 8500,
      targetDate: '2024-12-31',
      category: 'Emergency'
    },
    {
      id: '3',
      title: 'New Laptop',
      description: 'MacBook Pro for work',
      targetAmount: 2500,
      currentAmount: 1200,
      targetDate: '2024-03-15',
      category: 'Technology'
    },
    {
      id: '4',
      title: 'Down Payment',
      description: 'House down payment',
      targetAmount: 50000,
      currentAmount: 12000,
      targetDate: '2025-12-31',
      category: 'Real Estate'
    }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getDaysRemaining = (targetDate: string) => {
    const today = new Date()
    const target = new Date(targetDate)
    const diffTime = target.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getStatusBadge = (percentage: number, daysRemaining: number) => {
    if (percentage >= 100) return { text: 'Completed', variant: 'default' as const }
    if (daysRemaining < 30 && percentage < 80) return { text: 'Behind', variant: 'destructive' as const }
    if (percentage >= 75) return { text: 'On Track', variant: 'default' as const }
    return { text: 'In Progress', variant: 'secondary' as const }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Financial Goals</h1>
          <p className="text-muted-foreground">Track progress toward your financial objectives</p>
        </div>
        <Button className="gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Create Goal
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Goals</p>
                <p className="text-2xl font-bold text-foreground">{goals.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-success" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Saved</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(goals.reduce((sum, goal) => sum + goal.currentAmount, 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Target</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(goals.reduce((sum, goal) => sum + goal.targetAmount, 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-warning" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Progress</p>
                <p className="text-2xl font-bold text-foreground">
                  {Math.round(goals.reduce((sum, goal) => sum + (goal.currentAmount / goal.targetAmount * 100), 0) / goals.length)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const percentage = (goal.currentAmount / goal.targetAmount) * 100
          const remaining = goal.targetAmount - goal.currentAmount
          const daysRemaining = getDaysRemaining(goal.targetDate)
          const status = getStatusBadge(percentage, daysRemaining)

          return (
            <Card key={goal.id} className="transition-smooth hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{goal.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                  </div>
                  <Badge variant={status.variant}>{status.text}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-foreground">
                      {formatCurrency(goal.currentAmount)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      of {formatCurrency(goal.targetAmount)}
                    </span>
                  </div>
                  
                  <Progress value={Math.min(percentage, 100)} className="h-3" />
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {percentage.toFixed(1)}% complete
                    </span>
                    <span className="font-medium text-foreground">
                      {formatCurrency(remaining)} remaining
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">Target Date</p>
                    <p className="font-medium">{formatDate(goal.targetDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Days Left</p>
                    <p className={cn(
                      "font-medium",
                      daysRemaining < 30 ? "text-warning" : "text-foreground"
                    )}>
                      {daysRemaining > 0 ? `${daysRemaining} days` : 'Overdue'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <Badge variant="outline" className="text-xs">{goal.category}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Need</p>
                    <p className="font-medium">
                      {formatCurrency(Math.max(0, remaining / Math.max(1, Math.ceil(daysRemaining / 30))))}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full" variant="outline">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Add Money
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}