import { StyleSheet, Text } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { IconButton, Stack } from "../../core";
import theme from "../../../assets/styles/theme";
import { useNavigation } from "@react-navigation/native";

const HeaderProfile = (props) => {
  const navigation = useNavigation();

  return (
    <Stack direction="row" sx={{ paddingVertical: 10, paddingHorizontal: 15 }}>
      <Stack direction="row">
        <IconButton
          onPress={props.onGoToFindFriends}
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
      <Text style={styles.name}>{props?.name}</Text>
      <Stack direction="row">
        <IconButton
          onPress={() => navigation.navigate("AddProducts")}
          size={30}
          iconName="add-circle-outline"
          iconType="ionicon"
          color={theme.lightColors.black}
        />
        <IconButton
          onPress={props.onOpenSettings}
          size={30}
          iconName="menu-outline"
          iconType="ionicon"
          color={theme.lightColors.black}
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
