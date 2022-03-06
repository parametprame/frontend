import { useState } from "react";
import { Link } from "react-router-dom";

async function deleteParty(token: any, id: any) {
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/parties/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((data) => data.json());
}


export const OwnerParty = (props: any) => {
  const { data, role } = props;
  const token = localStorage.getItem("token");
  const [error, setError] = useState("");

  const handleDelete = async ( id : any) => {
    const response = await deleteParty(token, id)
    console.log(response)
    if (response.status == "error") {
      setError(response.error);
    } else {
      window.location.reload()
    }
  };

  return (
    <>
      {data.parties?.map(
        (item: any) =>
          item.role == role && (
            <div className=" rounded overflow-hidden shadow-lg flex flex-col">
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
              </div>
              <div className="px-6 pt-4 pb-2 flex justify-between align-middle flex-col md:flex-row">
                <Link to={`/edit/${item.party_id}`}>
                  <button className=" block bg-green-500  py-2 px-4 hover:bg-green-400 focus:bg-green-400 text-white font-semibold rounded-lg mt-5 md:mt-5 lg:mt-4 xs:mt-6 ">
                    แก้ไขรายละเอียดปาร์ตี้
                  </button>
                </Link>
                <button onClick={() => handleDelete(item.party_id)} className=" block bg-red-500  py-2 px-4 hover:bg-red-400 focus:bg-red-400 text-white font-semibold rounded-lg mt-5 md:mt-5 lg:mt-4 xs:mt-6 ">
                  ลบปาร์ตี้
                </button>
              </div>
            </div>
          )
      )}
    </>
  );
};
