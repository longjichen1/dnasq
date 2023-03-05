import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CollapsingNav from "./CollapsingNav";
import { useThemeContext } from "../context/theme";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, firestore } from "../firebase-config";
const Navbar = () => {
  const [user, setUser, userAccess, setUserAccess] = useThemeContext();
  useEffect(() => {
    console.log(user);
  }, [user]);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="sticky pb-4 sm:pb-0 top-0 z-50 bg-[#28315a] border-b-2 border-black drop-shadow-xl filter shadow-md flex justify-start text-xl px-3 md:pr-20 font-semibold text-white">
        <div className="hidden sm:inline-block ml-[8px] sm:ml-[40px] mr-auto mt-2 w-[120px] h-[40px]">
          <Link href="/">
            <img
              className="w-72 mt-2 px-5  bg-white border-2 rounded-xl"
              src="/logo.png"
              alt="logo"
            />
          </Link>
        </div>
        {userAccess === "admin" ? (
          <div
            className="hidden sm:block text-base m-[20px] hover:underline"
            id="manage"
          >
            <Link href="/manage">Manage Users</Link>
          </div>
        ) : null}
        {user ? (
          <div
            className="hidden sm:block text-base m-[20px] hover:underline"
            id="about"
          >
            <Link href="/dashboard">Dashboard</Link>
          </div>
        ) : (
          <div
            className="hidden sm:block text-base m-[20px] hover:underline"
            id="workshops"
          >
            <Link href="/apply">Apply</Link>
          </div>
        )}

        {user ? (
          <div
            className="hidden sm:block text-base m-[20px] hover:underline"
            id="logout"
          >
            <Link
              onClick={() => {
                signOut(auth);
              }}
              href="/apply"
            >
              Logout
            </Link>
          </div>
        ) : (
          <div
            className="hidden sm:block text-base m-[20px] hover:underline"
            id="login"
          >
            <Link href="/login">Login</Link>
          </div>
        )}
        <CollapsingNav setIsOpen={setIsOpen} isOpen={isOpen} />
      </div>
      {isOpen ? (
        <div className="z-40 fixed w-full top-16 bg-[#28315a]">
          <div className="md:hidden" id="mobile-menu">
            <a
              href="/"
              className="text-center text-white hover:bg-[#37406c]  block px-3 py-2 rounded-md text-base font-medium"
            >
              {" "}
              Home{" "}
            </a>
            <a
              href="/dashboard"
              className="text-center text-white hover:bg-[#37406c]  block px-3 py-2 rounded-md text-base font-medium"
            >
              {" "}
              Dashboard{" "}
            </a>

            <a
              href="/workshops"
              className="text-center text-white hover:bg-[#37406c]  block px-3 py-2 rounded-md text-base font-medium"
            >
              {" "}
              Workshops{" "}
            </a>
            <a
              href="/hackathons"
              className="text-center text-white hover:bg-[#37406c]  block px-3 py-2 rounded-md text-base font-medium"
            >
              {" "}
              Past Hackathons{" "}
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
