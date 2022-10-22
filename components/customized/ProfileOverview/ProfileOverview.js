import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { MAIN_ROLE, SECOND_ROLE, THIRD_ROLE } from "@env";
import { useTranslation } from "react-i18next";
import theme from "../../../assets/styles/theme";
import {
  CustomAvatar,
  Stack,
  StatsButton,
  IconStar,
  Button,
  Protected,
} from "../../core";
import { useAuth } from "../../../hooks";
import { displayDash } from "../../../utils";

const { black, primary } = theme.lightColors;

export const ProfileOverview = ({ name, username, avatar, children, user }) => {
  const { user: userContext } = useAuth();
  const { counter, role, profession } = user || {};
  const navigation = useNavigation();
  const { t } = useTranslation();

  const goToFollowers = () =>
    navigation.navigate("ProfileStats", {
      screen: "Followers",
      userId: user?._id,
      username: username,
      initialRoute: "Followers",
      role,
      counter,
    });
  const goToReviews = () =>
    navigation.navigate("ProfileStats", {
      screen: "Reviews",
      userId: user?._id,
      username: username,
      initialRoute: "Reviews",
      role,
      counter,
    });
  const goToFollowings = () =>
    navigation.navigate("ProfileStats", {
      screen: "Following",
      userId: user?._id,
      username: username,
      initialRoute: "Following",
      role,
      counter,
    });

  const withBadge = userContext?._id === user?._id && user?.role === THIRD_ROLE;
  const badgeDetails = { name: "plus", type: "entypo", size: 17 };

  return (
    <View style={styles.container}>
      <Stack justify="center" align="center">
        <Button>
          <CustomAvatar
            iconSize={37}
            size={95}
            avatar={avatar}
            withBadge={withBadge}
            badgeDetails={badgeDetails}
          />
        </Button>
        <Text style={styles.name}>{name}</Text>
        <Stack direction="row" justify="start">
          <Text style={styles.business}>{profession?.name}</Text>
          <Protected userRole={role} roles={[MAIN_ROLE, SECOND_ROLE]}>
            <IconStar sx={styles.star} />
            <Text style={styles.ratingsAverage}>
              {counter?.ratingsAverage?.toFixed(1)}
            </Text>
          </Protected>
        </Stack>
        {/* <Stack direction="row" sx={{ marginTop: 10 }}>
          <Button onPress={() => navigation.navigate("About")}>
            <Stack direction="row">
              <Icon name="keyboard-arrow-down" size={15} color="white" />
              <Icon name="clock" type="feather" color={grey0} size={17.5} />
              <Text style={styles.text}>{available}</Text>
            </Stack>
          </Button>
          <Button
            onPress={() => navigation.navigate("Map", { location, profession })}
          >
            <Stack direction="row" sx={{ marginLeft: 10 }}>
              <IconLocation color={grey0} size={17.5} />
              <Text style={styles.text}>
                {t("at")} {distance?.toFixed(0)} km
              </Text>
              <Icon name="keyboard-arrow-down" size={15} color={black} />
            </Stack>
          </Button>
        </Stack> */}
      </Stack>
      <Stack direction="row" justify="between" sx={styles.statsContainer}>
        <StatsButton
          onPress={role !== THIRD_ROLE ? goToReviews : null}
          labelStats={role !== THIRD_ROLE ? t("reviews") : t("posts")}
          statsNo={displayDash(
            role !== THIRD_ROLE ? counter?.ratingsQuantity : counter?.postsCount
          )}
        />
        <StatsButton
          onPress={goToFollowers}
          labelStats={t("followers")}
          statsNo={displayDash(counter?.followersCount)}
        />
        <StatsButton
          onPress={goToFollowings}
          labelStats={t("following")}
          statsNo={displayDash(counter?.followingCount)}
        />
      </Stack>
      <Stack direction="row" justify="center" sx={styles.buttonsContainer}>
        {children}
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  name: {
    color: black,
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
    fontWeight: "600",
  },
  business: {
    color: primary,
    marginLeft: 5,
    fontSize: 14.5,
    textTransform: "capitalize",
    fontWeight: "700",
  },
  ratingsAverage: { marginLeft: 2.5, fontWeight: "700" },
  servicesContainer: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 40,
  },
  service: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 2.5,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 10,
    fontSize: 12,
    color: black,
  },
  statsContainer: {
    width: "100%",
    paddingHorizontal: 60,
    marginBottom: 2.5,
    marginTop: 20,
  },
  buttonsContainer: {
    marginVertical: 10,
  },
  star: { marginLeft: 7.5 },
  text: {
    fontSize: 13.5,
    marginLeft: 5,
    color: black,
  },
});
