import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { Header, MainButton, Stack } from "../components/core";
import axios from "axios";
import { useAuth, useLocationStartEnd } from "../hooks";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { BASE_ENDPOINT } from "@env";
import { Icon } from "@rneui/themed";
import theme from "../assets/styles/theme";
import { AddressFormat } from "../utils";
import { useTranslation } from "react-i18next";

const { black, grey0 } = theme.lightColors;

const ScheduleConfirmScreen = ({ route }) => {
  const { user } = useAuth();
  const {
    selectedDay,
    selectedHour,
    owner,
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
  const { t } = useTranslation();

  const start = moment.utc(selectedDay).add(selectedHour, "hours").format();

  const handleBook = () => {
    setLoading(true);
    axios
      .post(
        `${BASE_ENDPOINT}/schedules?slot=${slot}&locationStart=${locationStart}&locationEnd=${locationEnd}`,
        {
          start,
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
              <Text style={styles.description}>
                Include spalat, aranjat, barba precum si alte detalii
              </Text>
              <Text style={styles.description}>
                {option.name || option}, {duration} min
              </Text>
            </Stack>
          </Stack>
          <Stack align="start" direction="row" sx={{ marginBottom: 50 }}>
            <Icon name="credit-card" type="feather" size={27.5} color={grey0} />
            <Stack align="start" sx={{ marginLeft: 15, flex: 1 }}>
              <Text style={styles.heading}>Plata</Text>
              <Text style={styles.description}>{t("paymentDetails")}</Text>
              <Text style={styles.price}>150 LEI</Text>
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
    fontFamily: "Exo-SemiBold",
    color: black,
    fontSize: 15,
  },
  description: {
    marginTop: 5,
    fontFamily: "Exo-Medium",
    color: grey0,
    fontSize: 16,
  },
  price: {
    fontFamily: "Exo-SemiBold",
    marginTop: 15,
    color: black,
    fontSize: 25,
  },
});
