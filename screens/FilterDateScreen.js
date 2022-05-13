import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Text, StyleSheet, SafeAreaView } from "react-native";
import theme from "../assets/styles/theme";
import React, {
  useCallback,
  useRef,
  useMemo,
  useState,
  useEffect,
} from "react";
import BottomSheet, {
  BottomSheetView,
  BottomSheetFooter,
} from "@gorhom/bottom-sheet";
import { Stack, ButtonGroup, Button } from "../components/core";
import { SheetHeader } from "../components/customized";
import { useCalendarList } from "../hooks";
import { useTranslation } from "react-i18next";

const FiltersDateScreen = ({ route }) => {
  const { serviceId, serviceName, period } = route.params;
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["75%", "90%"], []);
  const navigation = useNavigation();
  const [activeBtn, setActiveBtn] = useState(period.code);
  const [activeHours, setActiveHours] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const { calendar, startDate, endDate } = useCalendarList();
  const { t } = useTranslation();

  const navigate = (activeBtn) => {
    switch (activeBtn) {
      case 0:
        return {
          code: process.env.CALENDAR_CODE,
          type: "calendar",
          startDate,
          endDate,
        };
      case 1:
        return {
          code: process.env.NOW_CODE,
          type: t("now"),
        };
      case 2:
        return {
          code: process.env.AFTER_18_CODE,
          type: t("after18"),
        };
      default:
        return {
          code: process.env.CALENDAR_CODE,
          type: "calendar",
          startDate,
          endDate,
        };
    }
  };

  const goNext = () => {
    axios
      .get(`${process.env.BASE_ENDPOINT}/services/${serviceId}/filters`)
      .then((res) => {
        if (res.data.filters.length === 0) {
          navigation.navigate("Services", { serviceId, serviceName });
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
    { title: t("calendar") },
    { title: t("now") },
    { title: t("after18") },
  ];
  const hoursButtons = [{ title: t("anyHour") }, { title: t("pickHour") }];
  const handleDateBtns = useCallback((index) => {
    setActiveBtn(index);
  }, []);
  const handleHoursBtns = useCallback((index) => {
    setActiveHours(index);
  }, []);

  useEffect(() => {
    if (activeBtn === 0 && startDate !== "" && endDate !== "") {
      setDisabled(false);
    } else if (activeBtn === 1 || activeBtn === 2) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [activeBtn, startDate, endDate]);

  const disabledStyle = { ...styles.mainButton, backgroundColor: "#ccc" };

  const renderFooter = useCallback(
    (props) => (
      <BottomSheetFooter {...props}>
        <Stack
          direction="row"
          sx={styles.footerContainer}
          justify={activeBtn === 0 ? "between" : "end"}
        >
          {activeBtn === 0 && (
            <ButtonGroup
              buttons={hoursButtons}
              onPress={handleHoursBtns}
              activeButton={activeHours}
            />
          )}
          <Button
            disabled={disabled}
            onPress={goNext}
            style={disabled ? disabledStyle : styles.mainButton}
          >
            <Text style={styles.mainButtonText}>{t("next")}</Text>
          </Button>
        </Stack>
      </BottomSheetFooter>
    ),
    [disabled]
  );

  const getDescription = useCallback(() => {
    switch (activeBtn) {
      case 0:
        return `${startDate} - ${endDate}`;
      case 1:
        return t("now");
      case 2:
        return t("after18");
      default:
        return `${startDate} - ${endDate}`;
    }
  }, [activeBtn, startDate, endDate]);

  return (
    <SafeAreaView style={styles.screen}>
      <Stack align="start" sx={{ margin: 25 }}>
        <Text style={styles.mainHeading}>
          {t("selectPeriod").split(" ")[0]}
        </Text>
        <Text style={styles.mainHeading}>
          {t("selectPeriod").split(" ")[1]}
        </Text>
      </Stack>
      <BottomSheet
        handleIndicatorStyle={styles.indicatorStyle}
        ref={sheetRef}
        snapPoints={snapPoints}
        footerComponent={renderFooter}
      >
        <BottomSheetView>
          <SheetHeader title={serviceName} description={getDescription()} />
          <ButtonGroup
            onPress={handleDateBtns}
            buttons={dateButtons}
            size="small"
            activeButton={activeBtn}
          />
          {activeBtn === 0 && calendar}
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default FiltersDateScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.lightColors.primary,
    flex: 1,
  },
  mainHeading: { color: "white", fontFamily: "Exo-ExtraBold", fontSize: 28 },
  indicatorStyle: {
    backgroundColor: "#ddd",
    width: 45,
    height: 5,
  },
  footerContainer: {
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 40,
    borderTopWidth: 0.5,
    borderTopColor: "#ddd",
    paddingHorizontal: 15,
  },
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
  mainButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: theme.lightColors.primary,
    borderRadius: 5,
  },
  mainButtonText: {
    fontFamily: "Exo-Medium",
    color: "white",
    fontSize: 14,
  },
});
