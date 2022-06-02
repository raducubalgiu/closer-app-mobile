import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { useState, useRef, useCallback, useMemo } from "react";
import { Header, Button } from "../../../../components/core";
import { useTranslation } from "react-i18next";
import theme from "../../../../assets/styles/theme";
import { FAB, Icon } from "@rneui/themed";
import { Agenda } from "react-native-calendars";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";
import {
  NoFoundMessage,
  CardSlotDetails,
} from "../../../../components/customized";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import axios from "axios";
import { useAuth } from "../../../../hooks";

const { black, grey0, primary } = theme.lightColors;

const MyCalendarScreen = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const minDate = moment().format("YYYY-MM-DD");
  const maxDate = moment().add(120, "days").format("YYYY-MM-DD");
  const [schedules, setSchedules] = useState([]);
  const [selectedDay, setSelectedDay] = useState(minDate);
  const [knob, setKnob] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "60%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCloseSheet = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        disappearsOnIndex={0}
      />
    ),
    []
  );

  useFocusEffect(
    React.useCallback(() => {
      axios
        .get(`${process.env.BASE_ENDPOINT}/users/${user?._id}/schedules`)
        .then((res) => setSchedules(res.data.schedules))
        .catch((err) => console.log(err));
    }, [user?._id])
  );

  const showKnob = (
    <>
      {knob && <Icon name="keyboard-arrow-up" color={grey0} size={30} />}
      {!knob && <Icon name="keyboard-arrow-down" color={grey0} size={30} />}
    </>
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

  const renderSlot = (item) => {
    console.log("START DATE", item.startTime);

    return (
      <CardSlotDetails
        startHour={moment(item?.scheduleStart).utc().format("HH:mm")}
        channel={item?.channel}
        avatar={item?.customer?.avatar}
        customer={item?.customer?.name}
        product={item?.product?.name}
        price={item?.product?.price}
        service={item?.service}
      />
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title={t("myCalendar")}
        actionBtn={
          <Button onPress={handlePresentModalPress}>
            <Icon name="info" type="feather" color={black} size={27.5} />
          </Button>
        }
      />
      <Agenda
        items={{
          [selectedDay]: schedules,
        }}
        renderItem={renderSlot}
        onDayPress={(day) => {
          console.log("day pressed");
        }}
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
        renderEmptyData={() => noFoundData}
        renderKnob={() => showKnob}
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
      <FAB
        icon={{ name: "post-add", type: "material", color: "white" }}
        color={primary}
        placement="right"
        onPress={() => {}}
        style={styles.fab}
      />
      <Portal>
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={styles.indicatorStyle}
          ></BottomSheetModal>
        </BottomSheetModalProvider>
      </Portal>
    </SafeAreaView>
  );
};

export default MyCalendarScreen;

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
    fontFamily: "Exo-SemiBold",
    fontSize: 13,
  },
  fab: { bottom: 50 },
  indicatorStyle: {
    backgroundColor: "#ddd",
    width: 45,
    height: 5,
  },
});
