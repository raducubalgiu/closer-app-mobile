import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../assets/styles/theme";
import { IconLocation, IconStar, Stack } from "../../core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../models/navigation/rootStackParams";

const { grey0 } = theme.lightColors || {};

type IProps = { locations: any; serviceName: string };

export const Map = ({ locations, serviceName }: IProps) => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const mapStyle = [
    {
      featureType: "administrative.land_parcel",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.business",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      stylers: [
        {
          visibility: "off",
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
      {locations?.map((loc: any, i: number) => (
        <Marker
          key={i}
          coordinate={{
            latitude: loc.address.coordinates[0],
            longitude: loc.address.coordinates[1],
          }}
          //image={require("../../../assets/images/map_marker_yellow.png")}
        >
          <Stack sx={styles.priceLabel}>
            <Text
              style={{
                fontWeight: "700",
              }}
            >
              {loc?.minPrice} LEI
            </Text>
          </Stack>
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
  name: {},
  priceName: {
    color: grey0,
  },
  ratingsC: {
    marginVertical: 5,
  },
  ratingsAvg: {
    marginLeft: 2.5,
  },
  ratingsQuant: {
    marginLeft: 5,
    color: grey0,
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
    fontSize: 13,
    marginLeft: 5,
    color: grey0,
  },
  from: {
    color: grey0,
    marginLeft: 10,
    fontSize: 10,
  },
  price: {
    marginLeft: 2.5,
    fontSize: 13.5,
  },
  priceLabel: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
