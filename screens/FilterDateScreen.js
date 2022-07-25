import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { StyleSheet } from "react-native";
import theme from "../assets/styles/theme";
import React, { useCallback, useState } from "react";
import { useCalendarList } from "../hooks";
import { useTranslation } from "react-i18next";
import { ButtonGroup } from "../components/core";
import { FiltersContainer, SheetHeader } from "../components/customized";

const FiltersDateScreen = ({ route }) => {
  const { serviceId, serviceName } = route.params;
  const navigation = useNavigation();
  const [activeHours, setActiveHours] = useState(0);
  const { calendar, startDate, endDate } = useCalendarList();
  const { t } = useTranslation();

  const goNext = () => {
    axios
      .get(`${process.env.BASE_ENDPOINT}/services/${serviceId}/filters`)
      .then((res) => {
        if (res.data.filters.length === 0) {
          navigation.navigate("Services", {
            serviceId,
            serviceName,
            startDate,
            endDate,
          });
        } else {
          navigation.navigate("FiltersService", {
            serviceId,
            serviceName,
            period: navigate(activeBtn),
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const dateButtons = [
    { title: t("anytime") },
    { title: t("now") },
    { title: t("calendar") },
  ];
  const hoursButtons = [{ title: t("anyHour") }, { title: t("pickHour") }];
  const handleDateBtns = useCallback((index) => {
    setActiveBtn(index);
  }, []);
  const handleHoursBtns = useCallback((index) => {
    setActiveHours(index);
  }, []);

  const footerBtns = (
    <ButtonGroup
      buttons={hoursButtons}
      onPress={handleHoursBtns}
      activeButton={0}
    />
  );

  return (
    <FiltersContainer
      headerTitle={t("selectPeriod").split(" ")[0]}
      headerDescription={t("selectPeriod").split(" ")[1]}
      onNext={goNext}
      footerExtraBtns={footerBtns}
    >
      <SheetHeader title={serviceName} description="23 iun. - 14 iul." />
      <ButtonGroup
        onPress={handleDateBtns}
        buttons={dateButtons}
        size="small"
        activeButton={0}
      />
      {calendar}
    </FiltersContainer>
  );
};

export default FiltersDateScreen;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 7.5,
    paddingHorizontal: 12.5,
    marginLeft: 5,
    borderWidth: 2,
    borderColor: "#ccc",
    marginTop: 20,
    borderRadius: 20,
  },
  buttonActive: {
    borderColor: theme.lightColors.primary,
  },
  buttonText: { color: theme.lightColors.black, fontFamily: "Exo-Medium" },
});
