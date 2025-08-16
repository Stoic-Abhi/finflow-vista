import React, { useState } from 'react';
import { PiggyBank, Shield, TrendingUp, Users, Smartphone, Sparkles } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';

export const AuthPage = () => {
  const [mode, setMode] = useState('login');

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fffff0 0%, #fefefe 100%)' }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse-custom"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-bounce-custom"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-green-200 rounded-full opacity-20 animate-pulse-custom"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-yellow-200 rounded-full opacity-20 animate-bounce-custom"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 animate-slideIn">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <PiggyBank className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gradient">FinanceTracker</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8 animate-slideIn">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors button-hover">Features</a>
            <a href="#security" className="text-gray-600 hover:text-gray-900 transition-colors button-hover">Security</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors button-hover">Pricing</a>
          </nav>
        </div>
      </header>

      <div className="flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Branding */}
          <div className="hidden lg:block animate-fadeIn">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl flex items-center justify-center mr-6 shadow-2xl animate-pulse-custom">
                  <PiggyBank className="w-12 h-12 text-white" />
                </div>
                <div className="text-left">
                  <h1 className="text-5xl font-bold text-gradient mb-2">FinanceTracker</h1>
                  <p className="text-xl text-gray-600">Smart financial management for everyone</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-6xl font-bold text-gray-900 leading-tight animate-slideIn">
                  Take control of your
                  <span className="text-gradient block"> financial future</span>
                </h2>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg animate-slideIn">
                  Track expenses, manage budgets, set goals, and get AI-powered insights with our comprehensive finance management platform trusted by thousands.
                </p>
                
                <div className="space-y-6 pt-8">
                  <div className="flex items-center space-x-4 animate-slideIn card-hover p-4 rounded-xl glass-effect">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                      <TrendingUp className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">Smart Budgeting & Analytics</h3>
                      <p className="text-gray-600">AI-powered insights and beautiful visualizations</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 animate-slideIn card-hover p-4 rounded-xl glass-effect">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Shield className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">Bank-Level Security</h3>
                      <p className="text-gray-600">256-bit encryption and multi-factor authentication</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 animate-slideIn card-hover p-4 rounded-xl glass-effect">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">Family Sharing</h3>
                      <p className="text-gray-600">Collaborate on budgets and goals with family members</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 animate-slideIn card-hover p-4 rounded-xl glass-effect">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Smartphone className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">Mobile & Desktop</h3>
                      <p className="text-gray-600">Access your finances anywhere, anytime</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-8 animate-fadeIn">
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-custom"></div>
                      <span>10,000+ active users</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse-custom"></div>
                      <span>99.9% uptime</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse-custom"></div>
                      <span>SOC 2 compliant</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Auth forms */}
          <div className="w-full animate-scaleIn">
            <div className="glass-effect rounded-3xl shadow-2xl border border-white/20 p-8 lg:p-12 card-hover">
              {/* Mobile branding */}
              <div className="lg:hidden text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl flex items-center justify-center mr-4 shadow-lg animate-pulse-custom">
                    <PiggyBank className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gradient">FinanceTracker</h1>
                    <p className="text-gray-600">Smart financial management</p>
                  </div>
                </div>
              </div>

              {mode === 'login' && (
                <LoginForm
                  onSwitchToRegister={() => setMode('register')}
                  onForgotPassword={() => setMode('forgot')}
                />
              )}
              
              {mode === 'register' && (
                <RegisterForm
                  onSwitchToLogin={() => setMode('login')}
                />
              )}
              
              {mode === 'forgot' && (
                <ForgotPasswordForm
                  onBackToLogin={() => setMode('login')}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-16 px-6 py-8 border-t border-gray-200 glass-effect">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="animate-slideIn">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <PiggyBank className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-gradient text-lg">FinanceTracker</span>
              </div>
              <p className="text-gray-600 text-sm">
                The most comprehensive personal finance management platform.
              </p>
            </div>
            
            <div className="animate-slideIn">
              <h3 className="font-semibold text-gray-900 mb-3">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors button-hover">Features</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors button-hover">Pricing</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors button-hover">API</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors button-hover">Mobile App</a></li>
              </ul>
            </div>
            
            <div className="animate-slideIn">
              <h3 className="font-semibold text-gray-900 mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors button-hover">About</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors button-hover">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors button-hover">Careers</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors button-hover">Contact</a></li>
              </ul>
            </div>
            
            <div className="animate-slideIn">
              <h3 className="font-semibold text-gray-900 mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors button-hover">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors button-hover">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors button-hover">Terms of Service</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors button-hover">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center animate-fadeIn">
            <p className="text-gray-600 text-sm">
              © 2025 FinanceTracker. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse-custom" />
                <span className="text-sm text-gray-600">Made with love</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};