import { ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors || {};

type Props = {
  name: string;
  type?: string;
  loading?: boolean;
  onPress: () => void;
  sx?: {};
};

export const ProfileIconButton = ({
  name,
  type = "feather",
  loading = false,
  onPress,
  sx = {},
}: Props) => {
  return (
    <Pressable style={[styles.container, sx]} onPress={onPress}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Icon name={name} type={type} size={20} color={black} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2.5,
    marginLeft: 5,
  },
});
