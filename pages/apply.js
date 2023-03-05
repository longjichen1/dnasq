import { FirebaseError } from "firebase/app";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
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
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  console.log(user);

  const submitApplication = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const ref = await setDoc(doc(firestore, `users/`, email), {
        access: "unauthorized",
        email: email,
        firstName: first,
        lastName: last,
      });
      //   const user = await createUserWithEmailAndPassword(auth, email, password);

      setTimeout(setSignUpError(false), 1000);
    } catch (error) {
      console.log(error.message);
    }
  };
  if (user)
    return (
      <>
        <Navbar />
        <div>You've submitted your application!</div>
      </>
    );

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
    <section className="bg-transparent dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 my-3 mx-auto md:h-[80%] lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-36 mt-2 px-5 py-2  bg-white border-2 rounded-xl"
            src="/logo.png"
            alt="logo"
          />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
              Apply for an Account
            </h1>

            <div className="flex flex-row -mb-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <input
                  onChange={(event) => {
                    setFirst(event.target.value);
                  }}
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[90%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="First Name"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <input
                  onChange={(event) => {
                    setLast(event.target.value);
                  }}
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[90%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Last Name"
                  required=""
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                onChange={(event) => {
                  setConfirmPW(event.target.value);
                }}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type="confirm-password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>

            <Link href="/dashboard">
              <Button func={submitApplication} />
            </Link>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
  return (
    <>
      <Navbar />
      {signUpElement}
    </>
  );
};

export default Apply;
