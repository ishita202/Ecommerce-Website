import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut, updateProfile as firebaseUpdateProfile } from "firebase/auth";
import { auth } from "../Firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  // Keep user state synced with Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  // Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("user");
  };

  // Update Profile Function (Fixes your error)
  const updateProfile = async (updatedData) => {
    if (!auth.currentUser) return;

    // Update Firebase displayName
    if (updatedData.displayName) {
      await firebaseUpdateProfile(auth.currentUser, {
        displayName: updatedData.displayName,
      });
    }

    // Save extra fields to localStorage
    const mergedUser = { ...auth.currentUser, ...updatedData };
    setUser(mergedUser);
    localStorage.setItem("user", JSON.stringify(mergedUser));
  };

  return (
    <AuthContext.Provider value={{ user, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
