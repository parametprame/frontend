import { useEffect, useState } from "react";
import axios from "axios";
import { LoginPage } from "./Login";
import { useParams } from "react-router";
import moment from "moment";

export const DetailParty = () => {
  const [data, setData] = useState<Array<any>>([]);
  const token = localStorage.getItem("token");
  const [isLoading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/parties/${id}`)
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
      <main className="relative container mx-auto bg-white px-4">
        <div className="relative -mx-4 top-0 pt-[17%] overflow-hidden">
          <img
            className="absolute inset-0 object-cover object-top w-full h-full filter blur"
            src="https://media.discordapp.net/attachments/839107739786543137/949301402151288872/people-having-fun-wedding-hall.jpg?width=1600&height=1067"
            alt=""
          />
        </div>

        <div className="mt-[-10%] w-1/2 mx-auto">
          <div className="relative pt-[56.25%] overflow-hidden rounded-2xl">
            <img
              className="w-full h-full absolute inset-0 object-cover"
              src="https://media.discordapp.net/attachments/839107739786543137/949301402151288872/people-having-fun-wedding-hall.jpg?width=1600&height=1067"
              alt=""
            />
          </div>
        </div>

        <article className="w-full mx-auto py-8 ">
          <h1 className="text-2xl font-bold text-center">
           {data[0]?.name}
          </h1>
          <h2 className="mt-2 text-sm text-gray-500 text-center">
            {data[0]?.create_by[0].email},{" "}
            {moment(data[0]?.createdAt).format("MMMM Do YYYY")}
          </h2>
          <p className="text-center mt-20 font-bold text-2xl">ผู้เข้าร่วม</p>
          <div className="p-10 grid mt-10 grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 justify-items-center">
            {data[0]?.peopls.length > 0
              ? data[0]?.peopls.map((item: any) => (
                  <div className=" h-full w-3/6 rounded overflow-hidden flex flex-col ">
                    <div className="h-5/6  bg-cover hover:bg-gray">
                      <img
                        className="h-full w-full object-fit object-center"
                        src="https://media.discordapp.net/attachments/839107739786543137/949640792694214716/user.png"
                        alt=""
                      />
                    </div>
                    <div className="mx-6 my-4 ">
                      <div className="font-medium text-base text-gray-darker mb-4 text-center">
                        {item.email}
                      </div>
                    </div>
                  </div>
                ))
              : (
                  <p className="text-center"> ยังไม่มีผู้เข้าร่วม </p>
              )}
          </div>
        </article>
      </main>
    </>
  );
};
