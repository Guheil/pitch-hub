'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AuthCard from '@/components/auth/AuthCard';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Divider from '@/components/ui/Divider';
import SocialLogin from '@/components/auth/SocialLogin';
import { IconUser, IconMail, IconLock, IconAlertCircle, IconShieldCheck } from '@tabler/icons-react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    // This is a placeholder for actual Firebase authentication
    // In a real implementation, you would call Firebase Auth here
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo purposes, just show what would happen
      console.log('Signup with:', { name, email, password });

      // Redirect would happen after successful signup
      // router.push('/dashboard');
    } catch (err) {
      setError('Failed to create account');
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    setIsLoading(true);

    // This is a placeholder for actual Firebase Google authentication
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Google signup initiated');

      // Redirect would happen after successful signup
      // router.push('/dashboard');
    } catch (err) {
      setError('Google signup failed');
      console.error('Google signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubSignup = async () => {
    setError('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('GitHub signup initiated');
    } catch {
      setError('GitHub signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard title="Create your account" subtitle="Join PitchHub today">
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
        onSubmit={handleSignup}
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading}
          leftIcon={<IconUser size={18} className="text-gray-500" />}
        />

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

        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={isLoading}
          leftIcon={<IconShieldCheck size={18} className="text-gray-500" />}
        />

        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          className="mt-2"
        >
          Create Account
        </Button>
      </motion.form>

      <Divider text="OR" className="my-6" />

      <SocialLogin
        onGoogleLogin={handleGoogleSignup}
        onGithubLogin={handleGithubSignup}
        isLoading={isLoading}
      />

      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Log in
          </Link>
        </p>
      </motion.div>

      <motion.div
        className="mt-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p className="text-xs text-gray-500 dark:text-gray-500">
          By signing up, you agree to our{' '}
          <Link href="/terms" className="underline">Terms of Service</Link>
          {' '}and{' '}
          <Link href="/privacy" className="underline">Privacy Policy</Link>
        </p>
      </motion.div>
    </AuthCard>
  );
}
