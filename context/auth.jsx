import { useContext, createContext } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const setToken = (newToken) => {
    localStorage.setItem("Token", newToken);
  };

  const getToken = () => {
    return localStorage.getItem("Token");
  };

  const deleteToken = () => {
    localStorage.removeItem("Token");
  };

  const logout = () => {
    deleteToken();
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        setToken,
        getToken,
        deleteToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
