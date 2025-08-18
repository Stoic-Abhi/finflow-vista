import React, { useState } from 'react';
import { Brain, Tag, Check, X, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { aiService } from '../../services/aiService';

export const SmartCategorization = ({ transaction, onCategorize, onSkip }) => {
  const [suggestion, setSuggestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  const getSuggestion = async () => {
    setIsLoading(true);
    try {
      const result = await aiService.categorizTransaction(
        transaction.description, 
        transaction.amount
      );
      setSuggestion(result);
    } catch (error) {
      console.error('Categorization failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = () => {
    if (suggestion) {
      onCategorize({
        ...transaction,
        category: suggestion.category,
        tags: suggestion.suggestedTags,
        aiCategorized: true,
        confidence: suggestion.confidence
      });
    }
  };

  const handleCustomCategory = () => {
    if (customCategory.trim()) {
      onCategorize({
        ...transaction,
        category: customCategory.trim(),
        aiCategorized: false
      });
    }
  };

  return (
    <div className="glass-effect rounded-xl p-6 card-hover animate-slideIn">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Smart Categorization</h3>
          <p className="text-sm text-gray-600">AI-powered transaction categorization</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="font-medium text-gray-900">{transaction.description}</p>
          <p className="text-sm text-gray-600">Amount: ${transaction.amount}</p>
        </div>

        {!suggestion && !isLoading && (
          <Button 
            onClick={getSuggestion}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 button-hover"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Get AI Suggestion
          </Button>
        )}

        {isLoading && (
          <div className="text-center py-4">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse-custom">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <p className="text-sm text-gray-600">Analyzing transaction...</p>
          </div>
        )}

        {suggestion && (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-blue-900">AI Suggestion</h4>
                <span className="text-xs text-blue-600">
                  {(suggestion.confidence * 100).toFixed(0)}% confidence
                </span>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Tag className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-800">{suggestion.category}</span>
              </div>
              {suggestion.suggestedTags && (
                <div className="flex flex-wrap gap-1">
                  {suggestion.suggestedTags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <Button 
                onClick={handleAccept}
                className="flex-1 bg-green-600 hover:bg-green-700 button-hover"
              >
                <Check className="w-4 h-4 mr-2" />
                Accept
              </Button>
              <Button 
                onClick={() => setSuggestion(null)}
                variant="outline"
                className="button-hover"
              >
                <X className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </div>
          </div>
        )}

        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-2">Or set custom category:</h4>
          <div className="flex space-x-2">
            <input
              type="text"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              placeholder="Enter category name"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Button 
              onClick={handleCustomCategory}
              disabled={!customCategory.trim()}
              variant="outline"
              className="button-hover"
            >
              Set
            </Button>
          </div>
        </div>

        <Button 
          onClick={onSkip}
          variant="ghost"
          className="w-full button-hover"
        >
          Skip for now
        </Button>
      </div>
    </div>
  );
};