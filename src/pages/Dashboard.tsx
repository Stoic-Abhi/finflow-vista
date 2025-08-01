import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target,
  CreditCard,
  PiggyBank
} from 'lucide-react'
import { MetricCard } from '@/components/dashboard/MetricCard'
import { RecentTransactions } from '@/components/dashboard/RecentTransactions'
import { SpendingChart } from '@/components/dashboard/SpendingChart'
import { BudgetProgress } from '@/components/dashboard/BudgetProgress'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back!</h1>
          <p className="text-muted-foreground">Here's your financial overview for January 2024</p>
        </div>
        <div className="flex space-x-2">
          <Button className="gradient-primary">
            <CreditCard className="w-4 h-4 mr-2" />
            Add Transaction
          </Button>
          <Button variant="outline">
            <Target className="w-4 h-4 mr-2" />
            Create Goal
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Balance"
          value="$12,485.50"
          change="+12.5% from last month"
          changeType="positive"
          icon={DollarSign}
          gradient="gradient-primary"
        />
        <MetricCard
          title="Monthly Income"
          value="$5,800.00"
          change="+8.2% from last month"
          changeType="positive"
          icon={TrendingUp}
          gradient="gradient-income"
        />
        <MetricCard
          title="Monthly Expenses"
          value="$3,245.75"
          change="-5.1% from last month"
          changeType="positive"
          icon={TrendingDown}
          gradient="gradient-expense"
        />
        <MetricCard
          title="Savings Goals"
          value="$8,200.00"
          change="3 active goals"
          changeType="neutral"
          icon={PiggyBank}
          gradient="gradient-savings"
        />
      </div>

      {/* Charts and Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions - Takes 2 columns */}
        <div className="lg:col-span-2">
          <RecentTransactions />
        </div>
        
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <CreditCard className="w-4 h-4 mr-2" />
              Add Income
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingDown className="w-4 h-4 mr-2" />
              Record Expense
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Target className="w-4 h-4 mr-2" />
              Set Budget
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <PiggyBank className="w-4 h-4 mr-2" />
              Create Savings Goal
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingChart />
        <BudgetProgress />
      </div>

      {/* Financial Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-success/10 rounded-lg border border-success/20">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-success" />
                <h3 className="font-semibold text-success">Great Progress!</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                You've saved 15% more this month compared to last month. Keep it up!
              </p>
            </div>
            
            <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-5 h-5 text-warning" />
                <h3 className="font-semibold text-warning">Budget Alert</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                You're 90% through your food budget. Consider cooking more at home.
              </p>
            </div>
            
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-center space-x-2 mb-2">
                <PiggyBank className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-primary">Goal Update</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                You're 60% towards your vacation fund goal. $2,000 to go!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}