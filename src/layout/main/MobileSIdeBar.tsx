"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { RiMenu2Fill } from "react-icons/ri";
import { LuHouse } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuMoonStar, LuSun } from "react-icons/lu";
import ProfileDropDown from "@/components/ui/ProfileDropDown";
import { useTheme } from "next-themes";



export default function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();

  const handleNavigation = (path: string) => {
    router.push(path);
    setOpen(false);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <RiMenu2Fill className="w-6 h-6 text-teal-400" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] flex flex-col h-full p-4 items-start bg-teal-100 dark:bg-teal-800">
        <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">Dashboard</h1>

        <button onClick={() => handleNavigation("/dashboard")} className="flex items-center gap-2 text-black hover:bg-teal-200 focus:bg-teal-300 w-full p-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-[1.03] active:scale-[0.98]">
          <LuHouse size={25} />
          <span className="ml-2 text-md items-center text-black">Beranda</span>
        </button>

        <div className="w-full border-t pt-4 border-slate-200 mt-auto">

          <div className="pt-4 border-t border-slate-200 relative bottom-10">

            <ProfileDropDown />


            {resolvedTheme === "dark" ? (
              <button
                onClick={() => setTheme("light")}
                className="flex items-center gap-2 mt-4 text-black hover:bg-teal-200 w-full active:scale-[0.98] focus:bg-teal-300 transition-all transform duration-500 p-2 rounded-lg"

              >
                <LuSun size={25} />
                <span>Light Mode</span>
              </button>
            ) : (
              <button
                onClick={() => setTheme("dark")}
                className=
                "flex items-center gap-2 mt-4 text-black hover:bg-teal-200 w-full active:scale-[0.98] focus:bg-teal-300 transition-all transform duration-500 p-2 rounded-lg"
              >
                <LuMoonStar size={25} />
                <span>Dark Mode</span>
              </button>
            )}

          </div>
        </div>

      </SheetContent>
    </Sheet>
  )
}
