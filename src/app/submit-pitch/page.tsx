"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

// Custom CSS for hiding scrollbars while maintaining scrollability
const scrollbarHideStyles = `
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;     /* Firefox */
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;             /* Chrome, Safari and Opera */
  }
`;
import {
  IconArrowLeft,
  IconArrowRight,
  IconUpload,
  IconPlus,
  IconTrash,
  IconEye,
  IconDeviceFloppy,
  IconBulb,
  IconTarget,
  IconUsers,
  IconChartBar,
  IconPhoto,
  IconPencil,
  IconX,
} from "@tabler/icons-react";

// Define types
type TeamMember = {
  name: string;
  role: string;
  bio: string;
  avatar?: string;
};

type FormSection = {
  id: string;
  title: string;
  icon: React.ReactNode;
};

export default function SubmitPitchPage() {
  const router = useRouter();

  // Add the scrollbar-hide styles
  React.useEffect(() => {
    // Create style element
    const styleEl = document.createElement('style');
    styleEl.innerHTML = scrollbarHideStyles;
    document.head.appendChild(styleEl);

    // Cleanup on unmount
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  // Form sections
  const formSections: FormSection[] = [
    { id: "basics", title: "Basic Information", icon: <IconBulb size={20} /> },
    { id: "problem", title: "Problem & Solution", icon: <IconTarget size={20} /> },
    { id: "business", title: "Market & Business Model", icon: <IconChartBar size={20} /> },
    { id: "team", title: "Team", icon: <IconUsers size={20} /> },
    { id: "media", title: "Media", icon: <IconPhoto size={20} /> },
    { id: "story", title: "Your Story", icon: <IconPencil size={20} /> },
    { id: "preview", title: "Preview & Submit", icon: <IconEye size={20} /> },
  ];

  // Animation variants
  const slideVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.2,
      },
    }),
  };

  // Form state
  const [currentSection, setCurrentSection] = useState<string>("basics");
  const [slideDirection, setSlideDirection] = useState<number>(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "EdTech", // Default value
    fullDescription: "",
    problem: "",
    solution: "",
    market: "",
    businessModel: "",
    creationProcess: "",
    videoUrl: "",
    coverImage: "",
    images: ["", "", ""],
    team: [
      { name: "", role: "", bio: "", avatar: "" },
    ],
  });

  // Categories
  const categories = [
    "EdTech",
    "Health Tech",
    "Sustainability",
    "AgTech",
    "Cybersecurity",
    "Retail Tech",
    "FinTech",
    "AI & ML",
    "Blockchain",
    "Other"
  ];

  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateSection = (section: string) => {
    const newErrors: Record<string, string> = {};

    if (section === "basics") {
      if (!formData.title.trim()) newErrors.title = "Title is required";
      if (!formData.description.trim()) newErrors.description = "Description is required";
      if (!formData.category) newErrors.category = "Category is required";
      if (!formData.fullDescription.trim()) newErrors.fullDescription = "Full description is required";
    }

    if (section === "problem") {
      if (!formData.problem.trim()) newErrors.problem = "Problem statement is required";
      if (!formData.solution.trim()) newErrors.solution = "Solution is required";
    }

    if (section === "business") {
      if (!formData.market.trim()) newErrors.market = "Market analysis is required";
      if (!formData.businessModel.trim()) newErrors.businessModel = "Business model is required";
    }

    if (section === "team") {
      if (!formData.team[0].name.trim()) newErrors["team.0.name"] = "Team member name is required";
      if (!formData.team[0].role.trim()) newErrors["team.0.role"] = "Team member role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle team member changes
  const handleTeamChange = (index: number, field: keyof TeamMember, value: string) => {
    setFormData(prev => {
      const newTeam = [...prev.team];
      newTeam[index] = {
        ...newTeam[index],
        [field]: value
      };
      return {
        ...prev,
        team: newTeam
      };
    });
  };

  // Handle file uploads for team member pictures
  const handleFileUpload = (index: number, file: File) => {
    // In a real implementation, this would upload to Firebase Storage
    // For now, we'll create a local URL for preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        handleTeamChange(index, "avatar", result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Add team member
  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      team: [...prev.team, { name: "", role: "", bio: "", avatar: "" }]
    }));
  };

  // Remove team member
  const removeTeamMember = (index: number) => {
    if (formData.team.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      team: prev.team.filter((_, i) => i !== index)
    }));
  };

  // Handle image changes
  const handleImageChange = (index: number, value: string) => {
    setFormData(prev => {
      const newImages = [...prev.images];
      newImages[index] = value;
      return {
        ...prev,
        images: newImages
      };
    });
  };

  // Handle file uploads for images
  const handleImageFileUpload = (index: number, file: File) => {
    // In a real implementation, this would upload to Firebase Storage
    // For now, we'll create a local URL for preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        handleImageChange(index, result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle cover image file upload
  const handleCoverImageUpload = (file: File) => {
    // In a real implementation, this would upload to Firebase Storage
    // For now, we'll create a local URL for preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setFormData(prev => ({
          ...prev,
          coverImage: result
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Navigation between sections
  const goToNextSection = () => {
    const currentIndex = formSections.findIndex(section => section.id === currentSection);
    if (currentIndex < formSections.length - 1 && validateSection(currentSection)) {
      setSlideDirection(1); // Moving forward
      setCurrentSection(formSections[currentIndex + 1].id);
      window.scrollTo(0, 0);
    }
  };

  const goToPrevSection = () => {
    const currentIndex = formSections.findIndex(section => section.id === currentSection);
    if (currentIndex > 0) {
      setSlideDirection(-1); // Moving backward
      setCurrentSection(formSections[currentIndex - 1].id);
      window.scrollTo(0, 0);
    }
  };

  // Handle direct section navigation
  const goToSection = (sectionId: string) => {
    const currentIndex = formSections.findIndex(section => section.id === currentSection);
    const targetIndex = formSections.findIndex(section => section.id === sectionId);

    // Set slide direction based on navigation direction
    setSlideDirection(targetIndex > currentIndex ? 1 : -1);
    setCurrentSection(sectionId);
    window.scrollTo(0, 0);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all sections
    let isValid = true;
    formSections.forEach(section => {
      if (section.id !== "preview" && !validateSection(section.id)) {
        isValid = false;
      }
    });

    if (isValid) {
      // For now, just log the data since we're not using Firebase yet
      console.log("Pitch data to be submitted:", formData);

      // Show success message and redirect
      alert("Your pitch has been submitted successfully!");
      router.push("/dashboard");
    } else {
      alert("Please fill in all required fields before submitting.");
    }
  };

  // Render the current section
  const renderSection = () => {
    switch (currentSection) {
      case "basics":
        return renderBasicsSection();
      case "problem":
        return renderProblemSection();
      case "business":
        return renderBusinessSection();
      case "team":
        return renderTeamSection();
      case "media":
        return renderMediaSection();
      case "story":
        return renderStorySection();
      case "preview":
        return renderPreviewSection();
      default:
        return null;
    }
  };

  // Render Basic Information section
  const renderBasicsSection = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium">
            Pitch Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-black/50 backdrop-blur-sm"
            placeholder="Enter a catchy, descriptive title for your pitch"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium">
            Short Description <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-black/50 backdrop-blur-sm"
            placeholder="A concise one-sentence description of your idea (max 100 characters)"
            maxLength={100}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-medium">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-black/50 backdrop-blur-sm"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="fullDescription" className="block text-sm font-medium">
            Full Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="fullDescription"
            name="fullDescription"
            value={formData.fullDescription}
            onChange={handleInputChange}
            rows={5}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-black/50 backdrop-blur-sm"
            placeholder="Provide a comprehensive description of your startup idea"
          />
          {errors.fullDescription && <p className="text-red-500 text-sm">{errors.fullDescription}</p>}
        </div>
      </div>
    );
  };

  // Render Problem & Solution section
  const renderProblemSection = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="problem" className="block text-sm font-medium">
            Problem Statement <span className="text-red-500">*</span>
          </label>
          <textarea
            id="problem"
            name="problem"
            value={formData.problem}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-black/50 backdrop-blur-sm"
            placeholder="Describe the problem your startup is solving"
          />
          {errors.problem && <p className="text-red-500 text-sm">{errors.problem}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="solution" className="block text-sm font-medium">
            Solution <span className="text-red-500">*</span>
          </label>
          <textarea
            id="solution"
            name="solution"
            value={formData.solution}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-black/50 backdrop-blur-sm"
            placeholder="Explain how your product or service solves this problem"
          />
          {errors.solution && <p className="text-red-500 text-sm">{errors.solution}</p>}
        </div>
      </div>
    );
  };

  // Render Market & Business Model section
  const renderBusinessSection = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="market" className="block text-sm font-medium">
            Market Analysis <span className="text-red-500">*</span>
          </label>
          <textarea
            id="market"
            name="market"
            value={formData.market}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-black/50 backdrop-blur-sm"
            placeholder="Describe your target market, market size, and growth potential"
          />
          {errors.market && <p className="text-red-500 text-sm">{errors.market}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="businessModel" className="block text-sm font-medium">
            Business Model <span className="text-red-500">*</span>
          </label>
          <textarea
            id="businessModel"
            name="businessModel"
            value={formData.businessModel}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-black/50 backdrop-blur-sm"
            placeholder="Explain how your startup will generate revenue and achieve profitability"
          />
          {errors.businessModel && <p className="text-red-500 text-sm">{errors.businessModel}</p>}
        </div>
      </div>
    );
  };

  // Render Team section
  const renderTeamSection = () => {
    return (
      <div className="space-y-6">
        {formData.team.map((member, index) => (
          <Card key={index} className="p-6 bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Team Member {index + 1}</h3>
              {formData.team.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTeamMember(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <IconTrash size={20} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => handleTeamChange(index, "name", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-black/50 backdrop-blur-sm"
                  placeholder="Full name"
                />
                {errors[`team.${index}.name`] && (
                  <p className="text-red-500 text-sm">{errors[`team.${index}.name`]}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Role <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={member.role}
                  onChange={(e) => handleTeamChange(index, "role", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-black/50 backdrop-blur-sm"
                  placeholder="e.g., Founder & CEO"
                />
                {errors[`team.${index}.role`] && (
                  <p className="text-red-500 text-sm">{errors[`team.${index}.role`]}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium">
                  Bio
                </label>
                <textarea
                  value={member.bio}
                  onChange={(e) => handleTeamChange(index, "bio", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-black/50 backdrop-blur-sm"
                  placeholder="Brief professional background"
                  rows={3}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium">
                  Picture
                </label>

                {/* Picture preview */}
                {member.avatar && (
                  <div className="relative w-20 h-20 mb-2 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700">
                    <Image
                      src={member.avatar}
                      alt={`${member.name || 'Team member'} avatar`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleTeamChange(index, "avatar", "")}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                      aria-label="Remove image"
                    >
                      <IconX size={12} />
                    </button>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2">
                  {/* URL input */}
                  <div className="flex-1">
                    <input
                      type="text"
                      value={member.avatar}
                      onChange={(e) => handleTeamChange(index, "avatar", e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-black/50 backdrop-blur-sm"
                      placeholder="https://example.com/avatar.jpg"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Enter image URL
                    </p>
                  </div>

                  {/* File upload */}
                  <div className="flex-none">
                    <label className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg cursor-pointer transition-colors">
                      <IconUpload size={18} />
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(index, file);
                          }
                        }}
                      />
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
                      Or upload a file
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}

        <Button
          onClick={addTeamMember}
          className="w-full py-2 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          <IconPlus size={18} />
          Add Team Member
        </Button>
      </div>
    );
  };

  // Render Media section
  const renderMediaSection = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="coverImage" className="block text-sm font-medium">
            Cover Image
          </label>

          {/* Cover image preview */}
          {formData.coverImage && (
            <div className="relative w-full h-40 mb-2 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
              <Image
                src={formData.coverImage}
                alt="Cover image"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, coverImage: "" }))}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                aria-label="Remove image"
              >
                <IconX size={16} />
              </button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            {/* URL input */}
            <div className="flex-1">
              <input
                type="text"
                id="coverImage"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-black/50 backdrop-blur-sm"
                placeholder="https://example.com/cover-image.jpg"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Enter image URL (recommended size: 1200x630px)
              </p>
            </div>

            {/* File upload */}
            <div className="flex-none">
              <label className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg cursor-pointer transition-colors">
                <IconUpload size={18} />
                Upload
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleCoverImageUpload(file);
                    }
                  }}
                />
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
                Or upload a file
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Additional Images
          </label>
          {formData.images.map((image, index) => (
            <div key={index} className="mb-4">
              {/* Image preview */}
              {image && (
                <div className="relative w-full h-32 mb-2 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
                  <Image
                    src={image}
                    alt={`Additional image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageChange(index, "")}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                    aria-label="Remove image"
                  >
                    <IconX size={16} />
                  </button>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2">
                {/* URL input */}
                <div className="flex-1">
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-black/50 backdrop-blur-sm"
                    placeholder={`Image ${index + 1} URL`}
                  />
                </div>

                {/* File upload */}
                <div className="flex-none">
                  <label className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg cursor-pointer transition-colors">
                    <IconUpload size={18} />
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageFileUpload(index, file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          ))}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Add up to 3 additional images showcasing your product, team, or concept
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="videoUrl" className="block text-sm font-medium">
            Video URL
          </label>
          <input
            type="text"
            id="videoUrl"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-black/50 backdrop-blur-sm"
            placeholder="https://www.youtube.com/embed/your-video-id"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Provide a YouTube or Vimeo embed URL for your pitch video
          </p>
        </div>
      </div>
    );
  };

  // Render Story section
  const renderStorySection = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="creationProcess" className="block text-sm font-medium">
            Creation Process
          </label>
          <textarea
            id="creationProcess"
            name="creationProcess"
            value={formData.creationProcess}
            onChange={handleInputChange}
            rows={6}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-black/50 backdrop-blur-sm"
            placeholder="Share the story behind your idea. What inspired you? What challenges did you face? How did you develop the concept?"
          />
        </div>
      </div>
    );
  };

  // Render Preview section
  const renderPreviewSection = () => {
    return (
      <div className="space-y-8">
        <div className="bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">{formData.title || "Your Pitch Title"}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{formData.description || "Your pitch description will appear here."}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <IconBulb size={18} /> Problem
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {formData.problem || "Your problem statement will appear here."}
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <IconTarget size={18} /> Solution
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {formData.solution || "Your solution will appear here."}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-medium mb-2">Category</h4>
            <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
              {formData.category}
            </div>
          </div>

          {formData.team.length > 0 && formData.team[0].name && (
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <IconUsers size={18} /> Team
              </h4>
              <div className="flex flex-wrap gap-4">
                {formData.team.map((member, index) => (
                  member.name && (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{member.role}</p>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Ready to submit your pitch? Once submitted, your pitch will be visible to the FoundersFrame community.
          </p>
        </div>
      </div>
    );
  };

  // Main render
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

        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Submit Your Pitch</h1>
            <Button
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-black/80 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-white dark:hover:bg-black transition-colors text-gray-800 dark:text-gray-200"
            >
              <IconArrowLeft size={18} />
              Back to Dashboard
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex overflow-x-auto scrollbar-hide pb-2 gap-1 md:gap-0 md:grid md:grid-cols-7">
              {formSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => goToSection(section.id)}
                  className={`flex-1 flex flex-col items-center p-3 rounded-lg transition-colors ${
                    currentSection === section.id
                      ? "bg-blue-500 text-white"
                      : "bg-white/50 dark:bg-black/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-black/80"
                  }`}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 dark:bg-black/20 mb-2">
                    {section.icon}
                  </div>
                  <span className="text-xs whitespace-nowrap">{section.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Container */}
          <Card className="p-6 bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden">
            <form>
              <div className="overflow-hidden mb-8">
                <AnimatePresence initial={false} custom={slideDirection} mode="wait">
                  <motion.div
                    key={currentSection}
                    custom={slideDirection}
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full"
                  >
                    {renderSection()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={goToPrevSection}
                  disabled={currentSection === formSections[0].id}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                    currentSection === formSections[0].id
                      ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                      : "bg-white dark:bg-black border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  <IconArrowLeft size={18} />
                  Previous
                </Button>

                {currentSection === formSections[formSections.length - 1].id ? (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    Submit
                    <IconDeviceFloppy size={18} />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={goToNextSection}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    Next
                    <IconArrowRight size={18} />
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </div>
      </div>
    </AnimatedGradientBackground>
  );
}
