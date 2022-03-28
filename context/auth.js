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
        console.log(idTokenResult);
        getCurrentUser(idTokenResult?.token)
          .then((res) => {
            const { name, email, role, _id, business, location } =
              res.data.user;
            setUser({
              name,
              role,
              _id,
              business,
              email,
              location,
              token: idTokenResult?.token,
            });
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
