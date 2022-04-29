import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { Icon } from "@rneui/themed";
import React from "react";
import { useTranslation } from "react-i18next";
import theme from "../../../assets/styles/theme";

const Map = (props) => {
  const { t } = useTranslation();

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
      style={
        parseFloat(props.sheetStep) === 0
          ? { height: "80%" }
          : { height: "100%" }
      }
      initialRegion={{
        latitude: 44.425625,
        longitude: 26.102312,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      customMapStyle={mapStyle}
      provider={PROVIDER_GOOGLE}
    >
      {props.locations.map((marker, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: marker.location.coordinates[0],
            longitude: marker.location.coordinates[1],
          }}
          image={require("../../../assets/images/map_marker_yellow.png")}
        >
          <Callout onPress={() => console.log("Pressed!")}>
            <View style={styles.callOutContainer}>
              <Text style={styles.markerName}>{marker.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.serviceName}>{props.serviceName}</Text>
                <Text style={styles.from}>{t("from")}</Text>
                <Text style={styles.priceText}>50 Lei</Text>
              </View>
              <View style={styles.ratingsContainer}>
                <Icon
                  name="star"
                  type="antdesign"
                  color={theme.lightColors.primary}
                  size={17}
                />
                <Text style={styles.markerRatingsAverage}>
                  {marker.ratingsAverage}
                </Text>
                <Text style={styles.markerRatingsQuantity}>
                  {marker.ratingsQuantity} {t("reviews")}
                </Text>
              </View>
              <View style={styles.markerDistanceContainer}>
                <Icon
                  name="location"
                  type="entypo"
                  color={theme.lightColors.grey0}
                  size={17}
                />
                <Text style={styles.markerDistance}>
                  la {Math.round(marker.distance)} km de tine
                </Text>
              </View>
            </View>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  callOutContainer: {
    padding: 5,
  },
  markerName: {
    fontFamily: "Exo-Bold",
  },
  priceName: {
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.grey0,
  },
  ratingsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  markerRatingsAverage: {
    fontFamily: "Exo-SemiBold",
    marginLeft: 2.5,
  },
  markerRatingsQuantity: {
    marginLeft: 5,
    fontFamily: "Exo-Medium",
    color: theme.lightColors.grey0,
    fontSize: 12,
  },
  markerDistance: {
    marginTop: 10,
    textAlign: "right",
  },
  markerDistanceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  markerDistance: {
    fontFamily: "Exo-Medium",
    fontSize: 13,
    marginLeft: 5,
    color: theme.lightColors.grey0,
  },
  priceContainer: { flexDirection: "row", alignItems: "center" },
  priceText: {
    fontFamily: "Exo-SemiBold",
    marginLeft: 2.5,
    fontSize: 13.5,
  },
  from: {
    fontFamily: "Exo-Regular",
    color: theme.lightColors.grey0,
    marginLeft: 10,
    fontSize: 10,
  },
});
