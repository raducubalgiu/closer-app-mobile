import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  FlatList,
  ListRenderItemInfo,
  View,
  RefreshControl,
} from "react-native";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@rneui/themed";
import dayjs from "dayjs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "../../../../assets/styles/theme";
import { NoFoundMessage } from "../../../../components/customized";
import SlotDetailsListItem from "../../../../components/customized/ListItems/SlotDetailsListItem";
import { Header, Spinner, Stack } from "../../../../components/core";
import { SHORT_DATE } from "../../../../utils/date-utils";
import {
  useAuth,
  useGet,
  useRefreshByUser,
  useRefreshOnFocus,
} from "../../../../hooks";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";
import CalendarAgenda from "../../../../components/customized/Calendars/CalendarAgenda";

const { black, success, error } = theme.lightColors || {};

export const MyCalendarScreen = () => {
  const { user } = useAuth();
  const now = dayjs().format("YYYY-MM-DD");
  const [selectedDay, setSelectedDay] = useState(now);
  const [monthIndex, setMonthIndex] = useState(0);

  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const { data, refetch, isLoading, isFetching } = useGet({
    model: "schedules",
    uri: `/users/${user?.id}/schedules/calendar?day=${selectedDay}`,
  });

  const { open, availableSlots, schedules } = data || {};

  const renderSlot = useCallback(
    ({ item }: ListRenderItemInfo<any>) => <SlotDetailsListItem item={item} />,
    []
  );

  const keyExtractor = useCallback((item: any) => item.hour, []);
  const getItemLayout = useCallback(
    (data: any, index: number) => ({
      length: 170,
      offset: 170 * index,
      index,
    }),
    []
  );

  const actionBtn = (
    <Pressable
      onPress={() => navigation.navigate("MyCalendarSettings")}
      style={{ padding: 5 }}
    >
      <Icon name="settings" color={black} size={25} />
    </Pressable>
  );

  useRefreshOnFocus(refetch);
  const { refreshing, refetchByUser } = useRefreshByUser(refetch);

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  const noFoundMessage = (
    <NoFoundMessage
      title={t("closed")}
      description={t("noFoundAvailableProgram")}
      iconName="calendar-clock"
      iconType="material-community"
    />
  );

  const loading = isLoading || isFetching;

  const getHeader = (open: boolean, availableSlots: number) => {
    if (open) {
      return (
        <Stack direction="row" sx={{ marginLeft: 15 }}>
          <Stack direction="row">
            <View
              style={{
                ...styles.bullet,
                backgroundColor: availableSlots > 0 ? success : error,
              }}
            />
            <Stack direction="row">
              <Text style={styles.availableSlots}>{availableSlots}</Text>
              <Text style={styles.freeSlots}>sloturi libere</Text>
            </Stack>
          </Stack>
          <Pressable
            style={{ padding: 15 }}
            onPress={() =>
              navigation.navigate("MyCalendarStatistics", {
                day: selectedDay,
              })
            }
          >
            <Icon name="bar-chart" type="feather" size={25} />
          </Pressable>
        </Stack>
      );
    }
  };

  const header = useMemo(
    () => getHeader(open, availableSlots),
    [open, availableSlots]
  );

  const footer = (
    <>
      {loading && !refreshing && <Spinner />}
      {!loading && !open && noFoundMessage}
    </>
  );

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Header
          title={t("myCalendar")}
          subtitle={user?.name}
          actionBtn={actionBtn}
        />
      </SafeAreaView>
      <CalendarAgenda
        initialIndex={monthIndex}
        selectedDay={selectedDay}
        onSelectedDay={(item: any, mIndex: number) => {
          setSelectedDay(SHORT_DATE(item.date));
          setMonthIndex(mIndex);
        }}
      >
        <FlatList
          data={schedules}
          keyExtractor={keyExtractor}
          renderItem={renderSlot}
          ListHeaderComponent={header}
          ListFooterComponent={footer}
          refreshControl={refreshControl}
          getItemLayout={getItemLayout}
          contentContainerStyle={{ paddingBottom: insets.bottom }}
          removeClippedSubviews={true}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
        />
      </CalendarAgenda>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  bullet: { width: 10, height: 10, borderRadius: 50, marginRight: 7.5 },
  availableSlots: {
    color: black,
    fontWeight: "700",
    fontSize: 16,
    marginRight: 2.5,
  },
  freeSlots: { color: black, fontSize: 15 },
});
