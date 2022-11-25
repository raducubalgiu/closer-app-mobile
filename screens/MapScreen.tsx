import { StyleSheet, Dimensions, FlatList, Platform } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Stack } from "../components/core";
import { useGet, useRefreshOnFocus } from "../hooks";
import { RootStackParams } from "../models/navigation/rootStackParams";
import { HeaderMap } from "../components/customized";
import BusinessButton from "../components/customized/Buttons/BusinessButton";
import CardLocationMap from "../components/customized/Cards/CardLocationMap";
import MapMarkerProfile from "../components/customized/Map/MapMarkerProfile";
import { trimFunc } from "../utils";
import * as Location from "expo-location";

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

const LOCATION_WIDTH = width * 0.9;
const LOCATION_INSET = width * 0.05;

const BUSINESS_WIDTH = width / 3 + 45;
const BUSINESS_MR = 15;

export const MapScreen = ({ route }) => {
  const [userLocation, setUserLocation] = useState(null);
  const { userId, profession } = route.params;
  const [professionId, setProfessionId] = useState(profession);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const insets = useSafeAreaInsets();
  const businessRef = useRef<FlatList>();
  const locationsRef = useRef<FlatList>();
  const mapRef = useRef();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // Do Something
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
    })();
  }, []);

  // const { data: businesses } = useGet({
  //   model: "businesses",
  //   uri: "/businesses",
  // });

  // const changeBusiness = useCallback((item: any, index: number) => {
  //   setProfessionId(item._id);
  //   businessRef.current.scrollToIndex({
  //     index,
  //   });
  // }, []);

  // const getBusinessLayout = (data: any, index: number) => ({
  //   length: BUSINESS_WIDTH,
  //   offset: BUSINESS_WIDTH * index,
  //   index,
  // });

  // const renderBusiness = useCallback(
  //   ({ item, index }) => (
  //     <BusinessButton
  //       name={item.name}
  //       isActive={item._id === professionId}
  //       sx={{ width: BUSINESS_WIDTH, marginRight: BUSINESS_MR }}
  //       onPress={() => changeBusiness(item, index)}
  //     />
  //   ),
  //   [professionId, BUSINESS_MR, BUSINESS_WIDTH]
  // );

  const {
    data: locations,
    isLoading,
    isFetching,
    refetch,
  } = useGet({
    model: "locations",
    uri: `/locations/get-locations-map?latlng=26.100195,44.428286&professionId=${professionId}`,
  });

  useRefreshOnFocus(refetch);

  const getItemLayout = (data: any, index: number) => ({
    length: width,
    offset: width * index,
    index,
  });

  const goToUser = (user) => {
    navigation.push("ProfileGeneral", {
      userId: user._id,
      name: user.name,
      username: user.username,
      avatar: user.avatar,
      checkmark: user.avatar,
      service: null,
      option: null,
    });
  };

  const renderLocation = useCallback(
    ({ item }) => {
      return (
        <CardLocationMap
          item={item}
          sx={{ width: LOCATION_WIDTH, marginHorizontal: LOCATION_INSET }}
          onPress={() => goToUser(item.owner)}
          isLoading={isLoading || isFetching}
        />
      );
    },
    [isLoading, isFetching]
  );

  const locationsIndex = locations?.findIndex((el) => el.owner._id === userId);
  //const businessIndex = businesses?.findIndex((el) => el._id === profession);
  const findLocation = locations && locations[locationsIndex];

  const [region, setRegion] = useState(null);

  useFocusEffect(
    useCallback(() => {
      setRegion({
        latitude:
          locations && locations[locationsIndex]?.address?.coordinates[0],
        longitude:
          locations && locations[locationsIndex]?.address?.coordinates[1],
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }, [])
  );

  return (
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
        {locations?.map((loc, index) => {
          const { owner, address } = loc;
          return (
            <MapMarkerProfile
              onPress={() => {
                locationsRef.current.scrollToIndex({ index });
              }}
              key={index}
              avatar={owner?.avatar}
              latitude={address.coordinates[0]}
              longitude={address.coordinates[1]}
            />
          );
        })}
      </MapView>
      <Stack sx={{ ...styles.header, marginTop: insets.top }}>
        <HeaderMap
          onSetUserRegion={() => {}}
          name={trimFunc(findLocation?.owner?.name, 15)}
          status={`Deschis acum, ${findLocation?.distance} km`}
        />
        {/* <FlatList
          ref={businessRef}
          horizontal
          data={businesses}
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          scrollEventThrottle={1}
          initialScrollIndex={businessIndex}
          renderItem={renderBusiness}
          contentContainerStyle={styles.businessesFlatList}
          getItemLayout={getBusinessLayout}
        /> */}
      </Stack>
      <Stack sx={{ ...styles.footer, marginBottom: insets.bottom }}>
        <FlatList
          ref={locationsRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={locations}
          getItemLayout={getItemLayout}
          initialScrollIndex={locationsIndex}
          pagingEnabled={true}
          scrollEventThrottle={1}
          keyExtractor={(item) => item._id}
          renderItem={renderLocation}
        />
      </Stack>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  businessesFlatList: {
    paddingVertical: 12.5,
    paddingLeft: width / 2 - BUSINESS_WIDTH / 2 + 7.5,
    paddingRight: width / 2 - BUSINESS_WIDTH / 2 + 7.5 + 15,
  },
});
