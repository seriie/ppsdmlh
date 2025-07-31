"use client"
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import DefaultPp from "@/assets/defaultUserPp.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LuUser, LuLogOut, LuChevronUp, LuChevronDown } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";


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
    const [loggingOut, setLoggingOut] = useState<boolean>(false);

    const handleLogout = () => {
        setLoggingOut(true);
        signOut({ callbackUrl: "/" })
    }

    return (
        <>
            <div className="flex relative transition-all ease-in-out duration-300 flex-col items-center justify-center">
             <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className=" w-48 bg-white rounded-lg shadow-lg m-3"
                        >
                            <ul className="py-3">
                                <li
                                    className="px-4 py-2 hover:bg-gray-100 dark:text-black cursor-pointer flex mx-2 rounded-lg justify-start items-center gap-5"
                                    onClick={() => { route.push("/profile") }}
                                >
                                    <LuUser size={20} className="text-black" />
                                    Profile
                                </li>
                                <li
                                    className="px-4 py-2 text-red-600 hover:bg-gray-100 mx-2 rounded-lg cursor-pointer flex justify-start items-center gap-5"
                                    onClick={handleLogout}
                                >
                                    <LuLogOut size={20} className="text-red-600" />
                                    {loggingOut ? "Keluar.." : "Keluar"}
                                </li>
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button className={`flex items-center gap-2 text-black ${className} bg-gray-100 hover:bg-gray-100 transition-all duration-400 ease-in-out focus:bg-gray-100 active:scale-[0.98] w-full p-2 rounded-2xl`} onClick={() => setIsOpen(!isOpen)}>
                    <Image
                        src={User.image || DefaultPp}
                        alt="User Avatar"
                        width={40}
                        height={40}
                        className="rounded-full ml-1"
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