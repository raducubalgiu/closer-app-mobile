import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

export const AuthService = {
  registerWithPassword: async (email, password) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
      );

      return {
        user,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },

  loginWithPassword: async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
      );

      return {
        user,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },

  passwordResetEmail: async (auth, email) => {
    try {
      const response = await sendPasswordResetEmail(auth, email);

      return {
        response,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },

  loginWithGoogle: async () => {
    const provider = new GoogleAuthProvider();

    try {
      const userCred = await signInWithPopup(getAuth(), provider);

      return {
        user: userCred.user,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },
};
