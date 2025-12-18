// src/components/AuthProvider.jsx

import { createContext, useState } from "react";

// Create the context
const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
  // Initialize login state by checking localStorage only once
  const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("accessToken"))

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export {AuthContext};
