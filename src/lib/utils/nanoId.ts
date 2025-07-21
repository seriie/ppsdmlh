import { nanoid } from "nanoid";

export async function nanoIdFormat(id: string, length: number) {
    const date = new Date().toLocaleDateString().replace(/\//g, '');
    const finalId = id + date + nanoid(length);
    const userId = finalId.toUpperCase();
    return userId;
}