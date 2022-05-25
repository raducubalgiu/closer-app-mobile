import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon, Divider } from "@rneui/themed";
import React from "react";
import theme from "../../../assets/styles/theme";
import { useNavigation } from "@react-navigation/native";
import IconBackButton from "../IconButton/IconBackButton";
import Stack from "../Containers/Stack";

export const Header = ({ hideBtnLeft, title, actionBtn, divider }) => {
  const navigation = useNavigation();

  const handleBack = () => navigation.goBack();

  return (
    <>
      <Stack direction="row" sx={styles.container}>
        <TouchableOpacity onPress={!hideBtnLeft ? () => handleBack : null}>
          <IconBackButton
            color={!hideBtnLeft ? theme.lightColors.black : "white"}
          />
        </TouchableOpacity>
        <Stack direction="row">
          <Text style={styles.title}>{title}</Text>
        </Stack>
        {actionBtn && actionBtn}
        {!actionBtn && (
          <Icon name="chevron-thin-right" type="entypo" color="white" />
        )}
      </Stack>
      {divider && <Divider color="#ddd" />}
    </>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 10, paddingHorizontal: 15 },
  title: {
    fontFamily: "Exo-SemiBold",
    fontSize: 16,
    color: theme.lightColors.black,
    marginRight: 10,
  },
});
