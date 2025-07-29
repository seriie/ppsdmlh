"use client";

import { LuHouse, LuMoonStar, LuSun } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import ProfileDropDown from "@/components/ui/ProfileDropDown";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import menuAnimation from "@/assets/menuV3.json";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void
};

export default function DesktopSidebar({ isOpen, setIsOpen }: Props) {
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); 

  }, []);

  const handleToggle = () => {
    if (lottieRef.current) {
      lottieRef.current.setDirection(isOpen ? -1 : 1);
      lottieRef.current.play();
    }
    setIsOpen(!isOpen);
  };

  console.log("mounted:", mounted);
console.log("theme:", theme);



  return (
    <aside
      className={cn(
        "bg-teal-200 dark:bg-teal-700 h-screen transition-all duration-300 ease-in-out border-r shadow-sm p-4 rounded-r-4xl",
        isOpen ? "w-64" : "w-24"
      )}
      >
    <div className="flex flex-col justify-between h-full">

      <div className={cn("flex flex-col gap-6 w-full", isOpen ? "items-start" : "items-center")}>
       
        <div className={cn("flex items-center  w-full", !isOpen ? "justify-center" : "justify-between")}>
          {isOpen && <span className="text-xl font-semibold">Dashboard</span>}
          <button
            onClick={handleToggle}
            className="w-10 h-10 text-gray-700 focus:outline-none cursor-pointer"
            aria-label="Toggle Sidebar"
          >
            <Lottie
              lottieRef={lottieRef}
              animationData={menuAnimation}
              autoplay={false}
              loop={false}
              style={{ width: 40, height: 40, transform: isOpen ? "rotate(0deg)" : "rotate(180deg)" }}
            />
          </button>
        </div>

    
        <button
          onClick={() => router.push("/dashboard")}
          className={cn(
            "flex items-center gap-2 text-slate-800 hover:bg-teal-200 w-full active:scale-[0.98] hover:scale-[1.03] focus:bg-teal-300 transition-all transform duration-300 p-2 rounded-lg",
            !isOpen && "justify-center w-3/4"
          )}
        >
          <LuHouse size={30} />
          {isOpen && <span>Beranda</span>}
        </button>

      </div>
  
     <div className="relative flex flex-col mt-auto gap-2 w-full">

        <ProfileDropDown className={cn( !isOpen && "bg-transparent shadow-none")} hidden={!isOpen ? "hidden" : " "} />
        { mounted && theme === "dark" ? (
          <button
            onClick={() => setTheme("light")}
            className={cn(
              "flex items-center gap-2 mt-4 text-slate-800 hover:bg-teal-200 w-full active:scale-[0.98] focus:bg-teal-300 transition-all transform duration-500 p-2 rounded-lg",
              !isOpen && "justify-center"
            )}
          >
            <LuSun size={25} />
            {isOpen && <span>Light Mode</span>}
          </button>
        ) : mounted && theme === "light" ? (
          <button
          onClick={() => setTheme("dark")}
          className={cn(
            "flex items-center gap-2 mt-4 text-slate-800 hover:bg-teal-200 w-full active:scale-[0.98] focus:bg-teal-300 transition-all transform duration-500 p-2 rounded-lg",
            !isOpen && "justify-center"
          )}
          >
          <LuMoonStar size={25} />
          {isOpen && <span>Dark Mode</span>}
        </button>
        ) : null}

          </div>
    </div>
    </aside>
  );
}
