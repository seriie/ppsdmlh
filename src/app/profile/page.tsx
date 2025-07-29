"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { nameShorter } from "@/lib/utils/nameShorter";
import MobileSidebar from "@/layout/main/MobileSIdeBar";
import DesktopSidebar from "@/layout/main/DesktopSidebar";
import { cn } from "@/lib/utils";
import Questionnaire from "@/assets/Questionnaire.png";
import Image from "next/image";


export default function Page() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);


  const fullname = session?.user?.fullname || "User";
  if (!fullname) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }




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

        <div className="mainContent flex flex-col mx-w-7xl mx-auto p-4">

          <div className="relative justify-between p-5 md:p-0 bg-gradient-to-b from-cyan-400 via-teal-200 to-teal-50 h-[170px] shadow-md rounded-3xl w-full items-center mb-8">
            <div className="md:hidden">
              <MobileSidebar />
            </div>
            <Image
              src={Questionnaire}
              alt="Questionnaire"
              className="object-cover ml-1 md:ml-5 rounded-3xl absolute w-40 md:w-[250px]"
              width={350}
              height={200}
              priority
            />

            <div className="mx-auto my-auto flex flex-col mt-10 ml-20 items-center justify-center">

              <h1 className="text-2xl font-semibold mb-4">Welcome, {nameShorter(fullname, 2)}!</h1>
              <p className="text-gray-600 mb-6">This is your dashboard where you can manage your profile and settings.</p>
            </div>
          </div>

          <div className="">

          </div>



          <div className="mt-10 flex justify-center gap-4">
            <Button className="bg-teal-500 text-white hover:bg-teal-600 transition-colors duration-300">
              Simpan
            </Button>

          </div>
        </div>
      </div>
    </div>
  );
}