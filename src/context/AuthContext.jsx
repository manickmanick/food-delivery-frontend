import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
//   useEffect(() => {
//     console.log("Auth user changed:", user);
//   }, [user]);
  //  console.log("Current User:", user);
  const login = (email) => {
    console.log("login method was called , ", email);

    setUser({
      id: 1,
      name: "Demo User",
      email,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
