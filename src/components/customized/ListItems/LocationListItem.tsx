import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { memo } from "react";
import { Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import theme from "../../../../assets/styles/theme";
import { trimFunc, AddressFormat } from "../../../utils";
import { IconLocation, IconStar, Stack } from "../../core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigation/rootStackParams";
import { Location } from "../../../models/location";

const { width } = Dimensions.get("window");
const { black, grey0 } = theme.lightColors || {};

type IProps = {
  location: Location;
  service: any;
  option: any;
  moreProducts: any;
};

const LocationListItem = ({
  location,
  service,
  option,
  moreProducts,
}: IProps) => {
  const { imageCover, minPrice, distance, ownerId, address } = location;
  const { name, username, avatar, checkmark } = ownerId;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation("common");

  const goToUser = () =>
    navigation.push("ProfileGeneral", {
      screen: `Products`,
      userId: ownerId?.id,
      username,
      name,
      avatar,
      checkmark,
      service,
      option,
    });

  return (
    <Pressable onPress={goToUser}>
      <Stack direction="row" sx={styles.container}>
        <Stack sx={styles.imageC}>
          <Image style={styles.image} source={{ uri: imageCover?.url }} />
        </Stack>
        <View style={styles.content}>
          <Stack align="start">
            <Text style={styles.business}>{name}</Text>
            <Text style={styles.address}>
              {trimFunc(
                `${address?.street}, ${address?.number}, ${address?.city}`,
                30
              )}
            </Text>
            <Stack direction="row" sx={styles.ratings}>
              <IconStar />
              <Text style={styles.ratingsAverage}>
                {ownerId?.ratingsAverage}
              </Text>
              <Text style={styles.point}>{"\u2B24"}</Text>
              <Text style={styles.ratingsQuantity}>
                {ownerId?.ratingsQuantity} {t("reviews")}
              </Text>
            </Stack>
          </Stack>
          <Stack align="start">
            <Text style={styles.option}>{option?.name}</Text>
          </Stack>
          <Stack align="end">
            <Stack direction="row" align="end">
              {moreProducts && <Text style={styles.from}>de la</Text>}
              <Text style={styles.price}>{minPrice} Lei</Text>
            </Stack>
            <Stack direction="row" sx={styles.distanceC}>
              <IconLocation size={15} />
              <Text style={styles.distance}>{distance} km</Text>
            </Stack>
          </Stack>
        </View>
      </Stack>
    </Pressable>
  );
};

export default memo(LocationListItem);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginBottom: 30,
  },
  imageC: {
    width: width / 3.25,
  },
  image: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
    borderRadius: 15,
  },
  content: {
    flex: 1,
    paddingVertical: 5,
    paddingLeft: 15,
    paddingRight: 10,
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
    color: grey0,
  },
  option: {
    fontWeight: "500",
    marginTop: 2.5,
    padding: 5,
    fontSize: 13,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
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
    fontSize: 15.5,
    marginLeft: 5,
    fontWeight: "700",
  },
  from: {
    fontSize: 12,
  },
  warning: {
    marginTop: 5,
    fontSize: 13,
  },
  distanceC: {
    marginTop: 7.5,
  },
  distance: {
    marginLeft: 2.5,
    fontSize: 13,
    color: black,
    fontWeight: "600",
  },
  point: { fontSize: 3, color: grey0, marginHorizontal: 5 },
});
