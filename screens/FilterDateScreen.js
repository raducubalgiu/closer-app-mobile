import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import axios from "axios";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Divider } from "@rneui/themed";
import moment from "moment";
import theme from "../assets/styles/theme";
import { useCalendarList } from "../hooks";
import { ButtonGroup } from "../components/core";
import { FiltersContainer, SheetHeader } from "../components/customized";

const FiltersDateScreen = ({ route }) => {
  const { serviceId, serviceName } = route.params;
  const navigation = useNavigation();
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
            startDate,
            endDate,
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
    //setActiveHours(index);
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
      <SheetHeader
        title={serviceName}
        description={`${moment.utc(startDate).format("DD MMM")} - ${moment
          .utc(endDate)
          .format("DD MMM")}`}
      />
      <ButtonGroup
        onPress={handleDateBtns}
        buttons={dateButtons}
        size="small"
        activeButton={0}
        sx={{ marginBottom: 15 }}
      />
      <Divider />
      <View style={{ flex: 1 }}>{calendar}</View>
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
