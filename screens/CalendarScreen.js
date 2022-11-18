import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Pressable,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Header, Stack } from "../components/core";
import { NoFoundMessage } from "../components/customized";
import { Icon } from "@rneui/themed";
import theme from "../assets/styles/theme";
import moment from "moment";
import { Agenda } from "react-native-calendars";
import { useRefreshByUser } from "../hooks";
import { useNavigation } from "@react-navigation/native";

const { primary, grey0 } = theme.lightColors;

export const CalendarScreen = ({ route }) => {
  const { product, service } = route.params || {};
  const navigation = useNavigation();
  const [day, setDay] = useState("2022-11-11");
  const [slots, setSlots] = useState({});
  const [knob, setKnob] = useState(false);

  const showKnob = (
    <>
      {knob && <Icon name="keyboard-arrow-up" color={grey0} size={30} />}
      {!knob && <Icon name="keyboard-arrow-down" color={grey0} size={30} />}
    </>
  );

  const goToConfirm = () => {
    navigation.navigate("ScheduleConfirm", {
      service,
      product,
    });
  };

  const renderSlot = ({ slot }) => {
    return (
      <Pressable onPress={() => goToConfirm()}>
        <Stack direction="row" justify="start" sx={styles.slot}>
          <Text style={styles.slotText}>{slot}</Text>
        </Stack>
      </Pressable>
    );
  };

  const noFoundData = (
    <NoFoundMessage
      title="Nu mai sunt locuri"
      description="Se pare ca nu mai sunt locuri pentru ziua selectata"
      iconName="calendar-clock"
      iconType="material-community"
      iconSize={60}
    />
  );

  const handleDayPress = useCallback((day) => setDay(day.dateString), []);

  const schedules = {
    "2022-11-12": [
      { slot: "10:30 - 11: 00" },
      { slot: "11:00 - 11: 30" },
      { slot: "12:00 - 12: 30" },
      { slot: "13:00 - 13: 30" },
      { slot: "14:00 - 14: 30" },
      { slot: "15:00 - 15: 30" },
      { slot: "16:00 - 16: 30" },
      { slot: "16:30 - 17: 00" },
    ],
  };

  const refetch = () => {};
  const { refreshing, refetchByUser } = useRefreshByUser(refetch);
  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title={product?.name}
        description={moment(day).format("ll")}
        divider
      />
      <Agenda
        items={schedules}
        renderItem={renderSlot}
        onDayPress={(day) => handleDayPress(day)}
        renderDay={() => {}}
        firstDay={1}
        onCalendarToggled={(k) => setKnob(k)}
        selected={day}
        minDate={"2022-08-01"}
        maxDate={"2022-12-01"}
        pastScrollRange={3}
        futureScrollRange={3}
        renderEmptyDate={() => <View />}
        renderEmptyData={() => noFoundData}
        renderKnob={() => showKnob}
        rowHasChanged={(r1, r2) => r1.text !== r2.text}
        showClosingKnob={true}
        disabledByDefault={false}
        showOnlySelectedDayItems={true}
        refreshing={refreshing}
        onRefresh={refetchByUser}
        refreshControl={refreshControl}
        theme={styles.agenda}
      />
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
    borderRadius: 10,
  },
  slotText: {
    fontSize: 13,
  },
  agenda: {
    agendaDayTextColor: "yellow",
    agendaDayNumColor: "green",
    agendaTodayColor: "red",
    agendaKnobColor: "blue",
    selectedDayBackgroundColor: primary,
    textDayFontSize: 14,
    textDayFontWeight: "500",
    agendaKnobColor: "red",
    agendaTodayColor: "red",
    backgroundColor: "white",
    nowIndicatorKnob: "red",
    todayTextColor: primary,
  },
});
