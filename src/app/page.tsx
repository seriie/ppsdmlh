import Image from "next/image";
import icon from '../assets/icon.png';

export default function Home() {
  return (
    <div className="bg-[#B9D4AA] h-screen flex flex-col justify-center items-center">
      <Image className="w-64" src={icon} alt="" />
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-100">Selamat Datang di Survei Lingkungan Hidup 🌱</h1>
        <p className="text-green-700 font-semibold">Suara kamu penting untuk masa depan bumi.</p>
      </div>
      <a className="" href="/questionnaire">Mulai</a>
    </div>
  );
}
