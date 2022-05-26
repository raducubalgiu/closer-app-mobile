import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Header, Stack } from "../components/core";
import { Footer, NoFoundMessage } from "../components/customized";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import theme from "../assets/styles/theme";
import { Agenda } from "react-native-calendars";
import moment from "moment";
import { Icon } from "@rneui/themed";
import { trimFunc } from "../utils";

const DUMMY_HOURS = [
  {
    startHour: "13:30",
    endHour: "14:00",
  },
  {
    startHour: "14:00",
    endHour: "14:30",
  },
];

const CalendarScreen = ({ route }) => {
  const { name, price } = route.params.product;
  const [disabled, setDisabled] = useState(true);
  const minDate = moment().format("YYYY-MM-DD");
  const maxDate = moment().add(120, "days").format("YYYY-MM-DD");
  const [slots, setSlots] = useState(DUMMY_HOURS);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(minDate);
  const [selectedHour, setSelectedHour] = useState("");
  const [knob, setKnob] = useState(false);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const showKnob = (
    <>
      {knob && (
        <Icon
          name="keyboard-arrow-up"
          color={theme.lightColors.grey0}
          size={30}
        />
      )}
      {!knob && (
        <Icon
          name="keyboard-arrow-down"
          color={theme.lightColors.grey0}
          size={30}
        />
      )}
    </>
  );

  const handleDayPress = (day) => {
    setSelectedDay(day);
  };

  const handlePressSlot = (startHour) => setSelectedHour(startHour);

  const renderSlot = ({ startHour, endHour }) => (
    <Button onPress={() => handlePressSlot(startHour)}>
      <Stack direction="row" justify="start" sx={styles.slot}>
        <Text style={styles.slotText}>
          {startHour} - {endHour}
        </Text>
      </Stack>
    </Button>
  );

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
          description={`${moment(selectedDay).format("ll")} - ${selectedHour}`}
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
            selectedDayBackgroundColor: theme.lightColors.primary,
            textDayFontFamily: "Exo-SemiBold",
            textDayFontSize: 13,
            agendaKnobColor: "red",
            agendaTodayColor: "red",
            backgroundColor: "white",
            nowIndicatorKnob: "red",
            todayTextColor: theme.lightColors.primary,
          }}
          style={{}}
        />
        <Footer
          disabled={disabled}
          btnTitle={t("book")}
          onPress={() => navigation.navigate("Schedule")}
        >
          <Text style={styles.product}>{trimFunc(name, 20)}</Text>
          <Text style={styles.price}>{price} RON</Text>
          <Text style={styles.date}>
            {moment(selectedDay).format("ll")} - {selectedHour}
          </Text>
        </Footer>
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
    color: theme.lightColors.black,
  },
  price: {
    fontFamily: "Exo-SemiBold",
    fontSize: 16.5,
    color: theme.lightColors.primary,
  },
  date: {
    color: theme.lightColors.grey0,
    fontSize: 15,
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
    fontFamily: "Exo-SemiBold",
    fontSize: 13,
  },
  activeSlot: {
    backgroundColor: theme.lightColors.primary,
  },
});
