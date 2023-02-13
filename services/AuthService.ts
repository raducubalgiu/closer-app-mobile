import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

export const AuthService = {
  registerWithPassword: async (email: string, password: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
      );

      return {
        user,
      };
    } catch (err: any) {
      return {
        err: { code: err.code, message: err.message },
      };
    }
  },

  loginWithPassword: async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
      );

      return {
        user,
      };
    } catch (error: any) {
      return {
        err: { code: error.code, message: error.message },
      };
    }
  },

  passwordResetEmail: async (auth: any, email: string) => {
    try {
      const response = await sendPasswordResetEmail(auth, email);

      return {
        response,
      };
    } catch (error: any) {
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
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  },
};
