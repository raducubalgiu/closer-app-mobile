import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import {
  Header,
  Button,
  Stack,
  CustomAvatar,
} from "../../../../components/core";
import { useTranslation } from "react-i18next";
import theme from "../../../../assets/styles/theme";
import { FAB, Icon } from "@rneui/themed";
import { Agenda } from "react-native-calendars";
import moment from "moment";
import {
  NoFoundMessage,
  CardSlotDetails,
} from "../../../../components/customized";

const DUMMY_HOURS = [
  {
    startHour: "09:00",
    customer: "Raducu Balgiu",
    product: "Tuns par lung",
    price: 50,
    option: "Barbati",
    avatar: [
      {
        url: "https://res.cloudinary.com/closer-app/image/upload/v1648680388/avatar-raducu_uykjxt.jpg",
      },
    ],
    channel: "closer",
  },
  {
    startHour: "09:30",
    customer: "Oprea Laurentiu",
    product: "Tuns mediu",
    price: 65,
    option: "Barbati",
    avatar: [
      {
        url: "https://res.cloudinary.com/closer-app/image/upload/v1652450817/laur_zpdjbq.jpg",
      },
    ],
    channel: "newClient",
  },
  {
    startHour: "10:00",
    customer: "Mihaela Ghizdavescu",
    product: "Coafat",
    price: 120,
    option: "Femei",
    avatar: [],
    channel: "admin",
  },
  {
    startHour: "10:30",
    customer: "Mihaela Ghizdavescu",
    product: "Coafat",
    price: 120,
    option: "Femei",
    avatar: [],
    channel: "newClient",
  },
  {
    startHour: "11:00",
    customer: "Mihaela Ghizdavescu",
    product: "Coafat",
    price: 120,
    option: "Femei",
    avatar: [],
    channel: "admin",
  },
  {
    startHour: "11:30",
    customer: "Cristiano Ronaldo",
    product: "Coafat",
    price: 120,
    option: "Femei",
    avatar: [
      {
        url: "https://res.cloudinary.com/closer-app/image/upload/v1652805717/cristiano_i77wyp.jpg",
      },
    ],
    channel: "closer",
  },
  {
    startHour: "12:00",
    customer: "Mihaela Ghizdavescu",
    product: "Coafat",
    price: 120,
    option: "Femei",
    avatar: [],
    channel: "newClient",
  },
  {
    startHour: "12:30",
    customer: "Giorgio Chielini",
    product: "Coafat",
    price: 120,
    option: "Femei",
    avatar: [
      {
        url: "https://res.cloudinary.com/closer-app/image/upload/v1653305989/273193524_514446116663305_4320541658131852576_n_veokg0.jpg",
      },
    ],
    channel: "closer",
  },
  {
    startHour: "13:00",
    customer: "Mihaela Ghizdavescu",
    product: "Coafat",
    price: 120,
    option: "Femei",
    avatar: [],
    channel: "closer",
  },
  {
    startHour: "13:30",
    customer: "Mihaela Ghizdavescu",
    product: "Coafat",
    price: 120,
    option: "Femei",
    avatar: [],
    channel: "newClient",
  },
  {
    startHour: "14:00",
    customer: "Mihai Gindac",
    product: "Coafat",
    price: 120,
    option: "Femei",
    avatar: [
      {
        url: "https://res.cloudinary.com/closer-app/image/upload/v1652450854/mihai_z2gcw5.jpg",
      },
    ],
    channel: "closer",
  },
  {
    startHour: "14:30",
    customer: "Mihaela Ghizdavescu",
    product: "Coafat",
    price: 120,
    option: "Femei",
    avatar: [],
    channel: "admin",
  },
  {
    startHour: "15:00",
    customer: "Mihaela Ghizdavescu",
    product: "Coafat",
    price: 120,
    option: "Femei",
    avatar: [],
    channel: "newClient",
  },
  {
    startHour: "15:30",
    customer: "Mihaela Ghizdavescu",
    product: "Coafat",
    price: 120,
    option: "Femei",
    avatar: [],
    channel: "closer",
  },
  {
    startHour: "16:00",
    customer: "Mihaela Ghizdavescu",
    product: "Coafat",
    price: 120,
    option: "Femei",
    avatar: [],
    channel: "admin",
  },
  {
    startHour: "16:30",
    customer: "Mihaela Ghizdavescu",
    product: "Coafat",
    price: 120,
    option: "Femei",
    avatar: [],
    channel: "newClient",
  },
  {
    startHour: "17:00",
    customer: "Mihaela Ghizdavescu",
    product: "Coafat",
    price: 120,
    option: "Femei",
    avatar: [],
    channel: "admin",
  },
  {
    startHour: "17:30",
    customer: "Mihaela Ghizdavescu",
    product: "Coafat",
    price: 120,
    option: "Femei",
    avatar: [],
    channel: "closer",
  },
  {
    startHour: "18:00",
    customer: "Mihaela Ghizdavescu",
    product: "Coafat",
    price: 120,
    option: "Femei",
    avatar: [],
    channel: "newClient",
  },
];

const MyCalendarScreen = () => {
  const { t } = useTranslation();
  const minDate = moment().format("YYYY-MM-DD");
  const maxDate = moment().add(120, "days").format("YYYY-MM-DD");
  const [selectedDay, setSelectedDay] = useState(minDate);
  const [slots, setSlots] = useState(DUMMY_HOURS);
  const [knob, setKnob] = useState(false);

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

  const noFoundData = (
    <NoFoundMessage
      title="Nu mai sunt locuri"
      description="Se pare ca nu mai sunt locuri pentru ziua selectata"
      iconName="calendar-clock"
      iconType="material-community"
      iconSize={60}
    />
  );

  const renderSlot = (item) => (
    <CardSlotDetails
      startHour={item?.startHour}
      channel={item?.channel}
      avatar={item?.avatar}
      customer={item?.customer}
      product={item?.product}
      option={item?.option}
      price={item?.price}
    />
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title={t("myCalendar")}
        actionBtn={
          <Button>
            <Icon name="info" type="feather" color={theme.lightColors.black} />
          </Button>
        }
      />
      <Agenda
        items={{
          [selectedDay]: slots,
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
      <FAB
        icon={{ name: "post-add", type: "material", color: "white" }}
        color={theme.lightColors.primary}
        placement="right"
        onPress={() => {}}
        style={{ bottom: 50, right: 10 }}
      />
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
