"use client";

import Link from "next/link";
import { formatDate } from "@/lib/utils/formatDate";

interface UserProps {
  id: string;
  fullname: string;
  email: string;
  role: string;
  created_at: string;
}

export default function TableRow({ id, fullname, email, role, created_at }: UserProps) {
  const formattedDate = formatDate(created_at);

  return (
    <tr className="hover:bg-slate-200 border-b border-slate-200 transition duration-150">
      <td className="px-4 py-2 font-mono text-xs text-blue-600">
        <Link href={`/admin/profile/${id}`} className="hover:underline">
          {id}
        </Link>
      </td>
      <td className="px-4 py-2">{fullname}</td>
      <td className="px-4 py-2">{email}</td>
      <td className="px-4 py-2">
        <span
          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
            role === "admin" ? "bg-yellow-200 text-yellow-800" : role === "owner" ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"
          }`}
        >
          {role}
        </span>
      </td>
      <td className="px-4 py-2">{formattedDate}</td>
    </tr>
  );
}
