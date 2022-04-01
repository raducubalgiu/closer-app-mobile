import React, { useState, useEffect, useContext, createContext } from "react";
import { getAuth } from "firebase/auth";
import { getCurrentUser } from "../utils/auth-middleware";

const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        getCurrentUser(idTokenResult?.token)
          .then((res) => {
            const {
              _id,
              email,
              username,
              role,
              name,
              job,
              logo,
              ratingsAverage,
              ratingsQuantity,
            } = res.data.user;
            if (username) {
              setUser({
                _id,
                email,
                username,
                role,
                token: idTokenResult?.token,
                name,
                job,
                avatar: logo[0]?.url,
                ratingsAverage,
                ratingsQuantity,
              });
            }
          })
          .catch((err) => console.log(err));
      }
    });

    return () => unsubscribe();
  }, []);

  const value = { user, setUser };

  return <AuthContext.Provider value={value} {...props} />;
};

export const useAuth = () => useContext(AuthContext);
