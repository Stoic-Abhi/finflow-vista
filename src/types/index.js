// User Types
export const UserRoles = {
  ADMIN: 'admin',
  MEMBER: 'member',
  VIEWER: 'viewer'
};

export const TransactionTypes = {
  INCOME: 'income',
  EXPENSE: 'expense',
  TRANSFER: 'transfer'
};

export const BudgetTypes = {
  CATEGORY: 'category',
  ENVELOPE: 'envelope',
  ZERO_BASED: 'zero-based'
};

export const GoalTypes = {
  SAVINGS: 'savings',
  DEBT_PAYOFF: 'debt_payoff',
  INVESTMENT: 'investment',
  PURCHASE: 'purchase'
};

export const NotificationTypes = {
  BUDGET_ALERT: 'budget_alert',
  BILL_REMINDER: 'bill_reminder',
  GOAL_MILESTONE: 'goal_milestone',
  UNUSUAL_SPENDING: 'unusual_spending',
  LOW_BALANCE: 'low_balance',
  SYSTEM: 'system'
};

export const RecurringFrequencies = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  BIWEEKLY: 'biweekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly'
};

export const BudgetPeriods = {
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly'
};

export const AccountTypes = {
  CHECKING: 'checking',
  SAVINGS: 'savings',
  CREDIT: 'credit',
  INVESTMENT: 'investment',
  CASH: 'cash'
};

export const Themes = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

export const Currencies = {
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
  JPY: 'JPY',
  CAD: 'CAD',
  AUD: 'AUD'
};

// Default category colors
export const CategoryColors = {
  FOOD: '#EF4444',
  TRANSPORTATION: '#3B82F6',
  SHOPPING: '#8B5CF6',
  ENTERTAINMENT: '#F59E0B',
  BILLS: '#DC2626',
  HEALTHCARE: '#10B981',
  TRAVEL: '#06B6D4',
  EDUCATION: '#8B5CF6',
  INVESTMENT: '#059669',
  SALARY: '#10B981',
  FREELANCE: '#3B82F6',
  OTHER: '#6B7280'
};

// Budget status types
export const BudgetStatus = {
  GOOD: 'good',
  WARNING: 'warning',
  EXCEEDED: 'exceeded'
};

// Priority levels
export const PriorityLevels = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

// Insight impact levels
export const InsightImpact = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};