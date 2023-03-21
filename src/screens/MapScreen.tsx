import {
  StyleSheet,
  Dimensions,
  FlatList,
  Platform,
  Animated,
  ListRenderItem,
  ListRenderItemInfo,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Stack } from "../components/core";
import { useGet, useRefreshOnFocus } from "../hooks";
import { RootStackParams } from "../navigation/rootStackParams";
import CardLocationMap from "../components/customized/Cards/CardLocationMap";
import { User } from "../models/user";

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

const LOCATION_WIDTH = width * 0.92;
const LOCATION_INSET = width * 0.04;

const BUSINESS_WIDTH = width / 3 + 45;
const BUSINESS_MR = 15;

type IProps = NativeStackScreenProps<RootStackParams, "Map">;

export const MapScreen = ({ route }: IProps) => {
  const [userLocation, setUserLocation] = useState(null);
  const { userId, profession, initialCoordinates } = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const insets = useSafeAreaInsets();
  const businessRef = useRef<FlatList>();
  const locationsRef = useRef<FlatList>();
  const mapRef = useRef<any>();

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       // Do Something
  //       return;
  //     }
  //     let location = await Location.getCurrentPositionAsync({});
  //     setUserLocation(location);
  //   })();
  // }, []);

  // const { data: businesses } = useGet({
  //   model: "businesses",
  //   uri: "/businesses",
  // });

  // const changeBusiness = useCallback((item: any, index: number) => {
  //   setProfessionId(item._id);
  //   businessRef.current?.scrollToIndex({
  //     index,
  //   });
  // }, []);

  // const getBusinessLayout = (data: any, index: number) => ({
  //   length: BUSINESS_WIDTH,
  //   offset: BUSINESS_WIDTH * index,
  //   index,
  // });

  // const renderBusiness = useCallback(
  //   ({ item, index }: ListRenderItem<any>) => (
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
    uri: `/locations/map?latlng=26.100195,44.428286&professionId=${profession}`,
  });

  useRefreshOnFocus(refetch);

  const getItemLayout = (data: any, index: number) => ({
    length: width,
    offset: width * index,
    index,
  });

  const goToUser = (user: User) => {
    navigation.push("ProfileGeneral", {
      username: user.username,
      service: null,
      option: null,
    });
  };

  const renderLocation = useCallback(
    ({ item }: ListRenderItemInfo<any>) => {
      return (
        <CardLocationMap
          item={item}
          sx={{ width: LOCATION_WIDTH, marginHorizontal: LOCATION_INSET }}
          onPress={() => {}}
          isLoading={isLoading || isFetching}
        />
      );
    },
    [isLoading, isFetching]
  );

  const locationsIndex = locations?.findIndex(
    (el: any) => el.ownerId._id === userId
  );
  // const businessIndex = businesses?.findIndex((el: any) => el._id === userId);
  // const findLocation = locations && locations[locationsIndex];

  const [region, setRegion] = useState({
    latitude: locations && locations[locationsIndex]?.address?.coordinates[0],
    longitude: locations && locations[locationsIndex]?.address?.coordinates[1],
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / LOCATION_WIDTH + 0.3);
      if (index >= locations.length) {
        index = locations.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      if (mapIndex !== index) {
        mapIndex = index;
        const { address } = locations[index];

        mapRef.current.animateToRegion(
          {
            latitude: address.coordinates[0],
            longitude: address.coordinates[1],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          500
        );
      }
    });
  });

  const interpolations = locations?.map((marker: any, index: number) => {
    const inputRange = [
      (index - 1) * LOCATION_WIDTH,
      index * LOCATION_WIDTH,
      (index + 1) * LOCATION_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.7, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

  const onMarkerPress = (index: number) => {
    locationsRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  };

  return (
    <>
      {locations && locations?.length > 0 && (
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
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: address.coordinates[0],
                  longitude: address.coordinates[1],
                }}
                onPress={() => onMarkerPress(index)}
              >
                <Animated.View style={styles.markerWrap}>
                  <Animated.Image
                    source={{
                      uri: ownerId.avatar[0].url,
                    }}
                    style={[styles.marker, scaleStyle]}
                  />
                </Animated.View>
              </Marker>
            );
          })}
        </MapView>
      )}
      {/* <Stack sx={{ ...styles.header, marginTop: insets.top }}>
        <HeaderMap
          onSetUserRegion={() => {}}
          name={trimFunc(findLocation?.owner?.name, 15)}
          status={`Deschis acum, ${findLocation?.distance} km`}
        />
        <FlatList
          ref={businessRef}
          horizontal
          data={businesses}
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          scrollEventThrottle={1}
          //initialScrollIndex={businessIndex}
          renderItem={renderBusiness}
          getItemLayout={getBusinessLayout}
          contentContainerStyle={{ margin: 15 }}
        />
      </Stack> */}
      <Stack sx={{ ...styles.footer, marginBottom: insets.bottom }}>
        <Animated.FlatList
          ref={locationsRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={locations}
          getItemLayout={getItemLayout}
          initialScrollIndex={locationsIndex}
          pagingEnabled={true}
          scrollEventThrottle={1}
          keyExtractor={(item) => item.id}
          renderItem={renderLocation}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: mapAnimation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
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
