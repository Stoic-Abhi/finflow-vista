import { useState } from 'react'
import { Plus, Search, Filter, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function Transactions() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground">Track and manage all your financial transactions</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="food">Food & Dining</SelectItem>
                <SelectItem value="transport">Transportation</SelectItem>
                <SelectItem value="bills">Bills & Utilities</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Sample transactions */}
            {[
              {
                id: '1',
                description: 'Salary Payment',
                amount: 5000,
                category: 'Income',
                date: '2024-01-15',
                type: 'income' as const
              },
              {
                id: '2',
                description: 'Grocery Shopping - Whole Foods',
                amount: -150,
                category: 'Food & Dining',
                date: '2024-01-14',
                type: 'expense' as const
              },
              {
                id: '3',
                description: 'Freelance Web Design',
                amount: 800,
                category: 'Income',
                date: '2024-01-13',
                type: 'income' as const
              },
              {
                id: '4',
                description: 'Internet Bill - Comcast',
                amount: -60,
                category: 'Bills & Utilities',
                date: '2024-01-12',
                type: 'expense' as const
              },
              {
                id: '5',
                description: 'Coffee - Starbucks',
                amount: -12,
                category: 'Food & Dining',
                date: '2024-01-11',
                type: 'expense' as const
              }
            ].map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    transaction.type === 'income' 
                      ? 'bg-success/10 text-success' 
                      : 'bg-destructive/10 text-destructive'
                  }`}>
                    <span className="text-lg font-bold">
                      {transaction.type === 'income' ? '+' : '-'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{transaction.description}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {transaction.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    transaction.type === 'income' ? 'text-success' : 'text-destructive'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}
                    ${Math.abs(transaction.amount).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Balance: $12,485.50
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}