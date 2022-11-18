import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import { Divider } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import theme from "../../../assets/styles/theme";
import { Stack, CustomAvatar, Checkmark } from "../../core";
import { useNavigation } from "@react-navigation/native";

const { black, grey0, error, success, primary } = theme.lightColors;

export const CardScheduleOverview = ({ schedule, start }) => {
  const { user, status, service, product } = schedule;
  const { name, avatar, checkmark } = user || {};
  const { t } = useTranslation();
  const navigation = useNavigation();

  const goToDetails = () =>
    navigation.navigate("ScheduleDetails", { schedule });

  let statusColor =
    status === "canceled" ? { color: error } : { color: success };

  return (
    <Pressable onPress={goToDetails} style={{ paddingBottom: 15 }}>
      <Stack direction="row" align="start">
        <Stack direction="row">
          <Stack align="start" sx={{ marginLeft: 10 }}>
            <Text style={styles.service}>{service?.name}</Text>
            <Text style={styles.date}>{start}</Text>
            <Stack direction="row" sx={{ marginTop: 10 }}>
              <CustomAvatar avatar={avatar} size={30} iconSize={15} />
              <Stack direction="row" sx={{ marginLeft: 10 }}>
                <Text style={styles.name}>{name}</Text>
                {checkmark && <Checkmark sx={{ marginLeft: 5 }} size={7.5} />}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack>
          <Text style={styles.price}>LEI {product?.price}</Text>
          <Text style={{ ...styles.status, ...statusColor }}>
            {status === "accepted" ? t("accepted") : t("canceled")}
          </Text>
        </Stack>
      </Stack>
      <Divider color="#ddd" style={{ paddingTop: 25 }} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 14.5,
    color: black,
    fontWeight: "500",
  },
  service: {
    color: black,
    fontSize: 15,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  product: { fontSize: 15, fontWeight: "400", color: black },
  date: {
    color: grey0,
    fontSize: 14,
    marginTop: 5,
    fontWeight: "500",
    textTransform: "lowercase",
  },
  price: {
    fontSize: 15,
    color: black,
    marginBottom: 5,
    fontWeight: "700",
  },
  status: {
    color: grey0,
    fontSize: 12,
    textTransform: "uppercase",
  },
  newCont: {
    marginLeft: 5,
    marginBottom: 10,
    backgroundColor: primary,
    borderRadius: 10,
  },
  new: {
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 12,
  },
});
