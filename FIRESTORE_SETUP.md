# Firestore Setup for FoundersFrame

This document outlines how to set up and configure Firestore for the FoundersFrame application.

## Database Structure

The FoundersFrame application uses the following Firestore collections:

1. **users** - Stores user profile information
2. **pitches** - Stores pitch submissions
3. **comments** - Stores comments on pitches
4. **savedPitches** - Tracks which pitches users have saved
5. **follows** - Tracks user follow relationships
6. **likes** - Tracks pitch likes

## Setting Up Firestore

1. **Create a Firestore Database**:
   - Go to the [Firebase Console](https://console.firebase.google.com/)
   - Select your project (founders-frame-6bc75)
   - Navigate to "Firestore Database" in the left sidebar
   - Click "Create database"
   - Start in production mode
   - Choose a location closest to your users

2. **Deploy Security Rules**:
   - Use the Firebase CLI to deploy the security rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

3. **Deploy Indexes**:
   - Use the Firebase CLI to deploy the indexes:
   ```bash
   firebase deploy --only firestore:indexes
   ```

## Collection Schemas

### Users Collection

```typescript
interface FirestoreUserProfile {
  uid: string;                  // Firebase Auth UID
  displayName: string | null;   // User's display name
  email: string | null;         // User's email
  photoURL: string | null;      // User's profile picture URL
  createdAt: Timestamp;         // When the user account was created
  lastLoginAt: Timestamp;       // When the user last logged in
  bio?: string;                 // User's bio/about
  location?: string;            // User's location
  website?: string;             // User's website
  socialLinks?: {               // User's social media links
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  skills?: string[];            // User's skills
  pitchCount: number;           // Number of pitches submitted
  followersCount: number;       // Number of followers
  followingCount: number;       // Number of users being followed
}
```

### Pitches Collection

```typescript
interface FirestorePitch {
  id: string;                   // Pitch ID
  title: string;                // Pitch title
  description: string;          // Short description
  problem: string;              // Problem statement
  solution: string;             // Solution description
  market: string;               // Market analysis
  businessModel: string;        // Business model
  competition: string;          // Competitive analysis
  traction: string;             // Current traction
  team: {                       // Team members
    name: string;
    role: string;
    bio: string;
    photoURL?: string;
  }[];
  fundingNeeds?: string;        // Funding requirements
  category: string;             // Pitch category
  tags: string[];               // Tags/keywords
  coverImage?: string;          // Cover image URL
  pitchDeck?: string;           // Pitch deck URL
  pitchVideo?: string;          // Pitch video URL
  additionalImages?: string[];  // Additional image URLs
  authorId: string;             // Author's user ID
  authorName: string;           // Author's name
  authorPhotoURL?: string;      // Author's profile picture
  createdAt: Timestamp;         // Creation timestamp
  updatedAt: Timestamp;         // Last update timestamp
  views: number;                // View count
  likes: number;                // Like count
  isPublished: boolean;         // Whether the pitch is published
}
```

### Comments Collection

```typescript
interface FirestoreComment {
  id: string;                   // Comment ID
  pitchId: string;              // ID of the pitch being commented on
  authorId: string;             // Author's user ID
  authorName: string;           // Author's name
  authorPhotoURL?: string;      // Author's profile picture
  content: string;              // Comment content
  createdAt: Timestamp;         // Creation timestamp
  updatedAt?: Timestamp;        // Last update timestamp
  likes: number;                // Like count
  parentId?: string;            // Parent comment ID (for replies)
}
```

## Querying Data

The application includes several helper functions in `src/services/firestore.ts` for common database operations:

- User profile management
- Pitch creation and management
- Comment operations
- Saved pitches tracking

## Security Rules

The security rules in `firestore.rules` enforce the following access controls:

- Users can only read/write their own profile data
- Anyone can read published pitches
- Only authenticated users can create pitches
- Only the author can update or delete their pitches
- Anyone can read comments
- Only authenticated users can create comments
- Only the author can update or delete their comments

## Indexes

Custom indexes are defined in `firestore.indexes.json` to support the following queries:

- Pitches by author, sorted by creation date
- Pitches by category, sorted by creation date
- Pitches by category, sorted by views
- Pitches by category, sorted by likes
- Comments by pitch, sorted by creation date
