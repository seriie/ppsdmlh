"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import TableRow from "./TableRow";

type Users = {
  id: string;
  fullname: string;
  email: string;
  role: string;
  created_at: string;
  updatedAt: string;
};

export default function UserManagement() {
  const [users, setUsers] = useState<Users[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<string>("");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [roleOpened, setRoleOpened] = useState<boolean>(false);

  const getUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const roles = ["all", "user", "admin"];

  const handleRoleFilter = (role: string) => {
    setFilterRole(role);
    setFilteredUsers("");
    setRoleOpened(false);
  };

  const filtered = users.filter((user) =>
    user.fullname.toLowerCase().includes(filteredUsers.toLowerCase()) &&
    (filterRole === "all" || user.role === filterRole)
  );

  useEffect(() => {
    getUsers();
    const timer = setInterval(() => getUsers(), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-6 p-6 bg-white rounded-xl shadow-md border border-slate-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Manajemen Pengguna</h2>
        <div className="flex flex-col md:flex-row gap-4 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari pengguna..."
              className="pl-10 pr-4 py-2 bg-slate-100 text-slate-700 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={filteredUsers}
              onChange={(e) => setFilteredUsers(e.target.value)}
            />
            <IoIosSearch className="absolute left-3 top-2.5 text-slate-500 w-5 h-5" />
          </div>
          <div className="relative">
            <button
              onClick={() => setRoleOpened(!roleOpened)}
              className="w-full md:w-auto bg-white text-slate-700 border border-slate-300 px-4 py-2 rounded-lg flex items-center justify-between hover:bg-slate-100 transition"
            >
              {filterRole}
              <MdOutlineKeyboardArrowDown className="ml-2" />
            </button>
            {roleOpened && (
              <div className="absolute mt-2 w-full bg-white border border-slate-300 rounded-lg shadow-md z-10">
                {roles.map((role) => (
                  <div
                    key={role}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                    onClick={() => handleRoleFilter(role)}
                  >
                    {role}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2 text-sm text-slate-700">
          <thead className="text-left bg-slate-100 text-slate-700 rounded-md">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Bergabung</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((user) => (
                <TableRow key={user.id} {...user} />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-slate-500">
                  Tidak ada pengguna ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
