import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { Colors } from "../../../assets/styles/Colors";
import { Stack } from "../../core";
import { OutlinedButton } from "../../core";

const CardJob = (props) => {
  return (
    <Stack sx={styles.container}>
      <Stack direction="row" align="start">
        <Stack align="start" sx={styles.firstBox}>
          <Text style={styles.name}>{props?.name}</Text>
          <Text style={styles.description}>{props?.description}</Text>
          <Stack direction="row" justify="start">
            <Icon
              name="clockcircleo"
              type="antdesign"
              size={20}
              color={Colors.textDark}
            />
            <Text style={styles.priority}>Prioritate {props?.priority}</Text>
          </Stack>
        </Stack>
        <View>
          <OutlinedButton title="Detalii" onPress={props.onPress} />
        </View>
      </Stack>
    </Stack>
  );
};

export default CardJob;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginHorizontal: 15,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
  },
  firstBox: { paddingRight: 10, flex: 1 },
  name: {
    fontFamily: "Exo-SemiBold",
    color: Colors.textDark,
    marginBottom: 1,
    fontSize: 16,
  },
  description: {
    color: Colors.textLight,
    fontFamily: "Exo-Regular",
    marginBottom: 10,
    fontSize: 13,
  },
  priority: {
    fontFamily: "Exo-SemiBold",
    marginLeft: 10,
    color: Colors.primary,
  },
});