import {
  FlatList,
  StyleSheet,
  ListRenderItemInfo,
  View,
  Text,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../navigation/rootStackParams";
import { HeaderSheet } from "../components/customized";
import { useGet } from "../hooks";
import { useCallback, useState } from "react";
import dayjs from "dayjs";
import theme from "../../assets/styles/theme";
import { isEmpty } from "lodash";
import { Spinner, Stack } from "../components/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Divider, ListItem } from "@rneui/themed";
import { NoFoundMessage } from "../components/customized";

const { black, error, success, primary, grey0 } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "CalendarSheet">;

type Slot = {
  start: string;
  dayOfWeeK: number;
};

type Day = {
  day: string;
  disabled: boolean;
  isPrevDay: boolean;
  monthIndex: number;
  slots: Slot[];
};

type Month = {
  month: string;
  days: Day[];
};

type CalendarResponse = { months: Month[] };

type SlotsResponse = {
  open: boolean;
  slots: { hours: string; start: string; end: string } | undefined;
};

export const CalendarSheetScreen = ({ route }: IProps) => {
  const { userId, name, startDate } = route.params;
  const [selectedDay, setSelectedDay] = useState(startDate);
  const [isVisible, setIsVisible] = useState(false);
  const [monthIndex, setMonthIndex] = useState(0);
  const { t } = useTranslation("common");
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const DAY_SIZE = width / 7 - 5;
  const DAY_PADDING = DAY_SIZE - 10;

  const {
    data: calendar,
    isLoading: isLoadingMonths,
    isFetching: isFetchingMonths,
  } = useGet<CalendarResponse>({
    model: "calendar",
    uri: `/users/${userId}/schedules/user-calendar`,
    options: {
      enabled: isVisible,
    },
  });

  const {
    data,
    isFetching: isFetchingSlots,
    isLoading: isLoadingSlots,
  } = useGet<SlotsResponse>({
    model: "slots",
    uri: `/users/${userId}/schedules/slots?day=${selectedDay}`,
    options: {
      enabled: !isVisible,
    },
  });

  const loadingSlots = isLoadingSlots && isFetchingSlots;

  const getBgBullet = useCallback((day: Day) => {
    switch (true) {
      case day.isPrevDay:
        return "white";
      case day.disabled:
        return "white";
      case isEmpty(day.slots):
        return error;
      default:
        return success;
    }
  }, []);

  const getColorTxt = useCallback(
    (day: Day) => {
      switch (true) {
        case day.isPrevDay:
          return "white";
        case day.disabled:
          return "#ccc";
        case selectedDay === dayjs(day.day).format("YYYY-MM-DD"):
          return "white";
        default:
          return black;
      }
    },
    [selectedDay, dayjs]
  );

  const getBgColor = useCallback(
    (day: Day) => {
      switch (true) {
        case selectedDay === dayjs(day.day).format("YYYY-MM-DD"):
          return primary;
        default:
          return "white";
      }
    },
    [selectedDay]
  );

  const renderDay = useCallback(
    ({ item }: ListRenderItemInfo<Day>) => {
      return (
        <Pressable
          onPress={() => {
            setSelectedDay(dayjs(item.day).format("YYYY-MM-DD"));
            setMonthIndex(item.monthIndex);
            setIsVisible((isVisible) => !isVisible);
          }}
          style={{
            width: DAY_SIZE,
            height: DAY_SIZE,
            alignItems: "center",
            justifyContent: "center",
          }}
          disabled={item.isPrevDay || item.disabled}
        >
          <View
            style={{
              width: DAY_PADDING,
              height: DAY_PADDING,
              borderRadius: DAY_PADDING / 2,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: getBgColor(item),
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                color: getColorTxt(item),
              }}
            >
              {dayjs(item.day).format("D")}
            </Text>
            <View
              style={{
                width: 4.5,
                height: 4.5,
                backgroundColor: getBgBullet(item),
                borderRadius: 50,
              }}
            />
          </View>
        </Pressable>
      );
    },
    [selectedDay]
  );

  const monthKey = useCallback((item: Day) => item.day, []);

  const getDayLayout = useCallback(
    (data: any, index: number) => ({
      length: DAY_SIZE,
      offset: DAY_SIZE * index,
      index,
    }),
    []
  );

  const renderMonth = useCallback(
    ({ item }: ListRenderItemInfo<Month>) => (
      <FlatList
        ListHeaderComponent={
          <View style={{ marginTop: 40, marginBottom: 10 }}>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 16,
                textTransform: "lowercase",
                color: black,
              }}
            >
              {dayjs(item.month).format("MMMM YYYY")}
            </Text>
          </View>
        }
        numColumns={7}
        data={item.days}
        keyExtractor={monthKey}
        renderItem={renderDay}
        getItemLayout={getDayLayout}
      />
    ),
    []
  );

  const keyExtractor = useCallback(
    (_: any, index: number) => index.toString(),
    []
  );

  const handleChangeDate = useCallback(
    () => setIsVisible((isVisible) => !isVisible),
    [isVisible]
  );

  const renderSlot = useCallback(
    ({ item }: ListRenderItemInfo<any>) => (
      <Pressable onPress={() => {}}>
        <Stack direction="row" justify="start" sx={styles.slot}>
          <Text style={styles.slotText}>{item?.hour}</Text>
        </Stack>
      </Pressable>
    ),
    []
  );

  const slotsKey = useCallback((item: any) => item.hour, []);

  const noFoundData = (
    <NoFoundMessage
      title={t("noFoundAvailableSlots")}
      description={t("noFoundAvailableSlotsDescription")}
      iconProps={{
        name: "calendar-clock",
        type: "material-community",
        size: 60,
      }}
      sx={{ marginTop: 30 }}
    />
  );

  const DAYS_HEADER = ["D", "L", "M", "M", "J", "V", "S"];

  const renderDayLabel = useCallback(
    ({ item }: { item: string }) => (
      <View
        style={{
          width: DAY_SIZE,
          height: DAY_SIZE,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: grey0 }}>{item}</Text>
      </View>
    ),
    []
  );

  const getMonthLayout = useCallback(
    (_: any, index: number) => ({
      length: DAY_SIZE * 6,
      offset: DAY_SIZE * 6 * index,
      index,
    }),
    []
  );

  return (
    <View style={styles.screen}>
      <HeaderSheet
        title="Calendar"
        description={name}
        onClose={() => navigation.goBack()}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginBottom: insets.bottom,
        }}
      >
        <ListItem.Accordion
          isExpanded={isVisible}
          onPress={handleChangeDate}
          content={
            <Text style={styles.date}>
              {dayjs(selectedDay).format("DD MMMM YYYY")}
            </Text>
          }
          containerStyle={styles.accordion}
        >
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            data={DAYS_HEADER}
            renderItem={renderDayLabel}
          />
          <Divider color="#ddd" />
          <FlatList
            data={calendar?.months}
            keyExtractor={keyExtractor}
            renderItem={renderMonth}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            getItemLayout={getMonthLayout}
            initialScrollIndex={monthIndex}
          />
        </ListItem.Accordion>
        <View style={{ width: "100%", flex: 1 }}>
          {!loadingSlots && (
            <FlatList
              data={data?.slots}
              keyExtractor={slotsKey}
              renderItem={renderSlot}
              ListFooterComponent={isEmpty(data?.slots) ? noFoundData : null}
            />
          )}
          {loadingSlots && <Spinner />}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  accordion: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingVertical: 7.5,
    marginVertical: 10,
  },
  date: { color: "black", fontWeight: "600", fontSize: 15 },
  slot: {
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: "#f1f1f1",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  slotText: {
    fontSize: 13,
    fontWeight: "600",
    color: black,
  },
});
