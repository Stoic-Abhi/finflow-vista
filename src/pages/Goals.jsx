import React, { useState } from 'react';
import { 
  Plus, 
  Target, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { formatCurrency, formatDate, calculateGoalProgress } from '../lib/utils';

export const Goals = ({ goals = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const goalsWithProgress = goals.map(goal => {
    const progress = calculateGoalProgress(goal.currentAmount, goal.targetAmount);
    const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));
    
    return {
      ...goal,
      ...progress,
      daysLeft: Math.max(0, daysLeft),
      isOverdue: daysLeft < 0
    };
  });

  const completedGoals = goalsWithProgress.filter(g => g.isCompleted).length;
  const activeGoals = goalsWithProgress.filter(g => !g.isCompleted).length;
  const totalTargetAmount = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalCurrentAmount = goals.reduce((sum, g) => sum + g.currentAmount, 0);

  const categories = ['all', ...new Set(goals.map(g => g.category))];

  const filteredGoals = selectedCategory === 'all' 
    ? goalsWithProgress 
    : goalsWithProgress.filter(g => g.category === selectedCategory);

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <Star className="w-4 h-4 text-red-500" />;
      case 'medium':
        return <Star className="w-4 h-4 text-yellow-500" />;
      default:
        return <Star className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Goals</h1>
          <p className="text-gray-600">Track your progress towards your financial objectives</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 button-hover">
          <Plus className="w-4 h-4 mr-2" />
          Create Goal
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-effect rounded-xl p-6 card-hover animate-slideIn">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Goals</p>
              <p className="text-2xl font-bold text-blue-600">{activeGoals}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="glass-effect rounded-xl p-6 card-hover animate-slideIn">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedGoals}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="glass-effect rounded-xl p-6 card-hover animate-slideIn">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Target</p>
              <p className="text-2xl font-bold text-purple-600">{formatCurrency(totalTargetAmount)}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="glass-effect rounded-xl p-6 card-hover animate-slideIn">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Saved</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalCurrentAmount)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="glass-effect rounded-xl p-6 card-hover animate-slideIn">
        <div className="flex items-center space-x-4">
          <span className="font-medium text-gray-900">Filter by category:</span>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-6">
        {filteredGoals.length > 0 ? (
          filteredGoals.map((goal, index) => (
            <div 
              key={goal.id} 
              className={`glass-effect rounded-xl p-6 card-hover animate-slideIn border-l-4 ${
                goal.isCompleted 
                  ? 'border-green-500' 
                  : goal.isOverdue 
                    ? 'border-red-500' 
                    : 'border-blue-500'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    goal.isCompleted 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {goal.isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Target className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                      {getPriorityIcon(goal.priority)}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{goal.category}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Due: {formatDate(goal.deadline)}</span>
                      </div>
                      {!goal.isCompleted && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span className={goal.isOverdue ? 'text-red-600' : ''}>
                            {goal.isOverdue ? 'Overdue' : `${goal.daysLeft} days left`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatCurrency(goal.remaining)} remaining
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className={`font-medium ${
                    goal.isCompleted ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {goal.percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      goal.isCompleted ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${goal.percentage}%` }}
                  />
                </div>
              </div>
              
              {goal.isCompleted && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>🎉 Congratulations!</strong> You've successfully achieved this goal!
                  </p>
                </div>
              )}
              
              {goal.isOverdue && !goal.isCompleted && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">
                    <strong>⚠️ Overdue!</strong> This goal has passed its deadline. Consider updating the target date.
                  </p>
                </div>
              )}
              
              <div className="mt-4 flex justify-end space-x-3">
                <Button variant="outline" size="sm" className="button-hover">
                  Add Progress
                </Button>
                <Button variant="outline" size="sm" className="button-hover">
                  Edit Goal
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="glass-effect rounded-xl p-12 text-center card-hover animate-slideIn">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No goals found</h3>
            <p className="text-gray-600 mb-6">
              {selectedCategory === 'all' 
                ? 'Create your first financial goal to start tracking your progress towards your dreams.'
                : `No goals found in the ${selectedCategory} category. Try selecting a different category or create a new goal.`
              }
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 button-hover">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Goal
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};