export const displayCount = (count, oneModel, model, ofModel) => {
  switch (true) {
    case 0:
      return `${count} ${model}`;
    case 1:
      return `${count} ${oneModel}`;
    case count > 1 && count < 20:
      return `${count} ${model}`;
    default:
      return `${count} ${ofModel}`;
  }
};
