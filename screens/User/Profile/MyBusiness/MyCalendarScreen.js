import { SafeAreaView, StyleSheet, View, RefreshControl } from "react-native";
import React, { useState, useRef, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FAB, Icon } from "@rneui/themed";
import { Agenda } from "react-native-calendars";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import axios from "axios";
import theme from "../../../../assets/styles/theme";
import { Header, Button } from "../../../../components/core";
import {
  NoFoundMessage,
  CardSlotDetails,
  BusinessScheduleModal,
} from "../../../../components/customized";
import { useAuth, useDates } from "../../../../hooks";

const { black, grey0, primary } = theme.lightColors;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const MyCalendarScreen = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { _minDate, _maxDate } = useDates();
  const [schedules, setSchedules] = useState({});
  const [selectedDay, setSelectedDay] = useState(minDate);
  const [knob, setKnob] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "60%"], []);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      axios
        .get(`${process.env.BASE_ENDPOINT}/users/${user?._id}/schedules`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then((res) => {
          let schedulesObj = {};

          res.data.schedules.forEach((schedule) => {
            const { _id, schedules } = schedule;
            const dayFormat = moment(_id).format("YYYY-MM-DD");

            schedulesObj = {
              ...schedulesObj,
              [dayFormat]: schedules,
            };
          });

          setSchedules(schedulesObj);
        })
        .catch((err) => console.log(err));
    }, [])
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
    const { scheduleStart, channel, customer, product, service } = item;

    return (
      <CardSlotDetails
        startHour={moment(scheduleStart).utc().format("HH:mm")}
        channel={channel}
        avatar={customer?.avatar}
        customer={customer?.name}
        product={product?.name}
        price={product?.price}
        service={service?.name}
        day={moment(scheduleStart).utc().day()}
      />
    );
  };

  const handleUpdateSchedules = (schedule) => {};

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
        items={schedules}
        renderItem={renderSlot}
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
      <FAB
        activeOpacity={1}
        icon={{ name: "post-add", type: "material", color: "white" }}
        color={primary}
        placement="right"
        onPress={() => setVisible(true)}
        style={styles.fab}
      />
      <Portal>
        <BusinessScheduleModal
          visible={visible}
          onCloseModal={() => setVisible(false)}
          onUpdateSchedules={handleUpdateSchedules}
        />
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
