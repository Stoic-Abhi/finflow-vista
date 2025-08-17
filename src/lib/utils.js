import { clsx } from 'clsx';

export function cn(...inputs) {
  return clsx(inputs);
}

// Format currency
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

// Format date
export function formatDate(date, format = 'short') {
  const dateObj = new Date(date);
  
  if (format === 'short') {
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
  
  if (format === 'long') {
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  return dateObj.toLocaleDateString();
}

// Generate UUID
export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Validate email
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate password
export function validatePassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const errors = [];
  
  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }
  
  if (!hasUpperCase) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!hasLowerCase) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!hasNumbers) {
    errors.push('Password must contain at least one number');
  }
  
  if (!hasSpecialChar) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Calculate budget progress
export function calculateBudgetProgress(spent, limit) {
  const percentage = (spent / limit) * 100;
  let status = 'good';
  
  if (percentage >= 100) {
    status = 'exceeded';
  } else if (percentage >= 80) {
    status = 'warning';
  }
  
  return {
    percentage: Math.min(percentage, 100),
    remaining: Math.max(limit - spent, 0),
    status
  };
}

// Calculate goal progress
export function calculateGoalProgress(current, target) {
  const percentage = (current / target) * 100;
  
  return {
    percentage: Math.min(percentage, 100),
    remaining: Math.max(target - current, 0),
    isCompleted: current >= target
  };
}

// Get financial health score
export function getFinancialHealthScore(income, expenses, savings, debt) {
  if (income <= 0) return 0;
  
  const savingsRate = (savings / income) * 100;
  const expenseRatio = (expenses / income) * 100;
  const debtRatio = (debt / income) * 100;
  
  let score = 100;
  
  // Deduct points for high expense ratio
  if (expenseRatio > 80) {
    score -= 30;
  } else if (expenseRatio > 60) {
    score -= 15;
  }
  
  // Deduct points for low savings rate
  if (savingsRate < 10) {
    score -= 25;
  } else if (savingsRate < 20) {
    score -= 10;
  }
  
  // Deduct points for high debt ratio
  if (debtRatio > 40) {
    score -= 30;
  } else if (debtRatio > 20) {
    score -= 15;
  }
  
  return Math.max(score, 0);
}

// Calculate financial health score
export function calculateFinancialHealthScore(income, expenses, savings, debt) {
  return getFinancialHealthScore(income, expenses, savings, debt);
}

// Debounce function
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function
export function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Deep clone object
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
}

// Get relative time
export function getRelativeTime(date) {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor((now - targetDate) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
  
  return formatDate(date);
}

// Calculate percentage change
export function calculatePercentageChange(current, previous) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

// Format number with abbreviations
export function formatNumberWithAbbreviation(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Get month name
export function getMonthName(monthIndex) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[monthIndex];
}

// Get days in month
export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// Check if date is today
export function isToday(date) {
  const today = new Date();
  const targetDate = new Date(date);
  
  return today.getDate() === targetDate.getDate() &&
         today.getMonth() === targetDate.getMonth() &&
         today.getFullYear() === targetDate.getFullYear();
}

// Check if date is this week
export function isThisWeek(date) {
  const today = new Date();
  const targetDate = new Date(date);
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
  
  return targetDate >= startOfWeek && targetDate <= endOfWeek;
}

// Check if date is this month
export function isThisMonth(date) {
  const today = new Date();
  const targetDate = new Date(date);
  
  return today.getMonth() === targetDate.getMonth() &&
         today.getFullYear() === targetDate.getFullYear();
}