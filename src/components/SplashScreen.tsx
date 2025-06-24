"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../assets/icon.png"

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [step, setStep] = useState<"logo-fadein" | "logo-rise" | "text-show" | "done">("logo-fadein");

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep("logo-rise"), 1500),      // setelah fade in logo selesai
      setTimeout(() => setStep("text-show"), 2500),      // lalu teks muncul
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  if (step === "done") return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center px-4 transition-opacity duration-1000">
      <div className="relative flex flex-col items-center w-full max-w-md">
        {/* LOGO */}
        <Image
          src={Logo}
          alt="Logo"
          className={`w-50 h-24 transition-all duration-1000 ${
            step === "logo-fadein" ? "opacity-0" :
            step === "logo-rise" ? "opacity-100 translate-y-[-60px]" :
            "opacity-100 translate-y-[-60px]"
          }`}
        />

        {/* TEKS + BUTTON */}
        {step === "text-show" && (
          <div className="text-center mt-6 animate-fade-up">
            <h1 className="text-xl font-semibold text-gray-800">
              Selamat datang di survey lingkungan hidup
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Suaramu penting untuk masa depan bumi
            </p>
            <button
              onClick={() => {
  setStep("done");
  onFinish();
}}
              className="mt-6 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Mulai
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
