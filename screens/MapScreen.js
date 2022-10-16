import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  Platform,
  FlatList,
  Image,
} from "react-native";
import React, { useRef, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
  Button,
  CustomAvatar,
  IconBackButton,
  IconStar,
  Stack,
} from "../components/core";
import { useHttpGet } from "../hooks";
import theme from "../assets/styles/theme";

const { grey0, black, primary } = theme.lightColors;
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 250;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const MapScreen = ({ route }) => {
  const navigation = useNavigation();
  const { location, business } = route.params;
  const maxDistance = 50;
  const _map = useRef(null);
  const _scrollView = useRef(null);
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  const { data: locations } = useHttpGet(
    `/users/get-locations-map?latlng=26.100195,44.428286&business=${business?._id}&maxDistance=${maxDistance}`
  );

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= locations?.length) {
        index = locations?.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          _map.current.animateToRegion(
            {
              latitude: locations[index].location.coordinates[0],
              longitude: locations[index].location.coordinates[1],
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolations = locations?.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.2, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

  const goToLocation = (_id, username, name, avatar) =>
    navigation.push("ProfileGeneral", {
      userId: _id,
      username,
      name,
      avatar,
    });

  const renderItem = useCallback(({ item }) => {
    return (
      <Button
        onPress={() =>
          goToLocation(item._id, item.username, item.name, item.avatar)
        }
        sx={styles.card}
      >
        <Image
          source={{ uri: item?.images[0]?.url }}
          containerStyle={styles.image}
          resizeMode="cover"
        />
        <View
          style={{
            position: "absolute",
            left: 10,
            top: 10,
          }}
        >
          <CustomAvatar
            avatar={item.avatar}
            size={35}
            iconSize={17}
            sx={styles.avatar}
          />
        </View>
        <View style={{ paddingVertical: 15, paddingHorizontal: 10 }}>
          <Stack direction="row" justify="start">
            <Text numberOfLines={1} style={styles.name}>
              {item.name}
            </Text>
            <IconStar />
            <Text
              style={{
                marginLeft: 5,
                fontSize: 15,
              }}
            >
              {item.counter.ratingsAverage.toFixed(1)}
            </Text>
            <Text
              style={{
                color: theme.lightColors.grey0,
                marginLeft: 5,
              }}
            >
              ({item.counter.ratingsQuantity})
            </Text>
          </Stack>
          <Text style={styles.username}>@{item.username}</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            data={item.services}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <Text style={styles.service}>{item.name}</Text>
            )}
          />
        </View>
      </Button>
    );
  }, []);

  const getItemLayout = useCallback(
    (data, index) => ({
      length: width,
      offset: height * index,
      index,
    }),
    []
  );

  return (
    <View>
      <IconBackButton sx={styles.backBtn} size={20} />
      <MapView
        ref={_map}
        style={{ height: "100%" }}
        initialRegion={{
          latitude: location.coordinates[0],
          longitude: location.coordinates[1],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE}
      >
        {locations?.map((loc, i) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[i].scale,
              },
            ],
          };

          return (
            <MapView.Marker
              key={i}
              coordinate={{
                latitude: loc.location.coordinates[0],
                longitude: loc.location.coordinates[1],
              }}
            >
              <Animated.View>
                <Animated.Image
                  style={[{ width: 35, height: 35 }, scaleStyle]}
                  source={require("../assets/images/map_marker.png")}
                  resizeMode="cover"
                />
              </Animated.View>
            </MapView.Marker>
          );
        })}
      </MapView>
      <Animated.FlatList
        data={locations}
        ref={_scrollView}
        getItemLayout={getItemLayout}
        initialScrollIndex={3}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={styles.flatlist}
        contentInset={styles.contentInset}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
        }}
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
        keyExtractor={(loc) => loc._id}
        renderItem={renderItem}
      />
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
  flatlist: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  contentInset: {
    top: 0,
    left: SPACING_FOR_CARD_INSET,
    bottom: 0,
    right: SPACING_FOR_CARD_INSET,
  },
  card: {
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  image: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  name: {
    fontSize: 16,
    color: black,
    marginRight: 7.5,
  },
  username: {
    color: grey0,
    fontSize: 14.5,
  },
  avatar: {
    borderWidth: 2,
    borderColor: primary,
    borderRadius: 50,
    marginRight: 5,
  },
  service: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    fontSize: 13,
    color: black,
    marginRight: 5,
  },
});
