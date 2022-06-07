import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Header, Stack } from "../components/core";
import { NoFoundMessage } from "../components/customized";
import { useNavigation } from "@react-navigation/native";
import theme from "../assets/styles/theme";
import { Agenda } from "react-native-calendars";
import moment from "moment";
import { Icon } from "@rneui/themed";

const DUMMY_HOURS = [
  {
    startHour: "10:30",
    endHour: "11:00",
  },
  {
    startHour: "11:00",
    endHour: "11:30",
  },
  {
    startHour: "11:30",
    endHour: "12:00",
  },
  {
    startHour: "12:30",
    endHour: "13:00",
  },
  {
    startHour: "13:00",
    endHour: "13:30",
  },

  {
    startHour: "13:30",
    endHour: "14:00",
  },
  {
    startHour: "14:00",
    endHour: "14:30",
  },
  {
    startHour: "14:30",
    endHour: "15:00",
  },
  {
    startHour: "15:00",
    endHour: "15:30",
  },
  {
    startHour: "15:30",
    endHour: "16:00",
  },
  {
    startHour: "16:00",
    endHour: "16:30",
  },
  {
    startHour: "16:30",
    endHour: "17:00",
  },
  {
    startHour: "17:00",
    endHour: "17:30",
  },
  {
    startHour: "17:30",
    endHour: "18:00",
  },
  {
    startHour: "18:00",
    endHour: "18:30",
  },
  {
    startHour: "18:30",
    endHour: "19:00",
  },
  {
    startHour: "19:00",
    endHour: "19:30",
  },
  {
    startHour: "19:30",
    endHour: "20:00",
  },
  {
    startHour: "20:00",
    endHour: "20:30",
  },
  {
    startHour: "20:30",
    endHour: "21:00",
  },
  {
    startHour: "21:00",
    endHour: "21:30",
  },
  {
    startHour: "21:30",
    endHour: "22:00",
  },
  {
    startHour: "22:00",
    endHour: "22:30",
  },
  {
    startHour: "22:30",
    endHour: "23:00",
  },
  {
    startHour: "23:30",
    endHour: "00:00",
  },
];

const secondSlots = [
  {
    startHour: "10:30",
    endHour: "11:00",
  },
  {
    startHour: "11:00",
    endHour: "11:30",
  },
  {
    startHour: "11:30",
    endHour: "12:00",
  },
  {
    startHour: "12:30",
    endHour: "13:00",
  },
  {
    startHour: "13:00",
    endHour: "13:30",
  },

  {
    startHour: "13:30",
    endHour: "14:00",
  },
  {
    startHour: "14:00",
    endHour: "14:30",
  },
  {
    startHour: "14:30",
    endHour: "15:00",
  },
  {
    startHour: "15:00",
    endHour: "15:30",
  },
  {
    startHour: "15:30",
    endHour: "16:00",
  },
  {
    startHour: "16:00",
    endHour: "16:30",
  },
  {
    startHour: "16:30",
    endHour: "17:00",
  },
  {
    startHour: "17:00",
    endHour: "17:30",
  },
  {
    startHour: "17:30",
    endHour: "18:00",
  },
];

const { primary, black, grey0 } = theme.lightColors;

const CalendarScreen = ({ route }) => {
  const { product, service, ownerId, employee, opening_hours } = route.params;
  const { name } = product;
  const minDate = moment().format("YYYY-MM-DD");
  const maxDate = moment().add(120, "days").format("YYYY-MM-DD");
  const [slots, setSlots] = useState(DUMMY_HOURS);
  const [selectedDay, setSelectedDay] = useState(minDate);
  const [knob, setKnob] = useState(false);
  const navigation = useNavigation();

  console.log("SELECTED DAY", selectedDay);

  const goToConfirm = (startHour) => {
    console.log("SELECTED DAY FROM CONFIRM", selectedDay);

    navigation.navigate("ScheduleConfirm", {
      selectedDay,
      selectedHour: startHour,
      service,
      product,
      ownerId,
      opening_hours,
      employee,
    });
  };

  const showKnob = (
    <>
      {knob && <Icon name="keyboard-arrow-up" color={grey0} size={30} />}
      {!knob && <Icon name="keyboard-arrow-down" color={grey0} size={30} />}
    </>
  );

  const handleDayPress = useCallback((day) => {
    setSelectedDay(day.dateString);
    setSlots(secondSlots);
  }, []);

  const renderSlot = (item) => {
    console.log("ITEM", item);
    return (
      <TouchableOpacity onPress={() => goToConfirm(item.startHour)}>
        <Stack direction="row" justify="start" sx={styles.slot}>
          <Text style={styles.slotText}>
            {item.startHour} - {item.endHour}
          </Text>
        </Stack>
      </TouchableOpacity>
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

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Header
          title={name}
          description={moment(selectedDay).format("ll")}
          divider
        />
        <Agenda
          items={{
            [selectedDay]: slots,
          }}
          renderItem={renderSlot}
          onDayPress={(day) => handleDayPress(day)}
          onDayChange={(day) => setSelectedDay(day)}
          renderDay={() => <View />}
          firstDay={1}
          onCalendarToggled={(calendarOpened) => setKnob(calendarOpened)}
          selected={minDate}
          minDate={minDate}
          maxDate={maxDate}
          pastScrollRange={1}
          futureScrollRange={5}
          renderEmptyDate={() => <View />}
          renderKnob={() => showKnob}
          renderEmptyData={() => noFoundData}
          rowHasChanged={(r1, r2) => r1.text !== r2.text}
          showClosingKnob={true}
          disabledByDefault={false}
          theme={{
            agendaDayTextColor: "yellow",
            agendaDayNumColor: "green",
            agendaTodayColor: "red",
            agendaKnobColor: "blue",
            selectedDayBackgroundColor: primary,
            textDayFontFamily: "Exo-SemiBold",
            textDayFontSize: 13,
            agendaKnobColor: "red",
            agendaTodayColor: "red",
            backgroundColor: "white",
            nowIndicatorKnob: "red",
            todayTextColor: primary,
          }}
          style={{}}
        />
      </View>
    </SafeAreaView>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  product: {
    fontFamily: "Exo-SemiBold",
    fontSize: 17,
    color: black,
  },
  price: {
    fontFamily: "Exo-SemiBold",
    fontSize: 16.5,
    color: primary,
  },
  date: {
    color: grey0,
    fontSize: 15,
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
    fontFamily: "Exo-SemiBold",
    fontSize: 13,
  },
  active: {
    backgroundColor: primary,
  },
  activeText: {
    color: "white",
  },
});
