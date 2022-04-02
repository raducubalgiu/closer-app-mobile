import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar, Icon, Badge } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../assets/styles/Colors";
import OutlinedButton from "../../core/Buttons/OutlinedButton";
import StatsButton from "../Buttons/StatsButton";
import Stack from "../../core/Containers/Stack";

const ProfileAvatar = (props) => {
  const navigation = useNavigation();

  return (
    <Stack sx={styles.container}>
      <Stack justify="center">
        <TouchableOpacity>
          {props.user?.avatar && (
            <Avatar
              size={100}
              rounded
              source={{ uri: `${props.user.avatar}` }}
            />
          )}
          {!props.user?.avatar && (
            <Avatar
              size={90}
              rounded
              icon={{ name: "user", type: "font-awesome", size: 37 }}
              containerStyle={{ backgroundColor: "#ccc" }}
            />
          )}
          <Badge
            value={<Icon name="plus" type="entypo" size={17} color="white" />}
            containerStyle={{
              position: "absolute",
              bottom: 10,
              left: 80,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.name}>@{props?.user?.username}</Text>
        <Stack direction="row" justify="start">
          <Text style={styles.job}>{props?.user?.job}</Text>
          <Icon
            type="antdesign"
            name="star"
            color={Colors.primary}
            size={16}
            style={{ marginLeft: 7.5 }}
          />
          <Text style={styles.ratingsAverage}>4.5</Text>
        </Stack>
      </Stack>
      <Stack direction="row" justify="between" sx={styles.statsContainer}>
        <StatsButton
          onPress={() => {}}
          labelStats="Ratinguri"
          statsNo={props?.user?.ratingsCount}
        />
        <StatsButton
          onPress={() => {}}
          labelStats="Urmaritori"
          statsNo={props?.user?.followersCount}
        />
        <StatsButton
          onPress={() => {}}
          labelStats="Urmaresti"
          statsNo={props?.user?.followingCount}
        />
      </Stack>
      <Stack direction="row" justify="center" sx={styles.buttonsContainer}>
        <OutlinedButton
          title="Editeaza profilul"
          onPress={() => navigation.navigate("EditProfile")}
        />
      </Stack>
    </Stack>
  );
};

export default ProfileAvatar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  name: {
    fontFamily: "Exo-SemiBold",
    color: Colors.textDark,
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
  },
  job: {
    fontFamily: "Exo-SemiBold",
    color: Colors.primary,
    marginLeft: 5,
    fontSize: 14,
  },
  ratingsAverage: { fontFamily: "Exo-SemiBold", marginLeft: 2.5 },
  statsContainer: {
    width: "100%",
    paddingHorizontal: 60,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonsContainer: {
    marginVertical: 10,
  },
});
