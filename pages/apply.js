import { FirebaseError } from "firebase/app";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDocs,
  query,
} from "firebase/firestore";
import { auth, firestore } from "../firebase-config";
import { applyActionCode } from "firebase/auth";
import { useThemeContext } from "../context/theme";

const Apply = () => {
  const [signUpError, setSignUpError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const [user, setUser, userType] = useThemeContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  console.log(user);
  const register = async () => {
    if (confirmPW === password) {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setLoggedIn(true);
        setTimeout(setSignUpError(false), 1000);
      } catch (error) {
        setSignUpError(true);
        console.log(error.message);
      }
    } else {
      console.log("error");
      setSignUpError(true);
    }
  };
  if (user) return null;

  //   const addPhoto = () => {
  //     if (user) {
  //       if (like) {
  //         setLike(false);
  //         console.log("delete");
  //         deleteDoc(doc(firestore, `users/${user.uid}/likes`, photoData.date));
  //       } else {
  //         const ref = setDoc(
  //           doc(firestore, `users/${user.uid}/likes`, photoData.date),
  //           {
  //             photoTitle: photoData.title,
  //             photoDate: photoData.date,
  //             photoImage: photoData.url,
  //             photoDescription: photoData.explanation,
  //           }
  //         );
  //         setLike(true);
  //       }
  //     } else {
  //       alert("Sign in to like and save your images!");
  //     }
  //   };
  const inputForm = (
    <>
      <br />
      <input
        type="email"
        className={`invalid:text-red-600 lg:text-sm lg:p-2 sm:p-1  w-3/4 sm:text-[10px] my-3 required invalid:border-red-600 text-black xl:text-xl xl:p-4 border-2 border-black  rounded-xl m-auto block`}
        placeholder="Email..."
        onChange={(event) => {
          setSignUpError(false);
          setLoginError(false);
          setEmail(event.target.value);
        }}
      />

      <input
        type="password"
        className={`text-black xl:text-xl lg:text-sm lg:p-2 xl:p-4 sm:p-1  sm:text-[10px] my-3 w-3/4 border-2 border-black rounded-xl m-auto block`}
        placeholder="Password..."
        onChange={(event) => {
          setSignUpError(false);
          setLoginError(false);
          setPassword(event.target.value);
        }}
      />
    </>
  );
  const signUpErrorPassword = (
    <>
      {confirmPW.length >= 6 ? (
        <p className="text-red-600 text-center xl:text-xl sm:text-[10px] lg:text-sm sm:text-md">
          Email already in use!
        </p>
      ) : (
        <p className="text-red-600 text-center xl:text-xl sm:text-[10px] lg:text-sm sm:text-md">
          Password must be at least 6 characters in length!
        </p>
      )}
    </>
  );
  const signUpErrorElement = (
    <>
      {!(confirmPW === password) ? (
        <p className="text-red-600 text-center xl:text-xl sm:text-[10px] lg:text-sm sm:text-md">
          Passwords do not match!
        </p>
      ) : (
        <>
          {password.length >= 6 ? (
            <p className="text-red-600 text-center xl:text-xl sm:text-[10px] lg:text-sm sm:text-md">
              Email already in use!
            </p>
          ) : (
            <p className="text-red-600 text-center xl:text-xl sm:text-[10px] lg:text-sm sm:text-lg">
              Password must be at least 6 characters in length!
            </p>
          )}
        </>
      )}
    </>
  );
  const signUpElement = (
    <div
      className={`border-0 absolute m-auto left-0 right-0 xl:w-[70%] xl:h-[70%] sm:w-[50%] sm:text-sm sm:h-[70%] lg:w-[50%] lg:h-[90%]  top-0 bottom-0 rounded-3xl z-40  text-3xl`}
    >
      <div
        id="signup"
        className={` sm:top-[46%] sm:-bottom-0 sm:block sm:-right-0 sm:w-full inline-block xl:text-3xl lg:text-xl md:text-sm m-auto xl:top-0 xl:bottom-0 overflow-hidden sm:h-[55%] xl:h-[90%] xl:w-[45%] border-2 border-black  rounded-xl `}
      >
        <h1 className={`text-black text-center sm:p-2 my-2 p-4 z-38  `}>
          Apply Today!
        </h1>

        {inputForm}

        <input
          type="password"
          className={`text-black my-3  w-3/4 sm:p-1 sm:text-[10px] xl:text-xl xl:p-4 lg:text-sm lg:p-2 border-2 rounded-xl m-auto block`}
          placeholder="Confirm Password..."
          onChange={(event) => {
            setSignUpError(false);
            setLoginError(false);
            setConfirmPW(event.target.value);
          }}
        />

        <div className="my-2 text-center">
          <Link href="/">
            <Button func={register} />
          </Link>
        </div>
        {signUpError ? signUpErrorElement : <div></div>}
      </div>
    </div>
  );
  return (
    <>
      <Navbar />
      {signUpElement}
    </>
  );
};

export default Apply;
