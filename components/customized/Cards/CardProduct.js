import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../../assets/styles/Colors";
import OutlinedButton from "../../core/Buttons/OutlinedButton";
import { Stack } from "../../core";

const CardProduct = (props) => {
  return (
    <View style={styles.card}>
      <Stack direction="row" align="start" sx={styles.cardLayout}>
        <View style={{ flex: 1, marginRight: 5 }}>
          <Text style={styles.name}>{props.name}</Text>
          {props.description && (
            <Text style={styles.description}>{props.description}</Text>
          )}
          <Text style={styles.price}>{props.price} RON</Text>
        </View>
        {props.bookingBtn ? (
          <OutlinedButton title="Rezerva" style={{ flex: 1 }} />
        ) : (
          props.actionBtns
        )}
      </Stack>
    </View>
  );
};

export default CardProduct;

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#eee",
    marginHorizontal: 10,
  },
  cardLayout: { flex: 1 },
  name: {
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
    marginBottom: 1,
  },
  description: {
    fontFamily: "Exo-Regular",
    color: Colors.textLight,
  },
  price: {
    fontFamily: "Exo-Bold",
    marginTop: 10,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  buttonText: {
    color: Colors.textDark,
    fontFamily: "Exo-Medium",
  },
});
