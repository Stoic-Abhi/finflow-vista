// AI/ML Service for Financial Insights and Predictions
import { formatCurrency } from '../lib/utils';

class AIService {
  constructor() {
    this.apiEndpoint = '/api/ai'; // This would be your AI service endpoint
    this.isEnabled = true;
  }

  // Analyze spending patterns using ML
  async analyzeSpendingPatterns(transactions) {
    try {
      // Simulate AI analysis - in production, this would call your ML service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const categorySpending = this.groupTransactionsByCategory(transactions);
      const insights = this.generateSpendingInsights(categorySpending, transactions);
      
      return {
        patterns: insights.patterns,
        anomalies: insights.anomalies,
        recommendations: insights.recommendations,
        riskScore: insights.riskScore,
        confidence: 0.85
      };
    } catch (error) {
      console.error('AI Analysis Error:', error);
      return null;
    }
  }

  // Generate personalized budget recommendations
  async generateBudgetRecommendations(transactions, currentBudgets = []) {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const monthlySpending = this.calculateMonthlyAverages(transactions);
      const recommendations = [];

      Object.entries(monthlySpending).forEach(([category, avgSpending]) => {
        const existingBudget = currentBudgets.find(b => b.category === category);
        const recommendedAmount = Math.ceil(avgSpending * 1.1); // 10% buffer
        
        if (!existingBudget) {
          recommendations.push({
            type: 'create',
            category,
            recommendedAmount,
            reason: `Based on your average monthly spending of ${formatCurrency(avgSpending)}`,
            priority: avgSpending > 500 ? 'high' : avgSpending > 200 ? 'medium' : 'low'
          });
        } else if (existingBudget.limit < recommendedAmount * 0.8) {
          recommendations.push({
            type: 'increase',
            category,
            currentAmount: existingBudget.limit,
            recommendedAmount,
            reason: 'Your current budget may be too restrictive based on spending patterns',
            priority: 'medium'
          });
        }
      });

      return {
        recommendations,
        totalRecommendedBudget: Object.values(monthlySpending).reduce((sum, amt) => sum + amt * 1.1, 0),
        confidence: 0.78
      };
    } catch (error) {
      console.error('Budget Recommendation Error:', error);
      return { recommendations: [], confidence: 0 };
    }
  }

  // Predict future expenses using time series analysis
  async predictFutureExpenses(transactions, months = 3) {
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const monthlyData = this.groupTransactionsByMonth(transactions);
      const predictions = [];

      for (let i = 1; i <= months; i++) {
        const futureDate = new Date();
        futureDate.setMonth(futureDate.getMonth() + i);
        
        // Simple trend analysis - in production, use more sophisticated ML models
        const trend = this.calculateTrend(monthlyData);
        const seasonality = this.calculateSeasonality(monthlyData, futureDate.getMonth());
        
        predictions.push({
          month: futureDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          predictedExpenses: Math.max(0, trend + seasonality),
          confidence: Math.max(0.4, 0.9 - (i * 0.1)), // Confidence decreases with time
          factors: ['historical_trend', 'seasonal_patterns', 'spending_behavior']
        });
      }

      return {
        predictions,
        methodology: 'time_series_analysis',
        accuracy: '±15%'
      };
    } catch (error) {
      console.error('Expense Prediction Error:', error);
      return { predictions: [] };
    }
  }

  // Detect unusual spending patterns
  async detectAnomalies(transactions) {
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const anomalies = [];
      const categoryAverages = this.calculateCategoryAverages(transactions);
      
      // Check recent transactions against historical averages
      const recentTransactions = transactions
        .filter(t => {
          const transactionDate = new Date(t.date);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          return transactionDate >= thirtyDaysAgo && t.type === 'expense';
        });

      recentTransactions.forEach(transaction => {
        const categoryAvg = categoryAverages[transaction.category] || 0;
        const threshold = categoryAvg * 2; // 2x average is considered anomalous
        
        if (transaction.amount > threshold && transaction.amount > 100) {
          anomalies.push({
            transaction,
            type: 'high_amount',
            severity: transaction.amount > threshold * 1.5 ? 'high' : 'medium',
            message: `Unusually high ${transaction.category} expense: ${formatCurrency(transaction.amount)} vs average ${formatCurrency(categoryAvg)}`,
            suggestion: 'Review this transaction and consider if it fits your budget'
          });
        }
      });

      // Detect frequency anomalies
      const frequencyAnomalies = this.detectFrequencyAnomalies(transactions);
      anomalies.push(...frequencyAnomalies);

      return {
        anomalies,
        totalAnomalies: anomalies.length,
        riskLevel: anomalies.length > 5 ? 'high' : anomalies.length > 2 ? 'medium' : 'low'
      };
    } catch (error) {
      console.error('Anomaly Detection Error:', error);
      return { anomalies: [] };
    }
  }

  // Generate financial health score using ML
  async calculateFinancialHealthScore(transactions, budgets, goals, income) {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const metrics = {
        savingsRate: this.calculateSavingsRate(transactions, income),
        budgetAdherence: this.calculateBudgetAdherence(transactions, budgets),
        goalProgress: this.calculateGoalProgress(goals),
        spendingStability: this.calculateSpendingStability(transactions),
        debtRatio: this.calculateDebtRatio(transactions, income)
      };

      // Weighted scoring algorithm
      const weights = {
        savingsRate: 0.25,
        budgetAdherence: 0.20,
        goalProgress: 0.20,
        spendingStability: 0.20,
        debtRatio: 0.15
      };

      let totalScore = 0;
      const breakdown = {};

      Object.entries(metrics).forEach(([key, value]) => {
        const normalizedScore = Math.min(100, Math.max(0, value));
        breakdown[key] = {
          score: normalizedScore,
          weight: weights[key],
          contribution: normalizedScore * weights[key]
        };
        totalScore += breakdown[key].contribution;
      });

      const healthLevel = totalScore >= 80 ? 'excellent' : 
                         totalScore >= 60 ? 'good' : 
                         totalScore >= 40 ? 'fair' : 'poor';

      return {
        overallScore: Math.round(totalScore),
        healthLevel,
        breakdown,
        recommendations: this.generateHealthRecommendations(breakdown, healthLevel),
        trend: this.calculateHealthTrend(transactions)
      };
    } catch (error) {
      console.error('Health Score Calculation Error:', error);
      return { overallScore: 0, healthLevel: 'unknown' };
    }
  }

  // Smart categorization using NLP
  async categorizTransaction(description, amount) {
    try {
      // Simulate NLP categorization - in production, use actual NLP models
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const keywords = {
        'Food & Dining': ['restaurant', 'food', 'cafe', 'pizza', 'burger', 'starbucks', 'mcdonald', 'subway'],
        'Transportation': ['gas', 'fuel', 'uber', 'lyft', 'taxi', 'parking', 'metro', 'bus'],
        'Shopping': ['amazon', 'walmart', 'target', 'mall', 'store', 'shop'],
        'Entertainment': ['netflix', 'spotify', 'movie', 'theater', 'game', 'concert'],
        'Bills & Utilities': ['electric', 'water', 'internet', 'phone', 'rent', 'mortgage'],
        'Healthcare': ['pharmacy', 'doctor', 'hospital', 'medical', 'health'],
        'Travel': ['hotel', 'flight', 'airbnb', 'booking', 'expedia'],
        'Education': ['school', 'university', 'course', 'book', 'tuition']
      };

      const lowerDesc = description.toLowerCase();
      
      for (const [category, categoryKeywords] of Object.entries(keywords)) {
        if (categoryKeywords.some(keyword => lowerDesc.includes(keyword))) {
          return {
            category,
            confidence: 0.85,
            suggestedTags: this.generateTags(description, category)
          };
        }
      }

      // Fallback categorization based on amount patterns
      if (amount > 1000) return { category: 'Bills & Utilities', confidence: 0.6 };
      if (amount < 10) return { category: 'Food & Dining', confidence: 0.5 };
      
      return { category: 'Other', confidence: 0.3 };
    } catch (error) {
      console.error('Categorization Error:', error);
      return { category: 'Other', confidence: 0 };
    }
  }

  // Generate personalized financial insights
  async generateInsights(userData) {
    try {
      const { transactions, budgets, goals, user } = userData;
      
      const insights = [];
      
      // Spending pattern insights
      const spendingAnalysis = await this.analyzeSpendingPatterns(transactions);
      if (spendingAnalysis) {
        insights.push(...spendingAnalysis.recommendations.map(rec => ({
          type: 'spending_pattern',
          title: 'Spending Pattern Alert',
          message: rec,
          priority: 'medium',
          actionable: true
        })));
      }

      // Budget insights
      const budgetRecs = await this.generateBudgetRecommendations(transactions, budgets);
      budgetRecs.recommendations.slice(0, 3).forEach(rec => {
        insights.push({
          type: 'budget_recommendation',
          title: `Budget Suggestion: ${rec.category}`,
          message: rec.reason,
          priority: rec.priority,
          actionable: true,
          action: {
            type: rec.type,
            category: rec.category,
            amount: rec.recommendedAmount
          }
        });
      });

      // Goal progress insights
      goals.forEach(goal => {
        const progress = (goal.currentAmount / goal.targetAmount) * 100;
        const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));
        
        if (progress < 50 && daysLeft < 90) {
          insights.push({
            type: 'goal_alert',
            title: `Goal Behind Schedule: ${goal.title}`,
            message: `You're ${(100 - progress).toFixed(1)}% away from your goal with ${daysLeft} days left`,
            priority: 'high',
            actionable: true
          });
        }
      });

      return {
        insights: insights.slice(0, 10), // Limit to top 10 insights
        generatedAt: new Date().toISOString(),
        totalInsights: insights.length
      };
    } catch (error) {
      console.error('Insight Generation Error:', error);
      return { insights: [] };
    }
  }

  // Helper methods
  groupTransactionsByCategory(transactions) {
    return transactions.reduce((acc, transaction) => {
      if (transaction.type === 'expense') {
        acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      }
      return acc;
    }, {});
  }

  calculateMonthlyAverages(transactions) {
    const monthlyData = this.groupTransactionsByMonth(transactions);
    const categoryTotals = {};
    
    Object.values(monthlyData).forEach(monthTransactions => {
      monthTransactions.forEach(transaction => {
        if (transaction.type === 'expense') {
          categoryTotals[transaction.category] = (categoryTotals[transaction.category] || 0) + transaction.amount;
        }
      });
    });

    const monthCount = Object.keys(monthlyData).length || 1;
    Object.keys(categoryTotals).forEach(category => {
      categoryTotals[category] = categoryTotals[category] / monthCount;
    });

    return categoryTotals;
  }

  groupTransactionsByMonth(transactions) {
    return transactions.reduce((acc, transaction) => {
      const monthKey = new Date(transaction.date).toISOString().slice(0, 7); // YYYY-MM
      if (!acc[monthKey]) acc[monthKey] = [];
      acc[monthKey].push(transaction);
      return acc;
    }, {});
  }

  calculateTrend(monthlyData) {
    const months = Object.keys(monthlyData).sort();
    if (months.length < 2) return 0;
    
    const recentMonths = months.slice(-3);
    const avgRecent = recentMonths.reduce((sum, month) => {
      return sum + monthlyData[month].filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    }, 0) / recentMonths.length;
    
    return avgRecent;
  }

  calculateSeasonality(monthlyData, targetMonth) {
    // Simple seasonality calculation - in production, use more sophisticated models
    const seasonalFactors = {
      0: 1.1,  // January - New Year spending
      1: 0.9,  // February
      2: 1.0,  // March
      3: 1.0,  // April
      4: 1.1,  // May - Spring spending
      5: 1.0,  // June
      6: 1.1,  // July - Summer vacation
      7: 1.1,  // August - Back to school
      8: 1.0,  // September
      9: 1.0,  // October
      10: 1.2, // November - Holiday shopping
      11: 1.3  // December - Holiday season
    };
    
    return (seasonalFactors[targetMonth] || 1.0) * 100; // Base adjustment
  }

  generateSpendingInsights(categorySpending, transactions) {
    const totalSpending = Object.values(categorySpending).reduce((sum, amount) => sum + amount, 0);
    const patterns = [];
    const anomalies = [];
    const recommendations = [];

    // Identify top spending categories
    const sortedCategories = Object.entries(categorySpending)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);

    sortedCategories.forEach(([category, amount], index) => {
      const percentage = (amount / totalSpending) * 100;
      patterns.push(`${category} accounts for ${percentage.toFixed(1)}% of your spending`);
      
      if (percentage > 40) {
        recommendations.push(`Consider setting a stricter budget for ${category} as it's your largest expense`);
      }
    });

    return {
      patterns,
      anomalies,
      recommendations,
      riskScore: this.calculateRiskScore(categorySpending, totalSpending)
    };
  }

  calculateRiskScore(categorySpending, totalSpending) {
    // Risk factors: high concentration in single category, high discretionary spending
    const categories = Object.entries(categorySpending);
    const maxCategoryPercentage = Math.max(...categories.map(([,amount]) => (amount / totalSpending) * 100));
    
    let riskScore = 0;
    if (maxCategoryPercentage > 50) riskScore += 30;
    if (maxCategoryPercentage > 70) riskScore += 20;
    
    // Add other risk factors...
    return Math.min(100, riskScore);
  }

  generateTags(description, category) {
    const commonTags = {
      'Food & Dining': ['meal', 'dining', 'takeout'],
      'Transportation': ['commute', 'travel', 'vehicle'],
      'Shopping': ['retail', 'purchase', 'goods'],
      'Entertainment': ['leisure', 'fun', 'subscription'],
      'Bills & Utilities': ['monthly', 'recurring', 'essential'],
      'Healthcare': ['medical', 'wellness', 'insurance'],
      'Travel': ['vacation', 'trip', 'accommodation'],
      'Education': ['learning', 'development', 'academic']
    };
    
    return commonTags[category] || ['general'];
  }

  // Additional helper methods for financial health calculation
  calculateSavingsRate(transactions, income) {
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0) || income || 0;
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    
    if (totalIncome === 0) return 0;
    return ((totalIncome - totalExpenses) / totalIncome) * 100;
  }

  calculateBudgetAdherence(transactions, budgets) {
    if (!budgets.length) return 50; // Neutral score if no budgets
    
    let adherenceScore = 0;
    budgets.forEach(budget => {
      const spent = transactions
        .filter(t => t.type === 'expense' && t.category === budget.category)
        .reduce((sum, t) => sum + t.amount, 0);
      
      const adherence = Math.max(0, 100 - ((spent / budget.limit) * 100));
      adherenceScore += adherence;
    });
    
    return adherenceScore / budgets.length;
  }

  calculateGoalProgress(goals) {
    if (!goals.length) return 50; // Neutral score if no goals
    
    const avgProgress = goals.reduce((sum, goal) => {
      return sum + ((goal.currentAmount / goal.targetAmount) * 100);
    }, 0) / goals.length;
    
    return Math.min(100, avgProgress);
  }

  calculateSpendingStability(transactions) {
    const monthlySpending = this.groupTransactionsByMonth(transactions);
    const monthlyTotals = Object.values(monthlySpending).map(monthTransactions =>
      monthTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
    );
    
    if (monthlyTotals.length < 2) return 50;
    
    const avg = monthlyTotals.reduce((sum, total) => sum + total, 0) / monthlyTotals.length;
    const variance = monthlyTotals.reduce((sum, total) => sum + Math.pow(total - avg, 2), 0) / monthlyTotals.length;
    const stdDev = Math.sqrt(variance);
    
    // Lower standard deviation = higher stability score
    const stabilityScore = Math.max(0, 100 - ((stdDev / avg) * 100));
    return Math.min(100, stabilityScore);
  }

  calculateDebtRatio(transactions, income) {
    // Simplified debt calculation - in production, track actual debt
    const debtPayments = transactions
      .filter(t => t.type === 'expense' && (t.category.includes('Loan') || t.category.includes('Credit')))
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0) || income || 1;
    const debtRatio = (debtPayments / totalIncome) * 100;
    
    return Math.max(0, 100 - debtRatio); // Lower debt ratio = higher score
  }

  generateHealthRecommendations(breakdown, healthLevel) {
    const recommendations = [];
    
    Object.entries(breakdown).forEach(([metric, data]) => {
      if (data.score < 60) {
        switch (metric) {
          case 'savingsRate':
            recommendations.push('Increase your savings rate by reducing discretionary spending');
            break;
          case 'budgetAdherence':
            recommendations.push('Review and adjust your budgets to be more realistic');
            break;
          case 'goalProgress':
            recommendations.push('Consider increasing contributions to your financial goals');
            break;
          case 'spendingStability':
            recommendations.push('Work on creating more consistent spending patterns');
            break;
          case 'debtRatio':
            recommendations.push('Focus on paying down high-interest debt');
            break;
        }
      }
    });
    
    return recommendations;
  }

  calculateHealthTrend(transactions) {
    // Simplified trend calculation - compare recent vs older periods
    const now = new Date();
    const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
    
    const recentTransactions = transactions.filter(t => new Date(t.date) >= threeMonthsAgo);
    const olderTransactions = transactions.filter(t => new Date(t.date) >= sixMonthsAgo && new Date(t.date) < threeMonthsAgo);
    
    const recentSavings = this.calculateSavingsRate(recentTransactions);
    const olderSavings = this.calculateSavingsRate(olderTransactions);
    
    if (recentSavings > olderSavings + 5) return 'improving';
    if (recentSavings < olderSavings - 5) return 'declining';
    return 'stable';
  }

  calculateCategoryAverages(transactions) {
    const categoryTotals = {};
    const categoryCounts = {};
    
    transactions.filter(t => t.type === 'expense').forEach(transaction => {
      categoryTotals[transaction.category] = (categoryTotals[transaction.category] || 0) + transaction.amount;
      categoryCounts[transaction.category] = (categoryCounts[transaction.category] || 0) + 1;
    });
    
    const averages = {};
    Object.keys(categoryTotals).forEach(category => {
      averages[category] = categoryTotals[category] / categoryCounts[category];
    });
    
    return averages;
  }

  detectFrequencyAnomalies(transactions) {
    // Detect unusual frequency patterns
    const anomalies = [];
    const categoryFrequency = {};
    
    transactions.filter(t => t.type === 'expense').forEach(transaction => {
      const category = transaction.category;
      if (!categoryFrequency[category]) {
        categoryFrequency[category] = [];
      }
      categoryFrequency[category].push(new Date(transaction.date));
    });
    
    // Check for categories with unusual frequency spikes
    Object.entries(categoryFrequency).forEach(([category, dates]) => {
      if (dates.length > 10) { // Only check categories with sufficient data
        const recentDates = dates.filter(date => {
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          return date >= thirtyDaysAgo;
        });
        
        const historicalAvg = dates.length / 12; // Assume 12 months of data
        const recentCount = recentDates.length;
        
        if (recentCount > historicalAvg * 2) {
          anomalies.push({
            type: 'frequency_spike',
            category,
            severity: 'medium',
            message: `Unusual increase in ${category} transactions this month`,
            suggestion: 'Review recent purchases in this category'
          });
        }
      }
    });
    
    return anomalies;
  }
}

export const aiService = new AIService();
export default aiService;