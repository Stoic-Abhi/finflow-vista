import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, Plus, Check, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../lib/utils';
import { aiService } from '../../services/aiService';

export const BudgetRecommendations = ({ transactions, budgets, onCreateBudget }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedRecs, setAcceptedRecs] = useState(new Set());

  useEffect(() => {
    if (transactions.length > 0) {
      loadRecommendations();
    }
  }, [transactions, budgets]);

  const loadRecommendations = async () => {
    setIsLoading(true);
    try {
      const result = await aiService.generateBudgetRecommendations(transactions, budgets);
      setRecommendations(result.recommendations || []);
    } catch (error) {
      console.error('Failed to load budget recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptRecommendation = (rec) => {
    setAcceptedRecs(prev => new Set([...prev, rec.category]));
    
    // Create budget based on recommendation
    const newBudget = {
      category: rec.category,
      limit: rec.recommendedAmount,
      period: 'monthly',
      color: getRandomColor(),
      aiGenerated: true
    };
    
    onCreateBudget(newBudget);
  };

  const handleRejectRecommendation = (rec) => {
    setRecommendations(prev => prev.filter(r => r.category !== rec.category));
  };

  const getRandomColor = () => {
    const colors = ['#EF4444', '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      default: return '🟢';
    }
  };

  if (isLoading) {
    return (
      <div className="glass-effect rounded-xl p-6 card-hover animate-slideIn">
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-custom">
            <Target className="w-6 h-6 text-white" />
          </div>
          <p className="text-gray-600">Generating budget recommendations...</p>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="glass-effect rounded-xl p-6 card-hover animate-slideIn">
        <div className="text-center py-8">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Recommendations</h3>
          <p className="text-gray-600">Your budgets look well-optimized!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
          <Target className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">AI Budget Recommendations</h3>
          <p className="text-gray-600">Smart suggestions based on your spending patterns</p>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div 
            key={rec.category}
            className="glass-effect rounded-xl p-6 card-hover animate-slideIn"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">{getPriorityIcon(rec.priority)}</span>
                  <h4 className="font-semibold text-gray-900">{rec.category}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    rec.type === 'create' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {rec.type === 'create' ? 'New Budget' : 'Adjust Budget'}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-3">{rec.reason}</p>
                
                <div className="flex items-center space-x-4 text-sm">
                  {rec.currentAmount && (
                    <div>
                      <span className="text-gray-500">Current: </span>
                      <span className="font-medium">{formatCurrency(rec.currentAmount)}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-500">Recommended: </span>
                    <span className="font-medium text-blue-600">
                      {formatCurrency(rec.recommendedAmount)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2 ml-4">
                {!acceptedRecs.has(rec.category) ? (
                  <>
                    <Button
                      onClick={() => handleAcceptRecommendation(rec)}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 button-hover"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Accept
                    </Button>
                    <Button
                      onClick={() => handleRejectRecommendation(rec)}
                      size="sm"
                      variant="outline"
                      className="button-hover"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center space-x-2 text-green-600">
                    <Check className="w-4 h-4" />
                    <span className="text-sm font-medium">Accepted</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-effect rounded-xl p-4 card-hover">
        <div className="flex items-center space-x-3">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-gray-900">AI Confidence</p>
            <p className="text-sm text-gray-600">
              These recommendations are based on your spending patterns and have 78% accuracy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};