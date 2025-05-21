'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import AuthCard from '@/components/auth/AuthCard';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Divider from '@/components/ui/Divider';
import SocialLogin from '@/components/auth/SocialLogin';
import { IconMail, IconLock, IconAlertCircle } from '@tabler/icons-react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, googleSignIn, currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if user is already logged in
  useEffect(() => {
    if (currentUser) {
      const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/dashboard';
      sessionStorage.removeItem('redirectAfterLogin');
      router.push(redirectPath);
    }
  }, [currentUser, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      // Redirect is handled by the useEffect hook that watches currentUser
    } catch (err: unknown) {
      console.error('Login error:', err);
      // Handle different Firebase error codes
      if (err && typeof err === 'object' && 'code' in err) {
        const firebaseError = err as { code: string; message?: string };
        if (firebaseError.code === 'auth/invalid-credential' ||
            firebaseError.code === 'auth/user-not-found' ||
            firebaseError.code === 'auth/wrong-password') {
          setError('Invalid email or password');
        } else if (firebaseError.code === 'auth/too-many-requests') {
          setError('Too many failed login attempts. Please try again later or reset your password.');
        } else {
          setError(firebaseError.message || 'Failed to log in');
        }
      } else {
        setError('Failed to log in');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      await googleSignIn();
      // Redirect is handled by the useEffect hook that watches currentUser
    } catch (err: unknown) {
      console.error('Google login error:', err);
      if (err && typeof err === 'object' && 'code' in err) {
        const firebaseError = err as { code: string; message?: string };
        if (firebaseError.code === 'auth/popup-closed-by-user') {
          setError('Login canceled. Please try again.');
        } else {
          setError(firebaseError.message || 'Google login failed');
        }
      } else {
        setError('Google login failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // We're not implementing GitHub login for now
  const handleGithubLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      // This is just a placeholder - we'll implement GitHub auth later
      await new Promise(resolve => setTimeout(resolve, 1000));
      setError('GitHub login is not implemented yet');
    } catch {
      setError('GitHub login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard title="Log in to your account" subtitle="Welcome back to FoundersFrame">
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
          Don&apos;t have an account?{' '}
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
