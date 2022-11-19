import { Pressable, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors;

export const IconBackButton = ({ size = 21, color = black, sx = {} }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={{ ...styles.btn, ...sx }}
    >
      <Icon name="arrow-back-ios" size={size} color={color} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: { padding: 5 },
});
