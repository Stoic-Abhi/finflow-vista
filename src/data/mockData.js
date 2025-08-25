export const mockUser = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  currency: 'USD',
  theme: 'light'
};

export const categories = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare', 
  'Travel',
  'Education',
  'Investment',
  'Salary',
  'Freelance',
  'Other'
];

export const mockTransactions = [
  {
    id: '1',
    type: 'expense',
    amount: 45.50,
    category: 'Food & Dining',
    description: 'Dinner at Italian Restaurant',
    date: '2025-01-15',
    tags: ['dinner', 'restaurant'],
    notes: 'Team dinner with colleagues'
  },
  {
    id: '2',
    type: 'income',
    amount: 3500.00,
    category: 'Salary',
    description: 'Monthly Salary',
    date: '2025-01-01',
    isRecurring: true,
    recurringType: 'monthly'
  },
  {
    id: '3',
    type: 'expense',
    amount: 85.20,
    category: 'Transportation',
    description: 'Gas Station',
    date: '2025-01-14',
    tags: ['fuel', 'car']
  },
  {
    id: '4',
    type: 'expense',
    amount: 1200.00,
    category: 'Bills & Utilities',
    description: 'Monthly Rent',
    date: '2025-01-01',
    isRecurring: true,
    recurringType: 'monthly'
  },
  {
    id: '5',
    type: 'expense',
    amount: 25.99,
    category: 'Entertainment',
    description: 'Netflix Subscription',
    date: '2025-01-10',
    isRecurring: true,
    recurringType: 'monthly'
  },
  {
    id: '6',
    type: 'income',
    amount: 800.00,
    category: 'Freelance',
    description: 'Web Development Project',
    date: '2025-01-12',
    tags: ['freelance', 'web-dev']
  },
  {
    id: '7',
    type: 'expense',
    amount: 120.00,
    category: 'Shopping',
    description: 'Groceries',
    date: '2025-01-13',
    tags: ['groceries', 'food']
  },
  {
    id: '8',
    type: 'expense',
    amount: 55.00,
    category: 'Healthcare',
    description: 'Pharmacy',
    date: '2025-01-11',
    tags: ['medicine', 'health']
  }
];

export const mockBudgets = [
  {
    id: '1',
    category: 'Food & Dining',
    limit: 400,
    period: 'monthly',
    spent: 185.50,
    color: '#EF4444'
  },
  {
    id: '2',
    category: 'Transportation',
    limit: 200,
    period: 'monthly',
    spent: 85.20,
    color: '#3B82F6'
  },
  {
    id: '3',
    category: 'Entertainment',
    limit: 100,
    period: 'monthly',
    spent: 25.99,
    color: '#8B5CF6'
  },
  {
    id: '4',
    category: 'Shopping',
    limit: 300,
    period: 'monthly',
    spent: 120.00,
    color: '#10B981'
  },
  {
    id: '5',
    category: 'Healthcare',
    limit: 150,
    period: 'monthly',
    spent: 55.00,
    color: '#F59E0B'
  }
];

export const mockGoals = [
  {
    id: '1',
    title: 'Emergency Fund',
    targetAmount: 10000,
    currentAmount: 6500,
    deadline: '2025-12-31',
    category: 'Savings',
    color: '#10B981'
  },
  {
    id: '2',
    title: 'Vacation to Europe',
    targetAmount: 5000,
    currentAmount: 2800,
    deadline: '2025-07-15',
    category: 'Travel',
    color: '#3B82F6'
  },
  {
    id: '3',
    title: 'New Laptop',
    targetAmount: 2500,
    currentAmount: 1200,
    deadline: '2025-04-30',
    category: 'Technology',
    color: '#8B5CF6'
  }
];