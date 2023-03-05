import { createContext, useContext, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "../firebase-config";
import { getDoc, doc } from "firebase/firestore";
const Context = createContext();

export function ThemeProvider({ children }) {
  const [user, setUser] = useState({});
  const [userAccess, setUserAccess] = useState("unauthorized");
  onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);
    if (user) {
      const email = user.email;
      const post = await getDoc(doc(firestore, `users`, email));

      if (post) {
        console.log(post.data());
        setUserAccess(post.data().access);
      }
    }
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
