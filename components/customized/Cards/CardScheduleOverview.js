import { StyleSheet, Text } from "react-native";
import React from "react";
import { Divider } from "@rneui/themed";
import { Stack, CustomAvatar, Button } from "../../core";
import moment from "moment";
import theme from "../../../assets/styles/theme";

const { black, grey0, primary } = theme.lightColors;

export const CardScheduleOverview = ({
  avatar,
  owner,
  service,
  price,
  status,
  scheduleStart,
  onPress,
}) => {
  return (
    <Button onPress={onPress}>
      <Stack direction="row" sx={{ paddingVertical: 10 }}>
        <Stack direction="row">
          <CustomAvatar avatar={avatar} size={45} iconSize={20} />
          <Stack align="start" sx={{ marginLeft: 10 }}>
            <Stack direction="row">
              <Text style={styles.owner}>{owner}</Text>
              <Text style={styles.service}>{service}</Text>
            </Stack>
            <Text style={styles.date}>
              {moment(scheduleStart).utc().format("lll")}
            </Text>
          </Stack>
        </Stack>
        <Stack>
          <Text style={styles.price}>{price} RON</Text>
          <Text style={styles.status}>{status}</Text>
        </Stack>
      </Stack>
      <Divider color="#ddd" />
    </Button>
  );
};

const styles = StyleSheet.create({
  owner: {
    fontFamily: "Exo-SemiBold",
    fontSize: 15.5,
    color: black,
  },
  service: {
    fontFamily: "Exo-SemiBold",
    color: black,
    marginLeft: 10,
    fontSize: 14,
    borderWidth: 0.5,
    borderColor: "#ccc",
    paddingVertical: 2.5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  date: {
    color: grey0,
  },
  price: {
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
    color: black,
  },
  status: {
    fontFamily: "Exo-Medium",
    color: grey0,
    fontSize: 13.5,
    textTransform: "capitalize",
  },
});
