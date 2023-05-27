import { FlatList, StyleSheet, ListRenderItemInfo, View } from "react-native";
import { useCallback, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { isEmpty } from "lodash";
import { RootStackParams } from "../navigation/rootStackParams";
import { HeaderSheet, SlotListItem } from "../components/customized";
import { useGet } from "../hooks";
import { NoFoundMessage } from "../components/customized";
import { shortFormat } from "../utils/date-utils";
import Agenda from "../components/customized/Calendars/Agenda";
import { Spinner } from "../components/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type IProps = NativeStackScreenProps<RootStackParams, "CalendarSheet">;

type Slot = {
  start: string;
  dayOfWeeK: number;
  hour: string;
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
  slots: any;
};

export const CalendarSheetScreen = ({ route }: IProps) => {
  const { userId, name, startDate } = route.params;
  const [selectedDay, setSelectedDay] = useState({
    day: startDate,
    monthIndex: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation("common");
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const {
    data: calendar,
    isLoading,
    isFetching,
    isRefetching,
  } = useGet<CalendarResponse>({
    model: "calendar",
    uri: `/users/${userId}/schedules/user-calendar`,
    options: { enabled: isVisible },
  });

  const {
    data: available,
    isLoading: isLoadSlots,
    isFetching: isFetchSlots,
  } = useGet<SlotsResponse>({
    model: "slots",
    uri: `/users/${userId}/schedules/slots?day=${selectedDay.day}`,
    options: { enabled: !isVisible },
  });

  const renderSlot = useCallback(
    ({ item }: ListRenderItemInfo<Slot>) => (
      <SlotListItem onPress={() => {}} hour={item.hour} />
    ),
    []
  );

  const loadSlots = isLoadSlots || isFetchSlots;

  const slotsKey = useCallback((item: Slot) => item.hour, []);

  const noFoundData =
    isEmpty(available?.slots) && !isFetchSlots ? (
      <NoFoundMessage
        title={t("noFoundAvailableSlots")}
        description={t("noFoundAvailableSlotsDescription")}
        iconProps={{
          name: "calendar-clock",
          type: "material-community",
          size: 60,
        }}
      />
    ) : null;

  const handleDayPress = (item: Day) => {
    setSelectedDay({
      day: shortFormat(item.day),
      monthIndex: item.monthIndex,
    });
    setIsVisible((isVisible) => !isVisible);
  };

  return (
    <View style={styles.screen}>
      <HeaderSheet
        title="Calendar"
        description={name}
        onClose={() => navigation.goBack()}
      />
      <Agenda
        selectedDay={selectedDay.day}
        monthIndex={selectedDay.monthIndex}
        months={calendar?.months}
        onDayPress={handleDayPress}
        isVisible={isVisible}
        isLoading={(isLoading || isFetching) && !isRefetching}
        handleVisible={() => setIsVisible((isVisible) => !isVisible)}
      >
        {!loadSlots && (
          <FlatList
            data={available?.slots}
            keyExtractor={slotsKey}
            renderItem={renderSlot}
            ListFooterComponent={noFoundData}
            contentContainerStyle={{ paddingBottom: insets.bottom }}
          />
        )}
        {loadSlots && <Spinner />}
      </Agenda>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  slots: { width: "100%", flex: 1 },
});
