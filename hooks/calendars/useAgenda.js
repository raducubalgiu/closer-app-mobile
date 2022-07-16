import { useState } from "react";
import { RefreshControl } from "react-native";
import { Agenda } from "react-native-calendars";
import { Icon } from "@rneui/themed";
import { useDates } from "../useDates";
import { useRefresh } from "../useRefresh";
import theme from "../../assets/styles/theme";

const { primary, grey0 } = theme.lightColors;

export const useAgenda = (schedules, renderItem, noFoundData) => {
  const { _minDate, _maxDate } = useDates();
  const [selectedDay, setSelectedDay] = useState(_minDate);
  const [knob, setKnob] = useState(false);

  const { refreshing, onRefresh } = useRefresh(() => {});

  const showKnob = (
    <>
      {knob && <Icon name="keyboard-arrow-up" color={grey0} size={30} />}
      {!knob && <Icon name="keyboard-arrow-down" color={grey0} size={30} />}
    </>
  );

  const agenda = (
    <Agenda
      items={schedules}
      renderItem={renderItem}
      onDayPress={(day) => console.log("day pressed")}
      onDayChange={(day) => setSelectedDay(day)}
      renderDay={() => {}}
      firstDay={1}
      onCalendarToggled={(calendarOpened) => setKnob(calendarOpened)}
      selected={_minDate}
      minDate={_minDate}
      maxDate={_maxDate}
      pastScrollRange={5}
      futureScrollRange={5}
      renderEmptyDate={() => <View />}
      renderEmptyData={() => noFoundData}
      renderKnob={() => showKnob}
      rowHasChanged={(r1, r2) => r1.text !== r2.text}
      showClosingKnob={true}
      disabledByDefault={false}
      refreshing={true}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
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
      // markedDates={{
      //   "2022-06-16": { selected: true, marked: true },
      //   "2022-06-17": { marked: true },
      //   "2022-06-18": { marked: true },
      // }}
      style={{}}
    />
  );

  return {
    AGENDA: agenda,
  };
};
