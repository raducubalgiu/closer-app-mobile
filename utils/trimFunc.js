export const trimFunc = (text, maxLength) => {
  if (text && text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  } else {
    return text;
  }
};
