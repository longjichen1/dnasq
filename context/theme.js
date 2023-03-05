import { createContext, useContext, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "../firebase-config";
const Context = createContext();

export function ThemeProvider({ children }) {
  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const [userType, setUserType] = useState("none"); //none, user, admin
  return (
    <Context.Provider value={[user, setUser, userType, setUserType]}>
      {children}
    </Context.Provider>
  );
}

export function useThemeContext() {
  return useContext(Context);
}
