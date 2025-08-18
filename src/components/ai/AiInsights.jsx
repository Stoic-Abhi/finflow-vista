import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  Lightbulb,
  Sparkles,
  BarChart3,
  PieChart,
  Zap,
  RefreshCw
} from 'lucide-react';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../lib/utils';
import { aiService } from '../../services/aiService';

export const AIInsights = ({ transactions, budgets, goals, user }) => {
  const [insights, setInsights] = useState([]);
  const [healthScore, setHealthScore] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('insights');

  useEffect(() => {
    if (transactions.length > 0) {
      loadAIData();
    }
  }, [transactions, budgets, goals]);

  const loadAIData = async () => {
    setIsLoading(true);
    try {
      // Load all AI data in parallel
      const [insightsData, healthData, predictionsData, anomaliesData] = await Promise.all([
        aiService.generateInsights({ transactions, budgets, goals, user }),
        aiService.calculateFinancialHealthScore(transactions, budgets, goals, 5000),
        aiService.predictFutureExpenses(transactions, 3),
        aiService.detectAnomalies(transactions)
      ]);

      setInsights(insightsData.insights || []);
      setHealthScore(healthData);
      setPredictions(predictionsData.predictions || []);
      setAnomalies(anomaliesData.anomalies || []);
    } catch (error) {
      console.error('Failed to load AI data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getHealthScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'spending_pattern': return <TrendingUp className="w-5 h-5" />;
      case 'budget_recommendation': return <Target className="w-5 h-5" />;
      case 'goal_alert': return <AlertTriangle className="w-5 h-5" />;
      default: return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50 text-red-800';
      case 'medium': return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      default: return 'border-blue-200 bg-blue-50 text-blue-800';
    }
  };

  const tabs = [
    { id: 'insights', label: 'AI Insights', icon: Brain },
    { id: 'health', label: 'Health Score', icon: BarChart3 },
    { id: 'predictions', label: 'Predictions', icon: TrendingUp },
    { id: 'anomalies', label: 'Anomalies', icon: AlertTriangle }
  ];

  const renderInsights = () => (
    <div className="space-y-4">
      {insights.length > 0 ? (
        insights.map((insight, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg border-l-4 animate-slideIn ${getPriorityColor(insight.priority)}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {getInsightIcon(insight.type)}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">{insight.title}</h4>
                <p className="text-sm opacity-90">{insight.message}</p>
                {insight.actionable && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mt-2 button-hover"
                  >
                    Take Action
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No insights available yet</p>
          <p className="text-sm text-gray-500">Add more transactions to get AI-powered insights</p>
        </div>
      )}
    </div>
  );

  const renderHealthScore = () => (
    <div className="space-y-6">
      {healthScore ? (
        <>
          {/* Overall Score */}
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full text-4xl font-bold ${getHealthScoreColor(healthScore.overallScore)}`}>
              {healthScore.overallScore}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mt-4 capitalize">
              {healthScore.healthLevel} Health
            </h3>
            <p className="text-gray-600">
              Trend: <span className={`font-medium ${
                healthScore.trend === 'improving' ? 'text-green-600' : 
                healthScore.trend === 'declining' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {healthScore.trend}
              </span>
            </p>
          </div>

          {/* Breakdown */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Score Breakdown</h4>
            {Object.entries(healthScore.breakdown).map(([metric, data]) => (
              <div key={metric} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 capitalize">
                    {metric.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-sm text-gray-600">
                    {data.score.toFixed(0)}/100
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      data.score >= 80 ? 'bg-green-500' :
                      data.score >= 60 ? 'bg-blue-500' :
                      data.score >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${data.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          {healthScore.recommendations.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Recommendations</h4>
              {healthScore.recommendations.map((rec, index) => (
                <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">{rec}</p>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Calculating health score...</p>
        </div>
      )}
    </div>
  );

  const renderPredictions = () => (
    <div className="space-y-4">
      {predictions.length > 0 ? (
        predictions.map((prediction, index) => (
          <div 
            key={index}
            className="p-4 bg-purple-50 border border-purple-200 rounded-lg animate-slideIn"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-purple-900">{prediction.month}</h4>
              <span className="text-sm text-purple-600">
                {(prediction.confidence * 100).toFixed(0)}% confidence
              </span>
            </div>
            <p className="text-2xl font-bold text-purple-800 mb-2">
              {formatCurrency(prediction.predictedExpenses)}
            </p>
            <p className="text-sm text-purple-700">
              Predicted monthly expenses
            </p>
            <div className="mt-2">
              <div className="w-full bg-purple-200 rounded-full h-2">
                <div 
                  className="h-2 bg-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${prediction.confidence * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No predictions available</p>
          <p className="text-sm text-gray-500">Need more transaction history for predictions</p>
        </div>
      )}
    </div>
  );

  const renderAnomalies = () => (
    <div className="space-y-4">
      {anomalies.length > 0 ? (
        anomalies.map((anomaly, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg border-l-4 animate-slideIn ${
              anomaly.severity === 'high' ? 'border-red-500 bg-red-50' :
              anomaly.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
              'border-blue-500 bg-blue-50'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start space-x-3">
              <AlertTriangle className={`w-5 h-5 mt-1 ${
                anomaly.severity === 'high' ? 'text-red-600' :
                anomaly.severity === 'medium' ? 'text-yellow-600' :
                'text-blue-600'
              }`} />
              <div className="flex-1">
                <h4 className={`font-semibold mb-1 ${
                  anomaly.severity === 'high' ? 'text-red-800' :
                  anomaly.severity === 'medium' ? 'text-yellow-800' :
                  'text-blue-800'
                }`}>
                  {anomaly.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </h4>
                <p className={`text-sm mb-2 ${
                  anomaly.severity === 'high' ? 'text-red-700' :
                  anomaly.severity === 'medium' ? 'text-yellow-700' :
                  'text-blue-700'
                }`}>
                  {anomaly.message}
                </p>
                {anomaly.suggestion && (
                  <p className={`text-xs ${
                    anomaly.severity === 'high' ? 'text-red-600' :
                    anomaly.severity === 'medium' ? 'text-yellow-600' :
                    'text-blue-600'
                  }`}>
                    💡 {anomaly.suggestion}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No anomalies detected</p>
          <p className="text-sm text-gray-500">Your spending patterns look normal</p>
        </div>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'insights': return renderInsights();
      case 'health': return renderHealthScore();
      case 'predictions': return renderPredictions();
      case 'anomalies': return renderAnomalies();
      default: return renderInsights();
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AI Financial Assistant</h2>
            <p className="text-gray-600">Powered by machine learning insights</p>
          </div>
        </div>
        <Button 
          onClick={loadAIData}
          disabled={isLoading}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 button-hover"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Analyzing...' : 'Refresh Insights'}
        </Button>
      </div>

      {/* Tabs */}
      <div className="glass-effect rounded-xl p-6 card-hover">
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-custom">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <p className="text-gray-600 font-medium">AI is analyzing your data...</p>
                <p className="text-sm text-gray-500">This may take a few moments</p>
              </div>
            </div>
          ) : (
            renderTabContent()
          )}
        </div>
      </div>

      {/* Quick Stats */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-effect rounded-xl p-4 card-hover animate-slideIn">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Insights</p>
                <p className="text-xl font-bold text-gray-900">{insights.length}</p>
              </div>
            </div>
          </div>
          
          <div className="glass-effect rounded-xl p-4 card-hover animate-slideIn">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Health Score</p>
                <p className="text-xl font-bold text-gray-900">
                  {healthScore?.overallScore || 0}
                </p>
              </div>
            </div>
          </div>
          
          <div className="glass-effect rounded-xl p-4 card-hover animate-slideIn">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Predictions</p>
                <p className="text-xl font-bold text-gray-900">{predictions.length}</p>
              </div>
            </div>
          </div>
          
          <div className="glass-effect rounded-xl p-4 card-hover animate-slideIn">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Anomalies</p>
                <p className="text-xl font-bold text-gray-900">{anomalies.length}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};