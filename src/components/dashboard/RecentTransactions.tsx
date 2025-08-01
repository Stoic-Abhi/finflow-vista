import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight, ArrowDownLeft, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Transaction {
  id: string
  description: string
  amount: number
  category: string
  date: string
  type: 'income' | 'expense'
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Salary Payment',
    amount: 5000,
    category: 'Income',
    date: '2024-01-15',
    type: 'income'
  },
  {
    id: '2',
    description: 'Grocery Shopping',
    amount: -150,
    category: 'Food',
    date: '2024-01-14',
    type: 'expense'
  },
  {
    id: '3',
    description: 'Freelance Project',
    amount: 800,
    category: 'Income',
    date: '2024-01-13',
    type: 'income'
  },
  {
    id: '4',
    description: 'Internet Bill',
    amount: -60,
    category: 'Bills',
    date: '2024-01-12',
    type: 'expense'
  },
  {
    id: '5',
    description: 'Coffee Shop',
    amount: -12,
    category: 'Food',
    date: '2024-01-11',
    type: 'expense'
  }
]

export function RecentTransactions() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                transaction.type === 'income' 
                  ? "bg-success/10 text-success" 
                  : "bg-destructive/10 text-destructive"
              )}>
                {transaction.type === 'income' ? (
                  <ArrowUpRight className="w-5 h-5" />
                ) : (
                  <ArrowDownLeft className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className="font-medium text-foreground">{transaction.description}</p>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    {transaction.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(transaction.date)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={cn(
                "font-semibold",
                transaction.type === 'income' ? "text-success" : "text-destructive"
              )}>
                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </span>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}