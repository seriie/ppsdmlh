"use client";

import { LuHouse, LuMoonStar } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import ProfileDropDown from "@/components/ui/ProfileDropDown";
import { cn } from "@/lib/utils";
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import menuAnimation from "@/assets/menuV3.json";

export default function DesktopSidebar() {
  const router = useRouter();
  const [expanded, setExpanded] = useState(true);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  const handleToggle = () => {
    if (lottieRef.current) {
     if (expanded) {
  lottieRef.current.setDirection(-1); 
} else {
  lottieRef.current.setDirection(1);  
}
lottieRef.current.play();
    }

  
    setExpanded(prev => !prev);
  };

  return (
    <aside
      className={cn(
        "hidden lg:flex fixed top-4 left-4 bottom-4 flex-col justify-between bg-teal-100 transition-all duration-300 rounded-2xl shadow-xl border border-slate-200",
        expanded ? "w-60 p-4" : "w-20 items-center py-4"
      )}
    >
      <div className={cn("flex flex-col gap-6 items-start w-full, ", expanded ? "items-start" : "items-center")}>
      <div className="flex items-center justify-between w-full">
          <span className={cn("text-xl font-semibold", !expanded && "hidden")}>
          Dashboard    
        </span>
        <button
          aria-label="Toggle menu"
          className="w-10 h-10 text-gray-700 focus:outline-none"
          onClick={handleToggle}
        >
          <Lottie
            lottieRef={lottieRef}
            animationData={menuAnimation}
            autoplay={false}
            loop={false}
            style={{ width: 40, height: 40 }}
          />
        </button>
      
          </div>

     
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-black hover:bg-teal-200 w-full active:scale-[0.98] hover:scale-[1.03]  focus:bg-teal-300 transition-all transform duration-400 ease-in-out p-2 rounded-lg"
        >
          <LuHouse size={25} />
          {expanded && <span>Beranda</span>}
        </button>
      </div>

     
      <div className="border-t pt-4 border-slate-300 w-full">
        <ProfileDropDown
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            !expanded && "hidden"
          )}
        />

       
  <button
    className={cn(
      "flex items-center gap-2 mt-4 text-black hover:bg-teal-200 w-full active:scale-[0.98] focus:bg-teal-300 transition-all transform duration-400 ease-in-out hover:scale-[1.03] p-2 rounded-lg transition-all",
      !expanded && "justify-center w-full"
    )}
  >
    <LuMoonStar size={25} />
    {expanded && <span>Dark Mode</span>}
  </button>
      </div>
    </aside>
  );
}
