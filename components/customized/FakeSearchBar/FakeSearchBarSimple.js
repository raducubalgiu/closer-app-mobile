import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import React from "react";
import { Colors } from "../../../assets/styles/Colors";
import { Stack } from "../../core";

const FakeSearchBarSimple = (props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...props.sx }}
      onPress={props.onPress}
    >
      <Stack direction="row">
        <Stack direction="row">
          <Icon
            type="antdesign"
            name="search1"
            size={18}
            color={Colors.textLight}
          />
          <Text style={styles.text}>Cauta</Text>
        </Stack>
      </Stack>
    </TouchableOpacity>
  );
};

export default FakeSearchBarSimple;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 15,
    paddingVertical: 9,
  },
  text: {
    fontFamily: "Exo-Regular",
    marginLeft: 15,
    color: Colors.textLight,
  },
});
