import { StyleSheet, View } from "react-native";
import React from "react";
import MenuItem from "../MenuItem/MenuItem";
import { useNavigation } from "@react-navigation/native";

const SettingsList = (props) => {
  const navigation = useNavigation();

  return (
    <View>
      <MenuItem
        iconName="setting"
        iconType="antdesign"
        text="Setari"
        onPress={() => {
          navigation.navigate("Settings");
        }}
      />

      <MenuItem
        iconName="bars"
        iconType="antdesign"
        text="Programarile tale"
        onPress={() => navigation.navigate("Schedules")}
      />

      <MenuItem
        iconName="gift"
        iconType="antdesign"
        text="Discounturi"
        onPress={() => navigation.navigate("Discounts")}
      />

      <MenuItem
        iconName="exclamationcircleo"
        iconType="antdesign"
        text="Raporteaza o problema"
        onPress={() => {}}
      />

      <MenuItem
        iconName="sharealt"
        iconType="antdesign"
        text="Distribuie profilul"
        onPress={() => navigation.navigate("Discounts")}
      />

      <MenuItem
        iconName="logout"
        iconType="antdesign"
        text="Delogare"
        onPress={props.onHandleLogout}
      />
    </View>
  );
};

export default SettingsList;

const styles = StyleSheet.create({});
