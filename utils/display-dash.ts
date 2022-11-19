export const displayDash = (field: number) => {
  if (!field && field !== 0) {
    return "-";
  } else {
    return field;
  }
};
