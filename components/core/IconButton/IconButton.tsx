import { ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors;

export const IconButton = ({
  name,
  type = "feather",
  size = 24,
  color = black,
  loading = false,
  sx = {},
  onPress,
}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, sx]}>
      {!loading && <Icon type={type} name={name} size={size} color={color} />}
      {loading && <ActivityIndicator />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 2.5,
  },
});
