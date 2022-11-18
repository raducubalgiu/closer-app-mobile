import { Pressable, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors;

export const IconBackButton = ({
  onPress,
  size,
  color,
  sx,
  withBackground,
}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={onPress ? onPress : () => navigation.goBack()}
      style={{ ...styles.btn, sx }}
    >
      <Icon
        name="arrow-back-ios"
        size={size ? size : 21}
        color={color ? color : black}
        containerStyle={withBackground && styles.containerStyle}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "rgba(250, 250, 250, 0.8)",
    paddingVertical: 8,
    paddingLeft: 11,
    paddingRight: 5,
    borderRadius: 50,
  },
  btn: {
    padding: 5,
  },
});
