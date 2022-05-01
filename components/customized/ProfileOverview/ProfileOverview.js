import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../assets/styles/theme";
import StatsButton from "../Buttons/StatsButton";
import Stack from "../../core/Containers/Stack";
import UserAvatar from "../Avatars/UserAvatar";
import { Checkmark } from "../../core";

const ProfileOverview = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Stack justify="center" align="center">
        <TouchableOpacity>
          <UserAvatar
            iconSize={37}
            size={95}
            avatar={props?.avatar}
            withBadge={props?.withBadge}
            badgeDetails={{ name: "plus", type: "entypo" }}
          />
        </TouchableOpacity>
        <Stack direction="row">
          <Text style={styles.name}>@{props?.username}</Text>
          {props?.checkmark && <Checkmark />}
        </Stack>
        <Stack direction="row" justify="start">
          {props?.business && (
            <Text style={styles.business}>{props?.business}</Text>
          )}
          {props?.role !== "subscriber" && (
            <Icon
              type="antdesign"
              name="star"
              color={theme.lightColors.primary}
              size={16}
              style={{ marginLeft: 7.5 }}
            />
          )}
          {props?.role !== "subscriber" && (
            <Text style={styles.ratingsAverage}>{props?.ratingsAverage}</Text>
          )}
        </Stack>
      </Stack>
      <Stack justify="center" align="center" sx={styles.servicesContainer}>
        <ScrollView
          bounces={false}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {props?.services?.map((service, i) => (
            <Text key={i} style={styles.service}>
              {service?.name}
            </Text>
          ))}
        </ScrollView>
      </Stack>
      <Stack direction="row" justify="between" sx={styles.statsContainer}>
        <StatsButton
          onPress={() =>
            navigation.navigate("ProfileGeneralStack", {
              screen: "ProfileTabsScreen",
              params: {
                userId: props?.userId,
                username: props?.username,
                initialRoute: "Ratings",
              },
            })
          }
          labelStats="Ratinguri"
          statsNo={props?.ratingsQuantity}
        />
        <StatsButton
          onPress={() =>
            navigation.navigate("ProfileGeneralStack", {
              screen: "ProfileTabsScreen",
              params: {
                userId: props?.userId,
                username: props?.username,
                initialRoute: "Followers",
              },
            })
          }
          labelStats="Urmaritori"
          statsNo={props?.followersCount}
        />
        <StatsButton
          onPress={() =>
            navigation.navigate("ProfileGeneralStack", {
              screen: "ProfileTabsScreen",
              params: {
                userId: props?.userId,
                username: props?.username,
                initialRoute: "Following",
              },
            })
          }
          labelStats="Urmaresti"
          statsNo={props?.followingCount}
        />
      </Stack>
      <Stack direction="row" justify="center" sx={styles.buttonsContainer}>
        {props?.actionButtons}
      </Stack>
    </View>
  );
};

export default ProfileOverview;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  name: {
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.black,
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
  },
  business: {
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.primary,
    marginLeft: 5,
    fontSize: 14,
    textTransform: "capitalize",
  },
  ratingsAverage: { fontFamily: "Exo-SemiBold", marginLeft: 2.5 },
  servicesContainer: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 40,
  },
  service: {
    fontFamily: "Exo-SemiBold",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 2.5,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 10,
    fontSize: 12,
    color: theme.lightColors.black,
  },
  statsContainer: {
    width: "100%",
    paddingHorizontal: 60,
    marginBottom: 10,
  },
  buttonsContainer: {
    marginVertical: 10,
  },
});
