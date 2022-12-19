import { ScrollView, StyleSheet, Text, View } from "react-native";
import theme from "../../../../assets/styles/theme";
import { ListItem, Stack } from "../../../core";
import { useTranslation } from "react-i18next";
import { trimFunc } from "../../../../utils";
import { useAuth } from "../../../../hooks";
import { MapStatic } from "../../Map/MapStatic";
import { Icon } from "@rneui/themed";

const { black, primary, grey0 } = theme.lightColors || {};

export const AboutProfileTab = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.screen}>
      <Stack align="start" sx={styles.section}>
        <Text style={styles.heading}>{t("biography")}</Text>
        <Text style={styles.bio}>
          {user?.description ? trimFunc(user?.description, 115) : t("notAdded")}
        </Text>
      </Stack>
      <Stack align="start" sx={styles.section}>
        <Text style={styles.heading}>{t("contact")}</Text>
        <ListItem>
          <Icon name="globe" type="feather" color={grey0} />
          <Text style={styles.bio}>{user?.website}</Text>
        </ListItem>
        <ListItem>
          <Icon name="mail" type="feather" color={grey0} />
          <Text style={styles.bio}>{user?.email}</Text>
        </ListItem>
      </Stack>
      <Stack align="start" sx={styles.section}>
        <Text style={styles.heading}>{t("location")}</Text>
        <ListItem>
          <Icon name="map-pin" type="feather" color={grey0} />

          <Text style={styles.bio}>
            Strada Oarecare, nr 25, bloc H5, et 3, ap 25, Sector 3, Bucuresti
          </Text>
        </ListItem>
      </Stack>
      <MapStatic
        longitude={26.100195}
        latitude={44.428286}
        height={200}
        minZoom={1}
      />
      <Stack align="start" sx={styles.section}>
        <Text style={styles.heading}>Program</Text>
        <ListItem between>
          <Text style={styles.bio}>Luni</Text>
          <Text style={styles.heading}>09:00 - 18:00</Text>
        </ListItem>
        <ListItem between>
          <Text style={styles.bio}>Marti</Text>
          <Text style={styles.heading}>09:00 - 18:00</Text>
        </ListItem>
        <ListItem between>
          <Text style={styles.bio}>Miercuri</Text>
          <Text style={styles.heading}>09:00 - 18:00</Text>
        </ListItem>
        <ListItem between>
          <Text style={styles.bio}>Joi</Text>
          <Text style={styles.heading}>09:00 - 18:00</Text>
        </ListItem>
        <ListItem between>
          <Text style={styles.bio}>Vineri</Text>
          <Text style={styles.heading}>09:00 - 18:00</Text>
        </ListItem>
        <ListItem between>
          <Text style={styles.bio}>Sambata</Text>
          <Text style={styles.heading}>Inchis</Text>
        </ListItem>
        <ListItem between>
          <Text style={styles.bio}>Duminica</Text>
          <Text style={styles.heading}>Inchis</Text>
        </ListItem>
      </Stack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  section: { marginVertical: 15, marginHorizontal: 15 },
  heading: {
    color: black,
    fontWeight: "600",
  },
  seeMoreBtn: {
    color: primary,
    fontSize: 14,
    marginLeft: 5,
  },
  bio: {
    marginTop: 10,
    color: grey0,
  },
  label: {
    color: black,
    marginLeft: 10,
  },
  actionBtn: {
    color: black,
    fontSize: 14.5,
  },
  location: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13.5,
    color: black,
    paddingRight: 10,
  },
  distance: {
    flex: 1,
    marginLeft: 5,
    fontSize: 13.5,
    color: primary,
  },
  stack: { marginTop: 10 },
  schedule: { marginTop: 10 },
});
