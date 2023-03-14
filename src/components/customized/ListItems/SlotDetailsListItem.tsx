import { StyleSheet, Text, Pressable, View } from "react-native";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import { Stack } from "../../core";
import CustomAvatar from "../../core/Avatars/CustomAvatar";
import theme from "../../../../assets/styles/theme";
import { RootStackParams } from "../../../navigation/rootStackParams";
import { Schedule } from "../../../models/schedule";

const { black, success, error, primary } = theme.lightColors || {};
type IProps = { item: any };

const SlotDetailsListItem = ({ item }: IProps) => {
  const { t } = useTranslation("common");
  const { hour, bookable, schedule, start, end } = item;
  const { channel, customerId, product, serviceId, status } = schedule || {};
  const { name, username, avatar, checkmark } = customerId || {};
  const { price, priceWithDiscount, discount } = product || {};
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const getBgColor = (channel: string, schedule: Schedule) => {
    if (!schedule) {
      return;
    }
    if (channel === "closer") {
      return "#fff5cc";
    } else if (channel === "owner") {
      return "#ccf2ff";
    } else {
      return "#c6ecc6";
    }
  };

  const backgroundColor = useMemo(
    () => getBgColor(channel, status),
    [channel, schedule]
  );

  return (
    <View style={{ marginHorizontal: 15, marginTop: 10 }}>
      <Stack direction="row" align="start" justify="start">
        <Text style={styles.hour}>{hour}</Text>
        {!schedule && (
          <Pressable
            disabled={!bookable}
            onPress={() => navigation.navigate("AddSchedule", { start, end })}
            style={{ flex: 1, marginLeft: 15 }}
          >
            <Stack sx={styles.unbooked}>
              <Icon
                name="plus-circle"
                type="feather"
                size={37.5}
                color={bookable ? primary : "#ddd"}
              />
            </Stack>
          </Pressable>
        )}
        {schedule && (
          <Pressable
            onPress={() => navigation.navigate("ScheduleDetails", { schedule })}
            style={{ ...styles.container, backgroundColor }}
          >
            <Stack align="start">
              <Stack direction="row">
                <CustomAvatar avatar={avatar} size={30} />
                <Stack align="start" sx={{ marginLeft: 10 }}>
                  <Text style={styles.customer}>{name}</Text>
                  {username && <Text style={styles.username}>@{username}</Text>}
                </Stack>
              </Stack>
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
                  {discount > 0 ? priceWithDiscount : price} {t("lei")}
                </Text>
                {discount > 0 && (
                  <Text style={styles.price}>
                    {price} {t("lei")} (-{discount}%)
                  </Text>
                )}
              </Stack>
            </Stack>
          </Pressable>
        )}
      </Stack>
    </View>
  );
};

export default memo(SlotDetailsListItem);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 170,
    borderRadius: 5,
    marginLeft: 15,
    justifyContent: "space-between",
    padding: 15,
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
  hour: { fontWeight: "600", fontSize: 16 },
  unbooked: {
    height: 170,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    flex: 1,
    borderRadius: 5,
  },
});
