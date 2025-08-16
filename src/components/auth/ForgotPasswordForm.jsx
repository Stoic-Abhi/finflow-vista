import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

export const ForgotPasswordForm = ({ onBackToLogin }) => {
  const [emailSent, setEmailSent] = useState(false);
  const { forgotPassword, isLoading, error } = useAuthStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await forgotPassword(data.email);
      setEmailSent(true);
      toast.success('Reset email sent! 📧', {
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        },
      });
    } catch (error) {
      toast.error('Failed to send reset email');
    }
  };

  if (emailSent) {
    return (
      <div className="w-full max-w-md mx-auto animate-fadeIn text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-scaleIn">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gradient mb-2">Check your email</h1>
          <p className="text-gray-600 text-lg">
            We've sent a password reset link to
          </p>
          <p className="text-gray-900 font-medium text-lg">
            {getValues('email')}
          </p>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg animate-slideIn">
            <h3 className="font-semibold text-blue-900 mb-2">What's next?</h3>
            <ul className="text-sm text-blue-800 space-y-2 text-left">
              <li>• Check your email inbox (and spam folder)</li>
              <li>• Click the reset link in the email</li>
              <li>• Create a new password</li>
              <li>• Sign in with your new password</li>
            </ul>
          </div>

          <div className="space-y-4">
            <Button
              onClick={onBackToLogin}
              className="w-full h-12 button-hover bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Back to sign in
            </Button>
            
            <button
              onClick={() => setEmailSent(false)}
              className="w-full text-sm text-gray-600 hover:text-gray-900 transition-colors button-hover"
            >
              Try a different email address
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto animate-fadeIn">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gradient mb-2">Forgot password?</h1>
        <p className="text-gray-600 text-lg">
          No worries, we'll send you reset instructions
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-slideIn">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="animate-slideIn">
          <Input
            label="Email address"
            type="email"
            placeholder="Enter your email"
            leftIcon={<Mail className="w-4 h-4 text-gray-400" />}
            error={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
        </div>

        <div className="animate-slideIn">
          <Button
            type="submit"
            className="w-full h-12 button-hover bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            loading={isLoading}
            disabled={isLoading}
          >
            Send reset email
          </Button>
        </div>

        <div className="animate-slideIn">
          <button
            type="button"
            onClick={onBackToLogin}
            className="w-full flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors button-hover"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to sign in</span>
          </button>
        </div>
      </form>
    </div>
  );
};