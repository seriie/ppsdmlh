'use client';

import axios from "axios";
import { useEffect, useState } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { FaPeopleGroup } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
    const [userCount, setUserCount] = useState<number>(0);

   const getUsers = async () => {
        try {
            const response = await axios.get('/api/users');
            setUserCount(response.data.length);
            console.log("Fetched:", response.data.length, "At:", new Date().toLocaleTimeString());
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }


    useEffect(() => {
        getUsers();

        const timer: NodeJS.Timeout = setInterval(() => {
            getUsers();
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const itemList = [
        { icon: <FaPeopleGroup className="w-15 h-15 text-slate-600" />, number: userCount, description: "Total Responden" },
        { icon: <FaCircleCheck className="w-15 h-15 text-green-500" />, number: 10, description: "Sudah Mengisi" },
        { icon: <FaStar className="w-15 h-15 text-yellow-500" />, number: 3.8, description: "Skor Rata-rata" }
    ];

    return (
        <div className="mt-6">
            <div className="flex justify-around">
                {itemList.map((item, idx) => (
                    <div 
                        key={idx}
                        className="w-64 bg-slate-50 text-slate-700 shadow-md rounded-md p-4 flex flex-col items-center justify-center gap-2"
                    >
                        {item.icon}
                        <p className="text-4xl font-bold">{item.number}</p>
                        <p className="font-semibold">{item.description}</p>
                    </div>
                ))}
            </div>
            <Doughnut 
                data={{
                    labels: ['Sudah Mengisi', 'Belum Mengisi'],
                    datasets: [{
                        data: [10, userCount - 10],
                        backgroundColor: ['#4CAF50', '#FF6384'],
                        hoverOffset: 4
                    }]
                }}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Statistik Responden'
                        }
                    }
                }}
                className="mt-8 w-full max-w-md mx-auto"
            />
        </div>
    )
}