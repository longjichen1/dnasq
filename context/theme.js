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
      try {
        const ref = doc(firestore, "users/", user.email);
        const post = await getDoc(ref);

        if (post) {
          console.log(post.data());
          if (post.data()) setUserAccess(post.data().access);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
    }
  });
  const [userType, setUserType] = useState("none"); //none, user, admin
  return (
    <Context.Provider value={[user, setUser, userAccess, setUserAccess]}>
      {children}
    </Context.Provider>
  );
}

export function useThemeContext() {
  return useContext(Context);
}
