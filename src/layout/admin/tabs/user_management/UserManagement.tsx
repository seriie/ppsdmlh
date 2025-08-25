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
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getUsers = async () => {
    setLoading(true);

    try {
      const response = await axios.get("/api/users");

      if (response.data.length == 0) {
        return setMessage("Tidak ada data ditemukan");
      }

      setUsers(response.data);
      setRefreshing(false);
      setLoading(false);
    } catch (error) {
      setRefreshing(false);
      setLoading(false);
      console.error("Fetch error:", error);
      setMessage("Terjadi kesalahan saat mengambil data.");
    }
  };

  const roles = ["all", "user", "admin"];

  const handleRoleFilter = (role: string) => {
    setFilterRole(role);
    setFilteredUsers("");
    setRoleOpened(false);
  };

  const filtered = users.filter(
    (user) =>
      user.fullname.toLowerCase().includes(filteredUsers.toLowerCase()) &&
      (filterRole === "all" || user.role === filterRole)
  );

  const handleRefresh = () => {
    setRefreshing(true);
    getUsers();
  };

  useEffect(() => {
    getUsers();

    document.addEventListener('keyup', (e: KeyboardEvent) => {
      if(e.altKey && e.key.toLowerCase() === 'r') {
        handleRefresh();
      }
    }); 
  }, []);

  return (
    <div className="mt-6 p-6 bg-white rounded-xl shadow-md border border-slate-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-slate-800">
          Manajemen Pengguna
        </h2>
        <div className="flex flex-col md:flex-row gap-4 relative">
          <button
            onClick={handleRefresh}
            className={`${refreshing ? 'bg-[#86aca8]' : ''} py-2 px-4 font-semibold bg-[#5A827E] hover:bg-[#86aca8] transition-all duration-200 cursor-pointer rounded-md text-slate-100`}
            title="Alt + R"
          >
            {refreshing ? 'Segarkan...' : 'Segarkan'}
          </button>
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
              className="w-full md:w-auto bg-white cursor-pointer text-slate-700 border border-slate-300 px-4 py-2 rounded-lg flex items-center justify-between hover:bg-slate-100 transition"
            >
              {filterRole}
              <MdOutlineKeyboardArrowDown
                className={`${
                  roleOpened ? "rotate-180" : "rotate-0"
                } transition-all duration-200 ml-2`}
              />
            </button>
            <div
              className={`${
                roleOpened
                  ? "h-fit opacity-100 border"
                  : "h-0 opacity-0 border-0"
              } transition-all duration-200 absolute mt-2 w-full bg-white border border-slate-300 rounded-lg shadow-md z-10`}
              onMouseLeave={() => setRoleOpened(false)}
            >
              {roles.map((role) => (
                <div
                  key={role}
                  className="px-4 py-2 hover:bg-slate-100 text-slate-700 cursor-pointer text-sm"
                  onClick={() => handleRoleFilter(role)}
                >
                  {role}
                </div>
              ))}
            </div>
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
              filtered.map((user) => <TableRow key={user.id} {...user} />)
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-slate-500">
                  {loading ? "Mengambil data..." : message || "Tidak ada data"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
