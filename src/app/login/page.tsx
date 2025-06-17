"use client";

import Logo from "../../assets/LogoLoginRegist.png";
import Image from "next/image";
import icon from "../../assets/icon.png";
import LoginForm from "@/components/login-form";

export default function LoginPage() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr]">
        <div className="flex flex-col bg-slate-50 justify-center items-center h-screen">
          <Image className="w-48" src={icon} alt="logo" />
          <LoginForm />
        </div>

        <div className="hidden h-screen w-full md:flex items-center relative justify-end p-8 bg-[#B9D4AA]">
          <Image src={Logo} alt="gambar" className="md:w-2xl xl:w-4xl absolute pt-30" />
        </div>
      </div>
    </>
  );
}
