import React, { useState, useEffect } from "react";
import axios from "axios";
import { LoginPage } from "./Login";
import { OwnerParty } from "../components/OwnerParty";
import { JoinParty } from "../components/JoinParty";

export const MyParties = () => {
  const [data, setData] = useState<Array<any>>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const [ownerParty, setOwnerparty] = useState("owner");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const data = res.data;
          setData(data);
          setLoading(false);
        });
    }
    fetchData();
  }, []);

  if (!token) {
    return <LoginPage />;
  }

  const ChangToJoin = () => {
    setOwnerparty("join");
  };

  const ChangToOwner = () => {
    setOwnerparty("owner");
  };

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

  return (
    <>
      <div>
        <header className="bg-white shadow flex justify-between  flex-col md:flex-row">
          <div className="max-w-7xl mx-auto py-6 px-1 sm:px-6 lg:px-8">
            <button
              onClick={ChangToOwner}
              className="no-underline hover:underline focus:underline"
            >
              ปาร์ตี้ที่ฉันเป็นเจ้าของ
            </button>
          </div>
          <div className="max-w-7xl mx-auto py-6 px-1 sm:px-6 lg:px-8">
            <button
              className="no-underline hover:underline focus:underline"
              onClick={ChangToJoin}
            >
              {" "}
              ปาร์ตี้ที่ฉันเข้าร่วม{" "}
            </button>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8  ">
            <div className="px-4 py-6 sm:px-0  h-full">
              {ownerParty == "owner" ? (
                <p className="text-center font-bold text-xl	">
                  ปาร์ตี้ที่ฉันเป็นเจ้าของ
                </p>
              ) : (
                <p className="text-center font-bold text-xl	">
                  ปาร์ตี้ที่ฉันเข้าร่วม
                </p>
              )}
              <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                {ownerParty == "owner" ? (
                  <OwnerParty data={Object(data)} role={ownerParty} />
                ) : (
                  <JoinParty data={Object(data)} role={ownerParty} />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
