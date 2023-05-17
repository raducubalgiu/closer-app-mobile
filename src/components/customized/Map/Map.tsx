import { Pressable, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import theme from "../../../../assets/styles/theme";
import { IconLocation, IconStar, Stack } from "../../core";
import { RootStackParams } from "../../../navigation/rootStackParams";
import { Icon } from "@rneui/themed";
import * as Animatable from "react-native-animatable";
import { useEffect, useRef } from "react";

const { grey0, black } = theme.lightColors || {};

type IProps = {
  locations: any;
  serviceName: string | undefined;
  initialLatitude: number | undefined;
  initialLongitude: number | undefined;
  mapHeight: number;
  sheetIndex: number;
};

export const Map = ({
  locations,
  serviceName,
  initialLatitude,
  initialLongitude,
  mapHeight,
  sheetIndex,
}: IProps) => {
  const ref = useRef<MapView>(null);
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const animRef = useRef<any>(null);

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

  const initialRegion = {
    latitude: initialLatitude ? initialLatitude : 0.0922,
    longitude: initialLongitude ? initialLongitude : 0.0421,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useEffect(() => {
    if (sheetIndex === 0) {
      animRef.current?.fadeIn();
    }
  }, [sheetIndex]);

  return (
    <View>
      <MapView
        ref={ref}
        style={{ height: mapHeight }}
        initialRegion={initialRegion}
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
      >
        {locations?.map((loc: any, i: number) => (
          <Marker
            key={i}
            coordinate={{
              latitude: loc.address.coordinates[0],
              longitude: loc.address.coordinates[1],
            }}
          >
            <Pressable
              style={{
                backgroundColor: "white",
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
            >
              <Text style={{ fontWeight: "700" }}>{loc?.minPrice} lei</Text>
            </Pressable>
            <Callout
              onPress={() =>
                navigation.push("LocationItem", { locationId: loc?.id })
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
      {sheetIndex === 0 && (
        <Animatable.View
          ref={animRef}
          style={{
            position: "absolute",
            right: 0,
            top: 25,
            marginRight: 15,
          }}
        >
          <Pressable
            onPress={() => {
              ref.current?.animateToRegion(initialRegion);
            }}
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 15,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <Icon name="navigation" type="feather" color={black} size={22.5} />
          </Pressable>
          <Pressable
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 15,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
              marginVertical: 10,
            }}
          >
            <Icon name="plus" type="feather" color={black} size={22.5} />
          </Pressable>
          <Pressable
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 15,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <Icon name="minus" type="feather" color={black} size={22.5} />
          </Pressable>
        </Animatable.View>
      )}
    </View>
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
});
