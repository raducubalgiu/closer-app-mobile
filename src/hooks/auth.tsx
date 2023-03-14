import { useState, useEffect, useContext, createContext, useMemo } from "react";
import { getAuth } from "firebase/auth";
import { getCurrentUser } from "../../utils/auth-middleware";
import { User } from "../../models/user";

interface UserContext {
  user: User | null;
  setUser: (user: any) => void;
  loadingInitial: boolean;
}

const AuthContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
  loadingInitial: false,
});

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        getCurrentUser(idTokenResult?.token)
          .then((res) => {
            const { username } = res.data;
            if (username) {
              setUser({
                ...res.data,
                token: idTokenResult?.token,
              });
            }
          })
          .catch((err) => console.log(err));
      }

      setLoadingInitial(false);
    });

    return () => unsubscribe();
  }, []);

  const memoedValue = useMemo(
    () => ({ user, setUser, loadingInitial }),
    [user, loadingInitial]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
