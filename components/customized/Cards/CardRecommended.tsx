import { StyleSheet, Text, Image, Dimensions, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { IconLocation, IconStar, IconVideo, Stack } from "../../core";
import theme from "../../../assets/styles/theme";
import { trimFunc } from "../../../utils";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../models/navigation/rootStackParams";

const { width } = Dimensions.get("window");
const { black, grey0 } = theme.lightColors;

export const CardRecommended = ({ location }) => {
  const { images, distance, address, user } = location;
  const { name, username, avatar, checkmark, ratingsAverage, ratingsQuantity } =
    user;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();

  const goToUser = () => {
    navigation.push("ProfileGeneral", {
      userId: user?._id,
      avatar,
      username,
      name,
      checkmark: false,
      service: null,
      option: null,
    });
  };

  return (
    <Pressable style={styles.button} onPress={goToUser}>
      <Stack direction="row" sx={styles.item}>
        <Stack>
          <Image style={styles.image} source={{ uri: `${images[0]?.url}` }} />
        </Stack>
        <Stack align="start" sx={styles.info}>
          <Stack direction="row">
            <Text style={styles.name}>{name}</Text>
            <Stack direction="row">
              <IconLocation sx={{ marginRight: 5 }} />
              <Text style={styles.distance}>
                {distance < 1000
                  ? `${t("at")} ${Math.round(distance)} m`
                  : `${t("at")} ${Math.round(distance * 0.001)} km`}
              </Text>
            </Stack>
          </Stack>
          <Text style={styles.address}>
            {trimFunc(
              `${address.city}, ${address.street} ${address.number}`,
              30
            )}
          </Text>
          <Stack direction="row">
            <Text style={styles.service}>Tuns</Text>
          </Stack>
          <Stack direction="row" align="center">
            <IconStar />
            <Text style={styles.ratingsAvg}>{ratingsAverage.toFixed(1)}</Text>
            <Text style={styles.ratingsQuant}>
              {ratingsQuantity} {t("reviews")}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
  },
  item: {
    borderRadius: 5,
  },
  image: {
    flex: 1,
    borderRadius: 10,
    resizeMode: "cover",
    width: width / 3,
  },
  info: {
    flex: 1,
    paddingVertical: 5,
    marginLeft: 10,
  },
  name: {
    flex: 1,
    color: black,
    fontSize: 14,
    textTransform: "capitalize",
    fontWeight: "600",
  },
  distance: {
    fontSize: 12,
    color: black,
    fontWeight: "600",
  },
  address: {
    marginTop: 2,
    color: grey0,
    fontSize: 13,
  },
  service: {
    fontSize: 11,
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 10,
    color: black,
    fontWeight: "700",
  },
  ratingsAvg: {
    marginLeft: 2,
    fontSize: 13,
    color: black,
    fontWeight: "600",
  },
  ratingsQuant: {
    marginLeft: 4,
    fontSize: 13,
    padding: 2,
    color: grey0,
  },
});