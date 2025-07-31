"use client";

import { useSession } from "next-auth/react";

interface ProfileBubbleProps {
  size?: string; // Optional, misal "w-10 h-10"
}

export default function ProfileBubble({ size = "w-10 h-10" }: ProfileBubbleProps) {
  const { data: session } = useSession();
  const fullname = session?.user?.fullname || "User";

  function getInitials(name: string) {
    const words = name.trim().split(" ");
    const initials = words.slice(0, 2).map((word) => word[0]).join("");
    return initials.toUpperCase();
  }

  return (
    <div
      className={`rounded-full ${size} bg-indigo-600 flex items-center justify-center text-white font-semibold text-sm`}
    >
      {getInitials(fullname)}
    </div>
  );
}
