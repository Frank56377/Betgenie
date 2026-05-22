'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Mail, AlertCircle, CheckCircle } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Request failed');
        return;
      }

      setSuccess('Check your email for password reset instructions');
      setEmail('');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-navy to-primary-navy-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🔐</div>
          <h1 className="text-3xl font-bold text-neutral-white mb-2">Forgot Password?</h1>
          <p className="text-neutral-text-secondary">Enter your email to reset your password</p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 p-4 bg-status-error/10 border border-status-error/30 rounded-lg flex items-start gap-3">
            <AlertCircle className="text-status-error flex-shrink-0 mt-0.5" size={20} />
            <p className="text-status-error text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-status-success/10 border border-status-success/30 rounded-lg flex items-start gap-3">
            <CheckCircle className="text-status-success flex-shrink-0 mt-0.5" size={20} />
            <p className="text-status-success text-sm">{success}</p>
          </div>
        )}

        {/* Form Card */}
        <Card className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-neutral-white mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-primary-cyan" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-primary-navy/50 border border-primary-blue/30 rounded-lg pl-10 pr-4 py-3 text-neutral-white placeholder-neutral-text-secondary focus:outline-none focus:border-primary-cyan focus:shadow-glow-sm transition-all"
                  required
                />
              </div>
              <p className="text-xs text-neutral-text-secondary mt-2">
                We'll send you an email with instructions to reset your password
              </p>
            </div>

            {/* Submit Button */}
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-primary-blue/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-primary-navy-dark to-primary-navy text-neutral-text-secondary">
                Remember your password?
              </span>
            </div>
          </div>

          {/* Back to Login */}
          <div className="text-center">
            <Link href="/auth/login" className="text-primary-cyan font-semibold hover:text-primary-cyan/80 transition-colors">
              Back to Sign In
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
