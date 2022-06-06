import { StyleSheet, Text, View, Animated } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { IconBackButton, Stack } from "../components/core";
import { useAuth } from "../hooks";

const MapScreen = ({ route }) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const { location, business } = route.params;
  const [locations, setLocations] = useState([]);
  const maxDistance = 50;

  useFocusEffect(
    React.useCallback(() => {
      axios
        .get(
          `${process.env.BASE_ENDPOINT}/users/get-locations-map?latlng=26.100195,44.428286&business=${business?._id}&maxDistance=${maxDistance}`,
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        )
        .then((res) => {
          setLocations(res.data.locations);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [business])
  );

  const goToLocation = () =>
    navigation.push("ProfileGeneral", {
      userId: loc?._id,
      username: loc?.username,
      name: loc?.name,
      avatar: loc?.avatar,
    });

  return (
    <View>
      <IconBackButton sx={styles.backBtn} size={20} />
      <MapView
        style={{ height: "100%" }}
        initialRegion={{
          latitude: 44.428286,
          longitude: 26.100195,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE}
      >
        {locations.map((loc, i) => (
          <Marker
            key={i}
            coordinate={{
              latitude: loc.location.coordinates[0],
              longitude: loc.location.coordinates[1],
            }}
            image={require("../assets/images/map_marker.png")}
          >
            <Callout tooltip onPress={goToLocation}>
              <Stack align="start">
                <Text>Something</Text>
                <Text>Really Cool!!!</Text>
              </Stack>
            </Callout>
          </Marker>
        ))}
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
