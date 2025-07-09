"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SplashScreen({ logoSrc }: {logoSrc: string}) {
  const [showText, setShowText] = useState(false);
  const [logoUp, setLogoUp] = useState(false);
  const [fadeInLogo, setFadeInLogo] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeInLogo(true), 100);
    const pauseTimer = setTimeout(() => setLogoUp(true), 2000);
    const textTimer = setTimeout(() => setShowText(true), 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(pauseTimer);
      clearTimeout(textTimer);
    };
  }, []);

  const handleStart = () => {
    router.push("/auth/login");
  };

  return (
    <div className={`fixed inset-0 w-full flex items-center justify-center bg-[#B9D4AA] px-4`}>
      <div className="relative w-full max-w-xl text-center">
        <div
          className={`transition-all duration-500 ease-in-out mx-auto
            ${fadeInLogo ? "opacity-100" : "opacity-0"}
            ${logoUp ? "-translate-y-10" : "translate-y-25"}
            w-fit
          `}
        >
          <Image src={logoSrc} alt="Logo" width={200} height={200} priority />
        </div>
        <div className={`text-center transition-all font-sans duration-500 ${showText ? "opacity-100" : "opacity-0"} mt-8`}>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50 delay-[100ms] md:text-nowrap">
            Selamat datang di survey Lingkungan Hidup 🌱
          </h1>
          <span className="text-sm md:text-xl font-medium text-[#5A827E] block mt-2 animate-fade-up delay-[300ms] transition-all">
            Suara kamu penting untuk masa depan bumi
          </span>
          <button
            onClick={handleStart}
            className="mt-6 px-8 py-2 cursor-pointer bg-[#5A827E] text-white rounded-2xl font-semibold hover:scale-110 hover:duration-300 hover:font-bold transition animate-bounce"
          >
            Mulai
          </button>
        </div>
      </div>
    </div>
  );
}
