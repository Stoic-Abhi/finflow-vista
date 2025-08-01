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
      <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-primary via-primary-light to-accent">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-sm">Welcome back, John! 👋</h1>
            <p className="text-white/90 text-lg">Here&apos;s your financial overview for January 2024</p>
          </div>
          <div className="flex space-x-3">
            <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 shadow-lg hover:scale-105 transition-all">
              <CreditCard className="w-4 h-4 mr-2" />
              Add Transaction
            </Button>
            <Button className="bg-white text-primary hover:bg-white/90 shadow-lg hover:scale-105 transition-all">
              <Target className="w-4 h-4 mr-2" />
              Create Goal
            </Button>
          </div>
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
        <Card className="bg-gradient-to-br from-card via-card to-muted/30 border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start gradient-income hover:scale-105 transition-all shadow-md">
              <CreditCard className="w-4 h-4 mr-2" />
              Add Income
            </Button>
            <Button className="w-full justify-start gradient-expense hover:scale-105 transition-all shadow-md">
              <TrendingDown className="w-4 h-4 mr-2" />
              Record Expense
            </Button>
            <Button className="w-full justify-start gradient-primary hover:scale-105 transition-all shadow-md">
              <Target className="w-4 h-4 mr-2" />
              Set Budget
            </Button>
            <Button className="w-full justify-start gradient-savings hover:scale-105 transition-all shadow-md">
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
      <Card className="bg-gradient-to-br from-card via-card to-muted/30 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI Financial Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative p-6 bg-gradient-to-br from-success/10 via-success/5 to-transparent rounded-2xl border border-success/20 hover:border-success/40 transition-all hover:scale-105 hover:shadow-xl">
              <div className="absolute top-4 right-4 w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <div className="space-y-3">
                <div className="inline-flex px-3 py-1 bg-success/20 text-success text-xs font-semibold rounded-full">
                  Great Progress!
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  You&apos;ve saved 15% more this month compared to last month. Your spending discipline is paying off! 🎉
                </p>
              </div>
            </div>
            
            <div className="relative p-6 bg-gradient-to-br from-warning/10 via-warning/5 to-transparent rounded-2xl border border-warning/20 hover:border-warning/40 transition-all hover:scale-105 hover:shadow-xl">
              <div className="absolute top-4 right-4 w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-warning" />
              </div>
              <div className="space-y-3">
                <div className="inline-flex px-3 py-1 bg-warning/20 text-warning text-xs font-semibold rounded-full">
                  Budget Alert
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  You&apos;re 90% through your food budget. Consider meal prepping or cooking more at home to stay on track! 🍳
                </p>
              </div>
            </div>
            
            <div className="relative p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl border border-primary/20 hover:border-primary/40 transition-all hover:scale-105 hover:shadow-xl">
              <div className="absolute top-4 right-4 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <PiggyBank className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-3">
                <div className="inline-flex px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
                  Goal Progress
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  You&apos;re 60% towards your vacation fund goal. Just $2,000 to go! At this rate, you&apos;ll reach it by June! ✈️
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}