import React from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../Firebase/firebase.init";

import axiosProvider from "../API/axiosProvider";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registerLoading, setRegisterLoading] = useState(false);

  //Email-Password Register
  const createUser = async (name, email, password, photoURL) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL,
      });
      const userInfo = {
        name,
        email,
        photoURL,
        role: "User",
      };
      await axiosProvider.post("/users", userInfo);
      setLoading(false);

      return result;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  //Email-Password Login
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //Google-Login
  const signInWithGoogle = () => {
    setRegisterLoading(true);
    return signInWithPopup(auth, googleProvider)
      .then((result) => {
        const userInfo = {
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          role: "User",
        };
        return axiosProvider.post("/users", userInfo);
      })
      .then(() => {
        setRegisterLoading(false);
      });
  };

  //Logout
  const signOutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  //Set Database User
  const [userFromDb, setUserFromDb] = useState(null);
  const [dbLoading, setDbLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setDbLoading(true);
      axiosProvider
        .get(`/users/${user.email}`)
        .then((res) => {
          setUserFromDb(res.data);
          setDbLoading(false);
        })
        .catch(() => {
          setUserFromDb(null);
          setDbLoading(false);
        });
    }
  }, [user]);

  const authInfo = {
    createUser,
    signInUser,
    signInWithGoogle,
    signOutUser,
    user,
    setUser,
    loading,
    setLoading,
    registerLoading,
    setRegisterLoading,
    userFromDb,
    dbLoading,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
