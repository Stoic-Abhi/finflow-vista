import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthPage } from './components/auth/AuthPage';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { Budgets } from './pages/Budgets';
import { Reports } from './pages/Reports';
import { Goals } from './pages/Goals';
import { Settings } from './pages/Settings';
import { AIInsights } from './components/ai/AIInsights';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { useAuthStore } from './store/authStore';
import { useFinanceStore } from './store/financeStore';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated, user } = useAuthStore();
  const { transactions, budgets, goals } = useFinanceStore();

  useEffect(() => {
    // Add fade-in animation to the app
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.5s ease-in';
      document.body.style.opacity = '1';
    }, 100);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fffff0 0%, #fefefe 100%)' }}>
        <div className="animate-fadeIn">
          <AuthPage />
        </div>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            },
          }}
        />
      </div>
    );
  }

  const renderContent = () => {
    const contentProps = {
      transactions,
      budgets,
      goals,
      user
    };

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard {...contentProps} />;
      case 'transactions':
        return <Transactions {...contentProps} />;
      case 'budgets':
        return <Budgets {...contentProps} />;
      case 'reports':
        return <Reports {...contentProps} />;
      case 'goals':
        return <Goals {...contentProps} />;
      case 'ai-insights':
        return <AIInsights {...contentProps} />;
      case 'settings':
        return <Settings {...contentProps} />;
      default:
        return <Dashboard {...contentProps} />;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fffff0 0%, #fefefe 100%)' }}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header setIsSidebarOpen={setIsSidebarOpen} />
          
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto animate-fadeIn">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
      
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          },
        }}
      />
    </div>
  );
}

export default App;