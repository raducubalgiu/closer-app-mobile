import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import React from "react";
import { useTranslation } from "react-i18next";
import theme from "../../../assets/styles/theme";
import { IconLocation, IconStar, Stack } from "../../core";
import { useNavigation } from "@react-navigation/native";

export const Map = ({ locations, serviceName }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const mapStyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#dadada",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#c9c9c9",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
  ];

  return (
    <MapView
      style={{ height: "100%" }}
      initialRegion={{
        latitude: 44.425625,
        longitude: 26.102312,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      customMapStyle={mapStyle}
      provider={PROVIDER_GOOGLE}
    >
      {locations.map((loc, i) => (
        <Marker
          key={i}
          coordinate={{
            latitude: loc.location.coordinates[0],
            longitude: loc.location.coordinates[1],
          }}
          image={require("../../../assets/images/map_marker_yellow.png")}
        >
          <Callout
            onPress={() =>
              navigation.push("LocationItem", { locationId: loc?._id })
            }
          >
            <Stack align="start" sx={styles.callOut}>
              <Text style={styles.name}>{loc.name}</Text>
              <Stack direction="row">
                <Text>{serviceName}</Text>
                <Text style={styles.from}>{t("from")}</Text>
                <Text style={styles.price}>{loc.minPrice}</Text>
              </Stack>
              <Stack direction="row" sx={styles.ratingsC}>
                <IconStar />
                <Text style={styles.ratingsAvg}>{loc.ratingsAverage}</Text>
                <Text style={styles.ratingsQuant}>
                  {loc.ratingsQuantity} {t("reviews")}
                </Text>
              </Stack>
              <View style={styles.distanceC}>
                <IconLocation />
                <Text style={styles.distance}>
                  {t("at")} {Math.round(loc.distance)} {t("kmFromYou")}
                </Text>
              </View>
            </Stack>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  callOut: {
    padding: 5,
  },
  name: {
    fontFamily: "Exo-Bold",
  },
  priceName: {
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.grey0,
  },
  ratingsC: {
    marginVertical: 5,
  },
  ratingsAvg: {
    fontFamily: "Exo-SemiBold",
    marginLeft: 2.5,
  },
  ratingsQuant: {
    marginLeft: 5,
    fontFamily: "Exo-Medium",
    color: theme.lightColors.grey0,
    fontSize: 12,
  },
  markerDistance: {
    marginTop: 10,
    textAlign: "right",
  },
  distanceC: {
    flexDirection: "row",
    alignItems: "center",
  },
  distance: {
    fontFamily: "Exo-Medium",
    fontSize: 13,
    marginLeft: 5,
    color: theme.lightColors.grey0,
  },
  from: {
    fontFamily: "Exo-Regular",
    color: theme.lightColors.grey0,
    marginLeft: 10,
    fontSize: 10,
  },
  price: {
    fontFamily: "Exo-SemiBold",
    marginLeft: 2.5,
    fontSize: 13.5,
  },
});
