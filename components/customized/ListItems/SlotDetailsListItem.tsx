import { StyleSheet, Text, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { Stack } from "../../core";
import CustomAvatar from "../../core/Avatars/CustomAvatar";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors || {};
type IProps = { schedule: any };

export const SlotDetailsListItem = ({ schedule }: IProps) => {
  const { t } = useTranslation();
  const { channel, customerId, product, serviceId } = schedule || {};

  const getBgColor = (channel: string) => {
    if (channel === "closer") {
      return "#fff5cc";
    } else if (channel === "owner") {
      return "#ccf2ff";
    } else {
      return "#c6ecc6";
    }
  };

  return (
    <Pressable
      style={{ ...styles.container, backgroundColor: getBgColor(channel) }}
    >
      <Stack sx={{ flex: 1 }}>
        <Stack align="start" direction="row">
          <CustomAvatar avatar={customerId?.avatar} size={30} />
          <Stack align="start" sx={{ marginLeft: 10, flex: 1 }}>
            <Text style={styles.customer}>{customerId?.name}</Text>
            <Text style={styles.username}>@{customerId?.username}</Text>
            <Stack align="start">
              <Text style={styles.service}>{serviceId?.name}</Text>
              <Text style={styles.product}>{product?.name}</Text>
            </Stack>
          </Stack>
        </Stack>
        <Stack align="end" sx={{ width: "100%" }}>
          <Text style={styles.priceNo}>
            {product?.price} {t("ron")}
          </Text>
        </Stack>
      </Stack>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    flex: 1,
    padding: 15,
    height: 170,
    width: "100%",
    borderRadius: 5,
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
  priceNo: {
    color: black,
    fontSize: 16,
    fontWeight: "700",
  },
});
