import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { IconBackButton } from "../components/core";

const MapScreen = ({ route }) => {
  const { location } = route.params;

  return (
    <View>
      <IconBackButton sx={styles.backBtn} size={20} />
      <MapView
        style={{ height: "100%" }}
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
          image={require("../assets/images/map_marker_yellow.png")}
        ></Marker>
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10000,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingLeft: 14,
    paddingRight: 7.5,
    borderRadius: 50,
  },
});
