export const required = (t: any) => {
  return {
    required: {
      value: true,
      message: t("fieldRequiredError"),
    },
  };
};

export const minField = (length: number) => {
  return {
    minLength: {
      value: length,
      message: `Acest field trebuie sa aibă minim ${length} caractere`,
    },
  };
};

export const maxField = (length: number) => {
  return {
    maxLength: {
      value: length,
      message: `Acest field este limitat la ${length} caractere`,
    },
  };
};

export const isGreaterThan = (
  first: number | string,
  second: number | string,
  t: any
) => {
  return {
    isGreater: {
      value: first >= second || (!!!first && !!!first),
      message: t("isGreatherThanMessage"),
    },
  };
};
