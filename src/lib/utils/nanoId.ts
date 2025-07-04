import { nanoid } from "nanoid";

export async function nanoIdFormat(id: string, length: number) {
    const date = new Date().toLocaleDateString().replace(/\//g, '');
    return id + date + nanoid(length);
}