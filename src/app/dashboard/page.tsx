import { Metadata } from "next";
import Dashboard from "@/layout/page/dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function dashboardPage() {
  return <Dashboard />;
}