export const displayDash = (field: any) => {
  if ((!field && field !== 0) || field?.length === 0) {
    return "-";
  } else {
    return field;
  }
};
