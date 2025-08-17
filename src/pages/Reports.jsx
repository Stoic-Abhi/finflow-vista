import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Download, 
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { formatCurrency, formatDate } from '../lib/utils';

export const Reports = ({ transactions = [], budgets = [] }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedChart, setSelectedChart] = useState('spending');

  // Calculate spending by category
  const spendingByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {});

  // Calculate income by category
  const incomeByCategory = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {});

  // Calculate monthly trends
  const monthlyData = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    if (!acc[month]) {
      acc[month] = { income: 0, expenses: 0 };
    }
    if (transaction.type === 'income') {
      acc[month].income += transaction.amount;
    } else {
      acc[month].expenses += transaction.amount;
    }
    return acc;
  }, {});

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  const topCategories = Object.entries(spendingByCategory)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Gain insights into your financial patterns and trends</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="button-hover">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="button-hover">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-effect rounded-xl p-6 card-hover animate-slideIn">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Income</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+12.5% from last month</span>
          </div>
        </div>
        
        <div className="glass-effect rounded-xl p-6 card-hover animate-slideIn">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <ArrowDownRight className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-red-600">
            <ArrowDownRight className="w-4 h-4 mr-1" />
            <span>+3.2% from last month</span>
          </div>
        </div>
        
        <div className="glass-effect rounded-xl p-6 card-hover animate-slideIn">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Net Savings</p>
              <p className={`text-2xl font-bold ${totalIncome - totalExpenses >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(totalIncome - totalExpenses)}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <PieChart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-blue-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+8.7% from last month</span>
          </div>
        </div>
        
        <div className="glass-effect rounded-xl p-6 card-hover animate-slideIn">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Savings Rate</p>
              <p className={`text-2xl font-bold ${savingsRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {savingsRate.toFixed(1)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-purple-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+2.1% from last month</span>
          </div>
        </div>
      </div>

      {/* Chart Controls */}
      <div className="glass-effect rounded-xl p-6 card-hover animate-slideIn">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Calendar className="w-5 h-5 text-gray-600" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="weekly">This Week</option>
              <option value="monthly">This Month</option>
              <option value="quarterly">This Quarter</option>
              <option value="yearly">This Year</option>
            </select>
          </div>
          
          <div className="flex space-x-2">
            {['spending', 'income', 'trends'].map((chart) => (
              <button
                key={chart}
                onClick={() => setSelectedChart(chart)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedChart === chart
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {chart.charAt(0).toUpperCase() + chart.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Spending Categories */}
        <div className="glass-effect rounded-xl p-6 card-hover animate-slideIn">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Top Spending Categories</h2>
          <div className="space-y-4">
            {topCategories.length > 0 ? (
              topCategories.map(([category, amount], index) => {
                const percentage = (amount / totalExpenses) * 100;
                const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-red-500'];
                
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{category}</span>
                      <span className="text-sm text-gray-600">
                        {formatCurrency(amount)} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${colors[index % colors.length]}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8">
                <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No spending data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="glass-effect rounded-xl p-6 card-hover animate-slideIn">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Trends</h2>
          <div className="space-y-4">
            {Object.entries(monthlyData).length > 0 ? (
              Object.entries(monthlyData).slice(-6).map(([month, data]) => (
                <div key={month} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{month}</span>
                    <div className="text-right">
                      <div className="text-sm text-green-600">+{formatCurrency(data.income)}</div>
                      <div className="text-sm text-red-600">-{formatCurrency(data.expenses)}</div>
                    </div>
                  </div>
                  <div className="flex space-x-1 h-2">
                    <div 
                      className="bg-green-500 rounded-l"
                      style={{ width: `${(data.income / (data.income + data.expenses)) * 100}%` }}
                    />
                    <div 
                      className="bg-red-500 rounded-r"
                      style={{ width: `${(data.expenses / (data.income + data.expenses)) * 100}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No trend data available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="glass-effect rounded-xl p-6 card-hover animate-slideIn">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Financial Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">💡 Spending Pattern</h3>
            <p className="text-sm text-blue-800">
              Your highest spending category is {topCategories[0]?.[0] || 'N/A'}. 
              Consider setting a budget to track this expense.
            </p>
          </div>
          
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">📈 Savings Goal</h3>
            <p className="text-sm text-green-800">
              {savingsRate >= 20 
                ? 'Great job! You\'re saving more than 20% of your income.'
                : 'Try to save at least 20% of your income for better financial health.'
              }
            </p>
          </div>
          
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">🎯 Budget Status</h3>
            <p className="text-sm text-purple-800">
              {budgets.length > 0 
                ? `You have ${budgets.length} active budgets. Keep tracking your progress!`
                : 'Consider creating budgets to better manage your spending.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};