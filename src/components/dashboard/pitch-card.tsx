"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { IconEye, IconHeart, IconCalendar } from "@tabler/icons-react";
import { Card3d } from "@/components/ui/3d-card";

interface PitchProps {
  id: string;
  title: string;
  description: string;
  category: string;
  views: number;
  likes: number;
  createdAt: Date;
  author: string;
  authorAvatar?: string;
  coverImage?: string;
}

interface PitchCardProps {
  pitch: PitchProps;
  className?: string;
  index?: number;
}

export const PitchCard: React.FC<PitchCardProps> = ({
  pitch,
  className,
  index = 0,
}) => {
  // Format date to readable string
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn("h-full", className)}
    >
      <Card3d
        className="h-full"
        rotationIntensity={5}
        glareOpacity={0.1}
        glareSize={0.4}
        shadow={true}
        cardClassName="bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 h-full"
      >
        <Link href={`/pitches/${pitch.id}`} className="block h-full">
          <div className="flex flex-col h-full">
            {/* Cover Image */}
            {pitch.coverImage && (
              <div className="relative h-40 w-full overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                <Image
                  src={pitch.coverImage}
                  alt={pitch.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 z-20">
                  <span className="px-2 py-1 text-xs font-medium bg-white/20 backdrop-blur-md rounded-full text-white">
                    {pitch.category}
                  </span>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-bold mb-2 line-clamp-1">{pitch.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {pitch.description}
              </p>

              {/* Author */}
              <div className="flex items-center mt-auto">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white overflow-hidden">
                  {pitch.authorAvatar ? (
                    <Image
                      src={pitch.authorAvatar}
                      alt={pitch.author}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  ) : (
                    pitch.author.charAt(0)
                  )}
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium">{pitch.author}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <IconEye size={16} className="mr-1" />
                    <span className="text-xs">{pitch.views}</span>
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <IconHeart size={16} className="mr-1" />
                    <span className="text-xs">{pitch.likes}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <IconCalendar size={16} className="mr-1" />
                  <span className="text-xs">{formatDate(pitch.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </Card3d>
    </motion.div>
  );
};

export default PitchCard;
