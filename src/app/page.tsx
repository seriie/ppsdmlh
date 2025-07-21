import { Metadata } from "next";

import SplashScreen from "@/components/SplashScreen";
import icon from '../assets/icon.png';

export const metadata: Metadata = {
    title: "Welcome"
}

export default function Home() {
  return (
    <>
      <SplashScreen logoSrc={icon}></SplashScreen>
    </>
  );
}
