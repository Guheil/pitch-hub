"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import LegalPageLayout from "@/components/legal/legal-page-layout";
import { IconChevronDown } from "@tabler/icons-react";

// FAQ Item component
const FAQItem: React.FC<{
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  toggleOpen: () => void;
  index: number;
}> = ({ question, answer, isOpen, toggleOpen, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="border-b border-gray-200 dark:border-gray-800 last:border-b-0"
    >
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full py-5 text-left font-medium text-gray-900 dark:text-white"
      >
        <span>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <IconChevronDown size={20} />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
          marginBottom: isOpen ? 16 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pb-5 text-gray-600 dark:text-gray-400">{answer}</div>
      </motion.div>
    </motion.div>
  );
};

export default function FAQPage() {
  // State to track which FAQ items are open
  const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({
    0: true, // First item open by default
  });

  // Toggle function for FAQ items
  const toggleItem = (index: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // FAQ data
  const faqItems = [
    {
      question: "What is FoundersFrame?",
      answer: (
        <p>
          FoundersFrame is a platform where entrepreneurs can submit their startup ideas with pitch videos, and connect with potential investors, mentors, and collaborators. Our mission is to democratize entrepreneurship by providing a space where innovative ideas can be shared, refined, and brought to life.
        </p>
      ),
    },
    {
      question: "How do I submit my startup pitch?",
      answer: (
        <div>
          <p>
            To submit your startup pitch, follow these steps:
          </p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>Create an account or log in to your existing account</li>
            <li>Navigate to the &quot;Submit Pitch&quot; page from your dashboard</li>
            <li>Fill out the pitch submission form with details about your startup idea</li>
            <li>Upload supporting media such as images and videos</li>
            <li>Review your submission and click &quot;Submit&quot;</li>
          </ol>
          <p className="mt-2">
            Our team will review your submission, and once approved, it will be visible on the platform.
          </p>
        </div>
      ),
    },
    {
      question: "Is my pitch information secure?",
      answer: (
        <p>
          Yes, we take the security of your pitch information seriously. While your pitch will be visible to the FoundersFrame community, we have measures in place to protect your intellectual property. You control what information you share, and we recommend not sharing sensitive proprietary details that you&apos;re not comfortable making public. For additional protection, consider consulting with a legal professional about intellectual property protection before submitting your pitch.
        </p>
      ),
    },
    {
      question: "How can I connect with investors through FoundersFrame?",
      answer: (
        <p>
          FoundersFrame facilitates connections between entrepreneurs and investors through our platform. Investors can discover your pitch through our explore page, search functionality, and recommendation system. If an investor is interested in your idea, they can reach out to you through our messaging system. We also host virtual and in-person networking events where you can connect with potential investors directly.
        </p>
      ),
    },
    {
      question: "Can I update my pitch after submitting it?",
      answer: (
        <p>
          Yes, you can update your pitch after submission. Simply navigate to your dashboard, find the pitch you want to update, and click the &quot;Edit&quot; button. You can modify the content, add new information, or update your media. Each update will be timestamped, allowing viewers to see how your idea has evolved over time.
        </p>
      ),
    },
    {
      question: "Is FoundersFrame free to use?",
      answer: (
        <div>
          <p>
            FoundersFrame offers both free and premium options:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Free Tier:</strong> Submit basic pitches, browse other submissions, and participate in the community.</li>
            <li><strong>Premium Tier:</strong> Access advanced features such as detailed analytics, priority placement in search results, access to exclusive investor events, and enhanced pitch customization options.</li>
          </ul>
          <p className="mt-2">
            Our goal is to make entrepreneurship accessible to everyone, which is why we offer a robust free tier that provides value to all users.
          </p>
        </div>
      ),
    },
    {
      question: "How can I get feedback on my pitch?",
      answer: (
        <p>
          There are several ways to get feedback on your pitch through FoundersFrame. Community members can leave comments on your pitch, providing insights and suggestions. You can also join our mentor program, where experienced entrepreneurs and industry experts provide structured feedback. Additionally, we host regular pitch practice sessions where you can present your idea and receive real-time feedback from peers and mentors.
        </p>
      ),
    },
    {
      question: "What types of startups are suitable for FoundersFrame?",
      answer: (
        <p>
          FoundersFrame welcomes startups from all industries and at all stages of development. Whether you have a tech startup, a sustainable product, a service-based business, or a social enterprise, our platform is designed to showcase diverse ideas. From concept-stage ideas to startups with early traction, FoundersFrame provides a space for entrepreneurs at various points in their journey.
        </p>
      ),
    },
  ];

  return (
    <LegalPageLayout
      title="Frequently Asked Questions"
      description="Find answers to common questions about FoundersFrame and how our platform works."
    >
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={!!openItems[index]}
            toggleOpen={() => toggleItem(index)}
            index={index}
          />
        ))}
      </div>
    </LegalPageLayout>
  );
}
