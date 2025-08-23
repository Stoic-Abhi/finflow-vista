import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { validateEmail, validatePassword } from '../lib/utils';

const mockApi = {
  async login(email, password) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'demo@example.com' && password === 'password123') {
      return {
        user: createMockUser(email, 'Demo User'),
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
      };
    }
    
    throw new Error('Invalid credentials');
  },
  
  async register(userData) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!validateEmail(userData.email)) {
      throw new Error('Invalid email address');
    }
    
    const passwordValidation = validatePassword(userData.password);
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.errors[0]);
    }
    
    return {
      user: createMockUser(userData.email, userData.name),
      token: 'mock-jwt-token',
      refreshToken: 'mock-refresh-token',
    };
  },
  
  async refreshToken(refreshToken) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      token: 'new-mock-jwt-token',
      refreshToken: 'new-mock-refresh-token',
    };
  },
  
  async verifyEmail(token) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
  },
  
  async forgotPassword(email) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
  },
  
  async resetPassword(token, newPassword) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
  },
};

function createMockUser(email, name) {
  return {
    id: '1',
    email,
    name,
    currency: 'USD',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    theme: 'system',
    twoFactorEnabled: false,
    emailVerified: true,
    phoneVerified: false,
    role: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    preferences: {
      notifications: {
        email: true,
        push: true,
        sms: false,
        budgetAlerts: true,
        billReminders: true,
        goalMilestones: true,
        weeklyReports: true,
        monthlyReports: true,
        unusualSpending: true,
      },
      privacy: {
        shareData: false,
        analytics: true,
        profileVisibility: 'private',
      },
      display: {
        dateFormat: 'MM/dd/yyyy',
        numberFormat: 'en-US',
        firstDayOfWeek: 0,
        dashboardLayout: ['balance_overview', 'recent_transactions', 'budget_progress', 'quick_actions'],
      },
    },
  };
}

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await mockApi.login(email, password);

          set({
            user: response.user,
            token: response.token,
            refreshToken: response.refreshToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Login failed' 
          });
          throw error;
        }
      },

      loginWithOAuth: async (provider, token) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          const user = createMockUser(`user@${provider}.com`, `${provider} User`);
          
          set({
            user,
            token: 'mock-oauth-token',
            refreshToken: 'mock-refresh-token',
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'OAuth login failed' 
          });
          throw error;
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await mockApi.register(userData);

          set({
            user: response.user,
            token: response.token,
            refreshToken: response.refreshToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Registration failed' 
          });
          throw error;
        }
      },

      forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
          await mockApi.forgotPassword(email);
          set({ isLoading: false, error: null });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to send reset email' 
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null,
        });
      },

      updateProfile: (updates) => {
        const { user } = get();
        if (user) {
          set({
            user: { ...user, ...updates, updatedAt: new Date().toISOString() },
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);