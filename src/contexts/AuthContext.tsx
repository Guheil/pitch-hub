'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import {
  createUserProfile,
  updateUserProfile as updateFirestoreProfile,
  getUserProfile,
  updateUserLastLogin
} from '@/services/firestore';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string, displayName: string) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  googleSignIn: () => Promise<User>;
  updateUserProfile: (displayName: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Sign up with email and password
  async function signup(email: string, password: string, displayName: string) {
    try {
      // Create the Firebase auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user's display name in Firebase Auth
      await updateProfile(user, { displayName });

      // Create a user profile document in Firestore
      await createUserProfile(user.uid, {
        uid: user.uid,
        displayName,
        email: user.email,
        photoURL: user.photoURL,
      });

      return user;
    } catch (error) {
      console.error("Error in signup:", error);
      throw error;
    }
  }

  // Login with email and password
  async function login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the last login timestamp in Firestore
      await updateUserLastLogin(user.uid);

      return user;
    } catch (error) {
      console.error("Error in login:", error);
      throw error;
    }
  }

  // Logout
  function logout() {
    return signOut(auth);
  }

  // Reset password
  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  // Google sign in
  async function googleSignIn() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if this is a new user by trying to get their profile
      const userProfile = await getUserProfile(user.uid);

      if (!userProfile) {
        // This is a new user, create a profile in Firestore
        await createUserProfile(user.uid, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      } else {
        // Existing user, just update the last login timestamp
        await updateUserLastLogin(user.uid);
      }

      return user;
    } catch (error) {
      console.error("Error in Google sign in:", error);
      throw error;
    }
  }

  // Update user profile
  async function updateUserProfile(displayName: string) {
    if (!auth.currentUser) {
      return Promise.reject(new Error('No user is signed in'));
    }

    try {
      // Update the Firebase Auth profile
      await updateProfile(auth.currentUser, { displayName });

      // Also update the Firestore profile
      await updateFirestoreProfile(auth.currentUser.uid, { displayName });

      return;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    googleSignIn,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
