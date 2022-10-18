import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import theme from "../../../assets/styles/theme";
import { trimFunc, AddressFormat } from "../../../utils";
import { Button, IconLocation, IconStar, IconVideo, Stack } from "../../core";

const { width } = Dimensions.get("window");
const { black, grey0 } = theme.lightColors;

export const CardLocation = ({ location, service, option }) => {
  const { images, minPrice, distance, owner, address } = location;
  const { name, username, avatar, checkmark } = owner;
  const navigation = useNavigation();
  const { t } = useTranslation();

  console.log("SERVICE!!", service);
  console.log("OPTION!!!", option);

  const goToUser = () =>
    navigation.push("ProfileGeneral", {
      screen: `Products`,
      userId: owner?._id,
      username,
      name,
      avatar,
      checkmark,
      service,
      option,
    });

  return (
    <Button onPress={goToUser}>
      <Stack direction="row" sx={styles.container}>
        <Stack sx={styles.imageC}>
          <Image
            style={styles.image}
            source={{
              uri: images[0]?.url,
            }}
          />
          <IconVideo sx={styles.iconVideo} />
        </Stack>
        <View style={styles.content}>
          <Stack align="start">
            <Text style={styles.business}>{name}</Text>
            <Text style={styles.address}>
              {trimFunc(AddressFormat(address), 60)}{" "}
            </Text>
            <Stack direction="row" sx={styles.ratings}>
              <IconStar />
              <Text style={styles.ratingsAverage}>4.5</Text>
              <Text style={styles.ratingsQuantity}>100 {t("reviews")}</Text>
            </Stack>
          </Stack>
          <Stack align="end">
            <Stack direction="row" align="end">
              <Text style={styles.from}>de la</Text>
              <Text style={styles.price}>{minPrice} Lei</Text>
            </Stack>
            <Stack direction="row" sx={styles.distanceC}>
              <IconLocation />
              <Text style={styles.distance}>
                {distance < 1
                  ? `la mai putin de 1 km`
                  : `la ${Math.round(distance)} km de tine`}
              </Text>
            </Stack>
          </Stack>
        </View>
      </Stack>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 15,
  },
  imageC: {
    width: width / 3,
  },
  image: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
    borderRadius: 5,
  },
  content: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  business: {
    fontSize: 16,
    color: black,
    fontWeight: "600",
  },
  address: {
    color: grey0,
    marginTop: 1,
    fontSize: 13,
  },
  ratings: {
    marginVertical: 5,
  },
  ratingsAverage: {
    marginLeft: 2.5,
    fontWeight: "600",
  },
  ratingsQuantity: {
    marginLeft: 7.5,
    fontSize: 13,
    color: grey0,
  },
  serviceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  service: {
    backgroundColor: "#f1f1f1",
    padding: 5,
    fontSize: 12,
  },
  price: {
    fontSize: 15,
    marginLeft: 5,
    fontWeight: "600",
  },
  from: {
    fontSize: 12,
  },
  warning: {
    marginTop: 5,
    fontSize: 13,
  },
  distanceC: {
    marginTop: 15,
  },
  distance: {
    marginLeft: 5,
    fontSize: 13,
    color: black,
    fontWeight: "500",
  },
  iconVideo: {
    position: "absolute",
    bottom: 5,
    left: 10,
    zIndex: 1000,
  },
});
