'use client';

import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card";
import { LuChartColumn, LuBell } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const questionnaireList = [
  {
    id: 1,
    title: "Survey pengajaran peserta",
    expDate: "17 Agustus 2025",
    completed: false,
    progress: 60,
  },
  {
    id: 2,
    title: "Survey pengajaran mentor",
    expDate: "20 Agustus 2025",
    completed: true,
    progress: 100,
  },
  {
    id: 3,
    title: "Survey pengalaman belajar",
    expDate: "25 Agustus 2025",
    completed: false,
    progress: 30,
  },
  {
    id: 4,
    title: "Survey kepuasan peserta",
    expDate: "30 Agustus 2025",
    completed: false,
    progress: 0,
  },
];

const QuesionnaireCard = () => {
  const router = useRouter();

  return (
    <div className="grid md:grid-cols-2 gap-4 mt-4">
      {questionnaireList.map((item, idx) => (
        <Card key={item.id} className="flex flex-col hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex flex-col">
              <span className="text-2xl">{idx + 1}. {item.title}</span>
              <span className="text-sm mt-1 text-muted-foreground">
                Status: {item.completed ? "Sudah diisi" : "Belum diisi"}
              </span>
            </CardTitle>

            <CardDescription className="mt-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <LuChartColumn />
                  <p>Progres:</p>
                </div>
                <p>{item.progress}% Terisi</p>
              </div>

              <div className="w-full h-2.5 bg-gray-300 rounded-lg mt-2 overflow-hidden">
                <div
                  className="h-2.5 bg-gray-700 transition-all duration-500"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <LuBell className="text-lg" />
                <p>Selesaikan sebelum <strong>{item.expDate}</strong></p>
              </div>
            </CardDescription>
          </CardHeader>

          <CardContent className="flex justify-center mt-6">
            <Button
              disabled={item.completed}
              onClick={() => router.push("/questionnaire")}
              className={`${item.completed? "bg-green-300 text-green-950" : "bg-cyan-400 text-black"}`}
            >
              {item.completed ? "Sudah Diisi" : "Isi Soal Sekarang"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuesionnaireCard;
