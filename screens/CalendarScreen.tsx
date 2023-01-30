import {
  SafeAreaView,
  StyleSheet,
  Text,
  RefreshControl,
  Pressable,
  FlatList,
  ListRenderItemInfo,
  View,
} from "react-native";
import { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Divider, Icon } from "@rneui/themed";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import theme from "../assets/styles/theme";
import { Header, Heading, Spinner, Stack } from "../components/core";
import { NoFoundMessage } from "../components/customized";
import { useGet, useRefreshOnFocus, useRefreshByUser } from "../hooks";
import { RootStackParams } from "../models/navigation/rootStackParams";
import { SHORT_DATE } from "../utils/date-utils";
import CalendarAgenda from "../components/customized/Calendars/CalendarAgenda";

const { black, grey0 } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "CalendarBig">;

const DUMMY_AVAILABLE = [
  { date: "22 ianuarie 2023" },
  { date: "23 ianuarie 2023" },
  { date: "24 ianuarie 2024" },
  { date: "25 ianuarie 2024" },
];

export const CalendarScreen = ({ route }: IProps) => {
  const { product, serviceId } = route.params;
  const { ownerId } = product;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();
  const now = dayjs().format("YYYY-MM-DD");
  const [selectedDay, setSelectedDay] = useState(now);
  const [monthIndex, setMonthIndex] = useState(0);

  const { data, refetch, isFetching, isLoading } = useGet({
    model: "slots",
    uri: `/users/${ownerId.id}/schedules/slots?day=${selectedDay}`,
  });

  const goToConfirm = (slot: any) => {
    navigation.navigate("ScheduleConfirm", {
      serviceId,
      product,
      slot,
    });
  };

  const renderSlot = useCallback(
    ({ item }: ListRenderItemInfo<any>) => (
      <Pressable onPress={() => goToConfirm(item)}>
        <Stack direction="row" justify="start" sx={styles.slot}>
          <Text style={styles.slotText}>{item?.hour}</Text>
        </Stack>
      </Pressable>
    ),
    []
  );

  const keyExtractor = useCallback((item: any) => item.hour, []);

  const noFoundData = (
    <NoFoundMessage
      title={t("noFoundAvailableSlots")}
      description={t("noFoundAvailableSlotsDescription")}
      iconName="calendar-clock"
      iconType="material-community"
      iconSize={60}
      sx={{ marginTop: 30 }}
    />
  );
  const isClosed = (
    <NoFoundMessage
      title={t("closed")}
      description={t("noFoundAvailableProgram")}
      iconName="calendar-clock"
      iconType="material-community"
      iconSize={60}
      sx={{ marginTop: 30 }}
    />
  );

  const renderAvailable = useCallback(
    ({ item }: ListRenderItemInfo<any>) => (
      <>
        <Pressable style={{ paddingVertical: 20 }}>
          <Stack direction="row">
            <Text style={{ fontSize: 15, color: grey0 }}>{item.date}</Text>
            <Icon name="keyboard-arrow-right" color={black} />
          </Stack>
        </Pressable>
        <Divider color="#ddd" />
      </>
    ),
    []
  );

  const availableDates = (
    <View style={{ marginTop: 50, marginHorizontal: 15 }}>
      <Heading title={t("findAvailable")} sx={{ fontSize: 18 }} />
      <FlatList
        data={DUMMY_AVAILABLE}
        keyExtractor={(item) => item.date}
        renderItem={renderAvailable}
      />
    </View>
  );

  useRefreshOnFocus(refetch);
  const { refreshing, refetchByUser } = useRefreshByUser(refetch);

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  const loading = (isLoading || isFetching) && !refreshing;
  const footer = (
    <>
      {loading && <Spinner />}
      {!loading && data.open && !data.slots.length && noFoundData}
      {!loading && !data.open && isClosed}
      {!loading && (!data.open || !data.slots.length) && availableDates}
    </>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={product?.name} subtitle={t("pickDateAndHour")} divider />
      <CalendarAgenda
        initialIndex={monthIndex}
        selectedDay={selectedDay}
        onSelectedDay={(item, mIndex) => {
          setSelectedDay(SHORT_DATE(item.date));
          setMonthIndex(mIndex);
        }}
      >
        <FlatList
          data={data?.slots}
          renderItem={renderSlot}
          keyExtractor={keyExtractor}
          refreshControl={refreshControl}
          ListFooterComponent={footer}
        />
      </CalendarAgenda>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
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
