import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  startAfter,
  deleteDoc,
  increment,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserProfile } from '@/types/user';
import {
  FirestoreUserProfile,
  FirestorePitch,
  FirestoreComment
} from '@/types/firestore';

// Collection names
const USERS_COLLECTION = 'users';
const PITCHES_COLLECTION = 'pitches';
const COMMENTS_COLLECTION = 'comments';
const SAVED_PITCHES_COLLECTION = 'savedPitches';

// ===== USER OPERATIONS =====

/**
 * Creates a new user profile document in Firestore
 */
export async function createUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, uid);

  // Create a new user document with timestamps
  await setDoc(userRef, {
    ...data,
    uid,
    createdAt: serverTimestamp(),
    lastLoginAt: serverTimestamp(),
    pitchCount: 0,
    followersCount: 0,
    followingCount: 0
  });
}

/**
 * Updates an existing user profile in Firestore
 */
export async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, uid);

  // Update the user document
  await updateDoc(userRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
}

/**
 * Gets a user profile from Firestore
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userRef = doc(db, USERS_COLLECTION, uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const userData = userSnap.data() as FirestoreUserProfile;

    // Convert Firestore Timestamps to JavaScript Dates
    return {
      ...userData,
      createdAt: userData.createdAt?.toDate() || new Date(),
      lastLoginAt: userData.lastLoginAt?.toDate() || new Date()
    } as UserProfile;
  }

  return null;
}

/**
 * Updates the user's last login timestamp
 */
export async function updateUserLastLogin(uid: string): Promise<void> {
  const userRef = doc(db, USERS_COLLECTION, uid);
  await updateDoc(userRef, {
    lastLoginAt: serverTimestamp()
  });
}

/**
 * Checks if a user with the given email exists
 */
export async function checkUserExists(email: string): Promise<boolean> {
  const usersRef = collection(db, USERS_COLLECTION);
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  return !querySnapshot.empty;
}

// ===== PITCH OPERATIONS =====

/**
 * Creates a new pitch in Firestore
 */
export async function createPitch(pitchData: Partial<FirestorePitch>): Promise<string> {
  // Create a reference to a new document with auto-generated ID
  const pitchesRef = collection(db, PITCHES_COLLECTION);
  const newPitchRef = doc(pitchesRef);

  // Add the ID to the pitch data
  const newPitch = {
    ...pitchData,
    id: newPitchRef.id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    views: 0,
    likes: 0,
    isPublished: true
  };

  // Save the pitch
  await setDoc(newPitchRef, newPitch);

  // Increment the user's pitch count
  if (pitchData.authorId) {
    const userRef = doc(db, USERS_COLLECTION, pitchData.authorId);
    await updateDoc(userRef, {
      pitchCount: increment(1)
    });
  }

  return newPitchRef.id;
}

/**
 * Updates an existing pitch in Firestore
 */
export async function updatePitch(pitchId: string, pitchData: Partial<FirestorePitch>): Promise<void> {
  const pitchRef = doc(db, PITCHES_COLLECTION, pitchId);

  await updateDoc(pitchRef, {
    ...pitchData,
    updatedAt: serverTimestamp()
  });
}

/**
 * Gets a pitch from Firestore
 */
export async function getPitch(pitchId: string): Promise<FirestorePitch | null> {
  const pitchRef = doc(db, PITCHES_COLLECTION, pitchId);
  const pitchSnap = await getDoc(pitchRef);

  if (pitchSnap.exists()) {
    return pitchSnap.data() as FirestorePitch;
  }

  return null;
}

/**
 * Deletes a pitch from Firestore
 */
export async function deletePitch(pitchId: string, authorId: string): Promise<void> {
  const pitchRef = doc(db, PITCHES_COLLECTION, pitchId);

  // Delete the pitch
  await deleteDoc(pitchRef);

  // Decrement the user's pitch count
  const userRef = doc(db, USERS_COLLECTION, authorId);
  await updateDoc(userRef, {
    pitchCount: increment(-1)
  });
}

/**
 * Increments the view count for a pitch
 */
export async function incrementPitchViews(pitchId: string): Promise<void> {
  const pitchRef = doc(db, PITCHES_COLLECTION, pitchId);
  await updateDoc(pitchRef, {
    views: increment(1)
  });
}

// ===== COMMENT OPERATIONS =====

/**
 * Creates a new comment in Firestore
 */
export async function createComment(commentData: Partial<FirestoreComment>): Promise<string> {
  // Create a reference to a new document with auto-generated ID
  const commentsRef = collection(db, COMMENTS_COLLECTION);
  const newCommentRef = doc(commentsRef);

  // Add the ID to the comment data
  const newComment = {
    ...commentData,
    id: newCommentRef.id,
    createdAt: serverTimestamp(),
    likes: 0
  };

  // Save the comment
  await setDoc(newCommentRef, newComment);

  return newCommentRef.id;
}

/**
 * Gets comments for a pitch
 */
export async function getCommentsForPitch(
  pitchId: string,
  lastComment?: QueryDocumentSnapshot,
  pageSize: number = 10
): Promise<QueryDocumentSnapshot[]> {
  const commentsRef = collection(db, COMMENTS_COLLECTION);

  let q = query(
    commentsRef,
    where("pitchId", "==", pitchId),
    where("parentId", "==", null), // Only get top-level comments
    orderBy("createdAt", "desc"),
    limit(pageSize)
  );

  // If we have a last comment, start after it for pagination
  if (lastComment) {
    q = query(q, startAfter(lastComment));
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs;
}

// ===== SAVED PITCHES OPERATIONS =====

/**
 * Saves a pitch for a user
 */
export async function savePitch(userId: string, pitchId: string): Promise<void> {
  const savedPitchRef = doc(db, SAVED_PITCHES_COLLECTION, `${userId}_${pitchId}`);

  await setDoc(savedPitchRef, {
    userId,
    pitchId,
    savedAt: serverTimestamp()
  });
}

/**
 * Unsaves a pitch for a user
 */
export async function unsavePitch(userId: string, pitchId: string): Promise<void> {
  const savedPitchRef = doc(db, SAVED_PITCHES_COLLECTION, `${userId}_${pitchId}`);
  await deleteDoc(savedPitchRef);
}

/**
 * Checks if a user has saved a pitch
 */
export async function hasSavedPitch(userId: string, pitchId: string): Promise<boolean> {
  const savedPitchRef = doc(db, SAVED_PITCHES_COLLECTION, `${userId}_${pitchId}`);
  const savedPitchSnap = await getDoc(savedPitchRef);

  return savedPitchSnap.exists();
}

/**
 * Gets all saved pitches for a user
 */
export async function getSavedPitches(
  userId: string,
  lastPitch?: QueryDocumentSnapshot,
  pageSize: number = 10
): Promise<QueryDocumentSnapshot[]> {
  const savedPitchesRef = collection(db, SAVED_PITCHES_COLLECTION);

  let q = query(
    savedPitchesRef,
    where("userId", "==", userId),
    orderBy("savedAt", "desc"),
    limit(pageSize)
  );

  // If we have a last pitch, start after it for pagination
  if (lastPitch) {
    q = query(q, startAfter(lastPitch));
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs;
}
