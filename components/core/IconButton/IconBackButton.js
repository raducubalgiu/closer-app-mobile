import { TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../assets/styles/theme";

const IconBackButton = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={props.onPress ? props.onPress : () => navigation.goBack()}
    >
      <Icon
        name="arrow-back-ios"
        size={props.size ? props.size : 21}
        color={props.color ? props.color : theme.lightColors.black}
      />
    </TouchableOpacity>
  );
};

export default IconBackButton;
