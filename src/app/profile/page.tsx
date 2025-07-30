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
import DefaultPp from "@/assets/defaultUserPp.png";
import {toast} from "sonner";


export default function Page() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const user = session?.user;
  const [updateName, setUpdateName] = useState(user?.fullname || " ");

  const nameShortened = nameShorter(updateName || "User", 2);
  const fullname = session?.user?.fullname || "User";
  if (!fullname) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const handleSaveChanges = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${user?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullname: updateName }),
    });

    if (!response.ok) {
      console.error("Failed to update profile");
      return toast.error("Failed to update profile. Please try again.");
    }

    const updatedUser = await response.json();
    console.log("Profile updated successfully:", updatedUser);
    return toast.success("Update Successfully 🚀")
  };


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

              <h1 className="text-2xl font-semibold mb-4">Welcome, {nameShortened}!</h1>
              <p className="text-gray-600 mb-6">This is your dashboard where you can manage your profile and settings.</p>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-6 bg-white shadow-md rounded-lg p-6">

            <h1 className="text-2xl font-semibold text-center md:text-left">Kelola Profil</h1>


            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Image
                src={user?.image || DefaultPp}
                alt="Profile Image"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex flex-col w-full max-w-sm">
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Upload Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-teal-50 file:text-teal-700
          hover:file:bg-teal-100"
                />
              </div>
            </div>


            <form className="space-y-4">
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                  Fullname
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={updateName}
                  onChange={(e) => setUpdateName(e.target.value)}
                  className="mt-1 block w-full md:w-3/4 p-2 pl-4 border border-slate-800 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={user?.email}
                  disabled
                  className="mt-1 block w-full md:w-3/4 p-2 pl-4 border border-slate-800 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  defaultValue={user?.role}
                  disabled
                  className="mt-1 block w-full md:w-3/4 p-2 pl-4 border border-slate-800 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>
            </form>


            <div className="pt-6 flex justify-start">
              <Button onClick={handleSaveChanges} className="bg-teal-500 text-white hover:bg-teal-600 transition-colors duration-300">
                Simpan perubahan
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}