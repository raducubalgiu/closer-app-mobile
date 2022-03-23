import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";

const auth = getAuth();

export const AuthService = {
  registerWithPassword: async (auth, email, password, firstName, lastName) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(user, {
        displayName: `${lastName} ${firstName}`,
        photoURL: "",
      });

      return {
        user,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },

  loginWithPassword: async (auth, email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

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
      const userCred = await signInWithPopup(auth, provider);

      return {
        user: userCred.user,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },
};
