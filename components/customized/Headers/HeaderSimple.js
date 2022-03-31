import { StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../assets/styles/Colors";

const HeaderSimple = (props) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          name="arrow-back"
          size={25}
          style={{ padding: 20 }}
          color={Colors.textDark}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onPress}>
        <Icon
          style={{ padding: 20 }}
          size={20}
          type="entypo"
          name="dots-three-vertical"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HeaderSimple;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-between",
  },
});
