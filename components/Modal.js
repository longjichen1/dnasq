import React, { useState } from "react";
import Image from "next/image";
import { XIcon } from "@heroicons/react/outline";
import { useThemeContext } from "../context/theme";
import Button from "./Button";

export const Modal = ({ setOpen, pos, dat }) => {
  console.log(Object.keys(dat.info));
  const key = [
    "DP",
    "EUR_AF",
    "AFR_AF",
    "AF",
    "AC",
    "EAS_AF",
    "NS",
    "AMR_AF",
    "AN",
    "VT",
    "SAS_AF",
  ];
  return (
    <div
      className={`fixed z-10 mt-[30vh]  top-[20%] left-[50%] border-0 rounded-sm text-black bg-white shadow-2xl shadow-black -translate-x-[50%] -translate-y-[50%] w-[80vw] h-[30vh] 
      `}
    >
      <div className="flex flex-col justify-center ">
        <h1 className="mt-2 text-lg font-bold text-center">
          Details for {pos}
        </h1>
        <div className="overflow-x-scroll">
          <table class="overflow-scroll table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs overflow-x-scroll text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="overflow-x-scroll">
                <th scope="col" class="px-6 py-3">
                  AC
                </th>
                <th scope="col" class="px-6 py-3">
                  AF
                </th>
                <th scope="col" class="px-6 py-3">
                  AFR_AF
                </th>
                <th scope="col" class="px-6 py-3">
                  AMR_AF
                </th>
                <th scope="col" class="px-6 py-3">
                  AN
                </th>
                <th scope="col" class="px-6 py-3">
                  DP
                </th>
                <th scope="col" class="px-6 py-3">
                  EAS_AF
                </th>
                <th scope="col" class="px-6 py-3">
                  EUR_AF
                </th>
                <th scope="col" class="px-6 py-3">
                  NS
                </th>
                <th scope="col" class="px-6 py-3">
                  SAS_AF
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4">
                  {dat.info.AC}
                </th>
                <th scope="row" class="px-6 py-4">
                  {dat.info.AF}
                </th>
                <th scope="row" class="px-6 py-4">
                  {dat.info.AFR_AF}
                </th>
                <th scope="row" class="px-6 py-4">
                  {dat.info.AMR_AF}
                </th>
                <th scope="row" class="px-6 py-4">
                  {dat.info.AN}
                </th>
                <th scope="row" class="px-6 py-4">
                  {dat.info.DP}
                </th>
                <th scope="row" class="px-6 py-4">
                  {dat.info.EAS_AF}
                </th>
                <th scope="row" class="px-6 py-4">
                  {dat.info.EUR_AF}
                </th>
                <th scope="row" class="px-6 py-4">
                  {dat.info.NS}
                </th>
                <th scope="row" class="px-6 py-4">
                  {dat.info.SAS_AF}
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        {/* //button */}
        <button
          className="border-2 inline-block w-[7%] my-5 mx-auto rounded-md cursor-pointer border-black "
          onClick={() => setOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};
