'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AuthCard from '@/components/auth/AuthCard';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { IconMail, IconAlertCircle, IconCheck, IconArrowLeft } from '@tabler/icons-react';
import { useAuth } from '@/contexts/AuthContext';

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsLoading(true);

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err: unknown) {
      console.error('Password reset error:', err);

      // Handle different Firebase error codes
      if (err && typeof err === 'object' && 'code' in err) {
        const firebaseError = err as { code: string; message?: string };
        if (firebaseError.code === 'auth/user-not-found') {
          setError('No account found with this email address');
        } else if (firebaseError.code === 'auth/invalid-email') {
          setError('Invalid email address');
        } else if (firebaseError.code === 'auth/missing-email') {
          setError('Please enter your email address');
        } else {
          setError(firebaseError.message || 'Failed to send password reset email');
        }
      } else {
        setError('Failed to send password reset email');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard title="Reset your password" subtitle="We'll send you a link to reset your password">
      {error && (
        <motion.div
          className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg text-sm flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <IconAlertCircle size={16} className="flex-shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}

      {success ? (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 rounded-lg flex items-start gap-3"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <IconCheck size={20} className="flex-shrink-0 mt-0.5" />
            <p>
              Check your email for a link to reset your password. If it doesn&apos;t appear within a few minutes, check your spam folder.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              <IconArrowLeft size={16} />
              Return to login
            </Link>
          </motion.div>
        </motion.div>
      ) : (
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            leftIcon={<IconMail size={18} className="text-gray-500" />}
          />

          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            className="mt-2"
          >
            Send Reset Link
          </Button>

          <motion.div
            className="text-center mt-4"
            whileHover={{ scale: 1.01 }}
          >
            <Link
              href="/login"
              className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              <IconArrowLeft size={14} />
              Back to login
            </Link>
          </motion.div>
        </motion.form>
      )}
    </AuthCard>
  );
}
