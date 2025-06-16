"use client";

import { useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import Image from "next/image";
import Logo from "../assets/LogoLoginRegist.png";

export default function RegisterPage() {
  const [showPw, setShowPw] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] min-h-screen">
        <div className="flex bg-slate-50 justify-center items-center h-screen">
          <form className="bg-transparent max-w-md backdrop-blur-3xl w-3/4 relative md:top-15 rounded-lg">
            <div className="text-center">
              <h1 className="text-2xl text-[#5A827E] font-bold">
                Register
              </h1>
              <p className="mt-2 text-[#5A827E]">Silahkan buat akun</p>
            </div>

            <div className="mt-4 flex flex-col w-full gap-2">
              <input
                className="focus:outline-[#84AE92] border-2 border-[#5A827E] text-[#84AE92] outline-1 rounded-2xl p-2"
                type="text"
                placeholder="fullname"
              />
              <input
                className="focus:outline-[#84AE92] border-2 border-[#5A827E] text-[#84AE92] outline-1 rounded-2xl p-2"
                type="email"
                placeholder="email"
              />
              <div className="relative">
                <input
                  className="focus:outline-[#84AE92] border-2 border-[#5A827E] text-[#84AE92] outline-1 rounded-2xl p-2 w-full"
                  type={showPw ? "text" : "password"}
                  placeholder="password"
                />
                <div
                  onClick={() => setShowPw(!showPw)}
                  className="absolute top-3 right-3 cursor-pointer text-[#5A827E]"
                >
                  {showPw ? <IoMdEyeOff /> : <IoMdEye />}
                </div>
              </div>
              <button
                type="submit"
                className="p-3 cursor-pointer bg-[#5A827E] rounded-2xl text-slate-50 mt-2.5 hover:bg-[#84AE92] transition-colors duration-200"
              >
                Daftar
              </button>
              <p className="text-center text-slate-900">
                Sudah punya akun?{" "}
                <a className="text-sky-500 hover:underline" href="/login">
                  Masuk
                </a>
              </p>
            </div>
          </form>
        </div>

          <div className="hidden h-screen w-full md:flex items-center justify-end-safe p-8 bg-[#FAFFCA]">
            <Image src={Logo} alt="gambar" className="w-3xl absolute pt-30"></Image>
          </div>
      </div> 
    </>
  );
}
