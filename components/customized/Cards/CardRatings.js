import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AirbnbRating, Divider, Avatar } from "react-native-elements";
import { Colors } from "../../../assets/styles/Colors";
import Stack from "../../core/Containers/Stack";

const CardRatings = (props) => {
  return (
    <View style={styles.container}>
      <Stack direction="row" align="start">
        <Stack direction="row">
          <Avatar size={45} rounded source={{ uri: `${props.avatar}` }} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.date}>{props.date}</Text>
          </View>
        </Stack>
      </Stack>
      <Divider style={{ marginTop: 15 }} />
      <Stack direction="row" sx={{ marginVertical: 5 }}>
        <AirbnbRating
          isDisabled={true}
          count={5}
          reviews={["Nesatisfacator", "Acceptabil", "Ok", "Bun", "Senzational"]}
          size={15}
          defaultRating={props.rating}
          reviewColor={Colors.textDark}
          selectedColor={Colors.primary}
          reviewSize={15}
        />
        <Text style={styles.service}>{props.service}</Text>
      </Stack>
      <Text style={styles.review}>{props.review}</Text>
    </View>
  );
};

export default CardRatings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginTop: 15,
    marginHorizontal: 15,
    padding: 20,
    borderRadius: 10,
  },
  name: {
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
    marginBottom: 2.5,
  },
  date: {
    fontFamily: "Exo-Medium",
    color: Colors.textLight,
    fontSize: 13,
  },
  service: {
    fontFamily: "Exo-SemiBold",
    color: Colors.textDark,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  review: {
    fontFamily: "Exo-Medium",
    fontSize: 14,
    marginVertical: 10,
    color: Colors.textDark,
  },
});
