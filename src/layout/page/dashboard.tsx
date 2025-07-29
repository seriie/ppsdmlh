"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  ClipboardList,
  BarChart2,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { nameShorter } from "@/lib/utils/nameShorter";
import MobileSidebar from "../main/MobileSIdeBar";
import DesktopSidebar from "@/layout/main/DesktopSidebar";
import { cn } from "@/lib/utils";
import Questionnaire from "@/assets/Questionnaire.png";
import Image from "next/image";


export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);


  const fullname = session?.user?.fullname || "User";
  if (!fullname) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }
  const nameShortened = nameShorter(fullname, 2);




  return (
    <div className="flex min-h-screen bg-gray-100">

      <div className="hidden md:block fixed z-10">
        <DesktopSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>


      <div
        className={cn(
          "flex-1 overflow-x-auto transition-all duration-300 ease-in-out",
          isOpen ? "md:ml-64" : "md:ml-24",
          "ml-0"
        )}
      >

        <div className="mainContent flex flex-col mx-w-7xl p-4">
          <div className="relative flex md:flex-row flex-col p-3 md:p-0 bg-gradient-to-b from-cyan-400 via-teal-200 to-teal-50 h-[180px] shadow-md rounded-3xl w-full items-center mb-8">
            <div className="flex justify-start items-start w-full md:w-auto">

              <div className="md:hidden">
                <MobileSidebar />
              </div>
              <Image
                src={Questionnaire}
                alt="Questionnaire"
                className="object-cover md:ml-5 rounded-3xl relative w-40 md:w-[250px]"
                width={350}
                height={200}
                priority
              />
            </div>

            <div className="mb-3 md:mb-0 flex flex-col">
              <h1 className="text-2xl font-semibold text-gray-800">
                Selamat Datang, {nameShortened}
              </h1>
              <p className="text-gray-600">Ayo mulai menjawab soal hari ini!</p>
            </div>
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
    </div>
  );
}