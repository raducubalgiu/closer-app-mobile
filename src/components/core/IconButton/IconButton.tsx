import { ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";

const { black } = theme.lightColors || {};
type Props = {
  name: string;
  type?: string;
  size?: number;
  color?: string | undefined;
  loading?: boolean;
  disabled?: boolean;
  sx?: {};
  onPress?: () => void;
};

export const IconButton = ({
  name = "",
  type = "feather",
  size = 24,
  color = black,
  loading = false,
  disabled = false,
  sx = {},
  onPress,
}: Props) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, sx]}
    >
      {!loading && (
        <Icon
          type={type}
          name={name}
          size={size}
          color={disabled ? "#ddd" : color}
        />
      )}
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
