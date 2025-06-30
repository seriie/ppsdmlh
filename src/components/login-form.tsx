import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";

export default function LoginForm() {
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  
  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/auth/login`, {
          email, password
        });
  
      if (data.token) {
        await signIn("credentials", {
          redirect: false,
          token: data.token,
          callbackUrl: '/dashboard',
        });
      }
      setIsLoggingIn(false);
      router.push('/questionnaire');
    } catch (e) {
      const eMsg = e instanceof Error ? e?.message : "Login gagal";
      console.log(e);
      setError(eMsg);
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="bg-transparent max-w-md backdrop-blur-3xl w-3/4 relative md:top-15 rounded-lg"
      >
        <div className="text-center">
          <h1 className="text-2xl text-[#5A827E] font-bold">Login</h1>
          <p className="mt-2 text-[#5A827E]">Silakan masuk untuk lanjut</p>
        </div>

        <div className="mt-4 flex flex-col w-full gap-2">
          <input
            className="focus:outline-[#84AE92] border-2 border-[#5A827E] text-[#84AE92] outline-1 rounded-2xl p-2"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              className="focus:outline-[#84AE92] border-2 border-[#5A827E] text-[#84AE92] outline-1 rounded-2xl p-2 w-full"
              type={showPw ? "text" : "password"}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              onClick={() => setShowPw(!showPw)}
              className="absolute top-3 right-3 cursor-pointer text-[#5A827E]"
            >
              {showPw ? <IoMdEyeOff /> : <IoMdEye />}
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="p-3 cursor-pointer bg-[#5A827E] rounded-2xl text-slate-50 mt-2.5 hover:bg-[#84AE92] transition-colors duration-200"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? 'memasuk...' : 'masuk'}
          </button>
          <p className="text-center text-slate-900">
            Belum punya akun?{" "}
            <a className="text-sky-500 hover:underline" href="/register">
              Daftar
            </a>
          </p>
        </div>
      </form>
    </>
  );
}
