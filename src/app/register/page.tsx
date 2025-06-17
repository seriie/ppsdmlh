"use client";

import Image from "next/image";
import Logo from "../../assets/LogoLoginRegist.png";
import RegisterForm from "@/components/register-form";
import icon from '../../assets/icon.png';

export default function RegisterPage() {

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] min-h-screen">
        <div className="flex flex-col bg-slate-50 justify-center items-center h-screen">
          <Image className="w-48" src={icon} alt="logo" />
          <RegisterForm />
        </div>

          <div className="hidden h-screen w-full md:flex items-center justify-end-safe p-8 bg-[#B9D4AA]">
            <Image src={Logo} alt="gambar" className="md:w-2xl xl:w-3xl absolute pt-30"></Image>
          </div>
      </div> 
    </>
  );
}
