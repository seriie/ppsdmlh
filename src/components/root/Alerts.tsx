"use client";

import { useEffect, useState } from "react";

interface AlertsProps {
  type: "info" | "warn" | "success" | "error";
  title?: string;
  description?: string;
  time: number;
}

const typeConfig = {
  info: {
    icon: "ℹ️",
    bg: "bg-blue-50",
    border: "border-blue-400",
    textTitle: "text-blue-600",
    textDesc: "text-blue-500",
  },
  warn: {
    icon: "⚠️",
    bg: "bg-yellow-50",
    border: "border-yellow-400",
    textTitle: "text-yellow-600",
    textDesc: "text-yellow-500",
  },
  success: {
    icon: "✅",
    bg: "bg-green-50",
    border: "border-green-400",
    textTitle: "text-green-600",
    textDesc: "text-green-500",
  },
  error: {
    icon: "❌",
    bg: "bg-red-50",
    border: "border-red-400",
    textTitle: "text-red-600",
    textDesc: "text-red-500",
  },
};

export default function Alerts({ type, title, description, time }: AlertsProps) {
  const config = typeConfig[type];
  const [visible, setVisible] = useState(false);
  const [titles, setTitles] = useState(title);

  useEffect(() => {
    if (title) {
      setTitles(title);
      setVisible(true);
    }

    const timer = setTimeout(() => {
      setVisible(false);
      setTitles("");
    }, time);

    return () => clearTimeout(timer);
  }, [time, title]);

  return (
    <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-up">
      <div
        className={`flex ${visible ? "translate-y-0" : "-translate-y-52"} transition-all duration-200 items-start gap-3 w-full max-w-sm min-w-[280px] p-4 rounded-xl shadow-md border-2 ${config.bg} ${config.border}`}
      >
        <span className="text-2xl">{config.icon}</span>
        <div className="text-left overflow-hidden break-words">
          <p className={`font-semibold ${config.textTitle}`}>{titles}</p>
          {description && (
            <p className={`text-sm mt-1 ${config.textDesc}`}>{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}