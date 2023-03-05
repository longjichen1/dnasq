import React from "react";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { auth, firestore } from "../firebase-config";
export default function Button({ func }) {
  return (
    <button
      className="bg-green-300 
          
    text-lg
    text-black
    h-auto 
    w-max 
    
    transition
    transform
    duration-700
    hover:scale-110
    text-center 
    font-rob 
    pt-2
    pb-2
    sm:pt-1
    sm:pb-1
    px-4
    rounded-lg
    focus:outline-none
    active:opacity-75"
      onClick={func}
    >
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="lg:h-5 lg:w-5 sm:h-2 sm:w-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          ></path>
        </svg>
      </div>
    </button>
  );
}
