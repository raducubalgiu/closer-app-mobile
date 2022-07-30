export const required = (t) => {
  return {
    required: {
      value: true,
      message: t("fieldRequiredError"),
    },
  };
};

export const minField = (length) => {
  return {
    minLength: {
      value: length,
      message: `Acest field trebuie sa aibă minim ${length} caractere`,
    },
  };
};

export const maxField = (length) => {
  return {
    maxLength: {
      value: length,
      message: `Acest field este limitat la ${length} caractere`,
    },
  };
};
