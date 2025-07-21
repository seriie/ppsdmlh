'use client';

import axios from "axios";
import { useEffect, useState } from "react";

import { FaPeopleGroup } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

export default function Dashboard() {
    const [users, setUsers] = useState([]);

   const getUsers = async () => {
        try {
            const response = await axios.get('/api/users');
            setUsers(response.data);
            console.log("Fetched:", response.data.length, "At:", new Date().toLocaleTimeString());
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }


    useEffect(() => {
        getUsers();

        const timer = setInterval(() => {
            getUsers();
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const itemList = [
        { icon: <FaPeopleGroup className="w-15 h-15 text-slate-600" />, number: users.length, description: "Total Responden" },
        { icon: <FaCircleCheck className="w-15 h-15 text-green-500" />, number: 10, description: "Sudah Mengisi" },
        { icon: <FaStar className="w-15 h-15 text-yellow-500" />, number: 3.8, description: "Skor Rata-rata" }
    ];

    return (
        <div className="mt-6">
            <div className="flex justify-around">
                {itemList.map((item, idx) => (
                    <div 
                        key={idx}
                        className="w-64 bg-slate-50 shadow-md rounded-md p-4 flex flex-col items-center justify-center gap-2"
                    >
                        {item.icon}
                        <p className="text-4xl font-bold">{item.number}</p>
                        <p className="font-semibold">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}