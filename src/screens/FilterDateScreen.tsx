import { View, Text, StyleSheet } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { Icon } from "@rneui/themed";
import { isEmpty, find } from "lodash";
import { LinearGradient } from "expo-linear-gradient";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/rootStackParams";
import { Period } from "../ts";
import { dayMonthFormat } from "../utils/date-utils";
import { useMinutes } from "../hooks";
import theme from "../../assets/styles/theme";
import { displayDash } from "../utils";
import { Stack, IconBackButton, Button, ButtonGroup } from "../components/core";
import {
  PickerHoursModal,
  CalendarPeriodTab,
  FixedPeriodTab,
  TopTabPeriod,
} from "../components/customized";

type IProps = NativeStackScreenProps<RootStackParams, "FiltersDate">;
const { primary } = theme.lightColors || {};

const Tab = createMaterialTopTabNavigator();

export const FiltersDateScreen = ({ route }: IProps) => {
  const { service, defaultPeriod, screen } = route.params;
  const [visible, setVisible] = useState(false);
  const [activeHours, setActiveHours] = useState(0);
  const { minutes } = useMinutes();
  const [period, setPeriod] = useState<Period>(defaultPeriod);
  const { startDate, endDate, startMinutes, endMinutes, key } = period;
  const { t } = useTranslation("common");
  const [pickHour, setPickHour] = useState(`${t("pickHour")}`);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const hoursActive = startMinutes && endMinutes ? 1 : 0;
    const pickHours =
      startMinutes && endMinutes
        ? `${getMinutesName(startMinutes)} - ${getMinutesName(endMinutes)}`
        : `${t("pickHour")}`;

    setActiveHours(hoursActive);
    setPickHour(pickHours);
  }, [period]);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const hoursButtons = [{ title: t("anyHour") }, { title: pickHour }];

  const goNext = () => navigation.push("FiltersService", { service, period });

  const getMinutesName = (min: number) => {
    const minuteEl = find(minutes, { id: min });
    return minuteEl?.name;
  };

  const handleHours = useCallback((data: any) => {
    const { startMinutes, endMinutes } = data;
    setPeriod((period: Period) => ({
      ...period,
      startMinutes,
      endMinutes,
    }));
    !!startMinutes && !!startMinutes ? setVisible(false) : null;
  }, []);

  const Calendar = useCallback(
    () => (
      <CalendarPeriodTab
        period={{
          ...period,
          startDate: key === "calendar" ? period.startDate : null,
          endDate: key === "calendar" ? period.endDate : null,
        }}
        minutes={minutes}
        onHandlePeriod={(period) => setPeriod({ ...period, key: "calendar" })}
      />
    ),
    [period]
  );

  const FixedPeriod = useCallback(() => {
    return (
      <FixedPeriodTab
        period={period}
        onHandlePeriod={(per) => {
          per.key === period.key
            ? setPeriod(defaultPeriod)
            : setPeriod({ ...period, ...per });
        }}
      />
    );
  }, [period]);

  const disabled = useCallback(() => {
    switch (true) {
      case isEmpty(key):
        return true;
      case (!startDate || !endDate) && key === "calendar":
        return true;
      default:
        return false;
    }
  }, [startDate, endDate, key]);

  const description =
    key === "calendar"
      ? `${dayMonthFormat(startDate)} - ${dayMonthFormat(endDate)}`
      : displayDash(period.title);

  return (
    <LinearGradient
      colors={["#fe9934", "#f2f2f2"]}
      start={{ x: 0.2, y: 0.2 }}
      end={{ x: 0.5, y: 0.5 }}
      style={styles.screen}
    >
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Text style={styles.mainHeading}>{t("select")}</Text>
        <Text style={styles.mainHeading}>{t("period")}</Text>
      </View>
      <View style={styles.container}>
        <Stack direction="row" justify="center" sx={styles.sheetOverview}>
          <IconBackButton size={20} />
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{service?.name}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          <Icon name="chevron-back" type="ionicon" color="white" />
        </Stack>
        <TopTabPeriod initialRouteName={screen}>
          <Tab.Screen
            name="Calendar"
            component={Calendar}
            options={{ tabBarLabel: t("choosePeriod") }}
          />
          <Tab.Screen
            name="FixedPeriods"
            component={FixedPeriod}
            options={{ tabBarLabel: t("fixedPeriods") }}
          />
        </TopTabPeriod>
        <Stack
          direction="row"
          sx={{ ...styles.footer, paddingBottom: insets.bottom }}
        >
          <ButtonGroup
            onPress={() => setVisible((visible) => !visible)}
            buttons={hoursButtons}
            activeBtn={activeHours}
            sx={{ marginRight: 15 }}
            disabled={period.key === "after18"}
          />
          <View style={{ flex: 1 }}>
            <Button title={t("next")} disabled={disabled()} onPress={goNext} />
          </View>
        </Stack>
      </View>
      <PickerHoursModal
        visible={visible}
        minutes={minutes}
        onAction={handleHours}
        onClose={() => setVisible(false)}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: primary },
  header: { marginVertical: 30, marginHorizontal: 20 },
  mainHeading: { color: "white", fontSize: 28, fontWeight: "700" },
  container: {
    backgroundColor: "white",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "space-between",
  },
  sheetOverview: {
    marginHorizontal: 15,
    marginBottom: 5,
  },
  title: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
  },
  description: {
    color: "grey",
    marginTop: 5,
    textAlign: "center",
    fontSize: 15,
    marginBottom: 15,
    fontWeight: "500",
  },
  footer: {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingHorizontal: 15,
  },
});
