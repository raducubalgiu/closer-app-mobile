import { StyleSheet, Dimensions, StatusBar, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ImageSlider } from "../components/core";
import { BASE_ENDPOINT } from "@env";
import axios from "axios";
import { useAuth } from "../hooks";

const { width, height } = Dimensions.get("window");

const LocationItemScreen = ({ route }) => {
  const { user } = useAuth();
  const [location, setLocation] = useState(null);
  const { locationId } = route.params;

  useEffect(() => {
    axios
      .get(`${BASE_ENDPOINT}/users/${locationId}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => setLocation(res.data.user))
      .catch((err) => console.log(err));
  }, []);

  return (
    <ScrollView style={styles.screen} bounces={false}>
      <StatusBar hidden />
      <ImageSlider
        images={location?.images}
        height={height / 2.75}
        width={width}
        withCounter
        withBack
      />
    </ScrollView>
  );
};

export default LocationItemScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  dotsView: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  counter: {
    color: "white",
    fontSize: 13,
  },
});
