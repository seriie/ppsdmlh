"use client"

import { LuHouse, LuMoonStar } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProfileDropDown from "@/components/ui/ProfileDropDown";
import { cn } from "@/lib/utils";

export default function DesktopSidebar() {
  const router = useRouter();
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={cn(
        "hidden lg:flex fixed top-4 left-4 bottom-4 flex-col justify-between bg-teal-100 transition-all duration-300 rounded-2xl shadow-xl border border-slate-200",
        expanded ? "w-60 p-4" : "w-20 items-center py-4"
      )}
    >
      <div className="flex flex-col gap-6">
        <button
          onClick={() => setExpanded(!expanded)}
          className="self-end mb-2 text-slate-700 hover:scale-105 transition"
        >
          {expanded ? "«" : "»"}
        </button>

        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-black hover:bg-teal-300 p-2 rounded-lg transition-all"
        >
          <LuHouse size={25} />
          {expanded && <span>Beranda</span>}
        </button>
      </div>

      <div className="border-t pt-4 border-slate-300">
        <ProfileDropDown
          className={`overflow-hidden ${!expanded ? 'hidden bg-transparent' : ''}`}
        />


        <button className="flex items-center gap-2 mt-4 text-black hover:bg-teal-300 p-2 rounded-lg transition-all">
          <LuMoonStar size={25} />
          {expanded && <span>Dark Mode</span>}
        </button>
      </div>
    </aside>
  );
}
