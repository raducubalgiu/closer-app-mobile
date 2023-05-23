import { Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useRef } from "react";
import * as Animatable from "react-native-animatable";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import theme from "../../../../assets/styles/theme";
import { IconButton } from "../../core";
import { RootStackParams } from "../../../navigation/rootStackParams";

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
            <Pressable style={styles.button}>
              <Text style={{ fontWeight: "700" }}>{loc?.minPrice} lei</Text>
            </Pressable>
          </Marker>
        ))}
      </MapView>
      {sheetIndex === 0 && (
        <Animatable.View ref={animRef} style={styles.actions}>
          <IconButton
            name="navigation"
            sx={styles.action}
            onPress={() => ref.current?.animateToRegion(initialRegion)}
          />
          <IconButton
            name="plus"
            sx={{ ...styles.action, marginVertical: 10 }}
          />
          <IconButton name="minus" sx={styles.action} />
        </Animatable.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
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
  },
  actions: {
    position: "absolute",
    right: 0,
    top: 25,
    marginRight: 15,
  },
  action: {
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
  },
});
