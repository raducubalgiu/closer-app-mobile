import { TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../assets/styles/theme";

export const IconBackButton = ({ onPress, size, color, sx, withBackground }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={onPress ? onPress : () => navigation.goBack()}
      style={sx}
    >
      <Icon
        name="arrow-back-ios"
        size={size ? size : 21}
        color={color ? color : theme.lightColors.black}
        containerStyle={withBackground && styles.containerStyle}
      />
    </TouchableOpacity>
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
});
