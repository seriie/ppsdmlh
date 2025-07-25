"use client"
import { useState } from "react";
import { useSession } from "next-auth/react";
import DefaultPp from "@/assets/defaultUserPp.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LuUser, LuLogOut, LuChevronUp, LuChevronDown } from "react-icons/lu";

type ProfileDropDownProps = {
    className?: string;
    hidden?: string;
    };

export default function ProfileDropDown({ className, hidden }: ProfileDropDownProps) {
    const { data: session } = useSession();
    const User = session?.user || { name: "Guest", image: DefaultPp };
    const fullname = session?.user?.fullname || "User";
    const [isOpen, setIsOpen] = useState(false);
    const route = useRouter();
    return (
        <>
            <div className="flex flex-col items-center justify-center">
                {isOpen && (
                    <div className="relative w-48 bg-white rounded-lg shadow-lg m-3">
                        <ul className="py-2">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-start items-center gap-5" onClick={() => { route.push("/profile") }}><LuUser size={20} className="text-black" />Profile</li>
                            <li className="px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer flex justify-start items-center gap-5" onClick={() => { route.push("/logout") }}><LuLogOut size={20} className="text-red-600" />Logout</li>
                        </ul>
                    </div>
                )}
                <button className={`flex items-center gap-2 text-black ${className} bg-gray-100 hover:bg-gray-100 transition-all duration-400 ease-in-out focus:bg-gray-100 active:scale-[0.98] w-full p-2 rounded-2xl transition-colors`} onClick={() => setIsOpen(!isOpen)}>
                    <Image
                        src={User.image || DefaultPp}
                        alt="User Avatar"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />

                    <span className={`${hidden}`}>
                        {fullname || "Guest"}
                    </span>
 
                    <div className={`mx-auto ${hidden}`}>

                    {isOpen ? (
                        <LuChevronDown size={20} className="text-black" />
                    ) : (
                        <LuChevronUp size={20} className="text-black" />
                    )}
                    </div>

                </button>


            </div>
        </>
    )
}