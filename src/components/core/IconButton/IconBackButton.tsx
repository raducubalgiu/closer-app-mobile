import { Pressable, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../../assets/styles/theme";

const { black } = theme.lightColors || {};
type IProps = { size?: number; color?: any; sx?: {}; disabled?: boolean };

export const IconBackButton = ({
  size = 21,
  color = black,
  sx = {},
  disabled = false,
}: IProps) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={{ ...styles.btn, ...sx }}
      disabled={disabled}
    >
      <Icon name="arrow-back-ios" size={size} color={color} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: { padding: 5 },
});
