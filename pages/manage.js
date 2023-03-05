import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { firestore } from "../firebase-config";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { useThemeContext } from "../context/theme";
function manage() {
  const [user, setUser, userAccess, setUserAccess] = useThemeContext();
  if (userAccess !== "admin")
    return (
      <>
        <Navbar />{" "}
        <div className="w-[50%] h-[50vh] text-center bg-white mt-20 flex flex-col rounded-xl shadow-md justify-center m-auto text-3xl text-black">
          <img className=" mx-auto w-32" src="/wait.png" alt="" />
          <h1 className="my-6">Error accessing content!</h1>
        </div>
      </>
    );
  const [userList, setUserList] = useState([]);

  const handleAuthorization = async (user) => {
    if (user) {
      const set = user.access === "authorized" ? "unauthorized" : "authorized";

      const ref = await setDoc(doc(firestore, `users`, user.email), {
        access: set,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
      fetchPost();
    }
  };
  const fetchPost = async () => {
    await getDocs(collection(firestore, "users")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserList(newData);
      console.log(userList, newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <>
      <Navbar />
      <div class="w-[80%]  relative mx-auto  shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                First Name
              </th>
              <th scope="col" class="px-6 py-3">
                Last Name
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Access
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {userList?.map((user, i) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4">
                  {user.firstName}
                </th>
                <td class="px-6 py-4">{user.lastName}</td>
                <td class="px-6 py-4">{user.email}</td>
                <td class="px-6 py-4">{user.access}</td>
                <td class="px-6 py-4">
                  {user.access !== "admin" ? (
                    <a
                      onClick={() => handleAuthorization(user)}
                      href="#"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      {user.access === "unauthorized"
                        ? "Authorize"
                        : "Unauthorize"}
                    </a>
                  ) : (
                    <a></a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default manage;
