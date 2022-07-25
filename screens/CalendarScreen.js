import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Header, Stack } from "../components/core";
import { NoFoundMessage } from "../components/customized";
import { useNavigation } from "@react-navigation/native";
import theme from "../assets/styles/theme";
import { useAgenda, useAuth, useDates } from "../hooks";
import axios from "axios";
import moment from "moment";

const { primary, black, grey0 } = theme.lightColors;

const CalendarScreen = ({ route }) => {
  const { user } = useAuth();
  const { _minDate } = useDates();
  const { product, service, owner, employee, hours } = route.params || {};
  const [selectedDay, setSelectedDay] = useState(_minDate);
  const [loading, setLoading] = useState(true);
  const [slots, setSlots] = useState({});
  const navigation = useNavigation();

  const { getLocationStartAndEnd, getStartSeconds, NOW } = useDates();
  const { locationStart, locationEnd } = getLocationStartAndEnd(
    hours,
    selectedDay
  );

  const fetchSlots = useCallback(() => {
    setLoading(true);
    axios
      .post(
        `${process.env.BASE_ENDPOINT}/users/${owner?._id}/schedules/slots?locationStart=${locationStart}&locationEnd=${locationEnd}`,
        { selectedDay, userId: owner._id, startSeconds: getStartSeconds(NOW) },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      .then((res) => {
        setSlots({ [selectedDay]: res.data });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [selectedDay, user, owner]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  const renderSlot = (slot) => {
    return (
      <Button onPress={() => goToConfirm(slot)}>
        <Stack direction="row" justify="start" sx={styles.slot}>
          <Text style={styles.slotText}>{slot}</Text>
        </Stack>
      </Button>
    );
  };

  const goToConfirm = (slot) => {
    navigation.navigate("ScheduleConfirm", {
      selectedDay,
      selectedHour: slot,
      service,
      product,
      owner,
      hours,
      employee,
    });
  };

  const noFoundData = (
    <>
      {!loading && (
        <NoFoundMessage
          title="Nu mai sunt locuri"
          description="Se pare ca nu mai sunt locuri pentru ziua selectata"
          iconName="calendar-clock"
          iconType="material-community"
          iconSize={60}
        />
      )}
    </>
  );

  const handleDayPress = useCallback((day) => {
    setSelectedDay(day.dateString);
  }, []);

  const { AGENDA } = useAgenda(
    slots,
    renderSlot,
    noFoundData,
    selectedDay,
    handleDayPress
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Header
          title={product?.name}
          description={moment(selectedDay).format("ll")}
          divider
        />
        {AGENDA}
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
