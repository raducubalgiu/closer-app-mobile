import { StyleSheet, Text, ScrollView } from "react-native";
import React from "react";
import Stack from "../../../components/core/Containers/Stack";
import { Colors } from "../../../assets/styles/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import { AddressFormat } from "../../../utils/addressFormat";

const AboutProfileScreen = (props) => {
  const { biography, website, location } = props;

  return (
    <ScrollView style={styles.screen}>
      <Stack align="start" justify="start" sx={styles.container}>
        <Text style={styles.heading}>Biografie</Text>
        <Text style={styles.bio}>
          {biography ? biography : "Inca nu a fost adaugata"}
        </Text>
      </Stack>
      <Stack align="start" justify="start" sx={styles.container}>
        <Text style={styles.heading}>Contact</Text>
        <Stack direction="row" sx={styles.stack}>
          <Text style={styles.label}>Website:</Text>
          <TouchableOpacity style={{ marginLeft: 5 }}>
            {website && <Text style={styles.actionBtn}>{website}</Text>}
            {!website && (
              <Text style={{ fontFamily: "Exo-Regular" }}>
                Inca nu a fost adaugat
              </Text>
            )}
          </TouchableOpacity>
        </Stack>
        {/* <Stack direction="row" sx={styles.stack}>
          <Text style={styles.label}>Angajat la </Text>
          <TouchableOpacity style={{ marginLeft: 5 }}>
            <Text style={styles.actionBtn}>@trattoria</Text>
          </TouchableOpacity>
        </Stack> */}
        <Stack direction="row" align="start" sx={styles.stack}>
          <Text style={styles.label}>Locatia:</Text>
          <Text style={styles.location}>
            {location ? AddressFormat(location) : "Inca nu a fost adaugata"}
          </Text>
        </Stack>
        <Stack direction="row" sx={{ marginTop: 15 }}>
          <Icon
            name="pushpino"
            type="antdesign"
            color={Colors.textDark}
            size={22.5}
          />
          <Text style={styles.distance}>la 5 km de tine</Text>
        </Stack>
      </Stack>
    </ScrollView>
  );
};

export default AboutProfileScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  container: { marginVertical: 15, marginHorizontal: 15 },
  heading: {
    fontFamily: "Exo-SemiBold",
    color: Colors.textDark,
    fontSize: 15.5,
  },
  seeMoreBtn: {
    fontFamily: "Exo-SemiBold",
    color: Colors.primary,
    fontSize: 14,
    marginLeft: 5,
  },
  bio: {
    fontFamily: "Exo-Regular",
    marginTop: 10,
    fontSize: 14,
    color: Colors.textDark,
  },
  label: {
    fontFamily: "Exo-Regular",
    color: Colors.textDark,
  },
  actionBtn: {
    fontFamily: "Exo-SemiBold",
    color: Colors.textDark,
    fontSize: 14.5,
  },
  location: {
    flex: 1,
    marginLeft: 10,
    fontFamily: "Exo-Medium",
    fontSize: 13.5,
    color: Colors.textDark,
    paddingRight: 10,
  },
  distance: {
    flex: 1,
    marginLeft: 5,
    fontFamily: "Exo-Bold",
    fontSize: 13.5,
    color: Colors.primary,
  },
  stack: { marginTop: 5 },
});
