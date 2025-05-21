'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import DashboardNavbar from '@/components/dashboard/dashboard-navbar';
import AnimatedGradientBackground from '@/components/ui/animated-gradient-background';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';
import { IconUser, IconMail, IconLink, IconMapPin, IconBrandTwitter, IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-react';

export default function EditProfilePage() {
  const router = useRouter();
  const { currentUser, updateUserProfile } = useAuth();

  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Update the user's display name
      if (displayName !== currentUser?.displayName) {
        await updateUserProfile(displayName);
      }

      // Here you would also update the Firestore user profile with the additional fields
      // This would be implemented in a future enhancement

      setSuccess('Profile updated successfully!');

      // Redirect back to profile page after a short delay
      setTimeout(() => {
        router.push('/dashboard/profile');
      }, 1500);
    } catch (err: Error | unknown) {
      console.error('Error updating profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <AnimatedGradientBackground
      colors={["#0ea5e9", "#6366f1", "#8b5cf6", "#d946ef"]}
      className="absolute inset-0"
      containerClassName="min-h-screen"
      blur={150}
      speed={30}
      opacity={0.05}
    >
      <div className="min-h-screen">
        <DashboardNavbar />

        <main className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Edit Profile</h1>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm border border-white/20 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-all duration-200"
                >
                  <span>Cancel</span>
                </Link>
              </motion.div>
            </div>

            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-white/20 dark:border-white/10 p-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg"
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 rounded-lg"
                >
                  {success}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2">Basic Information</h2>

                  <Input
                    label="Display Name"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                    disabled={isLoading}
                    leftIcon={<IconUser size={18} className="text-gray-500" />}
                  />

                  <Input
                    label="Email"
                    type="email"
                    value={currentUser.email || ''}
                    disabled={true}
                    leftIcon={<IconMail size={18} className="text-gray-500" />}
                    helpText="Email cannot be changed"
                  />

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Bio
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      disabled={isLoading}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      rows={4}
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <Input
                    label="Location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    disabled={isLoading}
                    leftIcon={<IconMapPin size={18} className="text-gray-500" />}
                    placeholder="City, Country"
                  />

                  <Input
                    label="Website"
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    disabled={isLoading}
                    leftIcon={<IconLink size={18} className="text-gray-500" />}
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2">Social Links</h2>

                  <Input
                    label="Twitter"
                    type="text"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    disabled={isLoading}
                    leftIcon={<IconBrandTwitter size={18} className="text-gray-500" />}
                    placeholder="@username"
                  />

                  <Input
                    label="LinkedIn"
                    type="text"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    disabled={isLoading}
                    leftIcon={<IconBrandLinkedin size={18} className="text-gray-500" />}
                    placeholder="linkedin.com/in/username"
                  />

                  <Input
                    label="GitHub"
                    type="text"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    disabled={isLoading}
                    leftIcon={<IconBrandGithub size={18} className="text-gray-500" />}
                    placeholder="github.com/username"
                  />
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    type="submit"
                    isLoading={isLoading}
                    className="px-6"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </main>
      </div>
    </AnimatedGradientBackground>
  );
}
