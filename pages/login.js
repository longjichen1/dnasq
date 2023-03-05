import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, firestore } from "../firebase-config";

export default function Login({
  blur,
  setBlur,
  loggedIn,
  setLoggedIn,
  loginBox,
  setLoginBox,
  photoData,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [signUpError, setSignUpError] = useState(false);

  const login = async () => {
    setTimeout(setLoginError(false), 1000);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message);

      setLoginError(true);
    }
  };
  const loginErrorElement = (
    <>
      {password && password.length < 6 ? (
        <p className="text-red-600 text-center sm:text-[10px] xl:text-xl lg:text-sm ">
          Password must be at least 6 characters in length!
        </p>
      ) : (
        <p className="text-red-600 transform duration-500 opacity-100 sm:text-[10px] lg:text-sm text-center w-5/6 m-auto xl:text-xl sm:text-md">
          Invalid Email/Password Combination. Please try again!
        </p>
      )}
    </>
  );

  const inputForm = (
    <>
      <br />
      <input
        type="email"
        className={`invalid:text-red-600 lg:text-sm lg:p-2 sm:p-1  w-3/4 sm:text-[10px] my-3 required invalid:border-red-600 text-black xl:text-xl xl:p-4 border-4 border-none rounded-3xl m-auto block`}
        placeholder="Email..."
        onChange={(event) => {
          setSignUpError(false);
          setLoginError(false);
          setEmail(event.target.value);
        }}
      />

      <input
        type="password"
        className={`text-black xl:text-xl lg:text-sm lg:p-2 xl:p-4 sm:p-1  sm:text-[10px] my-3 w-3/4 border-4 border-none rounded-3xl m-auto block`}
        placeholder="Password..."
        onChange={(event) => {
          setSignUpError(false);
          setLoginError(false);
          setPassword(event.target.value);
        }}
      />
    </>
  );
  const loginElement = (
    <div
      className={`border-0 absolute m-auto left-0 right-0 xl:w-[70%] xl:h-[70%] sm:w-[50%] sm:text-sm sm:h-[70%] lg:w-[50%] lg:h-[90%]  top-0 bottom-0 rounded-3xl z-40  text-3xl`}
    >
      <div
        id="login"
        className={`absolute xl:top-0 m-auto xl:bottom-0 left-8 sm:-left-0 sm:block overflow-hidden inline-block xl:text-3xl lg:text-xl md:text-sm xl:h-[90%] xl:w-[45%] rounded-3xl sm:w-[100%] sm:h-[45%]  border-blue-600 border-4`}
      >
        <h1
          className={`text-white text-center bg-blue-900 p-4 sm:p-2 z-38 border-blue-600 border-b-4 `}
        >
          Login
        </h1>
        {inputForm}

        <div className="my-2 text-center">
          <Link href="/">
            <Button func={login} />
          </Link>
        </div>
        {loginError ? loginErrorElement : <p></p>}
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      {loginElement}
    </>
  );
}
