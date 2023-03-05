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

export default function Login({}) {
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
              Login to Your Account
            </h1>

            <div className="flex flex-row -mb-2"></div>
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

            <Link href="/dashboard">
              <button
                onClick={login}
                class="w-full text-black bg-primary-600 mt-4 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login
              </button>
            </Link>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Dont have an account?{" "}
              <a
                href="/apply"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Apply here
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
      {inputForm}
    </>
  );
}
