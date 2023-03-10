import { StyleSheet, Text, Pressable } from "react-native";
import { memo } from "react";
import { Icon } from "@rneui/themed";
import { Stack } from "../../../core";
import { Product } from "../../../../models";
import theme from "../../../../assets/styles/theme";

type IProps = { product: Product };
const { black } = theme.lightColors || {};

const PostBookable = ({ product }: IProps) => {
  const { name, price } = product;

  return (
    <Pressable onPress={() => {}}>
      <Stack direction="row" sx={styles.container}>
        <Stack direction="row">
          <Text style={styles.name}>{name}</Text>
        </Stack>
        <Stack direction="row">
          <Text style={styles.price}>lei {price}</Text>
          <Icon name="keyboard-arrow-right" color={black} size={22.5} />
        </Stack>
      </Stack>
    </Pressable>
  );
};

export default memo(PostBookable);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 7.5,
    backgroundColor: "#f1f1f1",
  },
  name: {
    fontWeight: "600",
    fontSize: 14.5,
  },
  price: {
    fontWeight: "700",
    marginRight: 10,
    fontSize: 14,
  },
});
