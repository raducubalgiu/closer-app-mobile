import {
  StyleSheet,
  Pressable,
  View,
  Image,
  Animated,
  useWindowDimensions,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRef, useState, useMemo, useCallback } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Button, Stack } from "../components/core";
import { useGet, useRefreshOnFocus } from "../hooks";
import { RootStackParams } from "../navigation/rootStackParams";
import { Icon } from "@rneui/themed";
import { useStore } from "../store/appStore";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MapPostsTab from "../components/customized/Tabs/MapTabs/MapPostsTab";
import MapProductsTab from "../components/customized/Tabs/MapTabs/MapProductsTab";
import theme from "../../assets/styles/theme";
import CustomAvatar from "../components/core/Avatars/CustomAvatar";

const { black, primary, grey0 } = theme.lightColors || {};

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

const Tab = createMaterialTopTabNavigator();
type IProps = NativeStackScreenProps<RootStackParams, "Map">;

export const MapScreen = ({ route }: IProps) => {
  const { userId, profession, initialCoordinates } = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const mapRef = useRef<any>();
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [350, height - insets.top], []);
  const { location } = useStore();

  const [region, setRegion] = useState({
    latitude: initialCoordinates[0],
    longitude: initialCoordinates[1],
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const {
    data: locations,
    refetch,
    isLoading,
    isRefetching,
  } = useGet({
    model: "locations",
    uri: `/locations/map?latlng=${location?.coords?.longitude},${location?.coords?.latitude}&professionId=${profession}`,
    options: {
      onSuccess: () => {
        setRegion({
          latitude: initialCoordinates[0],
          longitude: initialCoordinates[1],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        mapRef.current?.animateToRegion({
          latitude: initialCoordinates[0],
          longitude: initialCoordinates[1],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
    },
  });

  useRefreshOnFocus(refetch);

  const loading = isLoading || isRefetching;

  const onMarkerPress = (index: number) => {};

  const handleUserRegion = () =>
    mapRef.current?.animateToRegion({
      latitude: location?.coords?.latitude,
      longitude: location?.coords?.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

  const PostsTab = useCallback(() => {
    return <MapPostsTab userId={userId} />;
  }, [userId]);

  const ProductsTab = useCallback(() => {
    return <MapProductsTab />;
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
        opacity={0.7}
      />
    ),
    []
  );

  return (
    <View>
      <MapView
        ref={mapRef}
        style={{ height, width }}
        region={region}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        minZoomLevel={10}
        showsUserLocation={true}
      >
        {!loading &&
          locations?.map((loc: any, index: number) => {
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
                <Animated.View style={styles.markerWrap}>
                  <Image
                    source={{
                      uri: ownerId.avatar[0].url,
                    }}
                    style={[styles.marker]}
                  />
                </Animated.View>
              </Marker>
            );
          })}
      </MapView>
      <View style={StyleSheet.absoluteFill}>
        <Stack
          direction="row"
          sx={{ marginTop: insets.top, marginHorizontal: 15 }}
        >
          <Pressable onPress={() => navigation.goBack()} style={styles.back}>
            <Icon name="keyboard-arrow-left" />
          </Pressable>
          <Pressable onPress={handleUserRegion} style={styles.userRegion}>
            <Icon name="navigation-variant-outline" type="material-community" />
          </Pressable>
        </Stack>
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          handleIndicatorStyle={styles.indicatorStyle}
          backdropComponent={renderBackdrop}
        >
          <View style={{ flex: 1 }}>
            <Stack direction="row" justify="start" sx={{ margin: 15 }}>
              <CustomAvatar size={45} avatar={[]} />
              <View style={{ marginLeft: 10 }}>
                <Stack
                  direction="row"
                  justify="start"
                  sx={{ marginBottom: 2.5 }}
                >
                  <Text
                    style={{
                      color: black,
                      fontWeight: "700",
                      fontSize: 15,
                      marginRight: 7.5,
                    }}
                  >
                    Adexpert ITP
                  </Text>
                  <Icon
                    name="star-fill"
                    type="octicon"
                    size={15}
                    color={primary}
                  />
                  <Text
                    style={{
                      fontWeight: "700",
                      color: black,
                      marginLeft: 2.5,
                      fontSize: 14,
                    }}
                  >
                    4.5
                  </Text>
                </Stack>
                <Stack direction="row">
                  <Text style={{ color: grey0 }}>
                    4,5 km. Strada Oarecare, nr 5, Sector 3
                  </Text>
                </Stack>
              </View>
            </Stack>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                  let name = "";
                  let type = "material-community";
                  let size = 23;

                  if (route.name === "MapPosts") {
                    name = "grid-large";
                  } else if (route.name === "MapProducts") {
                    name = "shopping-outline";
                    size = 24;
                  }

                  return (
                    <Icon name={name} type={type} color={color} size={size} />
                  );
                },
                tabBarActiveTintColor: black,
                tabBarInactiveTintColor: "#ccc",
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIndicatorStyle: {
                  backgroundColor: black,
                  marginBottom: 0.5,
                },
                lazy: true,
              })}
              sceneContainerStyle={{ backgroundColor: "white" }}
            >
              <Tab.Screen name="MapPosts" component={PostsTab} />
              <Tab.Screen name="MapProducts" component={ProductsTab} />
            </Tab.Navigator>
          </View>
        </BottomSheet>
      </View>
    </View>
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
  back: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
  },
  userRegion: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
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
  indicatorStyle: {
    backgroundColor: "#ddd",
    width: 45,
    height: 5,
  },
});
