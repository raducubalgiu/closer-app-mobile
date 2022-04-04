import { StyleSheet, Text, ScrollView } from "react-native";
import React from "react";
import Stack from "../../../components/core/Containers/Stack";
import { Colors } from "../../../assets/styles/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";

const AboutProfileScreen = () => {
  return (
    <ScrollView style={styles.screen}>
      <Stack align="start" justify="start" sx={styles.container}>
        <Text style={styles.heading}>Biografie</Text>
        <Text style={styles.bio}>
          Suntem o echipa de profesionisti, dedicati, pasionati si iubim ceea ce
          facem. Daca v-ati saturat de tehinicile...
          <TouchableOpacity>
            <Text style={styles.seeMoreBtn}>vezi mai mult</Text>
          </TouchableOpacity>
        </Text>
      </Stack>
      <Stack align="start" justify="start" sx={styles.container}>
        <Text style={styles.heading}>Alte detalii</Text>
        <Stack direction="row" sx={{ marginTop: 5 }}>
          <Text style={styles.label}>Website:</Text>
          <TouchableOpacity style={{ marginLeft: 5 }}>
            <Text style={styles.actionBtn}>www.trattoria.com</Text>
          </TouchableOpacity>
        </Stack>
        <Stack direction="row" sx={{ marginTop: 5 }}>
          <Text style={styles.label}>Angajat la </Text>
          <TouchableOpacity style={{ marginLeft: 5 }}>
            <Text style={styles.actionBtn}>@trattoria</Text>
          </TouchableOpacity>
        </Stack>
        <Stack direction="row" align="start" sx={{ marginTop: 5 }}>
          <Text style={styles.label}>Locatia:</Text>
          <Text style={styles.location}>
            Strada Drumul Fermei, nr 97, Popesti Leordeni, Ilfov
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
  container: { marginVertical: 10, marginHorizontal: 15 },
  heading: {
    fontFamily: "Exo-SemiBold",
    color: Colors.primary,
    fontSize: 14,
  },
  seeMoreBtn: {
    fontFamily: "Exo-SemiBold",
    color: Colors.textDark,
    fontSize: 14,
    marginLeft: 5,
  },
  bio: {
    fontFamily: "Exo-Regular",
    marginTop: 5,
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
});
