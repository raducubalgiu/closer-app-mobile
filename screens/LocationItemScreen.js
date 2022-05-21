import {
  StyleSheet,
  Dimensions,
  StatusBar,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Button,
  CustomAvatar,
  FollowButton,
  IconLocation,
  IconNavigation,
  IconStar,
  ImageSlider,
  Stack,
  StatsButton,
} from "../components/core";
import { Divider } from "@rneui/themed";
import { BASE_ENDPOINT } from "@env";
import axios from "axios";
import { useAuth } from "../hooks";
import { useNavigation } from "@react-navigation/native";
import theme from "../assets/styles/theme";
import { AddressFormat, trimFunc } from "../utils";
import { useTranslation } from "react-i18next";
import { ShowProducts } from "../components/customized";

const { width, height } = Dimensions.get("window");

const LocationItemScreen = ({ route }) => {
  const { user } = useAuth();
  const [location, setLocation] = useState(null);
  const { locationId, distance } = route.params;
  const navigation = useNavigation();
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get(`${BASE_ENDPOINT}/users/${locationId}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => setLocation(res.data.user))
      .catch((err) => console.log(err));
  }, []);

  const goToUser = () =>
    navigation.push("ProfileGeneral", {
      userId: location?._id,
    });
  const goToStats = (route) => {
    navigation.navigate("ProfileStats", {
      userId: location?._id,
      username: location?.username,
    });
  };

  return (
    <View style={styles.screen}>
      <ShowProducts
        extraHeader={
          <>
            <StatusBar hidden />
            <ImageSlider
              images={location?.images}
              height={height / 3.25}
              width={width}
              withCounter
              withBack
            />
            <Stack direction="row" align="start" sx={styles.header}>
              <Stack align="start" sx={{ flex: 1 }}>
                <Button onPress={goToUser} sx={{ alignItems: "center" }}>
                  <Stack direction="row">
                    <CustomAvatar
                      avatar={location?.avatar}
                      size={30}
                      iconSize={22.5}
                    />
                    <Text style={styles.name}>{location?.name}</Text>
                  </Stack>
                </Button>
                <Stack direction="row" sx={{ marginVertical: 2.5 }}>
                  <IconLocation />
                  <Text style={styles.address}>
                    {AddressFormat(location?.location)}
                  </Text>
                </Stack>
                <Stack direction="row" sx={{ marginTop: 2.5 }}>
                  <IconNavigation />
                  <Text style={styles.distance}>
                    {distance < 1000
                      ? `${t("at")} ${Math.round(distance)} m`
                      : `${t("at")} ${Math.round(distance * 0.001)} ${t(
                          "kmFromYou"
                        )}`}
                  </Text>
                </Stack>
              </Stack>
              <FollowButton followeeId={location?._id} />
            </Stack>
            <Divider color="#ddd" style={{ marginHorizontal: 15 }} />
            <Stack direction="row" sx={styles.stats}>
              <Stack direction="row">
                <IconStar size={19} />
                <Text style={styles.rating}>
                  {location?.counter?.ratingsAverage.toFixed(1)}
                </Text>
              </Stack>
              <Stack
                direction="row"
                justify="around"
                sx={{ flex: 1, marginLeft: 20 }}
              >
                <StatsButton
                  onPress={() => goToStats(initialRoute)}
                  statsNo={location?.counter?.ratingsQuantity}
                  labelStats={t("reviews")}
                  labelStyle={styles.label}
                />
                <StatsButton
                  onPress={() => goToStats(initialRoute)}
                  statsNo={location?.counter?.followersCount}
                  labelStats={t("followers")}
                  labelStyle={styles.label}
                />
                <StatsButton
                  onPress={() => goToStats(initialRoute)}
                  statsNo={location?.counter?.followingCount}
                  labelStats={t("following")}
                  labelStyle={styles.label}
                />
              </Stack>
            </Stack>
            <Divider color="#ddd" style={{ marginHorizontal: 15 }} />
          </>
        }
        userId={locationId}
        services={location?.services}
        initServ={location?.services[0]?._id}
        serviceId={undefined}
        product={undefined}
      />
    </View>
  );
};

export default LocationItemScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  dotsView: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  counter: {
    color: "white",
    fontSize: 13,
  },
  header: {
    padding: 15,
    flex: 1,
  },
  username: {
    fontFamily: "Exo-Medium",
    marginRight: 5,
    fontSize: 16.5,
  },
  name: {
    fontFamily: "Exo-Medium",
    fontSize: 21,
    flex: 1,
    marginLeft: 10,
  },
  rating: {
    fontFamily: "Exo-SemiBold",
    marginLeft: 5,
    fontSize: 15.5,
  },
  address: {
    color: theme.lightColors.grey0,
    fontSize: 12.5,
    fontFamily: "Exo-Medium",
    marginHorizontal: 10,
    flex: 1,
    marginTop: 10,
  },
  distance: {
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.black,
    textDecorationLine: "underline",
    marginHorizontal: 10,
    fontSize: 13,
  },
  stats: {
    paddingVertical: 7.5,
    paddingHorizontal: 15,
  },
  label: {
    fontFamily: "Exo-Medium",
    marginBottom: 5,
    color: theme.lightColors.black,
    fontSize: 14,
    color: theme.lightColors.grey0,
  },
  number: {
    fontFamily: "Exo-Bold",
    fontSize: 14,
    color: theme.lightColors.black,
    textAlign: "center",
  },
  profile: {
    fontFamily: "Exo-SemiBold",
    marginTop: 5,
    color: theme.lightColors.primary,
    textTransform: "uppercase",
    fontSize: 13,
  },
});
