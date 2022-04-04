import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { IconButton, Stack } from "../../core";
import { Colors } from "../../../assets/styles/Colors";

const HeaderProfile = (props) => {
  return (
    <Stack direction="row" sx={{ marginVertical: 20, marginHorizontal: 15 }}>
      <Stack direction="row">
        <IconButton
          onPress={() => {}}
          iconName="adduser"
          iconType="antdesign"
          size={27}
        />
        <Icon
          style={{ marginLeft: 15 }}
          size={30}
          type="ionicon"
          name="add-circle-outline"
          color="white"
        />
      </Stack>
      <TouchableOpacity onPress={props.onOpenSwitch}>
        <Stack direction="row" justify="start">
          <Text style={styles.name}>{props?.name}</Text>
          <Icon name="keyboard-arrow-down" type="material" />
        </Stack>
      </TouchableOpacity>
      <Stack direction="row">
        <IconButton
          onPress={() => {}}
          size={30}
          iconName="add-circle-outline"
          iconType="ionicon"
          color={Colors.textDark}
        />
        <IconButton
          onPress={props.onOpenSettings}
          size={30}
          iconName="menu-outline"
          iconType="ionicon"
          color={Colors.textDark}
          sx={{ marginLeft: 15 }}
        />
      </Stack>
    </Stack>
  );
};

export default HeaderProfile;

const styles = StyleSheet.create({
  name: { fontFamily: "Exo-Medium", fontSize: 15 },
});
