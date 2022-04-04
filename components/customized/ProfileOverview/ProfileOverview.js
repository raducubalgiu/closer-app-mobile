import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../assets/styles/Colors";
import OutlinedButton from "../../core/Buttons/OutlinedButton";
import StatsButton from "../Buttons/StatsButton";
import Stack from "../../core/Containers/Stack";
import UserAvatar from "../Avatars/UserAvatar";

const ProfileOverview = (props) => {
  const { user } = props;
  const navigation = useNavigation();

  return (
    <Stack sx={styles.container}>
      <Stack justify="center">
        <TouchableOpacity>
          <UserAvatar
            size={95}
            avatar={
              user?.avatar !== undefined ? user?.avatar[0]?.url : undefined
            }
            withBadge={props.withBadge}
          />
        </TouchableOpacity>
        <Text style={styles.name}>@{user?.username}</Text>
        <Stack direction="row" justify="start">
          <Text style={styles.job}>{user?.job}</Text>
          <Icon
            type="antdesign"
            name="star"
            color={Colors.primary}
            size={16}
            style={{ marginLeft: 7.5 }}
          />
          <Text style={styles.ratingsAverage}>{user?.ratingsAverage}</Text>
        </Stack>
      </Stack>
      <Stack direction="row" justify="between" sx={styles.statsContainer}>
        <StatsButton
          onPress={() =>
            navigation.navigate("AllFollowers", { initialRoute: "Ratings" })
          }
          labelStats="Ratinguri"
          statsNo={user?.ratingsQuantity}
        />
        <StatsButton
          onPress={() =>
            navigation.navigate("AllFollowers", { initialRoute: "Followers" })
          }
          labelStats="Urmaritori"
          statsNo={user?.followersCount}
        />
        <StatsButton
          onPress={() =>
            navigation.navigate("AllFollowers", { initialRoute: "Following" })
          }
          labelStats="Urmaresti"
          statsNo={user?.followingCount}
        />
      </Stack>
      <Stack direction="row" justify="center" sx={styles.buttonsContainer}>
        {props.actionButtons}
      </Stack>
    </Stack>
  );
};

export default ProfileOverview;

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
