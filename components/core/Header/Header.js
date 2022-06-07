import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon, Divider } from "@rneui/themed";
import React from "react";
import theme from "../../../assets/styles/theme";
import { useNavigation } from "@react-navigation/native";
import { Stack } from "../Stack/Stack";
import { IconBackButton } from "../IconButton/IconBackButton";

export const Header = ({
  hideBtnLeft,
  title,
  actionBtn,
  divider,
  description,
}) => {
  const navigation = useNavigation();

  const handleBack = () => navigation.goBack();

  return (
    <View>
      <Stack direction="row" sx={styles.container}>
        <TouchableOpacity onPress={!hideBtnLeft ? () => handleBack : null}>
          <IconBackButton
            color={!hideBtnLeft ? theme.lightColors.black : "white"}
          />
        </TouchableOpacity>
        <Stack>
          <Text style={styles.title}>{title}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </Stack>
        {actionBtn && actionBtn}
        {!actionBtn && <Icon name="arrow-back-ios" color="white" />}
      </Stack>
      {divider && <Divider color="#ddd" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 10, paddingHorizontal: 15 },
  title: {
    fontFamily: "Exo-Bold",
    fontSize: 17,
    color: theme.lightColors.black,
    marginRight: 10,
  },
  description: {
    color: theme.lightColors.grey0,
    fontSize: 15,
  },
});
