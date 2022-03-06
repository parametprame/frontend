import React, { useState } from "react";
import dontenv from 'dotenv'


async function registerUser(credentials: any) {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }
  
export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setReapeatPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: any) => {
    e.preventDefault();
    const response = await registerUser({
      email,
      password,
    });
    
    if (response.status == "error") {
      setError(response.error);
    } else{
        window.location.href = "/login";
    }
  };

  const token = localStorage.getItem("token");

  if (token) {
    window.location.href = '/'
}

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src="https://media.discordapp.net/attachments/839107739786543137/949320802329821265/sign-up-membership-registration-follow-concept.jpg?width=1596&height=1065"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
          flex items-center justify-center"
      >
        <div className="w-full h-100">
          
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12 text-center">
            สร้างบัญชีผู้ใช้
          </h1>

          <form className="mt-6" action="#" method="POST" onSubmit={handleRegister}>
            <div>
              <label className="block text-gray-700">อีเมล</label>
              <input
                type="email"
                name=""
                id=""
                placeholder="กรอกอีเมลแอดเดรส"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                required
                onChange={e => setEmail(e.target.value)}
                autoComplete="nope"
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
                autoFocus
                minLength={6}
                onChange={e => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">ยืนยันรหัสผ่าน</label>
              <input
                type="password"
                name=""
                id=""
                placeholder="ยืนยันรหัสผ่าน"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
                required
                autoFocus
                minLength={6}
                onChange={e => setReapeatPassword(e.target.value)}

              />

              {repeatPassword != password && (<p className="text-red-600 mt-2"> รหัสผ่านไม่ตรงกัน </p>)}
            </div>
            <div className="mt-4">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  id="customCheckLogin"
                  type="checkbox"
                  required
                  className="form-checkbox border-0 rounded text-blue-300 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                />
                <span className="ml-2 text-sm font-semibold ">
                  ฉันยอมรับกับเงื่อนไขข้อตกลงเกี่ยวกับการใช้งาน
                </span>
              </label>
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
              ยืนยัน
            </button>
          </form>

          <p className="mt-2 text-sm font-semibold"> ถ้ามีบัญชีผู้ใช้แล้ว <a href="/login"><span className="mt-2 text-sm font-semibold text-blue-600 hover:text-blue-400"> กลับไปหน้าลงชื่อเข้าใช้งานระบบ</span> </a></p>
          <hr className="my-6 border-gray-300 w-full" />
        </div>
      </div>
    </section>
  );
};
