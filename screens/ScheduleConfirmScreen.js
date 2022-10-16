import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { Feedback, Header, MainButton, Stack } from "../components/core";
import { useAuth, useDates } from "../hooks";
import theme from "../assets/styles/theme";
import { AddressFormat } from "../utils";

const { black, grey0 } = theme.lightColors;

const ScheduleConfirmScreen = ({ route }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const {
    getStartTimeByDateAndHours,
    getEndTimeBySlot,
    getLocationStartAndEnd,
  } = useDates();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { selectedDay, selectedHour, owner, service } = route.params;
  const { product, hours, employee } = route.params;
  const { name, price, option, duration, description } = product;

  const startTime = getStartTimeByDateAndHours(selectedDay, selectedHour);
  const endTime = getEndTimeBySlot(startTime);
  const { locationStart, locationEnd } = getLocationStartAndEnd(
    hours,
    selectedDay
  );

  const handleBook = () => {
    setLoading(true);
    axios
      .post(
        `${process.env.BASE_ENDPOINT}/schedules?locationStart=${locationStart}&locationEnd=${locationEnd}`,
        {
          start: startTime,
          end: endTime,
          owner: owner._id,
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
            description,
            price,
            option: option?.name,
            duration,
          },
        },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      )
      .then((res) => {
        setLoading(false);
        navigation.navigate("Schedules", {
          schedule: { ...res.data, owner },
        });
      })
      .catch((err) => {
        const { message } = err.response.data;
        setLoading(false);
        setFeedback({ visible: true, message });
      });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("checkBookingDetails")} />
      <Feedback feedback={feedback} setFeedback={setFeedback} duration="LONG" />
      <ScrollView align="start" contentContainerStyle={styles.scrollView}>
        <Stack align="start">
          <Stack align="start" direction="row" sx={{ marginBottom: 50 }}>
            <Icon name="calendar" type="feather" size={27.5} color={grey0} />
            <Stack align="start" sx={{ marginLeft: 15, flex: 1 }}>
              <Text style={styles.heading}>
                {selectedDay} - {selectedHour}
              </Text>
              <Text style={styles.description}>{owner.name}</Text>
              <Text style={styles.description}>
                {AddressFormat(owner.location)}
              </Text>
            </Stack>
          </Stack>
          <Stack align="start" direction="row" sx={{ marginBottom: 50 }}>
            <Icon
              name="shopping-bag"
              type="feather"
              size={27.5}
              color={grey0}
            />
            <Stack align="start" sx={{ marginLeft: 15, flex: 1 }}>
              <Text style={styles.heading}>
                {service.name} - {product.name}
              </Text>
              <Text style={styles.description}>{description}</Text>
              <Text style={styles.description}>
                {option.name || option}, {duration} min
              </Text>
            </Stack>
          </Stack>
          <Stack align="start" direction="row" sx={{ marginBottom: 50 }}>
            <Icon name="credit-card" type="feather" size={27.5} color={grey0} />
            <Stack align="start" sx={{ marginLeft: 15, flex: 1 }}>
              <Text style={styles.heading}>{t("payment")}</Text>
              <Text style={styles.description}>{t("paymentDetails")}</Text>
              <Text style={styles.price}>{price} LEI</Text>
            </Stack>
          </Stack>
        </Stack>
      </ScrollView>
      <MainButton
        size="lg"
        radius={25}
        title={t("confirmBooking")}
        loading={loading}
        onPress={handleBook}
        fullWidth
        sx={{ marginHorizontal: 20 }}
      />
    </SafeAreaView>
  );
};

export default ScheduleConfirmScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingTop: 40,
    flex: 1,
  },
  heading: {
    color: black,
    fontSize: 16,
  },
  description: {
    marginTop: 5,
    color: grey0,
    fontSize: 16,
  },
  price: {
    marginTop: 15,
    color: black,
    fontSize: 25,
  },
});
