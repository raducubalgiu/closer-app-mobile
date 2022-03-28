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

export const AuthService = {
  registerWithPassword: async (email, password, firstName, lastName) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
      );

      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
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

  logout: async () => {
    try {
      await signOut(getAuth());
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },
  updateUserName: async (name) => {
    try {
      const { user } = await updateProfile(getAuth().currentUser, {
        displayName: name,
      });

      return user;
    } catch (error) {
      return error;
    }
  },
};
