export const trimFunc = (text: string | undefined, maxLength: number) => {
  if (text && text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  } else {
    return text;
  }
};
