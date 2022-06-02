import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Feedback, Header, Stack } from "../components/core";
import { Footer, NoFoundMessage } from "../components/customized";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import theme from "../assets/styles/theme";
import { Agenda } from "react-native-calendars";
import moment from "moment";
import { Icon } from "@rneui/themed";
import { trimFunc } from "../utils";
import axios from "axios";
import { useAuth, useLocationStartEnd } from "../hooks";
import { BASE_ENDPOINT } from "@env";

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

const secondSlots = [
  {
    startHour: "14:30",
    endHour: "15:00",
  },
  {
    startHour: "15:30",
    endHour: "16:00",
  },
];

const { primary, black, grey0 } = theme.lightColors;

const CalendarScreen = ({ route }) => {
  const { user } = useAuth();
  const { product, service, ownerId, employee, opening_hours } = route.params;
  const { name, price, option, duration } = product;
  const [disabled, setDisabled] = useState(true);
  const minDate = moment().format("YYYY-MM-DD");
  const maxDate = moment().add(120, "days").format("YYYY-MM-DD");
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const [slots, setSlots] = useState(DUMMY_HOURS);
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState(minDate);
  const [selectedHour, setSelectedHour] = useState("");
  const [activeSlot, setActiveSlot] = useState(null);
  const [knob, setKnob] = useState(false);
  const { locationStart, locationEnd } = useLocationStartEnd(
    opening_hours.normal_days,
    selectedDay
  );
  const { t } = useTranslation();
  const navigation = useNavigation();

  useEffect(() => {
    if (selectedHour === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [selectedHour]);

  console.log("SELECTED DAY", selectedDay);
  console.log("SELECTED HOUR", selectedHour);
  //console.log("START", start);

  const start = moment(selectedDay).add(selectedHour, "hours").format();

  console.log("START", moment(start));

  const handleBook = () => {
    // setLoading(true);
    // axios
    //   .post(
    //     `${BASE_ENDPOINT}/schedules?slot=29&locationStart=${locationStart}&locationEnd=${locationEnd}`,
    //     {
    //       start,
    //       owner: ownerId,
    //       employee,
    //       customer: {
    //         _id: user?._id,
    //         name: user?.name,
    //         avatar: user?.avatar,
    //       },
    //       service: {
    //         _id: service?._id,
    //         name: service?.name,
    //       },
    //       product: {
    //         name,
    //         price,
    //         option: option?.name,
    //         duration,
    //       },
    //       channel: "closer",
    //     }
    //   )
    //   .then((res) => {
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //     setFeedback({ visible: true, message: t("somethingWentWrong") });
    //   });
  };

  const showKnob = (
    <>
      {knob && <Icon name="keyboard-arrow-up" color={grey0} size={30} />}
      {!knob && <Icon name="keyboard-arrow-down" color={grey0} size={30} />}
    </>
  );

  const handleDayPress = (day) => {
    setSelectedDay(day.dateString);
    setSlots(secondSlots);
  };
  const handlePressSlot = (startHour, endHour) => {
    setSelectedHour(startHour);
  };

  const activeSlotBg = { ...styles.slot, ...styles.active };
  const activeSlotTxt = { ...styles.slotText, ...styles.activeText };

  const renderSlot = ({ startHour, endHour }) => (
    <Button onPress={() => handlePressSlot(startHour, endHour)}>
      <Stack
        direction="row"
        justify="start"
        sx={activeSlot ? activeSlotBg : styles.slot}
      >
        <Text style={activeSlot ? activeSlotTxt : styles.slotText}>
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
        <Feedback feedback={feedback} setFeedback={setFeedback} />
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
        <Footer
          disabled={disabled}
          btnTitle={t("book")}
          onPress={handleBook}
          loading={loading}
        >
          <Text style={styles.product}>{trimFunc(name, 20)}</Text>
          <Text style={styles.price}>{price} RON</Text>
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
