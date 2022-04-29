import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { IconButton, Stack } from "../../core";
import theme from "../../../assets/styles/theme";
import { useNavigation } from "@react-navigation/native";

const HeaderProfileGeneral = (props) => {
  const navigation = useNavigation();

  return (
    <Stack direction="row" sx={{ marginVertical: 20, marginHorizontal: 20 }}>
      <Stack direction="row">
        <IconButton
          onPress={() => navigation.goBack()}
          iconName="arrow-back-ios"
          size={21}
          sx={{ marginRight: 15 }}
        />
        <Icon name="bells" type="antdesign" color="white" />
      </Stack>
      <Text style={styles.name}>{props?.name}</Text>
      <Stack direction="row">
        <IconButton
          onPress={props.onOpenSettings}
          iconName="bells"
          iconType="antdesign"
          color={theme.lightColors.black}
        />
        <IconButton
          onPress={props.onOpenSettings}
          size={25}
          iconName="ellipsis-horizontal"
          iconType="ionicon"
          color={theme.lightColors.black}
          sx={{ marginLeft: 15 }}
        />
      </Stack>
    </Stack>
  );
};

export default HeaderProfileGeneral;

const styles = StyleSheet.create({
  name: { fontFamily: "Exo-Medium", fontSize: 15 },
});
