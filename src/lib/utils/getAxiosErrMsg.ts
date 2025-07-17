import axios from "axios";

export function getAxiosErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return (
      (error.response?.data as { message?: string })?.message ??
      "Terjadi kesalahan dari server"
    );
  }

  return "Terjadi kesalahan tidak terduga";
}
