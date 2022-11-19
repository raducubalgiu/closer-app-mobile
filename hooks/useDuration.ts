import { useTranslation } from "react-i18next";

export const useDuration = (duration) => {
  const { t } = useTranslation();

  switch (true) {
    case duration.length === 1:
      return `${duration} ${t("minute")}`;
    case duration.length < 20:
      return `${duration} ${t("minutes")}`;
    case duration.length > 19:
      return `${duration} ${t("offMinutes")}`;
    default:
      return `${duration} ${t("offMinutes")}`;
  }
};
