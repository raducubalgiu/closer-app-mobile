import { useState } from "react";
import { View } from "react-native";
import { Agenda } from "react-native-calendars";
import { Icon } from "@rneui/themed";
import { useDates } from "../useDates";
import theme from "../../assets/styles/theme";

const { primary, grey0 } = theme.lightColors;

export const useAgenda = (
  schedules,
  renderItem,
  noFoundData,
  selectedDay,
  handleDayPress
) => {
  const { _minDate, _maxDate } = useDates();
  const [knob, setKnob] = useState(false);

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
      onDayPress={(day) => handleDayPress(day)}
      renderDay={() => {}}
      firstDay={1}
      onCalendarToggled={(calendarOpened) => setKnob(calendarOpened)}
      selected={selectedDay}
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
      showOnlySelectedDayItems={true}
      theme={{
        agendaDayTextColor: "yellow",
        agendaDayNumColor: "green",
        agendaTodayColor: "red",
        agendaKnobColor: "blue",
        selectedDayBackgroundColor: primary,
        textDayFontSize: 13,
        agendaKnobColor: "red",
        agendaTodayColor: "red",
        backgroundColor: "white",
        nowIndicatorKnob: "red",
        todayTextColor: primary,
      }}
    />
  );

  return {
    AGENDA: agenda,
  };
};
