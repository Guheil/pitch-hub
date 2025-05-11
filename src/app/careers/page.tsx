"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { IconBriefcase, IconMapPin, IconClock, IconFilter, IconSearch } from "@tabler/icons-react";

// Mock job listings data
const JOB_LISTINGS = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA (Remote Option)",
    type: "Full-time",
    description: "We're looking for a Senior Frontend Developer to help build and improve our platform's user interface. You'll work closely with our design and backend teams to create intuitive, responsive, and accessible user experiences.",
    requirements: [
      "5+ years of experience with modern JavaScript frameworks (React, Next.js)",
      "Strong understanding of HTML, CSS, and responsive design principles",
      "Experience with TypeScript and state management libraries",
      "Knowledge of web accessibility standards and best practices",
      "Ability to optimize web applications for maximum speed and scalability",
    ],
    responsibilities: [
      "Develop new user-facing features using React.js and Next.js",
      "Build reusable components and libraries for future use",
      "Translate designs and wireframes into high-quality code",
      "Optimize components for maximum performance across devices and browsers",
      "Collaborate with cross-functional teams to define, design, and ship new features",
    ],
  },
  {
    id: "2",
    title: "Backend Engineer",
    department: "Engineering",
    location: "San Francisco, CA (Remote Option)",
    type: "Full-time",
    description: "We're seeking a Backend Engineer to help design, build, and maintain our server infrastructure and APIs. You'll work on creating scalable and secure systems that power our platform.",
    requirements: [
      "3+ years of experience with backend development",
      "Proficiency in Node.js and Express.js",
      "Experience with database design and ORM libraries",
      "Knowledge of RESTful APIs and GraphQL",
      "Understanding of server security and performance optimization",
    ],
    responsibilities: [
      "Design and implement server-side architecture",
      "Build efficient and reusable backend services and APIs",
      "Optimize applications for scalability and performance",
      "Implement security and data protection measures",
      "Collaborate with frontend developers to integrate user-facing elements",
    ],
  },
  {
    id: "3",
    title: "Product Designer",
    department: "Design",
    location: "San Francisco, CA (Remote Option)",
    type: "Full-time",
    description: "We're looking for a Product Designer to help create beautiful, intuitive interfaces for our platform. You'll work closely with product managers and engineers to design user experiences that are both functional and delightful.",
    requirements: [
      "3+ years of experience in product design",
      "Proficiency in design tools such as Figma or Sketch",
      "Strong portfolio demonstrating UI/UX design skills",
      "Experience with design systems and component libraries",
      "Understanding of user research and testing methodologies",
    ],
    responsibilities: [
      "Create wireframes, prototypes, and high-fidelity designs",
      "Develop and maintain our design system",
      "Conduct user research and usability testing",
      "Collaborate with engineers to ensure design implementation quality",
      "Continuously iterate on designs based on user feedback and data",
    ],
  },
  {
    id: "4",
    title: "Content Marketing Specialist",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description: "We're seeking a Content Marketing Specialist to create compelling content that educates and engages our audience of entrepreneurs and startup founders. You'll help build our brand voice and establish FoundersFrame as a thought leader in the startup ecosystem.",
    requirements: [
      "2+ years of experience in content marketing or related field",
      "Excellent writing and editing skills",
      "Understanding of SEO principles and content strategy",
      "Experience creating content for different channels and formats",
      "Knowledge of the startup ecosystem and entrepreneurship",
    ],
    responsibilities: [
      "Create blog posts, guides, case studies, and other content",
      "Develop and execute our content calendar",
      "Optimize content for search engines and user engagement",
      "Collaborate with design team on visual content",
      "Analyze content performance and iterate based on data",
    ],
  },
  {
    id: "5",
    title: "Community Manager",
    department: "Operations",
    location: "Remote",
    type: "Full-time",
    description: "We're looking for a Community Manager to build and nurture our community of entrepreneurs, investors, and mentors. You'll be responsible for creating a vibrant, supportive environment where members can connect, learn, and grow.",
    requirements: [
      "2+ years of experience in community management or related role",
      "Excellent communication and interpersonal skills",
      "Experience with community platforms and social media management",
      "Understanding of event planning and execution",
      "Passion for entrepreneurship and startups",
    ],
    responsibilities: [
      "Develop and implement community engagement strategies",
      "Moderate discussions and ensure community guidelines are followed",
      "Plan and execute virtual and in-person events",
      "Collect and analyze community feedback",
      "Collaborate with marketing team on community-focused content",
    ],
  },
];

