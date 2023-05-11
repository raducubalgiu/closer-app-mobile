import {
  View,
  Text,
  SafeAreaView,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { Icon } from "@rneui/themed";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Button, ButtonGroup } from "../components/core";
import { PickerHoursModal } from "../components/customized";
import { RootStackParams } from "../navigation/rootStackParams";
import { Period } from "../ts";
import { dayMonthFormat } from "../utils/date-utils";
import { useMinutes } from "../hooks";
import theme from "../../assets/styles/theme";
import { Stack, IconBackButton } from "../components/core";
import CalendarPeriodTab from "../components/customized/Tabs/PeriodTabs/CalendarPeriodTab";
import _, { isEmpty } from "lodash";
import FixedPeriodTab from "../components/customized/Tabs/PeriodTabs/FixedPeriodTab";
import { displayDash } from "../utils";
import * as Animatable from "react-native-animatable";

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
  const { width } = useWindowDimensions();
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

  const goNext = () =>
    navigation.navigate("FiltersService", {
      service,
      period: {
        ...period,
        startDate: period.startDate?.format(),
        endDate: period.endDate?.format(),
      },
    });

  const getMinutesName = (min: number) => {
    const minuteEl = _.find(minutes, { id: min });
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
        period={period}
        minutes={minutes}
        onHandlePeriod={(period) =>
          setPeriod({
            ...period,
            key: "calendar",
            title: "",
            description: "",
            startMinutes: null,
            endMinutes: null,
          })
        }
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

  const showBtnHours =
    (period.key === "calendar" && startDate && endDate) ||
    period.key === "anytime" ||
    period.key === "weekend";

  return (
    <View style={{ flex: 1, backgroundColor: primary }}>
      <SafeAreaView style={{ justifyContent: "space-between" }}>
        <View style={styles.header}>
          <Text style={styles.mainHeading}>{t("select")}</Text>
          <Text style={styles.mainHeading}>{t("period")}</Text>
        </View>
      </SafeAreaView>
      <View
        style={{
          backgroundColor: "white",
          flex: 1,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
      >
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View style={styles.body}>
            <Stack direction="row" justify="center" sx={styles.sheetOverview}>
              <IconBackButton size={20} />
              <Stack sx={{ flex: 1 }}>
                <Text style={styles.title}>{service?.name}</Text>
                <Text style={styles.description}>{description}</Text>
              </Stack>
              <Icon name="chevron-back" type="ionicon" color="white" />
            </Stack>
          </View>
          <Tab.Navigator
            initialRouteName={screen}
            screenOptions={{
              tabBarContentContainerStyle: {
                height: 42,
              },
              tabBarStyle: {
                borderRadius: 25,
                backgroundColor: "#eee",
                width: 280,
                marginLeft: width / 2 - 140,
                justifyContent: "center",
              },
              tabBarItemStyle: {
                width: 140,
              },
              tabBarLabelStyle: {
                color: "black",
                textTransform: "none",
                fontWeight: "600",
                marginBottom: 5,
                height: 32,
                marginTop: 16,
              },
              tabBarIndicatorStyle: {
                height: 32,
                width: 130,
                marginHorizontal: 5,
                marginBottom: 5,
                borderRadius: 25,
                backgroundColor: "white",
              },
            }}
            sceneContainerStyle={{ backgroundColor: "white" }}
          >
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
          </Tab.Navigator>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#ddd",
          paddingBottom: insets.bottom,
          paddingHorizontal: 15,
        }}
      >
        <Stack direction="row">
          {showBtnHours && (
            <Animatable.View
              animation={showBtnHours ? "slideInLeft" : "None"}
              duration={150}
            >
              <ButtonGroup
                onPress={() => setVisible((visible) => !visible)}
                buttons={hoursButtons}
                activeBtn={activeHours}
                sx={{ marginRight: 15 }}
              />
            </Animatable.View>
          )}
          <View style={{ flex: 1 }}>
            <Button title={t("next")} onPress={goNext} disabled={disabled()} />
          </View>
        </Stack>
      </View>
      <PickerHoursModal
        visible={visible}
        minutes={minutes}
        onAction={handleHours}
        onClose={() => setVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: { marginVertical: 30, marginHorizontal: 20 },
  mainHeading: { color: "white", fontSize: 28, fontWeight: "700" },
  body: {
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
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
});
