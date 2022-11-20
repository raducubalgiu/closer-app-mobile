import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { Stack, IconButton, Checkmark } from "../../../core";
import theme from "../../../../assets/styles/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../models/navigation/rootStackParams";

const { black } = theme.lightColors;

export const HeaderProfile = ({
  username,
  checkmark,
  onGoToFindFriends,
  onOpenSettings,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <View style={{ backgroundColor: "white", zIndex: 1000 }}>
      <SafeAreaView>
        <Stack direction="row" sx={styles.container}>
          <Stack direction="row">
            <IconButton
              onPress={onGoToFindFriends}
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
          <Stack direction="row">
            <Text style={styles.name}>@{username}</Text>
            {checkmark && <Checkmark sx={{ marginLeft: 5 }} />}
          </Stack>
          <Stack direction="row">
            <IconButton
              onPress={() => navigation.navigate("AddPost")}
              size={30}
              iconName="add-circle-outline"
              iconType="ionicon"
              color={black}
            />
            <IconButton
              onPress={onOpenSettings}
              size={30}
              iconName="menu-outline"
              iconType="ionicon"
              color={black}
              sx={{ marginLeft: 15 }}
            />
          </Stack>
        </Stack>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  name: { fontSize: 15.5, color: black, fontWeight: "600" },
});
