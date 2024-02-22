import { getCurrentUser } from "@/lib/appwrite/api";
import { IContextType, IUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const INITIAL_USER = {
  id: "",
  firstName: "",
  username: "",
  email: "",
  bio: "",
  imageUrl: "",
};

export const INITIAL_STATE = {
  user: INITIAL_USER,
  loading: false,
  authenticated: false,
  setUser: () => {},
  setloading: () => {},
  setAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false);
  const checkAuthUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser({
          id: currentUser.$id,
          firstName: currentUser.firstName,
          username: currentUser.userName,
          email: currentUser.email,
          bio: currentUser.bio,
          imageUrl: currentUser.imageUrl,
        });

        setAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("cookieFallback") === "[]" ||
      localStorage.getItem("cookieFallback") === null
    ) {
      //navigate("/sign-in");
    }
  }, []);

  const values = {
    user,
    setUser,
    authenticated,
    setAuthenticated,
    loading,
    setloading,
    checkAuthUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);
