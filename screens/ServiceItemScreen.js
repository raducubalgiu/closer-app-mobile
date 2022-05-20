import { StyleSheet, Dimensions, StatusBar, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ImageSlider } from "../components/core";
import { BASE_ENDPOINT } from "@env";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const ServiceItemScreen = ({ route }) => {
  const [location, setLocation] = useState(null);
  const { userId } = route.params;

  useEffect(() => {
    axios
      .get(`${BASE_ENDPOINT}/users/${userId}`)
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

export default ServiceItemScreen;

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
