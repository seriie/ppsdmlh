"use client";

import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { GoGraph } from "react-icons/go";
import { GrDownload } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import icons from "../../../assets/icon.png";

import Header from "../Header";
import Dashboard from "./tabs/Dashboard";

export default function Sidebar() {
    const [tabs, setTabs] = useState<number>(1);
    const [tabName, setTabName] = useState<string>("Dashboard");

    const sidebarItems = [
        { id: 1, name: "Dashboard", icon: <FaHome /> },
        { id: 2, name: "Manajemen Pengguna", icon: <FaUser /> },
        { id: 3, name: "Kelola Kuesioner", icon: <FaListCheck /> },
        { id: 4, name: "Rekap Hasil", icon: <GoGraph /> },
        { id: 5, name: "Export Data", icon: <GrDownload /> },
        { id: 6, name: "Pengaturan", icon: <IoMdSettings /> },
    ];

    const handleChangeTabs = (tab: number, tabName: string) => {
        setTabs(tab);
        setTabName(tabName);
    }


    return (
        <>
            <div className="fixed top-5 left-5 bottom-5 w-64 bg-[#5A827E] text-white p-4 rounded-xl">
                <h2 className="text-xl font-bold mb-4">Halo Admin</h2>
                {sidebarItems.map((item, index) => (
                    <div
                        key={index}
                        className={`${tabs === item.id ? "bg-[#59b692]" : "hover:bg-[#8bafa1]"} flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors`}
                        onClick={() => handleChangeTabs(item.id, item.name)}
                    >
                        <span className="text-3xl">{item.icon}</span>
                        <span className="text-base">{item.name}</span>
                    </div>
                ))}
                <div className="ml-64">
                </div>
            </div>
            <div className="m-5">
                <div className="ml-72">
                    <Header icon={icons} name={tabName}/>
                    {tabs === 1 && <Dashboard />}
                </div>
            </div>
        </>
    )
}