export const trimFunc = (text: string, maxLength: number) => {
  if (text && text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  } else {
    return text;
  }
};
