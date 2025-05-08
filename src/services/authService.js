import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

export const authService = {
  async register(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async logout() {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getCurrentUser() {
    return auth.currentUser;
  }
};