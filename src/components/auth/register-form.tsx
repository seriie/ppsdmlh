import React, { useState } from "react";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getAxiosErrorMessage } from "@/lib/utils/getAxiosErrMsg";

import Alerts from "@/components/root/Alerts";

export default function RegisterForm() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsRegistering(true);
    setError("");

    try {
      const res = await axios.post("/api/register", {
        fullname,
        email,
        password,
      });

      if (res.status === 201) {
        setIsRegistering(false);
        router.push("/auth/login");
      } else {
        setError("Registrasi gagal. Coba lagi ya!");
        setIsRegistering(false);
      }
    } catch (e: unknown) {
      setIsRegistering(false);
      setError(getAxiosErrorMessage(e));
    }
  };

  return (
    <>
      {error && (
        <Alerts
          type="warn"
          title="Gagal registrasi"
          description={error}
          time={3000}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-transparent max-w-md backdrop-blur-3xl w-3/4 relative md:top-15 rounded-lg"
      >
        <div className="text-center">
          <h1 className="text-2xl text-[#5A827E] font-bold">Register</h1>
          <p className="mt-2 text-[#5A827E]">Silahkan buat akun</p>
        </div>

        <div className="mt-4 flex flex-col w-full gap-2">
          <input
            className="focus:outline-[#84AE92] border-2 border-[#5A827E] text-[#84AE92] outline-1 rounded-2xl p-2"
            type="text"
            placeholder="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
          <input
            className="focus:outline-[#84AE92] border-2 border-[#5A827E] text-[#84AE92] outline-1 rounded-2xl p-2"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <input
              className="focus:outline-[#84AE92] border-2 border-[#5A827E] text-[#84AE92] outline-1 rounded-2xl p-2 w-full"
              type={showPw ? "text" : "password"}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
            disabled={isRegistering}
          >
            {isRegistering ? "Mendaftar..." : "Daftar"}
          </button>
          <p className="text-center text-slate-900">
            Sudah punya akun?{" "}
            <a className="text-sky-500 hover:underline" href="/auth/login">
              Masuk
            </a>
          </p>
        </div>
      </form>
    </>
  );
}
