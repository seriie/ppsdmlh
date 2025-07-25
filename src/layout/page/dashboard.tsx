"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  ClipboardList,
  BarChart2,
  CheckCircle,
  LogOut,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Sidebar from "@/layout/main/DesktopSidebar";
import { LuHouse, LuMoonStar } from "react-icons/lu";
import { nameShorter } from "@/lib/utils/nameShorter";
import icon from "@/assets/icon.png"
import Image from "next/image";
import MobileSidebar from "../main/MobileSIdeBar";
import DesktopSidebar from "@/layout/main/DesktopSidebar";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();

  const fullname = session?.user?.fullname || "User";
  if (!fullname) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }
  const nameShortened = nameShorter(fullname, 2);

  const handleLogout = () => {
    setLoggingOut(true);
    signOut({ callbackUrl: "/" });
  };



  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">


          <div className="md:hidden">
            <MobileSidebar />
          </div>
          <div>
            <div className="hidden md:flex items-start">
              <DesktopSidebar />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p> Selamat datang kembali, {nameShortened}!
            </p>
          </div>
          <Button variant="outline" className={`${loggingOut ? 'bg-slate-200' : 'hover:bg-slate-200'} cursor-pointer`} onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            {loggingOut ? "Keluar..." : "Keluar"}
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="shadow-md hover:shadow-lg transition">
            <CardHeader className="flex flex-row items-center gap-4">
              <ClipboardList className="text-blue-500 w-6 h-6" />
              <div>
                <CardTitle>Soal Hari Ini</CardTitle>
                <CardDescription>Aktif hingga pukul 20:00</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-lg font-semibold text-green-600">Tersedia ✅</p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition">
            <CardHeader className="flex flex-row items-center gap-4">
              <BarChart2 className="text-purple-500 w-6 h-6" />
              <div>
                <CardTitle>Soal Terjawab</CardTitle>
                <CardDescription>Hari ini</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-lg font-semibold text-gray-800">5 Soal</p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition">
            <CardHeader className="flex flex-row items-center gap-4">
              <CheckCircle className="text-teal-500 w-6 h-6" />
              <div>
                <CardTitle>Progress</CardTitle>
                <CardDescription>Menjawab soal</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-teal-500 h-2 rounded-full w-[60%]" />
              </div>
              <p className="text-sm text-gray-600">60% selesai</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 flex justify-center gap-4">
          <Button onClick={() => router.push("/questionnaire")}>
            Isi Soal Sekarang
          </Button>
          <Button variant="outline">Lihat Riwayat</Button>
        </div>
      </div>
    </div>
  );
}