import { LoginPage } from "./Login";
import { FormParty } from "../components/FormParty";

export const CreateParty = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <LoginPage />;
  }

  return (
    <section className="flex flex-col md:flex-row h-screen items-center ">
      <div className="w-full">
        <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
          <div className="bg-white  w-full h-max shadow rounded p-8 sm:p-12 mt-10 bg-">
            <p className="text-3xl font-bold leading-7 text-center">
              สร้างปาร์ตี้
            </p>
            <FormParty mode={"create"} />
          </div>
        </div>
      </div>
    </section>
  );
};
