"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import ToggleSwitch from "@/components/ui/toggle-switch";
import RadioButton from "@/components/ui/radio-button";
import { useTheme } from "@/components/theme/theme-provider";
import {
  IconMoon,
  IconSun,
  IconDeviceDesktop,
  IconBell,
  IconMail,
  IconLock,
  IconUser,
  IconShield,
  IconTrash,
  IconCheck,
} from "@tabler/icons-react";





export default function SettingsPage() {
  // Theme settings from provider
  const { theme: currentTheme, setTheme } = useTheme();

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [appNotifications, setAppNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  // Account settings
  const [email, setEmail] = useState("user@example.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Privacy settings
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [activityTracking, setActivityTracking] = useState(true);

  // Form submission states
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);

  // Handle password change
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);

    // Basic validation
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setPasswordSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 1000);
  };

  // Handle email change
  const handleEmailChange = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate API call
    setTimeout(() => {
      setEmailSuccess(true);
    }, 1000);
  };

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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-8"
          >
            Settings
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Sidebar - Navigation */}
            <div className="md:col-span-1">
              <Card className="sticky top-24 bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5">
                <nav className="space-y-1">
                  <a href="#theme" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-white/50 dark:hover:bg-black/30">
                    <IconSun size={18} className="mr-3 text-gray-500" />
                    Theme
                  </a>
                  <a href="#notifications" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-white/50 dark:hover:bg-black/30">
                    <IconBell size={18} className="mr-3 text-gray-500" />
                    Notifications
                  </a>
                  <a href="#account" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-white/50 dark:hover:bg-black/30">
                    <IconUser size={18} className="mr-3 text-gray-500" />
                    Account
                  </a>
                  <a href="#privacy" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-white/50 dark:hover:bg-black/30">
                    <IconShield size={18} className="mr-3 text-gray-500" />
                    Privacy
                  </a>
                </nav>
              </Card>
            </div>

            {/* Right Content - Settings */}
            <div className="md:col-span-2 space-y-8">
              {/* Theme Settings */}
              <section id="theme">
                <Card className="bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5">
                  <h2 className="text-xl font-bold mb-4">Theme Settings</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <RadioButton
                        id="theme-system"
                        name="theme"
                        value="system"
                        checked={currentTheme === "system"}
                        onChange={(value) => setTheme(value as "system" | "light" | "dark")}
                        label="System Default"
                        icon={<IconDeviceDesktop size={18} />}
                      />
                      <RadioButton
                        id="theme-light"
                        name="theme"
                        value="light"
                        checked={currentTheme === "light"}
                        onChange={(value) => setTheme(value as "system" | "light" | "dark")}
                        label="Light Mode (High Contrast)"
                        description="Optimized for better readability with dark text on light backgrounds"
                        icon={<IconSun size={18} className="text-black" />}
                      />
                      <RadioButton
                        id="theme-dark"
                        name="theme"
                        value="dark"
                        checked={currentTheme === "dark"}
                        onChange={(value) => setTheme(value as "system" | "light" | "dark")}
                        label="Dark Mode"
                        icon={<IconMoon size={18} />}
                      />
                    </div>
                  </div>
                </Card>
              </section>

              {/* Notification Settings */}
              <section id="notifications">
                <Card className="bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5">
                  <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
                  <div className="space-y-2 divide-y divide-gray-200 dark:divide-gray-700">
                    <ToggleSwitch
                      enabled={appNotifications}
                      onChange={setAppNotifications}
                      label="In-app Notifications"
                      description="Receive notifications within the application"
                    />
                    <ToggleSwitch
                      enabled={emailNotifications}
                      onChange={setEmailNotifications}
                      label="Email Notifications"
                      description="Receive email notifications for important updates"
                    />
                    <ToggleSwitch
                      enabled={marketingEmails}
                      onChange={setMarketingEmails}
                      label="Marketing Emails"
                      description="Receive promotional emails and newsletters"
                    />
                  </div>
                </Card>
              </section>

              {/* Account Settings */}
              <section id="account">
                <Card className="bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5">
                  <h2 className="text-xl font-bold mb-4">Account Settings</h2>

                  {/* Email Settings */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Email Address</h3>
                    <form onSubmit={handleEmailChange} className="space-y-4">
                      <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        leftIcon={<IconMail size={18} />}
                      />

                      {emailSuccess && (
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
                          <IconCheck size={16} />
                          <span>Email updated successfully</span>
                        </div>
                      )}

                      <Button type="submit" variant="primary" size="sm">
                        Update Email
                      </Button>
                    </form>
                  </div>

                  {/* Password Settings */}
                  <div>
                    <h3 className="text-lg font-medium mb-3">Change Password</h3>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <Input
                        label="Current Password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        leftIcon={<IconLock size={18} />}
                      />

                      <Input
                        label="New Password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        leftIcon={<IconLock size={18} />}
                      />

                      <Input
                        label="Confirm New Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        leftIcon={<IconLock size={18} />}
                        error={passwordError}
                      />

                      {passwordSuccess && (
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
                          <IconCheck size={16} />
                          <span>Password updated successfully</span>
                        </div>
                      )}

                      <Button type="submit" variant="primary" size="sm">
                        Update Password
                      </Button>
                    </form>
                  </div>
                </Card>
              </section>

              {/* Privacy Settings */}
              <section id="privacy">
                <Card className="bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5">
                  <h2 className="text-xl font-bold mb-4">Privacy Settings</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Profile Visibility</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <RadioButton
                          id="visibility-public"
                          name="visibility"
                          value="public"
                          checked={profileVisibility === "public"}
                          onChange={setProfileVisibility}
                          label="Public - Anyone can view your profile"
                        />
                        <RadioButton
                          id="visibility-private"
                          name="visibility"
                          value="private"
                          checked={profileVisibility === "private"}
                          onChange={setProfileVisibility}
                          label="Private - Only you can view your profile"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 divide-y divide-gray-200 dark:divide-gray-700">
                      <ToggleSwitch
                        enabled={activityTracking}
                        onChange={setActivityTracking}
                        label="Activity Tracking"
                        description="Allow us to collect usage data to improve your experience"
                      />
                    </div>

                    <div className="pt-4">
                      <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">Danger Zone</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                        leftIcon={<IconTrash size={16} />}
                      >
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </Card>
              </section>
            </div>
          </div>
        </main>
      </div>
    </AnimatedGradientBackground>
  );
}
