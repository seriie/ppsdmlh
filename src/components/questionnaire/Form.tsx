"use client";
import Image from "next/image";
import envImg from "../../assets/environtment-image.png";
import { useState } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";

export default function QuestionForm() {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  const questions = [
    {
      text: "Seberapa peduli kamu dengan lingkungan?",
      answer: "Sangat Peduli, peduli, tidak peduli, sangat tidak peduli",
      correct_option: "Sangat Peduli",
    },
    {
      text: "Apa yang kamu lakukan untuk menjaga lingkungan?",
      answer:
        "Membuang sampah pada tempatnya, mengurangi penggunaan plastik, menanam pohon, tidak melakukan apapun",
      correct_option: "Membuang sampah pada tempatnya",
    },
    {
      text: "Apakah kamu pernah mengikuti kegiatan lingkungan?",
      answer: "Pernah, Tidak Pernah, mungkin pernah, gatau lah",
      correct_option: "Pernah",
    },
  ];

  const handleNext = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
      setSelectedAnswer("");
    }
  };

  const handlePrevious = () => {
    if (questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
      setSelectedAnswer("");
    }
  };

  return (
    <div className="w-[900px] h-auto mx-5 md:w-[1000px] md:h-[500px] grid grid-cols-1 md:grid-cols-2 bg-slate-50 rounded-[50px] md:rounded-[100px] overflow-auto relative border-6 border-slate-50 shadow-xl my-10">
      <div className="bg-[#B9D4AA] flex items-center justify-center pb-6 md:p-10 rounded-b-[50px] md:rounded-b-none md:rounded-l-[100px] overflow-auto">
        <div className="flex flex-col gap-3 md:gap-5 w-80 px-5">
          <div className="flex absolute pt-5 items-center gap-2 md:relative md:bottom-30 md:right-15">
            <IoIosArrowDropleftCircle className="text-[#53624a] hidden md:block" />
            <span className="text-[#53624a] font-md hidden md:block">
              Beranda
            </span>
            <RxCrossCircled className="text-[#53624a] text-3xl md:hidden relative right-3" />
          </div>
          <Image
            className="relative left-6 w-75 top-4 h-50 mb-1 md:hidden"
            src={envImg}
            alt="gambar lingkungan"
          />
          <h1 className="text-xl font-bold text-slate-50">
            Step {questionIndex + 1}/{questions.length}
          </h1>
          <h1 className="text-2xl font-bold text-[#53624a] break-words overflow-wrap">
            {questions[questionIndex].text}
          </h1>
          <p className="text-slate-50">Pilih satu jawaban</p>
        </div>
      </div>

      <div className="bg-slate-50 flex flex-col items-center justify-center p-6 md:rounded-r-[80px] h-full overflow-auto">
        <Image
          className="w-80 h-50 mb-2 hidden md:block relative bottom-6"
          src={envImg}
          alt="gambar lingkungan"
        />
        <div className="flex flex-col md:max-h-[180px] w-full justify-center items-center ">
          {questions[questionIndex].answer.split(", ").map((answer, id) => (
            <label
              key={id}
              className={`text-md w-80 font-bold text-[#5A827E] hover:transition-all duration-300 ease-in-out rounded-lg border-2 p-1.5 gap-1.5 mb-2 flex items-center cursor-pointer ${
                selectedAnswer === answer
                  ? "bg-[#B9D4AA]"
                  : "hover:bg-[#B9D4AA]"
              }`}
            >
              <input
                type="radio"
                name="question"
                value={answer}
                checked={selectedAnswer === answer}
                onChange={() => setSelectedAnswer(answer)}
                className="accent-[#5A827E]"
              />
              <span className="break-words">{answer}</span>
            </label>
          ))}

          <div className="relative top-3 space-x-4 md:pb-5">
            <button
              onClick={handlePrevious}
              disabled={questionIndex === 0}
              className="w-28 h-10 rounded-4xl justify-center items-center hover:bg-[#9bb58d] hover:scale-100 transition-all duration-300 ease-in-out hover:text-slate-50 border-2 border-[#5A827E] text-[#5A827E] disabled:opacity-50"
            >
              Sebelumnya
            </button>
            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="w-28 h-10 rounded-4xl justify-center items-center hover:bg-[#9bb58d] hover:scale-100 transition-all duration-300 ease-in-out bg-[#5A827E] text-slate-50 disabled:opacity-50"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
