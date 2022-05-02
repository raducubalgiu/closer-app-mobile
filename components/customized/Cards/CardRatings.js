import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AirbnbRating, Divider } from "@rneui/themed";
import theme from "../../../assets/styles/theme";
import { Stack, CustomAvatar } from "../../core";

const CardRatings = (props) => {
  return (
    <View style={styles.container}>
      <Stack direction="row" align="start">
        <Stack direction="row">
          <CustomAvatar
            iconSize={20}
            size={45}
            avatar={props?.avatar}
            withBadge={false}
          />
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
          reviewColor={theme.lightColors.black}
          selectedColor={theme.lightColors.primary}
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
    color: theme.lightColors.grey0,
    fontSize: 13,
  },
  service: {
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.black,
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
    color: theme.lightColors.black,
  },
});
