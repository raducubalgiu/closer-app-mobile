import { StyleSheet, Text } from "react-native";
import React from "react";
import { Divider } from "@rneui/themed";
import { Stack, CustomAvatar, Button } from "../../core";
import moment from "moment";
import theme from "../../../assets/styles/theme";
import { useTranslation } from "react-i18next";

const { black, grey0, error, success } = theme.lightColors;

export const CardScheduleOverview = ({
  avatar,
  owner,
  service,
  price,
  status,
  scheduleStart,
  onPress,
}) => {
  const { t } = useTranslation();
  let statusColor =
    status === "canceled" ? { color: error } : { color: success };

  return (
    <Button onPress={onPress}>
      <Stack direction="row" sx={{ paddingVertical: 20 }} align="start">
        <Stack direction="row">
          <Stack align="start" sx={{ marginLeft: 10 }}>
            <Text style={styles.service}>{service}</Text>
            <Text style={styles.date}>
              {moment(scheduleStart).utc().format("lll")}
            </Text>
            <Stack direction="row" sx={{ marginTop: 10 }}>
              <CustomAvatar avatar={avatar} size={20} iconSize={12.5} />
              <Text style={styles.owner}>{owner}</Text>
            </Stack>
          </Stack>
        </Stack>
        <Stack>
          <Text style={styles.price}>{price} RON</Text>
          <Text style={{ ...styles.status, ...statusColor }}>
            {status === "accepted" ? t("accepted") : t("canceled")}
          </Text>
        </Stack>
      </Stack>
      <Divider color="#ddd" />
    </Button>
  );
};

const styles = StyleSheet.create({
  owner: {
    fontFamily: "Exo-Medium",
    fontSize: 15,
    color: black,
    marginLeft: 10,
  },
  service: {
    fontFamily: "Exo-Bold",
    color: black,
    fontSize: 15,
    textTransform: "uppercase",
  },
  date: {
    color: grey0,
    fontSize: 14.5,
    fontFamily: "Exo-Medium",
  },
  price: {
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
    color: black,
    marginBottom: 5,
  },
  status: {
    fontFamily: "Exo-Medium",
    color: grey0,
    fontSize: 13.5,
    textTransform: "uppercase",
  },
});
