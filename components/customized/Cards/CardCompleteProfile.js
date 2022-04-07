import { StyleSheet, Text } from "react-native";
import { Stack } from "../../core";
import React from "react";
import { Colors } from "../../../assets/styles/Colors";
import CardButton from "../Buttons/CardButton";
import AvatarComplete from "../Avatars/AvatarComplete";

const CardCompleteProfile = (props) => {
  return (
    <Stack sx={styles.container}>
      <Stack>
        <AvatarComplete
          iconName={props.iconName}
          iconType={props.iconType}
          withBadge={props.withBadge}
        />
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.description}>{props.description}</Text>
      </Stack>
      <CardButton
        title="Editeaza"
        completed={props.completed}
        onPress={props.onPress}
      />
    </Stack>
  );
};

export default CardCompleteProfile;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#eee",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginRight: 15,
    borderRadius: 5,
    minWidth: 220,
    maxWidth: 230,
    height: 210,
  },
  title: {
    fontFamily: "Exo-SemiBold",
    color: Colors.textDark,
    textAlign: "center",
    marginBottom: 2.5,
  },
  description: {
    fontFamily: "Exo-Regular",
    color: Colors.textLight,
    fontSize: 12,
    textAlign: "center",
    maxWidth: 170,
  },
});
