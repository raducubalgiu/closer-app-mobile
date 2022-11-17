import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { Header, MainButton, Stack } from "../components/core";
import { useAuth, usePost } from "../hooks";
import theme from "../assets/styles/theme";
import { NOW, HALF_HOUR } from "../utils/date-utils";
import dayjs from "dayjs";

const { black, grey0 } = theme.lightColors;

export const ScheduleConfirmScreen = ({ route }) => {
  const { user: customer } = useAuth();
  const { service, product } = route.params;
  const { user, name, price, option, duration, description } = product;
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { mutate, isLoading, isSuccess } = usePost({
    uri: "/schedules",
    onSuccess: () => navigation.navigate("Schedules"),
  });

  const handleBook = () => {
    mutate({
      start: NOW,
      end: dayjs(NOW).add(HALF_HOUR, "milliseconds"),
      user,
      customer: customer?._id,
      service,
      product: {
        name,
        description,
        price,
        option,
        duration,
      },
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("checkBookingDetails")} />
      <ScrollView align="start" contentContainerStyle={styles.scrollView}>
        <Stack align="start">
          <Stack align="start" direction="row" sx={{ marginBottom: 50 }}>
            <Icon
              name="calendar"
              type="feather"
              size={20}
              color={black}
              style={styles.icon}
            />
            <Stack align="start" sx={{ marginLeft: 15, flex: 1 }}>
              <Text style={styles.heading}>17-11-2022 - 14:30</Text>
              <Text style={styles.description}>Raducu Balgiu</Text>
              <Text style={styles.description}>
                Strada Ion Agirbiceanu, nr 35, Sector 3
              </Text>
            </Stack>
          </Stack>
          <Stack align="start" direction="row" sx={{ marginBottom: 50 }}>
            <Icon
              name="shopping-bag"
              type="feather"
              size={20}
              color={black}
              style={styles.icon}
            />
            <Stack align="start" sx={{ marginLeft: 15, flex: 1 }}>
              <Text style={styles.heading}>ITP - {product.name}</Text>
              <Text style={styles.description}>
                Categorie: {option.name || option}
              </Text>
              <Text style={styles.description}>{description}</Text>
              <Text style={styles.duration}>Durata: {duration} min</Text>
            </Stack>
          </Stack>
          <Stack align="start" direction="row" sx={{ marginBottom: 50 }}>
            <Icon
              name="credit-card"
              type="feather"
              size={20}
              color={black}
              style={styles.icon}
            />
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
        loading={isLoading && !isSuccess}
        onPress={handleBook}
        sx={{ marginHorizontal: 15 }}
      />
    </SafeAreaView>
  );
};

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
    fontWeight: "600",
  },
  icon: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 50,
  },
  description: {
    marginTop: 5,
    color: grey0,
    fontSize: 16,
  },
  duration: { marginTop: 5, color: grey0, fontSize: 16 },
  price: {
    marginTop: 15,
    color: black,
    fontSize: 27.5,
    fontWeight: "700",
  },
});
