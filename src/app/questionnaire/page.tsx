import { Metadata } from "next";

import Image from "next/image";
import Icon from "../../assets/icon.png";

import QuestionForm from "@/components/questionnaire/Form";

export const metadata: Metadata = {
  title: "Questionnaire",
  description: "Questionnaire page untuk pengisian formulir survey",
};

export default function Questionnaire() {
  return (
    <div className="bg-[#B9D4AA] flex justify-center items-center min-h-svh relative">
      <div className="absolute top-5 left-5 md:top-10 md:left-10">
        <Image
          src={Icon}
          alt="logo"
          width={50}
          height={50}
          className="md:w-25 h-auto relative bottom-1.5 md:bottom-0"
        />
      </div>
      <QuestionForm />
    </div>
  );
}
