import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateUUID, calculateBudgetProgress, calculateGoalProgress } from '../lib/utils';

const createMockTransaction = (data) => ({
  id: generateUUID(),
  userId: '1',
  type: 'expense',
  amount: 0,
  category: '',
  description: '',
  date: new Date().toISOString().split('T')[0],
  tags: [],
  isRecurring: false,
  pending: false,
  approved: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...data,
});

const createMockBudget = (data) => ({
  id: generateUUID(),
  userId: '1',
  name: '',
  type: 'category',
  categories: [],
  amount: 0,
  period: 'monthly',
  startDate: new Date().toISOString().split('T')[0],
  endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  spent: 0,
  remaining: 0,
  color: '#3B82F6',
  alertThresholds: [75, 90, 100],
  isActive: true,
  isShared: false,
  sharedWith: [],
  rollover: false,
  autoAdjust: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...data,
});

const createMockGoal = (data) => ({
  id: generateUUID(),
  userId: '1',
  title: '',
  type: 'savings',
  targetAmount: 0,
  currentAmount: 0,
  deadline: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  priority: 'medium',
  category: 'Savings',
  color: '#10B981',
  isCompleted: false,
  isShared: false,
  sharedWith: [],
  milestones: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...data,
});

export const useFinanceStore = create(
  persist(
    (set, get) => ({
      transactions: [],
      budgets: [],
      goals: [],
      categories: [],
      accounts: [],
      aiInsights: [],
      notifications: [],
      insights: [],
      isLoading: false,
      error: null,

      addTransaction: async (transactionData) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const transaction = createMockTransaction(transactionData);
          
          set((state) => ({
            transactions: [transaction, ...state.transactions],
            isLoading: false,
          }));
          
          if (transaction.type === 'expense') {
            const { budgets } = get();
            const relevantBudgets = budgets.filter(b => 
              b.categories.includes(transaction.category) && b.isActive
            );
            
            if (relevantBudgets.length > 0) {
              set((state) => ({
                budgets: state.budgets.map(b =>
                  relevantBudgets.some(rb => rb.id === b.id)
                    ? { ...b, spent: b.spent + transaction.amount, remaining: b.amount - (b.spent + transaction.amount) }
                    : b
                ),
              }));
            }
          }
          
          return transaction;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to add transaction' 
          });
          throw error;
        }
      },

      updateTransaction: async (id, updates) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          
          let updatedTransaction = null;
          
          set((state) => ({
            transactions: state.transactions.map(t => {
              if (t.id === id) {
                updatedTransaction = { ...t, ...updates, updatedAt: new Date().toISOString() };
                return updatedTransaction;
              }
              return t;
            }),
            isLoading: false,
          }));
          
          if (!updatedTransaction) {
            throw new Error('Transaction not found');
          }
          
          return updatedTransaction;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to update transaction' 
          });
          throw error;
        }
      },

      deleteTransaction: async (id) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set((state) => ({
            transactions: state.transactions.filter(t => t.id !== id),
            isLoading: false,
          }));
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to delete transaction' 
          });
          throw error;
        }
      },

      addBudget: async (budgetData) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const budget = createMockBudget({
            ...budgetData,
            remaining: budgetData.amount,
          });
          
          set((state) => ({
            budgets: [...state.budgets, budget],
            isLoading: false,
          }));
          
          return budget;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to add budget' 
          });
          throw error;
        }
      },

      addGoal: async (goalData) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const goal = createMockGoal(goalData);
          
          set((state) => ({
            goals: [...state.goals, goal],
            isLoading: false,
          }));
          
          return goal;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to add goal' 
          });
          throw error;
        }
      },

      setError: (error) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'finance-storage',
      partialize: (state) => ({
        transactions: state.transactions,
        budgets: state.budgets,
        goals: state.goals,
        categories: state.categories,
        accounts: state.accounts,
        aiInsights: state.aiInsights,
        notifications: state.notifications,
        insights: state.insights,
      }),
    }
  )
);

// Initialize default categories
const initializeDefaultCategories = () => {
  const store = useFinanceStore.getState();
  
  if (store.categories.length === 0) {
    const defaultCategories = [
      {
        id: '1',
        name: 'Food & Dining',
        type: 'expense',
        color: '#EF4444',
        icon: 'UtensilsCrossed',
        subcategories: ['Restaurants', 'Groceries', 'Fast Food'],
        isDefault: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Transportation',
        type: 'expense',
        color: '#3B82F6',
        icon: 'Car',
        subcategories: ['Gas', 'Public Transit', 'Parking'],
        isDefault: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Salary',
        type: 'income',
        color: '#10B981',
        icon: 'Banknote',
        subcategories: ['Base Salary', 'Bonus', 'Overtime'],
        isDefault: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: '4',
        name: 'Shopping',
        type: 'expense',
        color: '#8B5CF6',
        icon: 'ShoppingBag',
        subcategories: ['Clothing', 'Electronics', 'Home & Garden'],
        isDefault: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: '5',
        name: 'Entertainment',
        type: 'expense',
        color: '#F59E0B',
        icon: 'Film',
        subcategories: ['Movies', 'Streaming', 'Games'],
        isDefault: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: '6',
        name: 'Bills & Utilities',
        type: 'expense',
        color: '#DC2626',
        icon: 'Receipt',
        subcategories: ['Rent', 'Electricity', 'Internet'],
        isDefault: true,
        createdAt: new Date().toISOString(),
      },
    ];
    
    useFinanceStore.setState({ categories: defaultCategories });
  }
};

setTimeout(initializeDefaultCategories, 0);