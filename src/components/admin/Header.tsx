import { StaticImageData } from "next/image";
import Image from "next/image";

interface HeaderProps {
    icon: StaticImageData;
    name: string;
}

export default function Header({icon, name}: HeaderProps) {
    return (
        <div className="w-full flex justify-between items-center rounded-md shadow-md bg-slate-100 text-slate-700 p-2">
            <Image src={icon} alt="icon" className="w-20" />
            <h1 className="font-bold">{name}</h1> 
        </div>
    )
}