import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon, Divider } from "@rneui/themed";
import theme from "../../../assets/styles/theme";
import React from "react";
import { Stack, CustomAvatar } from "../../core";
import { useNavigation } from "@react-navigation/native";

const HeaderMessageItem = (props) => {
  const navigation = useNavigation();

  return (
    <>
      <Stack direction="row" sx={styles.container}>
        <Stack direction="row">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-thin-left"
              type="entypo"
              color={theme.lightColors.black}
              size={22.5}
            />
          </TouchableOpacity>
          <Stack direction="row" sx={{ marginLeft: 15 }}>
            <CustomAvatar size={40} avatar={props.avatar} />
            <Stack align="start" sx={{ marginLeft: 10 }}>
              <Text style={styles.name}>{props.name}</Text>
              <Text style={styles.username}>{props.username}</Text>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="row">
          <Icon
            name="video"
            type="feather"
            color={theme.lightColors.black}
            size={25}
          />
          <Icon
            name="shield"
            type="feather"
            color={theme.lightColors.black}
            size={25}
            style={{ marginLeft: 20 }}
          />
        </Stack>
      </Stack>
      <Divider color="#ddd" />
    </>
  );
};

export default HeaderMessageItem;

const styles = StyleSheet.create({
  container: { paddingVertical: 10, paddingHorizontal: 15 },
  name: {
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
  },
  username: {
    fontFamily: "Exo-Medium",
    color: theme.lightColors.grey0,
  },
});
