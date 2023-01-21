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
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@rneui/themed";
import dayjs from "dayjs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "../../../../assets/styles/theme";
import { NoFoundMessage, DatePicker } from "../../../../components/customized";
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
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../models/navigation/rootStackParams";

const { black, primary, success, error } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "MyCalendar">;

export const MyCalendarScreen = ({ route }: IProps) => {
  const { initialIndex } = route.params || {};
  const { user } = useAuth();
  const now = dayjs().format("YYYY-MM-DD");
  const [selectedDay, setSelectedDay] = useState(now);
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const { data, refetch, isLoading, isFetching } = useGet({
    model: "schedules",
    uri: `/users/${user?.id}/schedules/calendar?day=${selectedDay}`,
  });

  const { open, availableSlots, schedules } = data || {};

  const renderSlot = useCallback(({ item, index }: ListRenderItemInfo<any>) => {
    return (
      <Pressable
        disabled={!item.bookable}
        onPress={() =>
          navigation.navigate("AddSchedule", {
            start: item.start,
            end: item.end,
            index,
          })
        }
      >
        <Stack direction="row" sx={{ margin: 15 }} align="start">
          <Text style={styles.hour}>{item.hour}</Text>
          {!item.schedule && (
            <View style={styles.unbooked}>
              <Icon
                name="plus-circle"
                type="feather"
                size={37.5}
                color={item.bookable ? primary : "#ddd"}
              />
            </View>
          )}
          {item.schedule && <SlotDetailsListItem schedule={item?.schedule} />}
        </Stack>
      </Pressable>
    );
  }, []);

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

  const header = (
    <>
      {open && (
        <Stack direction="row" sx={{ marginLeft: 15 }}>
          <Stack direction="row">
            <View
              style={{
                ...styles.bullet,
                backgroundColor: availableSlots > 0 ? success : error,
                marginRight: 7.5,
              }}
            />
            <Stack direction="row">
              <Text
                style={{
                  color: black,
                  fontWeight: "700",
                  fontSize: 16,
                  marginRight: 2.5,
                }}
              >
                {availableSlots}
              </Text>
              <Text style={{ color: black, fontSize: 15 }}>sloturi libere</Text>
            </Stack>
          </Stack>
          <Pressable
            onPress={() =>
              navigation.navigate("MyCalendarStatistics", { day: selectedDay })
            }
            style={{ padding: 15 }}
          >
            <Icon name="bar-chart" type="feather" size={25} />
          </Pressable>
        </Stack>
      )}
    </>
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
          divider
          title={t("myCalendar")}
          subtitle={user?.name}
          actionBtn={actionBtn}
        />
      </SafeAreaView>
      <DatePicker
        selectedDay={selectedDay}
        onSelectedDay={(item) => setSelectedDay(SHORT_DATE(item.date))}
      >
        <FlatList
          data={schedules}
          keyExtractor={keyExtractor}
          renderItem={renderSlot}
          ListHeaderComponent={header}
          ListFooterComponent={footer}
          refreshControl={refreshControl}
          initialScrollIndex={initialIndex ? initialIndex : 0}
          getItemLayout={getItemLayout}
          contentContainerStyle={{ paddingBottom: insets.bottom }}
        />
      </DatePicker>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  bullet: { width: 10, height: 10, borderRadius: 50 },
  hour: { fontWeight: "600", fontSize: 16 },
  unbooked: {
    height: 170,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    flex: 1,
    borderRadius: 5,
  },
});
