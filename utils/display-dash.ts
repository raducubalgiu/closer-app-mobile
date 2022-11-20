export const displayDash = (field: number | string) => {
  if (!field && field !== 0) {
    return "-";
  } else {
    return field;
  }
};
