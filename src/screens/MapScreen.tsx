import {
  StyleSheet,
  Dimensions,
  FlatList,
  Pressable,
  View,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Stack } from "../components/core";
import { useGet, useRefreshOnFocus } from "../hooks";
import { RootStackParams } from "../navigation/rootStackParams";
import { Icon } from "@rneui/themed";

const { width, height } = Dimensions.get("window");

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

type IProps = NativeStackScreenProps<RootStackParams, "Map">;

export const MapScreen = ({ route }: IProps) => {
  const { userId, profession, initialCoordinates } = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const insets = useSafeAreaInsets();
  const locationsRef = useRef<FlatList>();
  const mapRef = useRef<any>();

  const { data: locations, refetch } = useGet({
    model: "locations",
    uri: `/locations/map?latlng=26.100195,44.428286&professionId=${profession}`,
  });

  useRefreshOnFocus(refetch);

  const locationsIndex = locations?.findIndex(
    (el: any) => el.ownerId._id === userId
  );

  const [region, setRegion] = useState({
    latitude: locations && locations[locationsIndex]?.address?.coordinates[0],
    longitude: locations && locations[locationsIndex]?.address?.coordinates[1],
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const onMarkerPress = (index: number) => {
    locationsRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  };

  return (
    <>
      {locations && (
        <>
          <MapView
            ref={mapRef}
            style={{ height, width }}
            region={region}
            provider={PROVIDER_GOOGLE}
            customMapStyle={mapStyle}
            minZoomLevel={10}
            showsUserLocation={true}
          >
            {locations?.map((loc: any, index: number) => {
              const { ownerId, address } = loc;
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: address.coordinates[0],
                    longitude: address.coordinates[1],
                  }}
                  onPress={() => onMarkerPress(index)}
                >
                  <View style={styles.markerWrap}>
                    <Image
                      source={{
                        uri: ownerId.avatar[0].url,
                      }}
                      style={[styles.marker]}
                    />
                  </View>
                </Marker>
              );
            })}
          </MapView>
          {/* <Stack sx={{ ...styles.header, marginTop: insets.top }}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={{
                backgroundColor: "white",
                padding: 10,
                borderRadius: 50,
              }}
            >
              <Icon name="keyboard-arrow-left" />
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "white",
                padding: 10,
                borderRadius: 50,
              }}
            >
              <Icon
                name="navigation-variant-outline"
                type="material-community"
              />
            </Pressable>
          </Stack> */}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    marginHorizontal: 15,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    shadowColor: "#171717",
    shadowOffset: { width: -2.5, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  marker: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: "#ddd",
    borderWidth: 2,
    borderColor: "white",
  },
});
