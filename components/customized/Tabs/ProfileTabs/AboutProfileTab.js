import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AddressFormat } from "../../../../utils/addressFormat";
import theme from "../../../../assets/styles/theme";
import { MAIN_ROLE, SECOND_ROLE } from "@env";
import {
  Button,
  IconLocation,
  Stack,
  ListItem,
  Protected,
} from "../../../core";
import { useTranslation } from "react-i18next";
import { Icon } from "@rneui/themed";
import { trimFunc, formatSeconds } from "../../../../utils";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const { black, primary, grey0 } = theme.lightColors;

export const AboutProfileTab = ({
  biography,
  website,
  location,
  role,
  hours,
}) => {
  const { mon, tue, wed, thu, fri, sat, sun } = hours || {};
  const schedules = [
    { day: "mon", ...mon },
    { day: "tue", ...tue },
    { day: "wed", ...wed },
    { day: "thu", ...thu },
    { day: "fri", ...fri },
    { day: "sat", ...sat },
    { day: "sun", ...sun },
  ];
  const { t } = useTranslation();

  const handleClosed = (startTime, endTime) => {
    if (startTime === -1) {
      return t("closed");
    } else {
      return `${formatSeconds(startTime)} - ${formatSeconds(endTime)}`;
    }
  };

  return (
    <View style={styles.screen}>
      <Stack align="start" sx={styles.section}>
        <Text style={styles.heading}>{t("biography")}</Text>
        <Text style={styles.bio}>
          {biography ? trimFunc(biography, 115) : t("notAdded")}
        </Text>
      </Stack>
      <Stack align="start" sx={styles.section}>
        <Text style={styles.heading}>{t("contact")}</Text>
        <Stack direction="row" sx={styles.stack}>
          <Icon name="link" type="feather" size={20} color={grey0} />
          <Button sx={{ marginLeft: 10 }}>
            {website && <Text style={styles.actionBtn}>{website}</Text>}
            {!website && (
              <Text style={{ fontFamily: "Exo-Regular" }}>{t("notAdded")}</Text>
            )}
          </Button>
        </Stack>
        <Protected userRole={role} roles={[SECOND_ROLE]}>
          <Stack direction="row" sx={styles.stack}>
            <Icon name="award" type="feather" size={20} color={grey0} />
            <Text style={styles.label}>Angajat la </Text>
            <Button sx={{ marginLeft: 2.5 }}>
              <Text style={styles.actionBtn}>@trattoria</Text>
            </Button>
          </Stack>
        </Protected>
        <Protected userRole={role} roles={[MAIN_ROLE, SECOND_ROLE]}>
          <Stack direction="row" sx={styles.stack}>
            <IconLocation color={grey0} />
            <Text style={styles.location}>
              {location ? AddressFormat(location) : t("notAdded")}
            </Text>
          </Stack>
        </Protected>
      </Stack>
      <Protected userRole={role} roles={[MAIN_ROLE, SECOND_ROLE]}>
        {hours && (
          <Stack align="start" sx={styles.section}>
            <Stack direction="row">
              <Icon name="calendar" type="feather" color={primary} />
              <Text style={{ ...styles.heading, marginLeft: 10 }}>
                {t("schedule")}
              </Text>
            </Stack>
            {schedules.map((day, i) => (
              <ListItem key={i} between mt={20}>
                <Text style={styles.day}>{t(day?.day)}</Text>
                <Text>{handleClosed(day.startTime, day.endTime)}</Text>
              </ListItem>
            ))}
          </Stack>
        )}
      </Protected>
      {location && (
        <Stack sx={styles.section}>
          <MapView
            style={{ height: 300, width: "100%" }}
            initialRegion={{
              latitude: 44.425625,
              longitude: 26.102312,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            provider={PROVIDER_GOOGLE}
          >
            <Marker
              coordinate={{
                latitude: location.coordinates[0],
                longitude: location.coordinates[1],
              }}
              image={require("../../../../assets/images/map_marker.png")}
            ></Marker>
          </MapView>
        </Stack>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  section: { marginVertical: 15, marginHorizontal: 15 },
  heading: {
    fontFamily: "Exo-SemiBold",
    color: black,
    fontSize: 15.5,
  },
  seeMoreBtn: {
    fontFamily: "Exo-SemiBold",
    color: primary,
    fontSize: 14,
    marginLeft: 5,
  },
  bio: {
    fontFamily: "Exo-Regular",
    marginTop: 10,
    fontSize: 14,
    color: black,
  },
  label: {
    fontFamily: "Exo-Regular",
    color: black,
    marginLeft: 10,
  },
  actionBtn: {
    fontFamily: "Exo-SemiBold",
    color: black,
    fontSize: 14.5,
  },
  location: {
    flex: 1,
    marginLeft: 10,
    fontFamily: "Exo-Medium",
    fontSize: 13.5,
    color: black,
    paddingRight: 10,
  },
  distance: {
    flex: 1,
    marginLeft: 5,
    fontFamily: "Exo-Bold",
    fontSize: 13.5,
    color: primary,
  },
  stack: { marginTop: 10 },
  schedule: { marginTop: 10 },
  day: { fontFamily: "Exo-SemiBold" },
});
