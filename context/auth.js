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
              name,
              business,
              username,
              email,
              avatar,
              images,
              role,
              description,
              website,
              job,
              location,
              employees,
              services,
              counter,
              validated,
              checkmark,
            } = res.data.user;
            if (username) {
              setUser({
                _id,
                name,
                business: business,
                username,
                email,
                avatar,
                images,
                role,
                description,
                website,
                job,
                location,
                employees,
                services,
                counter,
                token: idTokenResult?.token,
                validated,
                checkmark,
              });
            }
          })
          .catch((err) => console.log(err));
      }
    });

    console.log("USER FROM CONTEXT!!!!", user);

    return () => unsubscribe();
  }, []);

  const value = { user, setUser };

  return <AuthContext.Provider value={value} {...props} />;
};

export const useAuth = () => useContext(AuthContext);
