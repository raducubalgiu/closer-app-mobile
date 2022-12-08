import {
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Pressable,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Button, IconStar, Stack } from "../../core";
import theme from "../../../assets/styles/theme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../models/navigation/rootStackParams";
import { RecommendedLocation } from "../../../models/recommendedLocation";
import CustomAvatar from "../../core/Avatars/CustomAvatar";
import { trimFunc } from "../../../utils";
import { Divider, Icon } from "@rneui/themed";

const { width } = Dimensions.get("window");
const { black, grey0, primary, success } = theme.lightColors || {};

type IProps = { location: RecommendedLocation; index: number };

export const CardRecommended = ({ location, index }: IProps) => {
  const { images, distance, address, owner, product } = location;
  const {
    name,
    username,
    avatar,
    profession,
    ratingsAverage,
    ratingsQuantity,
  } = owner || {};
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();

  const goToUser = () => {
    navigation.push("ProfileGeneral", {
      userId: owner?._id,
      avatar,
      username,
      name,
      checkmark: false,
      service: null,
      option: null,
    });
  };

  return (
    <Pressable
      style={{
        width: width / 2 - 15,
        marginBottom: 20,
        marginHorizontal: index % 2 ? 5 : 10,
        borderWidth: 1,
        borderColor: "#f1f1f1",
        borderRadius: 2.5,
      }}
      onPress={goToUser}
    >
      {/* <Stack direction="row" sx={styles.item}>
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
            <Text style={styles.ratingsAvg}>{ratingsAverage}</Text>
            <Text style={styles.ratingsQuant}>
              {ratingsQuantity} {t("reviews")}
            </Text>
          </Stack>
        </Stack>
      </Stack> */}
      <Image
        source={{ uri: images[0]?.url }}
        style={{
          width: undefined,
          height: index == 1 ? width / 2 : width / 3,
          flex: 1,
          backgroundColor: "#f1f1f1",
          borderTopLeftRadius: 2.5,
          borderTopRightRadius: 2.5,
        }}
      />
      <Stack align="start" sx={styles.info}>
        <Text style={styles.service}>{trimFunc(product?.name, 20)}</Text>
        <Text style={{ fontWeight: "600", marginVertical: 2.5 }}>
          {product.price} LEI
        </Text>
        <Stack direction="row" sx={{ marginTop: 7.5, marginBottom: 1 }}>
          {/* <CustomAvatar avatar={avatar} size={20} /> */}
          <Text style={{ color: grey0 }}>{trimFunc(name, 15)}</Text>
        </Stack>
        <Stack direction="row" align="center">
          {/* <Icon name="staro" type="antdesign" size={20} color={grey0} /> */}
          <IconStar />
          <Text style={styles.ratingsAvg}>
            {ratingsAverage} ({ratingsQuantity})
          </Text>
          <Divider orientation="vertical" style={{ marginHorizontal: 5 }} />
          <Text style={styles.ratingsQuant}>{distance} km</Text>
        </Stack>
        {/* <Stack
          direction="row"
          sx={{
            marginVertical: 7.5,
            borderRadius: 5,
            width: "100%",
          }}
        >
          <Text style={{ color: grey0, fontSize: 14 }}>Liber la 14:00</Text>
          <View
            style={{
              width: 7.5,
              height: 7.5,
              backgroundColor: success,
              borderRadius: 50,
              marginLeft: 10,
            }}
          />
        </Stack> */}
        <Pressable
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: "#ddd",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            borderRadius: 2.5,
          }}
        >
          <Text style={{ color: black, fontWeight: "500" }}>{t("book")}</Text>
        </Pressable>
      </Stack>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    // padding: 15,
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
});
