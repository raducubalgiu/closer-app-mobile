import { memo } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MAIN_ROLE, SECOND_ROLE } from "@env";
import { useTranslation } from "react-i18next";
import theme from "../../../../assets/styles/theme";
import { Stack, IconStar, Protected } from "../../core";
import { StatsButton } from "../Buttons/StatsButton";
import CustomAvatar from "../../core/Avatars/CustomAvatar";
import { displayDash } from "../../../utils";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigation/rootStackParams";
import AvatarBadge from "../../core/Avatars/AvatarBadge";
import { useAuth } from "../../../hooks";
import { Divider } from "@rneui/themed";
import { ViewFollowingsListEnum } from "../../../ts";

const { black, primary } = theme.lightColors || {};

type IProps = {
  name: any;
  username: any;
  avatar: any;
  children: any;
  user: any;
  isBlocked: boolean;
  isPrivate: boolean;
};

const ProfileOverview = ({
  name,
  username,
  avatar,
  children,
  user,
  isBlocked,
  isPrivate,
}: IProps) => {
  const { user: userContext } = useAuth();
  const { role, profession } = user || {};
  const {
    ratingsQuantity,
    postsCount,
    followersCount,
    followingsCount,
    ratingsAverage,
    settings,
  } = user || {};
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation(["common", "professions"]);
  const sameUser = user?.id === userContext?.id;

  const goToFollowers = () =>
    navigation.push("ProfileStats", {
      screen: "Followers",
      userId: user?.id,
      username: username,
      initialRoute: "Followers",
      role,
      ratingsQuantity,
      followersCount,
      followingsCount,
      settings,
    });
  const goToReviews = () =>
    navigation.push("ProfileStats", {
      screen: "Reviews",
      userId: user?.id,
      username: username,
      initialRoute: "Reviews",
      role,
      ratingsQuantity,
      followersCount,
      followingsCount,
      settings,
    });
  const goToFollowings = () => {
    if (!sameUser && settings?.viewFollowings === ViewFollowingsListEnum.ME) {
      return;
    }

    navigation.push("ProfileStats", {
      screen: "Following",
      userId: user?.id,
      username: username,
      initialRoute: "Following",
      role,
      ratingsQuantity,
      followersCount,
      followingsCount,
      settings,
    });
  };

  const isBusiness = role === MAIN_ROLE || role === SECOND_ROLE;
  const disableStatsBtn = isBlocked || isPrivate;

  return (
    <View style={styles.container}>
      <Stack justify="center" align="center">
        <View style={{ alignItems: "center" }}>
          <Pressable>
            {user?.id !== userContext?.id && (
              <CustomAvatar size={95} avatar={avatar} />
            )}
            {user?.id === userContext?.id && (
              <AvatarBadge
                size={95}
                avatar={avatar}
                sxBadge={{ bottom: 2.5, left: 75 }}
              />
            )}
          </Pressable>
        </View>
        <Text style={styles.name}>{name}</Text>
        <Stack direction="row" justify="start">
          <Text style={styles.business}>
            {displayDash(t(`${profession?.name}`))}
          </Text>
          <Protected userRole={role} roles={[MAIN_ROLE, SECOND_ROLE]}>
            <IconStar sx={styles.star} />
            <Text style={styles.ratingsAverage}>
              {ratingsAverage?.toFixed(1)}
            </Text>
          </Protected>
        </Stack>
      </Stack>
      <Stack sx={{ marginTop: 20 }}>
        <Stack direction="row" justify="center">
          <StatsButton
            disabled={disableStatsBtn}
            onPress={isBusiness ? goToReviews : null}
            label={isBusiness ? t("reviews") : t("posts")}
            statsNo={displayDash(isBusiness ? ratingsQuantity : postsCount)}
          />
          <Divider orientation="vertical" color="#ddd" />
          <StatsButton
            disabled={disableStatsBtn}
            onPress={goToFollowers}
            label={t("followers")}
            statsNo={displayDash(followersCount)}
          />
          <Divider orientation="vertical" color="#ddd" />
          <StatsButton
            disabled={disableStatsBtn}
            onPress={goToFollowings}
            label={t("following")}
            statsNo={displayDash(followingsCount)}
          />
        </Stack>
        <Stack direction="row" sx={styles.buttonsContainer}>
          {children}
        </Stack>
      </Stack>
    </View>
  );
};

export default memo(ProfileOverview);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "space-between",
    flex: 1,
    marginVertical: 15,
  },
  name: {
    color: black,
    fontSize: 16,
    marginTop: 5,
    marginBottom: 7.5,
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
  buttonsContainer: {
    marginTop: 20,
  },
  star: { marginLeft: 7.5 },
  text: {
    fontSize: 13.5,
    marginLeft: 5,
    color: black,
  },
});
