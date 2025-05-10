import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedGradientBackground from '../ui/animated-gradient-background';
import Spotlight from '../ui/spotlight';
import { IconBrandItch } from '@tabler/icons-react';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthCard: React.FC<AuthCardProps> = ({ children, title, subtitle }) => {
  return (
    <AnimatedGradientBackground
      colors={['#0ea5e9', '#6366f1', '#8b5cf6', '#d946ef']}
      className="absolute inset-0"
      containerClassName="min-h-screen"
      blur={150}
      speed={30}
      opacity={0.15}
    >
      <Spotlight className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link href="/" className="inline-flex items-center gap-2">
              <IconBrandItch size={32} className="text-foreground" />
              <h1 className="text-3xl font-bold">PitchHub</h1>
            </Link>
            {subtitle && (
              <motion.p
                className="text-gray-600 dark:text-gray-400 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {subtitle}
              </motion.p>
            )}
          </motion.div>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">{title}</CardTitle>
              {subtitle && <CardDescription className="text-center">{subtitle}</CardDescription>}
            </CardHeader>
            <CardContent>
              {children}
            </CardContent>
          </Card>

          <motion.div
            className="text-center mt-6 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            &copy; {new Date().getFullYear()} PitchHub. All rights reserved.
          </motion.div>
        </div>
      </Spotlight>
    </AnimatedGradientBackground>
  );
};

export default AuthCard;
