export const displayDash = (field) => {
  if (!field && field !== 0) {
    return "-";
  } else {
    return field;
  }
};
