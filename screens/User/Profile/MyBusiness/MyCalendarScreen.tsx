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
import { useTranslation } from "react-i18next";
import { Icon } from "@rneui/themed";
import dayjs from "dayjs";
import theme from "../../../../assets/styles/theme";
import {
  NoFoundMessage,
  DatePicker,
  SlotDetailsListItem,
} from "../../../../components/customized";
import { Header, Spinner, Stack } from "../../../../components/core";
import { SHORT_DATE } from "../../../../utils/date-utils";
import {
  useAuth,
  useGet,
  useSheet,
  useRefreshByUser,
  useRefreshOnFocus,
} from "../../../../hooks";
import { useCallback, useState } from "react";

const { black, primary } = theme.lightColors || {};

export const MyCalendarScreen = () => {
  const { user } = useAuth();
  const now = dayjs().format("YYYY-MM-DD");
  const [selectedDay, setSelectedDay] = useState(now);
  const { t } = useTranslation();

  const { data, refetch, isLoading, isFetching } = useGet({
    model: "schedules",
    uri: `/users/${user?.id}/schedules/calendar?day=${selectedDay}`,
  });

  const renderSlot = useCallback(({ item }: ListRenderItemInfo<any>) => {
    return (
      <Stack direction="row" sx={{ margin: 15 }} justify="start" align="start">
        <Text style={{ fontWeight: "600", fontSize: 16 }}>{item.hour}</Text>
        {!item.schedule && (
          <View
            style={{
              height: 170,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 20,
              borderWidth: 1,
              borderColor: "#ddd",
              flex: 1,
              borderRadius: 5,
            }}
          >
            <Icon
              name="pluscircleo"
              type="antdesign"
              size={35}
              color={primary}
            />
          </View>
        )}
        {item.schedule && <SlotDetailsListItem schedule={item?.schedule} />}
      </Stack>
    );
  }, []);

  const keyExtractor = useCallback((item: any) => item.hour, []);

  const sheetContent = <Text>Hello World</Text>;
  const { BOTTOM_SHEET, SHOW_BS } = useSheet(["25%", "60%"], sheetContent);

  const actionBtn = (
    <Pressable onPress={SHOW_BS} style={{ padding: 5 }}>
      <Icon name="info" type="feather" color={black} size={25} />
    </Pressable>
  );

  useRefreshOnFocus(refetch);
  const { refreshing, refetchByUser } = useRefreshByUser(refetch);

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  let footer;
  if (isLoading || isFetching) footer = <Spinner />;

  return (
    <SafeAreaView style={styles.screen}>
      <Header divider title={t("myCalendar")} actionBtn={actionBtn} />
      <DatePicker
        selectedDay={selectedDay}
        onSelectedDay={(item) => setSelectedDay(SHORT_DATE(item.date))}
      >
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderSlot}
          ListFooterComponent={footer}
          refreshControl={refreshControl}
        />
      </DatePicker>
      {BOTTOM_SHEET}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  slot: {
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: "#f1f1f1",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  slotText: {
    fontSize: 13,
  },
});
