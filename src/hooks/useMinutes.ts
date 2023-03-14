import { useTranslation } from "react-i18next";

export const useMinutes = () => {
  const { t } = useTranslation();

  return {
    minutes: [
      { id: 0, name: "00:00" },
      { id: 30, name: "00:30" },
      { id: 60, name: "01:00" },
      { id: 90, name: "01:30" },
      { id: 120, name: "02:00" },
      { id: 150, name: "02:30" },
      { id: 180, name: "03:00" },
      { id: 210, name: "03:30" },
      { id: 240, name: "04:00" },
      { id: 270, name: "04:30" },
      { id: 300, name: "05:00" },
      { id: 330, name: "05:30" },
      { id: 360, name: "06:00" },
      { id: 390, name: "06:30" },
      { id: 420, name: "07:00" },
      { id: 450, name: "07:30" },
      { id: 480, name: "08:00" },
      { id: 510, name: "08:30" },
      { id: 540, name: "09:00" },
      { id: 570, name: "09:30" },
      { id: 600, name: "10:00" },
      { id: 630, name: "10:30" },
      { id: 660, name: "11:00" },
      { id: 690, name: "11:30" },
      { id: 720, name: "12:00" },
      { id: 750, name: "12:30" },
      { id: 780, name: "13:00" },
      { id: 810, name: "13:30" },
      { id: 840, name: "14:00" },
      { id: 870, name: "14:30" },
      { id: 900, name: "15:00" },
      { id: 930, name: "15:30" },
      { id: 960, name: "16:00" },
      { id: 990, name: "16:30" },
      { id: 1020, name: "17:00" },
      { id: 1050, name: "17:30" },
      { id: 1080, name: "18:00" },
      { id: 1110, name: "18:30" },
      { id: 1140, name: "19:00" },
      { id: 1170, name: "19:30" },
      { id: 1200, name: "20:00" },
      { id: 1230, name: "20:30" },
      { id: 1260, name: "21:00" },
      { id: 1290, name: "21:30" },
      { id: 1320, name: "22:00" },
      { id: 1350, name: "22:30" },
      { id: 1380, name: "23:00" },
      { id: 1410, name: "23:30" },
      { id: -1, name: t("closed") },
    ],
  };
};