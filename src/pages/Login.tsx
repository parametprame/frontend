import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PartyList } from "./PartyList";

async function loginUser(credentials: any) {
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const response = await loginUser({
      email,
      password,
    });

    if (response.status == "error") {
      setError(response.message);
    } else {
      localStorage.setItem("token", response.token);
      window.location.href = "/";
    }
  };

  const token = localStorage.getItem("token");

  if (token) {
    window.location.href = "/";
  }


  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src="https://media.discordapp.net/attachments/839107739786543137/949301402151288872/people-having-fun-wedding-hall.jpg?width=1600&height=1067"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        <div className="w-full h-100">
          <div className="flex justify-center">
            <img
              src=" https://media.discordapp.net/attachments/839107739786543137/949310151779844136/party-time.png"
              alt=""
              className="w-3/6 h-3/6 object-cover object-center"
            />
          </div>
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12 text-center">
            ลงชื่อเข้าใช้งานระบบ
          </h1>

          <form
            className="mt-6"
            action="#"
            method="POST"
            onSubmit={handleLogin}
          >
            <div>
              <label className="block text-gray-700">อีเมล</label>
              <input
                type="email"
                name=""
                id=""
                placeholder="กรอกอีเมลแอดเดรส"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
                autoComplete="new-email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">รหัสผ่าน</label>
              <input
                type="password"
                name=""
                id=""
                placeholder="กรอกรหัสผ่าน"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
                required
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <>
                {" "}
                <p className="text-red-600 mt-2"> {error} </p>{" "}
              </>
            )}

            <button
              type="submit"
              className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
            >
              เข้าสู่ระบบ
            </button>
          </form>
          <a href="/register">
            <button
              className="w-full block bg-slate-500 hover:bg-slate-400 focus:bg-slate-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
            >
              สร้างบัญชีผู้ใช้
            </button>
          </a>
          
          <hr className="my-6 border-gray-300 w-full" />
        </div>
      </div>
    </section>
  );
};
