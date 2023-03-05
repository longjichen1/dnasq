import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { firestore } from "../firebase-config";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { useThemeContext } from "../context/theme";
function dashboard() {
  const [userList, setUserList] = useState([]);
  const [user, setUser, userAccess, setUserAccess] = useThemeContext();

  const handleAuthorization = async (data) => {
    if (data) {
      const set = data.access === "authorized" ? "unauthorized" : "authorized";

      const ref = await setDoc(doc(firestore, `genome_data`, data.email), {
        access: set,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      fetchPost();
    }
  };
  const fetchPost = async () => {
    await getDocs(collection(firestore, "genome_data")).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUserList(newData);
        console.log(userList, newData);
      }
    );
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (userAccess === "unauthorized")
    return (
      <>
        <Navbar />
        <div className="w-[50%] h-[400px] text-center bg-white mt-6 flex flex-col justify-center m-auto text-3xl text-black">
          Please wait for application approval!
        </div>
      </>
    );
  return (
    <>
      <Navbar />
      <div class="w-[100%]  relative mx-auto  shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Position
              </th>
              <th scope="col" class="px-6 py-3">
                Ref
              </th>
              <th scope="col" class="px-6 py-3">
                Alt
              </th>
              <th scope="col" class="px-6 py-3">
                VT
              </th>
              <th scope="col" class="px-6 py-3">
                Filter
              </th>
              <th scope="col" class="px-6 py-3">
                Format
              </th>

              <th scope="col" class="px-6 py-3">
                Details
              </th>

              {userAccess === "admin" ? (
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {userList?.map((data, i) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4">
                  {"chr" + data.chr + ":" + data.pos}
                </th>
                <td class="px-6 py-4">{data.ref}</td>
                <td class="px-6 py-4">{data.alt}</td>
                <td class="px-6 py-4">{data.info.VT}</td>
                <td class="px-6 py-4">{data.filter}</td>
                <td class="px-6 py-4">{data.format}</td>
                {userAccess !== "unauthorized" ? (
                  <td class="px-6 py-4">
                    <a
                      onClick={() => handleAuthorization(user)}
                      href="#"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      View
                    </a>
                  </td>
                ) : null}

                {userAccess === "admin" ? (
                  <td class="px-6 py-4">
                    <a
                      onClick={() => handleAuthorization(user)}
                      href="#"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      {data.access === true ? "Lock" : "Unlock"}
                    </a>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default dashboard;
