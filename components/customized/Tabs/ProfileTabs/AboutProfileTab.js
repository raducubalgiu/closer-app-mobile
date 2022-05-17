import { StyleSheet, Text, ScrollView } from "react-native";
import React from "react";
import { AddressFormat } from "../../../../utils/addressFormat";
import theme from "../../../../assets/styles/theme";
import { SECOND_ROLE } from "@env";
import { Button, Protected, Stack } from "../../../core";
import { useTranslation } from "react-i18next";

export const AboutProfileTab = (props) => {
  const { biography, website, location, role } = props;
  const { t } = useTranslation();

  return (
    <ScrollView
      style={styles.screen}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <Stack align="start" justify="start" sx={styles.container}>
        <Text style={styles.heading}>{t("biography")}</Text>
        <Text style={styles.bio}>{biography ? biography : t("notAdded")}</Text>
      </Stack>
      <Stack align="start" justify="start" sx={styles.container}>
        <Text style={styles.heading}>{t("contact")}</Text>
        <Stack direction="row" sx={styles.stack}>
          <Text style={styles.label}>{t("website")}:</Text>
          <Button sx={{ marginLeft: 5 }}>
            {website && <Text style={styles.actionBtn}>{website}</Text>}
            {!website && (
              <Text style={{ fontFamily: "Exo-Regular" }}>{t("notAdded")}</Text>
            )}
          </Button>
        </Stack>
        <Protected userRole={role} roles={[SECOND_ROLE]}>
          <Stack direction="row" sx={styles.stack}>
            <Text style={styles.label}>Angajat la </Text>
            <Button sx={{ marginLeft: 5 }}>
              <Text style={styles.actionBtn}>@trattoria</Text>
            </Button>
          </Stack>
        </Protected>
        <Stack direction="row" align="start" sx={styles.stack}>
          <Text style={styles.label}>{t("location")}:</Text>
          <Text style={styles.location}>
            {location ? AddressFormat(location) : t("notAdded")}
          </Text>
        </Stack>
      </Stack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  container: { marginVertical: 15, marginHorizontal: 15 },
  heading: {
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.black,
    fontSize: 15.5,
  },
  seeMoreBtn: {
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.primary,
    fontSize: 14,
    marginLeft: 5,
  },
  bio: {
    fontFamily: "Exo-Regular",
    marginTop: 10,
    fontSize: 14,
    color: theme.lightColors.black,
  },
  label: {
    fontFamily: "Exo-Regular",
    color: theme.lightColors.black,
  },
  actionBtn: {
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.black,
    fontSize: 14.5,
  },
  location: {
    flex: 1,
    marginLeft: 10,
    fontFamily: "Exo-Medium",
    fontSize: 13.5,
    color: theme.lightColors.black,
    paddingRight: 10,
  },
  distance: {
    flex: 1,
    marginLeft: 5,
    fontFamily: "Exo-Bold",
    fontSize: 13.5,
    color: theme.lightColors.primary,
  },
  stack: { marginTop: 5 },
});
