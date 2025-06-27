"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { BsBoxArrowLeft } from "react-icons/bs";

export default function NotFound() {
  const [hovered, setHovered] = useState<boolean>(false);
  const pathName = usePathname();

  return (
    <div className="h-screen flex items-center justify-center bg-[#B9D4AA] px-4">
      <div className="text-center">
        <p className="text-[#5d8b71] font-semibold">
          Kamu mencoba mengakses: <span className="font-bold">{pathName}</span>
        </p>
        <h1 className="text-[12em] font-bold text-slate-50">404</h1>
        <p className="text-lg text-[#5A827E]">Halaman tidak ditemukan.</p>
        <Link
          href="/"
          className="relative rounded-md inline-block justify-center mt-5 px-4 py-2 cursor-pointer text-[#f0fff4] bg-[#5A827E]"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="flex items-center">
            <BsBoxArrowLeft
              className={`mr-2 transition-transform ${
                hovered ? "translate-x-0 opacity-100" : "translate-x-5 opacity-0"
              }`}
            />
            <p className={`transition-transform ${hovered ? 'translate-x-0' : '-translate-x-3'}`}>Kembali</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
