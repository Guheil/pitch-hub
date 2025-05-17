import { Timestamp } from 'firebase/firestore';

// User Profile in Firestore
export interface FirestoreUserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  createdAt: Timestamp;
  lastLoginAt: Timestamp;
  bio?: string;
  location?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  skills?: string[];
  pitchCount: number;
  followersCount: number;
  followingCount: number;
}

// Pitch in Firestore
export interface FirestorePitch {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  market: string;
  businessModel: string;
  competition: string;
  traction: string;
  team: {
    name: string;
    role: string;
    bio: string;
    photoURL?: string;
  }[];
  fundingNeeds?: string;
  category: string;
  tags: string[];
  coverImage?: string;
  pitchDeck?: string;
  pitchVideo?: string;
  additionalImages?: string[];
  authorId: string;
  authorName: string;
  authorPhotoURL?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  views: number;
  likes: number;
  isPublished: boolean;
}

// Comment in Firestore
export interface FirestoreComment {
  id: string;
  pitchId: string;
  authorId: string;
  authorName: string;
  authorPhotoURL?: string;
  content: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  likes: number;
  parentId?: string; // For nested comments/replies
}

// Saved Pitch in Firestore (for bookmarks)
export interface FirestoreSavedPitch {
  userId: string;
  pitchId: string;
  savedAt: Timestamp;
}

// Follow relationship in Firestore
export interface FirestoreFollow {
  followerId: string; // User who is following
  followingId: string; // User being followed
  createdAt: Timestamp;
}

// Like in Firestore
export interface FirestoreLike {
  userId: string;
  pitchId: string;
  createdAt: Timestamp;
}