// All departments and job types for filtering
const ALL_DEPARTMENTS = Array.from(
  new Set(JOB_LISTINGS.map(job => job.department))
).sort();

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Filter jobs based on search query and selected filters
  const filteredJobs = JOB_LISTINGS.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === "" || job.department === selectedDepartment;
    const matchesType = selectedType === "" || job.type === selectedType;
    return matchesSearch && matchesDepartment && matchesType;
  });

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
                Join Our Team
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
                Help us build the future of entrepreneurship and empower the next generation of founders.
              </p>
              <div className="relative w-full max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search for jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 rounded-full bg-white/50 dark:bg-black/20 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <IconSearch size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <IconFilter size={20} className="text-gray-500" />
                </button>
              </div>
            </motion.div>

            {/* Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <div className="bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-2">Department</label>
                      <select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-black/20 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">All Departments</option>
                        {ALL_DEPARTMENTS.map((dept) => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-2">Job Type</label>
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-black/20 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">All Types</option>
                        {JOB_TYPES.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-end">
                      <Button
                        onClick={() => {
                          setSelectedDepartment("");
                          setSelectedType("");
                          setSearchQuery("");
                        }}
                        variant="outline"
                        className="w-full md:w-auto"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Job Listings */}
            <div className="space-y-6">
              {filteredJobs.map((job, index) => (
                <JobCard key={job.id} job={job} index={index} />
              ))}
            </div>

            {/* No Results */}
            {filteredJobs.length === 0 && (
              <Card className="p-12 text-center bg-white/50 dark:bg-black/20 backdrop-blur-lg">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200/50 dark:bg-gray-800/50 flex items-center justify-center">
                    <IconBriefcase size={24} className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-xl font-medium">No jobs found</h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md">
                    We couldn&apos;t find any jobs matching your search criteria. Try adjusting your filters or search terms.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedDepartment("");
                      setSelectedType("");
                    }}
                    variant="outline"
                    className="mt-2"
                  >
                    Clear Filters
                  </Button>
                </div>
              </Card>
            )}

            {/* Company Culture Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-24"
            >
              <h2 className="text-3xl font-bold mb-12 text-center">Life at FoundersFrame</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                    alt="Team collaboration"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">Collaborative Environment</h3>
                    <p className="text-white/80">Work with talented individuals who are passionate about innovation.</p>
                  </div>
                </div>
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
                    alt="Remote work"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">Flexible Work</h3>
                    <p className="text-white/80">Remote-friendly culture with focus on work-life balance.</p>
                  </div>
                </div>
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                    alt="Growth opportunities"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">Growth & Learning</h3>
                    <p className="text-white/80">Continuous opportunities to develop your skills and advance your career.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Benefits Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-24 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-xl p-8 border border-white/20"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Benefits & Perks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-white/20 dark:bg-black/20 rounded-xl border border-white/10">
                  <h3 className="text-xl font-bold mb-3">Health & Wellness</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>Comprehensive health insurance</li>
                    <li>Mental health support</li>
                    <li>Wellness stipend</li>
                    <li>Flexible time off</li>
                  </ul>
                </div>
                <div className="p-6 bg-white/20 dark:bg-black/20 rounded-xl border border-white/10">
                  <h3 className="text-xl font-bold mb-3">Financial Benefits</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>Competitive salary</li>
                    <li>Equity options</li>
                    <li>401(k) matching</li>
                    <li>Professional development budget</li>
                  </ul>
                </div>
                <div className="p-6 bg-white/20 dark:bg-black/20 rounded-xl border border-white/10">
                  <h3 className="text-xl font-bold mb-3">Remote Work</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>Flexible work arrangements</li>
                    <li>Home office stipend</li>
                    <li>Co-working space allowance</li>
                    <li>Team retreats</li>
                  </ul>
                </div>
                <div className="p-6 bg-white/20 dark:bg-black/20 rounded-xl border border-white/10">
                  <h3 className="text-xl font-bold mb-3">Work-Life Balance</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>Flexible working hours</li>
                    <li>Paid parental leave</li>
                    <li>Sabbatical program</li>
                    <li>Company-wide wellness days</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </AnimatedGradientBackground>
  );
}

// Job Card Component
function JobCard({ job, index }: { job: typeof JOB_LISTINGS[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
    >
      <Link href={`/careers/${job.id}`}>
        <Card className="hover:shadow-lg transition-all duration-300 bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/20">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-500 transition-colors">
                  {job.title}
                </h3>
                <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <IconBriefcase size={18} />
                    <span>{job.department}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IconMapPin size={18} />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IconClock size={18} />
                    <span>{job.type}</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="md:self-start">
                View Details
              </Button>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400 line-clamp-2">
              {job.description}
            </p>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
