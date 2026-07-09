"use client";

import { useCallback, useState, useEffect, ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { AuthContext } from "@/components/AuthContext";

const OWNER_EMAIL = "t19796146@gmail.com";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authLoaded, setAuthLoaded] = useState(false);
  const [adminEmails, setAdminEmails] = useState<string[]>([]);
  const [adminLoaded, setAdminLoaded] = useState(false);

  const fetchAdminEmails = useCallback(async () => {
    try {
      const res = await fetch("/api/admins");
      const data = await res.json();
      const emails = data.admins?.map((a: { email: string }) => a.email.toLowerCase()) || [];
      setAdminEmails(emails);
    } catch {
      setAdminEmails([]);
    } finally {
      setAdminLoaded(true);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchAdminEmails();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [fetchAdminEmails]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoaded(true);
    });
    return () => unsubscribe();
  }, []);

  const email = user?.email?.toLowerCase() || "";
  const isAdmin = email === OWNER_EMAIL || adminEmails.includes(email);
  const isOwner = email === OWNER_EMAIL;
  const loading = !authLoaded || !adminLoaded;

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const userEmail = result.user.email?.toLowerCase() || "";
    if (userEmail !== OWNER_EMAIL && !adminEmails.includes(userEmail)) {
      await signOut(auth);
      window.location.href = "/login?error=not-admin";
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAdmin, isOwner, signInWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
