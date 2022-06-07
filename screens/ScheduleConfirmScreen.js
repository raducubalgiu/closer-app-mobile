import { SafeAreaView, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { Header, MainButton, Stack } from "../components/core";
import axios from "axios";
import { useAuth } from "../hooks";
import moment from "moment";
import { useLocationStartEnd } from "../hooks";
import { useNavigation } from "@react-navigation/native";
import { BASE_ENDPOINT } from "@env";

const ScheduleConfirmScreen = ({ route }) => {
  const { user } = useAuth();
  const {
    selectedDay,
    selectedHour,
    ownerId,
    service,
    product,
    opening_hours,
    employee,
  } = route.params;
  const { name, price, option, duration } = product;
  const [loading, setLoading] = useState(false);
  const slot = 29;
  const { locationStart, locationEnd } = useLocationStartEnd(
    opening_hours.normal_days,
    selectedDay
  );
  const navigation = useNavigation();

  const start = moment.utc(selectedDay).add(selectedHour, "hours").format();

  const handleBook = () => {
    console.log("START", start);
    console.log("OWNER_ID", ownerId);
    console.log("EMPLOYEE", employee), console.log("SERVICE", service);
    console.log("PRODUCT", product);
    setLoading(true);
    axios
      .post(
        `${BASE_ENDPOINT}/schedules?slot=${slot}&locationStart=${locationStart}&locationEnd=${locationEnd}`,
        {
          start,
          owner: ownerId,
          customer: {
            _id: user?._id,
            name: user?.name,
            avatar: user?.avatar,
          },
          service: {
            _id: service?._id,
            name: service?.name,
          },
          product: {
            name,
            price,
            option: option?.name,
            duration,
          },
          channel: "closer",
        }
      )
      .then((res) => {
        setLoading(false);
        navigation.navigate("Schedules", {
          scheduleStart: res.data.schedule.scheduleStart,
        });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Confirmare rezervare" />
      <Stack sx={{ padding: 20, flex: 1 }}>
        <Stack>
          <Text>
            Period: {selectedDay} - {selectedHour}
          </Text>
        </Stack>
        <MainButton
          size="lg"
          title="Confirma rezervarea"
          loading={loading}
          onPress={handleBook}
          fullWidth
        />
      </Stack>
    </SafeAreaView>
  );
};

export default ScheduleConfirmScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
