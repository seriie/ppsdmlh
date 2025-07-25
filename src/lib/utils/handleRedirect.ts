import { useRouter } from "next/router";

export async function handleRedirect(path: string) {
  const router = useRouter();
  try {
    await router.push(path);
  } catch (error) {
    console.error("Redirect error:", error);
  }
}