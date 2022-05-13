import { TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../assets/styles/theme";

const IconBackButton = ({ onPress, size, color, sx }) => {
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
      />
    </TouchableOpacity>
  );
};

export default IconBackButton;
