import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MAIN_ROLE, SECOND_ROLE, THIRD_ROLE } from "@env";
import { useTranslation } from "react-i18next";
import theme from "../../../assets/styles/theme";
import { CustomAvatar, Stack, IconStar, Protected } from "../../core";
import { StatsButton } from "../Buttons/StatsButton";
import { useAuth } from "../../../hooks";
import { displayDash } from "../../../utils";

const { black, primary } = theme.lightColors;

export const ProfileOverview = ({ name, username, avatar, children, user }) => {
  const { user: userContext } = useAuth();
  const { role, profession } = user || {};
  const {
    ratingsQuantity,
    postsCount,
    followersCount,
    followingsCount,
    ratingsAverage,
  } = user || {};
  const navigation = useNavigation();
  const { t } = useTranslation();

  const goToFollowers = () =>
    navigation.push("ProfileStats", {
      screen: "Followers",
      userId: user?._id,
      username: username,
      initialRoute: "Followers",
      role,
      ratingsQuantity,
      followersCount,
      followingsCount,
    });
  const goToReviews = () =>
    navigation.push("ProfileStats", {
      screen: "Reviews",
      userId: user?._id,
      username: username,
      initialRoute: "Reviews",
      role,
      ratingsQuantity,
      followersCount,
      followingsCount,
    });
  const goToFollowings = () =>
    navigation.push("ProfileStats", {
      screen: "Following",
      userId: user?._id,
      username: username,
      initialRoute: "Following",
      role,
      ratingsQuantity,
      followersCount,
      followingsCount,
    });

  const withBadge = userContext?._id === user?._id && user?.role === THIRD_ROLE;
  const badgeDetails = { name: "plus", type: "entypo", size: 17 };

  return (
    <View style={styles.container}>
      <Stack justify="center" align="center">
        <Pressable>
          <CustomAvatar
            iconSize={37}
            size={95}
            avatar={avatar}
            withBadge={withBadge}
            badgeDetails={badgeDetails}
          />
        </Pressable>
        <Text style={styles.name}>{name}</Text>
        <Stack direction="row" justify="start">
          <Text style={styles.business}>{profession?.name}</Text>
          <Protected userRole={role} roles={[MAIN_ROLE, SECOND_ROLE]}>
            <IconStar sx={styles.star} />
            <Text style={styles.ratingsAverage}>
              {ratingsAverage?.toFixed(1)}
            </Text>
          </Protected>
        </Stack>
      </Stack>
      <Stack direction="row" justify="between" sx={styles.statsContainer}>
        <StatsButton
          onPress={role !== THIRD_ROLE ? goToReviews : null}
          label={role !== THIRD_ROLE ? t("reviews") : t("posts")}
          statsNo={displayDash(
            role !== THIRD_ROLE ? ratingsQuantity : postsCount
          )}
        />
        <StatsButton
          onPress={goToFollowers}
          label={t("followers")}
          statsNo={displayDash(followersCount)}
        />
        <StatsButton
          onPress={goToFollowings}
          label={t("following")}
          statsNo={displayDash(followingsCount)}
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
