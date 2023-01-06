import { StyleSheet, Text, Image, Dimensions, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Checkmark, IconStar, Stack } from "../../core";
import theme from "../../../assets/styles/theme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../models/navigation/rootStackParams";
import { RecommendedLocation } from "../../../models/recommendedLocation";
import { trimFunc } from "../../../utils";
import { Divider } from "@rneui/themed";

const { width } = Dimensions.get("window");
const { black, grey0 } = theme.lightColors || {};

type IProps = { location: RecommendedLocation; index: number };

export const CardRecommended = ({ location, index }: IProps) => {
  const { imageCover, distance, address, owner, product } = location;
  const { name, username, avatar, checkmark, ratingsAverage, ratingsQuantity } =
    owner || {};
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();

  const goToUser = () => {
    navigation.push("ProfileGeneral", {
      screen: "Products",
      userId: owner?._id,
      avatar,
      username,
      name,
      checkmark,
      service: null,
      option: null,
    });
  };

  return (
    <Pressable
      style={{
        marginHorizontal: index % 2 ? 5 : 10,
        ...styles.button,
      }}
      onPress={goToUser}
    >
      <Image
        source={{ uri: imageCover?.url }}
        style={{
          height:
            imageCover?.orientation === "portrait" ? width / 2 : width / 3,
          ...styles.image,
        }}
      />
      <Stack align="start" sx={styles.info}>
        <Text style={styles.service}>{trimFunc(product?.name, 20)}</Text>
        <Text style={{ fontWeight: "600", marginVertical: 2.5 }}>
          {product.price} LEI
        </Text>
        <Stack direction="row" sx={{ marginTop: 7.5, marginBottom: 1 }}>
          <Text style={{ color: grey0 }}>{trimFunc(name, 15)}</Text>
          {checkmark && <Checkmark size={7.5} sx={{ marginLeft: 5 }} />}
        </Stack>
        <Stack direction="row" align="center">
          <IconStar />
          <Text style={styles.ratingsAvg}>
            {ratingsAverage} ({ratingsQuantity})
          </Text>
          <Divider orientation="vertical" style={{ marginHorizontal: 5 }} />
          <Text style={styles.ratingsQuant}>{distance} km</Text>
        </Stack>
        <Pressable style={styles.bookBtn}>
          <Text style={{ color: black, fontWeight: "600" }}>{t("book")}</Text>
        </Pressable>
      </Stack>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: width / 2 - 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#f1f1f1",
    borderRadius: 2.5,
  },
  image: {
    flex: 1,
    width: undefined,
    backgroundColor: "#f1f1f1",
    borderTopLeftRadius: 2.5,
    borderTopRightRadius: 2.5,
  },
  item: {
    borderRadius: 5,
  },
  info: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 5,
  },
  service: {
    flex: 1,
    color: black,
    fontSize: 14,
    textTransform: "capitalize",
    fontWeight: "700",
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
  ratingsAvg: {
    marginLeft: 2.5,
    fontSize: 12.5,
    color: black,
    fontWeight: "700",
  },
  ratingsQuant: {
    fontSize: 13,
    padding: 2,
    color: grey0,
  },
  bookBtn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderRadius: 2.5,
  },
});
