export const trimByWord = (text: string, maxWords: number) => {
  const words = text.split(" ").slice(0, maxWords);

  if (text.length === words.length) {
    return text;
  } else {
    return `${words.join(" ")}...`;
  }
};
