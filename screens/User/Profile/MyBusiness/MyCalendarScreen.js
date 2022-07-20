import { SafeAreaView, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@rneui/themed";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import theme from "../../../../assets/styles/theme";
import { Header, Button, CFAB } from "../../../../components/core";
import {
  NoFoundMessage,
  CardSlotDetails,
  BusinessScheduleModal,
} from "../../../../components/customized";
import { useAuth, useAgenda, useSheet } from "../../../../hooks";

const { black } = theme.lightColors;

const MyCalendarScreen = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [schedules, setSchedules] = useState({});
  const [visible, setVisible] = useState(false);

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

            const dayFormat = moment
              .utc({
                year: _id.year,
                month: _id.month,
                day: _id.day,
              })
              .format("YYYY-MM-DD");

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
  const sheetContent = <Text>Hello World</Text>;
  const { BOTTOM_SHEET, SHOW_BS } = useSheet(["25%", "60%"], sheetContent);

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

  const { AGENDA } = useAgenda(schedules, renderSlot, noFoundData);

  const handleUpdateSchedules = (schedule) => {};

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title={t("myCalendar")}
        actionBtn={
          <Button onPress={SHOW_BS}>
            <Icon name="info" type="feather" color={black} size={27.5} />
          </Button>
        }
      />
      {AGENDA}
      <CFAB
        onPress={() => setVisible(true)}
        icon={{ name: "post-add", type: "material", color: "white" }}
        bottom={40}
      />
      <BusinessScheduleModal
        visible={visible}
        onCloseModal={() => setVisible(false)}
        onUpdateSchedules={handleUpdateSchedules}
      />
      {BOTTOM_SHEET}
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
});
