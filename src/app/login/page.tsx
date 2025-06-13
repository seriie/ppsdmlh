"use client";

import { useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";

export default function RegisterPage() {
    const [showPw, setShowPw] = useState(false);

    return (
        <>
            <div className="absolute flex justify-center items-center inset-0">
                <form className="bg-transparent backdrop-blur-3xl w-xs p-4 border-zinc-500 border rounded-md">
                    <div className="text-center">
                        <h1 className="text-lg text-slate-100">Halo</h1>
                        <p className="">Login untuk melanjutkan</p>
                    </div>

                    <div className="mt-4 flex flex-col w-full gap-4">
                        <input className="focus:outline-slate-50 outline-1 rounded-md p-2" type="email" placeholder="email" />
                        <div className="relative">
                            <input className="focus:outline-slate-50 outline-1 rounded-md p-2 w-full" type={showPw ? 'text' : 'password'} placeholder="password" />
                            <div onClick={() => setShowPw(!showPw)} className="absolute top-3 right-3 cursor-pointer">{showPw ? <IoMdEyeOff /> : <IoMdEye />}</div>
                        </div>
                        <button type="submit" className="p-2 cursor-pointer bg-slate-100 rounded-md text-slate-800 mt-2 hover:bg-slate-300 transition-colors duration-200">Masuk</button>
                        <p className="text-center">Belum punya akun? <a className="text-sky-500 hover:underline" href="/register">Daftar</a></p>
                    </div>
                </form>
            </div>
        </>
    )
}