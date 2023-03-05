import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CollapsingNav from "./CollapsingNav";
import { useThemeContext } from "../context/theme";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, firestore } from "../firebase-config";
const Navbar = () => {
  const [user, setUser] = useThemeContext();
  useEffect(() => {
    console.log(user);
  }, [user]);
  // TODO Make text color #FBF1BC and underlined when selected
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="sticky pb-4 sm:pb-0 top-0 z-50 bg-[#28315a] border-b-2 border-black drop-shadow-xl filter shadow-md flex justify-start text-xl px-3 md:pr-20 font-semibold text-white">
        <div className="hidden sm:inline-block ml-[8px] sm:ml-[40px] mr-auto mt-3 w-[40px] h-[40px]">
          <Link href="/">
            <Image
              className="hover:cursor-pointer"
              alt="Logo"
              src="/logos/small_logo.png"
              width={100}
              height={100}
            />
          </Link>
        </div>
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
