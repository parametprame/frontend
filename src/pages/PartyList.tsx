import { LoginPage } from "./Login";
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { injectStyle } from "react-toastify/dist/inject-style";


async function joinParty(token: any, id: string) {
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/parties/join/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((data) => data.json());
}

export const PartyList = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleJoin = async (id: any) => {
    const response = await joinParty(token, id);
    if (response.status == "error") {
      setError(response.message);
    } else {
      window.location.href = `/party/${response.id}`;
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/parties`)
        .then((res) => {
          const data = res.data.reverse();
          setData(data);
          setLoading(false);
        });
    }

    fetchData();
  }, []);

  const CloseButton = () => {
    setError("");
  };

  if (!token) {
    return <LoginPage />;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center content-center pt-40">
        <div
          style={{ borderTopColor: "transparent" }}
          className="w-16 h-16 border-4 border-blue-400 border-solid rounded-full animate-spin"
        ></div>
      </div>
    );
  }
  if (typeof window !== "undefined") {
    injectStyle();
  }

  const Notification = () => {
    return (
      <div className="m-auto ">
        <div className="bg-white w-full rounded-lg border-gray-300 border p-3 shadow-lg">
          <div className="flex flex-row">
            <div className="px-2">
              <img
                className="h-14 w-14 object-cover object-center"
                src="https://media.discordapp.net/attachments/839107739786543137/949682855611596900/cross.png"
                alt=""
              />
            </div>
            <div className="ml-2 mr-6">
              <span className="font-semibold">Error</span>
              <span className="block text-gray-500">{error}</span>
            </div>
            <div className="px-2">
              <button onClick={CloseButton}>
                <img
                  className="h-6 w-6 object-cover object-center"
                  src="https://media.discordapp.net/attachments/839107739786543137/949683427123273778/cross_1.png"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8  h-screen">
      {error ? (
        <div className=" flex flex-row  item-center">
          <Notification />
        </div>
      ) : null}
      <div className="px-4 py-6 sm:px-0  h-full">
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {data.reverse().map((item: any) => (
            <div className=" rounded overflow-hidden shadow-lg flex flex-col">
              <Link to={`party/${item.id}`}>
                <div className="h-64 bg-cover hover:bg-gray">
                  <img
                    className="h-56 w-full object-cover object-center"
                    src="https://media.discordapp.net/attachments/839107739786543137/949301402151288872/people-having-fun-wedding-hall.jpg?width=1600&height=1067"
                    alt=""
                  />
                </div>
                <div className="mx-6 my-4 border-b border-gray-light">
                  <div className="font-medium text-base text-gray-darker mb-4">
                    {item.name}
                  </div>
                  <p className="font-normal text-gray-dark text-sm mb-2 xs:text-xs sm:text-sm	lg:text-lg	">
                    ผู้สร้าง : <span>{item.create_by[0].email}</span>
                  </p>
                  <p className="font-normal text-gray-dark text-sm mb-4">
                    วันที่สร้าง :{" "}
                    <span>{moment(item.createdAt).format("LLL")}</span>
                  </p>
                </div>
              </Link>
              <div className="px-6 pt-4 pb-2 flex justify-between align-middle flex-col md:flex-row">
                <p>
                  {" "}
                  จำนวนที่ต้องการ : {item.peopls.length} /{" "}
                  {item.number_of_people}
                </p>
                {item.peopls.length == item.number_of_people ? (
                  <button
                    className=" block  cursor-not-allowed py-2 px-4 bg-blue-400  text-white font-semibold rounded-lg mt-5 md:mt-5 lg:mt-4 xs:mt-6 "
                  >
                    Join
                  </button>
                ) : (
                  <button
                    onClick={() => handleJoin(item.id)}
                    className=" block bg-blue-500  py-2 px-4 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg mt-5 md:mt-5 lg:mt-4 xs:mt-6 "
                  >
                    Join
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
