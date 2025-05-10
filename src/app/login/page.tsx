'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AuthCard from '@/components/auth/AuthCard';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Divider from '@/components/ui/Divider';
import SocialLogin from '@/components/auth/SocialLogin';
import { IconMail, IconLock, IconAlertCircle } from '@tabler/icons-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // This is a placeholder for actual Firebase authentication
    // In a real implementation, you would call Firebase Auth here
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo purposes, just show what would happen
      console.log('Login with:', { email, password });

      // Redirect would happen after successful login
      // router.push('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);

    // This is a placeholder for actual Firebase Google authentication
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Google login initiated');

      // Redirect would happen after successful login
      // router.push('/dashboard');
    } catch (err) {
      setError('Google login failed');
      console.error('Google login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('GitHub login initiated');
    } catch (err) {
      setError('GitHub login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard title="Log in to your account" subtitle="Welcome back to PitchHub">
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

      <motion.form
        onSubmit={handleLogin}
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

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          leftIcon={<IconLock size={18} className="text-gray-500" />}
        />

        <motion.div
          className="flex justify-end"
          whileHover={{ scale: 1.01 }}
        >
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Forgot password?
          </Link>
        </motion.div>

        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          className="mt-2"
        >
          Log in
        </Button>
      </motion.form>

      <Divider text="OR" className="my-6" />

      <SocialLogin
        onGoogleLogin={handleGoogleLogin}
        onGithubLogin={handleGithubLogin}
        isLoading={isLoading}
      />

      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link
            href="/signup"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </AuthCard>
  );
}
