import { ActivityIndicator, Pressable } from "react-native";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors;

export const IconButton = ({
  iconName,
  iconType = "material",
  size = 24,
  color = black,
  loading = false,
  sx = {},
  ...props
}) => {
  return (
    <Pressable {...props} style={{ padding: 2.5, ...sx }}>
      {!loading && (
        <Icon type={iconType} name={iconName} size={24} color={black} />
      )}
      {loading && <ActivityIndicator />}
    </Pressable>
  );
};
