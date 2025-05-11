"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  IconMail,
  IconMapPin,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconCheck,
  IconAlertCircle,
} from "@tabler/icons-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formState.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormStatus("submitting");

    // Simulate API call
    setTimeout(() => {
      // Simulate successful submission
      setFormStatus("success");
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    }, 1500);
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
        <Navbar />

        <main className="pt-28 pb-12 px-4"> {/* Added more top padding to account for fixed navbar */}
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Get in Touch
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Have questions about FoundersFrame? We&apos;d love to hear from you and help you on your entrepreneurial journey.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="p-8 bg-white/50 dark:bg-black/20 backdrop-blur-lg border border-white/20">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

                  {formStatus === "success" ? (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-800/30 flex items-center justify-center">
                          <IconCheck size={32} className="text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-green-800 dark:text-green-400 mb-2">Message Sent!</h3>
                      <p className="text-green-700 dark:text-green-300">
                        Thank you for reaching out. We&apos;ll get back to you as soon as possible.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-black/20 border ${
                              errors.name ? "border-red-500" : "border-white/20"
                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                          {errors.name && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Your Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-black/20 border ${
                              errors.email ? "border-red-500" : "border-white/20"
                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      <div className="mb-6">
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                          Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formState.subject}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-black/20 border ${
                            errors.subject ? "border-red-500" : "border-white/20"
                          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        >
                          <option value="">Select a subject</option>
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Technical Support">Technical Support</option>
                          <option value="Partnership Opportunity">Partnership Opportunity</option>
                          <option value="Feedback">Feedback</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.subject && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>
                        )}
                      </div>

                      <div className="mb-6">
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={formState.message}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-black/20 border ${
                            errors.message ? "border-red-500" : "border-white/20"
                          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        ></textarea>
                        {errors.message && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                        isLoading={formStatus === "submitting"}
                      >
                        Send Message
                      </Button>

                      {formStatus === "error" && (
                        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-700 dark:text-red-400">
                          <IconAlertCircle size={20} />
                          <span>There was an error sending your message. Please try again.</span>
                        </div>
                      )}
                    </form>
                  )}
                </Card>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col gap-8"
              >
                <Card className="p-8 bg-white/50 dark:bg-black/20 backdrop-blur-lg border border-white/20">
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                        <IconMail size={20} className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Email</h3>
                        <p className="text-gray-600 dark:text-gray-400">hello@foundersframe.com</p>
                        <p className="text-gray-600 dark:text-gray-400">support@foundersframe.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                        <IconMapPin size={20} className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Office</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          123 Innovation Way<br />
                          San Francisco, CA 94107<br />
                          United States
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Connect With Us</h3>
                      <div className="flex gap-4">
                        <Link href="https://twitter.com/foundersframe" target="_blank" rel="noopener noreferrer">
                          <Button
                            variant="outline"
                            size="icon"
                            className="!rounded-full !aspect-square bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 hover:bg-blue-500/20"
                          >
                            <IconBrandTwitter size={20} className="text-blue-500" />
                          </Button>
                        </Link>
                        <Link href="https://linkedin.com/company/foundersframe" target="_blank" rel="noopener noreferrer">
                          <Button
                            variant="outline"
                            size="icon"
                            className="!rounded-full !aspect-square bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 hover:bg-blue-700/20"
                          >
                            <IconBrandLinkedin size={20} className="text-blue-700" />
                          </Button>
                        </Link>
                        <Link href="https://instagram.com/foundersframe" target="_blank" rel="noopener noreferrer">
                          <Button
                            variant="outline"
                            size="icon"
                            className="!rounded-full !aspect-square bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 hover:bg-pink-500/20"
                          >
                            <IconBrandInstagram size={20} className="text-pink-500" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 bg-white/50 dark:bg-black/20 backdrop-blur-lg border border-white/20">
                  <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">How quickly will you respond to my inquiry?</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        We aim to respond to all inquiries within 24-48 hours during business days.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">I&apos;m having technical issues with the platform. What should I do?</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Please contact our support team at support@foundersframe.com with details about the issue you&apos;re experiencing, including screenshots if possible.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Do you offer partnership opportunities?</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Yes, we&apos;re open to partnerships that align with our mission. Please select &quot;Partnership Opportunity&quot; in the contact form and provide details about your proposal.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link href="/faq">
                      <Button variant="outline" className="w-full">
                        View All FAQs
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AnimatedGradientBackground>
  );
}
