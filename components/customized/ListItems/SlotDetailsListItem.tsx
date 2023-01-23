import { StyleSheet, Text, Pressable, View } from "react-native";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Stack } from "../../core";
import CustomAvatar from "../../core/Avatars/CustomAvatar";
import theme from "../../../assets/styles/theme";
import { RootStackParams } from "../../../models/navigation/rootStackParams";

const { black, success, error } = theme.lightColors || {};
type IProps = { schedule: any };

const SlotDetailsListItem = ({ schedule }: IProps) => {
  const { t } = useTranslation();
  const { channel, customerId, product, serviceId, status } = schedule || {};
  const { name, username, avatar, checkmark } = customerId || {};
  const { price, priceWithDiscount, discount } = product;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const getBgColor = (channel: string) => {
    if (channel === "closer") {
      return "#fff5cc";
    } else if (channel === "owner") {
      return "#ccf2ff";
    } else {
      return "#c6ecc6";
    }
  };

  const goToCustomer = () => {
    navigation.push("ProfileGeneral", {
      userId: customerId?.id,
      avatar: avatar,
      username: username,
      name: name,
      checkmark: checkmark,
      service: null,
      option: null,
    });
  };

  return (
    <Pressable
      onPress={() => navigation.navigate("ScheduleDetails", { schedule })}
      style={{ ...styles.container, backgroundColor: getBgColor(channel) }}
    >
      <Stack align="start">
        <Pressable onPress={goToCustomer}>
          <Stack direction="row">
            <CustomAvatar avatar={customerId?.avatar} size={30} />
            <Stack align="start" sx={{ marginLeft: 10 }}>
              <Text style={styles.customer}>{customerId?.name}</Text>
              {username && (
                <Text style={styles.username}>@{customerId?.username}</Text>
              )}
            </Stack>
          </Stack>
        </Pressable>
        <Stack align="start" sx={{ marginTop: 7.5 }}>
          <Text style={styles.service}>{serviceId?.name}</Text>
          <Text style={styles.product}>{product?.name}</Text>
        </Stack>
      </Stack>
      <Stack direction="row" sx={{ width: "100%" }}>
        <Stack direction="row">
          <View style={styles.bullet} />
          <Text style={{ marginLeft: 5, fontWeight: "500" }}>
            {t(`${status}`)}
          </Text>
        </Stack>
        <Stack align="end">
          <Text
            style={
              discount > 0
                ? { ...styles.priceWithDiscount, color: error }
                : { ...styles.priceWithDiscount, color: black }
            }
          >
            {discount > 0 ? product?.priceWithDiscount : product?.price}{" "}
            {t("lei")}
          </Text>
          {discount > 0 && (
            <Text style={styles.price}>
              {product?.price} {t("lei")} (-{discount}%)
            </Text>
          )}
        </Stack>
      </Stack>
    </Pressable>
  );
};

export default memo(SlotDetailsListItem);

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    flex: 1,
    padding: 15,
    height: 170,
    width: "100%",
    borderRadius: 5,
    justifyContent: "space-between",
  },
  customer: {
    color: black,
    fontSize: 16.5,
    fontWeight: "600",
  },
  username: { marginTop: 1, fontSize: 15, color: black },
  service: {
    color: black,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 5,
    paddingHorizontal: 7.5,
    borderRadius: 5,
    marginVertical: 5,
    fontWeight: "600",
  },
  product: {
    color: black,
    fontSize: 16,
    marginTop: 2.5,
  },
  option: {
    color: black,
    fontSize: 13,
  },
  priceLabel: {
    color: black,
    fontSize: 15,
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: success,
  },
  price: {
    color: black,
    fontSize: 13,
    fontWeight: "500",
    textTransform: "lowercase",
  },
  priceWithDiscount: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 5,
  },
});
