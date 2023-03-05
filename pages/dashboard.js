import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { firestore } from "../firebase-config";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { useThemeContext } from "../context/theme";
import { Modal } from "../components/Modal";

function dashboard() {
  const [dat, setDat] = useState({});
  const [userList, setUserList] = useState([]);
  const [user, setUser, userAccess, setUserAccess] = useThemeContext();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState("");
  const handleAuthorization = async (data) => {
    if (data) {
      const set = data.access === true ? false : true;
      let copyData = data;
      copyData.access = set;
      const ref = await setDoc(
        doc(firestore, `genome_data`, `chr${data.chr}:${data.pos}`),
        copyData
      );
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

        <div className="w-[50%] h-[50vh] text-center bg-white mt-20 flex flex-col rounded-xl shadow-md justify-center m-auto text-3xl text-black">
          <img className=" mx-auto w-32" src="/wait.png" alt="" />
          <h1 className="my-6">Please wait for application approval!</h1>
        </div>
      </>
    );
  return (
    <>
      {open ? <Modal setOpen={setOpen} pos={pos} dat={dat} /> : null}
      <Navbar />

      <div class="w-[100%]  relative mx-auto  shadow-md sm:rounded-lg">
        <table class="relative w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
            {userList?.map((data, i) => {
              return data.access || userAccess === "admin" ? (
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
                        onClick={() => {
                          setOpen(true);
                          setPos(`chr${data.chr}:${data.pos}`);
                          setDat(data);
                        }}
                        class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        View
                      </a>
                    </td>
                  ) : null}

                  {userAccess === "admin" ? (
                    <td class="px-6 py-4">
                      <a
                        onClick={() => handleAuthorization(data)}
                        href="#"
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        {data.access === true ? "Lock" : "Unlock"}
                      </a>
                    </td>
                  ) : null}
                </tr>
              ) : null;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default dashboard;
