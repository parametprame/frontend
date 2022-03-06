import { useState } from "react";
import { useParams } from "react-router";

async function createParty(token: any, credentials: any) {
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/parties/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

async function updateParty(token: any, id: any, credentials: any) {
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/parties/update/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}



export const FormParty = (props: any) => {
  const { mode } = props;
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();

  const handleCreate = async (e: any) => {
    e.preventDefault();
    const response = await createParty(token, {
      name,
      number_of_people: number,
    });

    if (response.status == "error") {
      setError(response.error);
    } else {
      window.location.href = `/party/${response.id}`;
    }
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const response = await updateParty(token, id, {
      name,
      number_of_people: number,
    });
    if (response.status == "error") {
      setError(response.error);
    } else {
      window.location.href = `/party/${response.id}`;
    }
  };


  return (
    <>
      <form
        action=""
        method="post"
        onSubmit={mode === "create" ? handleCreate : handleUpdate}
      >
        <div className="md:flex items-center mt-12">
          <div className="w-full flex flex-col">
            <label className="font-semibold leading-none">ชื่อปาร์ตี้</label>
            <input
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
              className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
            />
          </div>
        </div>
        <div className="md:flex items-center mt-8">
          <div className="w-full  flex flex-col ">
            <label className="font-semibold leading-none">จำนวนคนที่ขาด</label>
            <input
              type="number"
              required
              onChange={(e) => setNumber(e.target.value)}
              min="1"
              className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
            />
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          {mode === "create" ? (
            <button
              type="submit"
              className=" block bg-blue-500  py-2 px-4 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg mt-5 md:mt-5 lg:mt-4 xs:mt-6 "
            >
              สร้างปาร์ตี้
            </button>
          ) : (
            <button
              type="submit"
              className=" block bg-blue-500  py-2 px-4 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg mt-5 md:mt-5 lg:mt-4 xs:mt-6 "
            >
              บันทึกข้อมูล
            </button>
          )}
        </div>
        {error && (
          <>
            {" "}
            <p className="text-red-600 mt-2"> {error} </p>{" "}
          </>
        )}
      </form>
    </>
  );
};
