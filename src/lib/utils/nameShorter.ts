export function nameShorter(name: string, words: number = 2) {
    const initName = name.split(" ");

  if (initName.length <= words) return name;
  
  if (initName.length > words) return initName.slice(0, words).join(" ");
}