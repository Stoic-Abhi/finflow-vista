import React, { useState } from 'react';
import { 
  Plus, 
  PiggyBank, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { formatCurrency, calculateBudgetProgress } from '../lib/utils';

export const Budgets = ({ budgets = [], transactions = [] }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  // Calculate spending for each budget
  const budgetsWithSpending = budgets.map(budget => {
    const categorySpending = transactions
      .filter(t => t.type === 'expense' && t.category === budget.category)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const progress = calculateBudgetProgress(categorySpending, budget.limit);
    
    return {
      ...budget,
      spent: categorySpending,
      ...progress
    };
  });

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgetsWithSpending.reduce((sum, b) => sum + b.spent, 0);
  const overBudgetCount = budgetsWithSpending.filter(b => b.status === 'exceeded').length;
  const warningCount = budgetsWithSpending.filter(b => b.status === 'warning').length;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'exceeded':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'exceeded':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-green-500';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Budgets</h1>
          <p className="text-gray-600">Track your spending and stay within your limits</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 button-hover">
          <Plus className="w-4 h-4 mr-2" />
          Create Budget
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-effect rounded-xl p-6 card-hover animate-slideIn">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalBudget)}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="glass-effect rounded-xl p-6 card-hover animate-slideIn">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Spent</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(totalSpent)}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="glass-effect rounded-xl p-6 card-hover animate-slideIn">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Over Budget</p>
              <p className="text-2xl font-bold text-red-600">{overBudgetCount}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="glass-effect rounded-xl p-6 card-hover animate-slideIn">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Warnings</p>
              <p className="text-2xl font-bold text-yellow-600">{warningCount}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Period Filter */}
      <div className="glass-effect rounded-xl p-6 card-hover animate-slideIn">
        <div className="flex items-center space-x-4">
          <Calendar className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-900">Period:</span>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      {/* Budget List */}
      <div className="space-y-6">
        {budgetsWithSpending.length > 0 ? (
          budgetsWithSpending.map((budget, index) => (
            <div 
              key={budget.id} 
              className="glass-effect rounded-xl p-6 card-hover animate-slideIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(budget.status)}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{budget.category}</h3>
                    <p className="text-sm text-gray-600 capitalize">{budget.period} budget</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatCurrency(budget.remaining)} remaining
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className={`font-medium ${
                    budget.status === 'exceeded' ? 'text-red-600' :
                    budget.status === 'warning' ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {budget.percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${getStatusColor(budget.status)}`}
                    style={{ width: `${Math.min(budget.percentage, 100)}%` }}
                  />
                </div>
              </div>
              
              {budget.status === 'exceeded' && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">
                    <strong>Over budget!</strong> You've exceeded your limit by {formatCurrency(budget.spent - budget.limit)}.
                  </p>
                </div>
              )}
              
              {budget.status === 'warning' && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Warning!</strong> You've used {budget.percentage.toFixed(1)}% of your budget.
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="glass-effect rounded-xl p-12 text-center card-hover animate-slideIn">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PiggyBank className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No budgets created yet</h3>
            <p className="text-gray-600 mb-6">
              Create your first budget to start tracking your spending and stay on top of your finances.
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 button-hover">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Budget
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};