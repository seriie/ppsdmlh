"use client"
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card"
import { LuChartColumn, LuBell } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const QuesionnaireCard = () => {
    const completed = (true);
    const progress = 60;
    const router = useRouter();

    const QuestionnaireList = [
        {
            title: "Survey pengajaran peserta",
            ExpDate: "17 agustus 2025",
        }
    ]
    return (
        <div>
            {QuestionnaireList.map((list, idx) =>
                <Card key={idx} className="max-w-xl flex">
                    <CardHeader className="w-1/2">
                        <CardTitle className="flex flex-col text-nowrap">
                            <span className=" flex text-2xl">{idx + 1}. {list.title}</span>
                            <span className="text-sm">status : {completed ? "sudah diisi" : "belum diisi"}</span>
                        </CardTitle>
                        <CardDescription className="mt-5">
                            <div className="flex justify-between w-full">
                                <div className="flex items-center justify-center gap-2">
                                    <LuChartColumn />
                                    <p>Progres: </p>
                                </div>
                                <p>{progress} Terisi</p>
                            </div>
                            <div className="z-5 w-full h-2.5 bg-gray-300 rounded-lg mt-1">
                                <div className={`z-10 w-[${progress}%] h-2.5 bg-gray-700 rounded-lg`}></div>
                            </div>
                            <div className="flex mt-3 gap-5 items-center">
                                <LuBell></LuBell>
                                <p>Selesaikan Sebelum {list.ExpDate}</p>
                            </div>

                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <div className="mt-10 flex justify-center gap-4">
                            <Button onClick={() => router.push("/questionnaire")}>
                                Isi Soal Sekarang
                            </Button>
                        </div>
                    </CardContent>

                </Card>
            )}
        </div>
    )
}

export default QuesionnaireCard