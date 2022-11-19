import { StyleSheet, Text } from "react-native";
import theme from "../../../assets/styles/theme";
import { Stack, CustomAvatar } from "../../core";
import { displayCount } from "../../../utils";
import { useTranslation } from "react-i18next";

const { grey0 } = theme.lightColors;

export const CardMessageUser = ({
  name,
  avatar,
  username,
  followingsCount,
  followersCount,
  sx,
}) => {
  const { t } = useTranslation();

  return (
    <Stack sx={{ marginVertical: 40, ...sx }}>
      <CustomAvatar avatar={avatar} size={100} />
      <Text style={styles.name}>{name}</Text>
      <Text style={{ color: grey0 }}>@{username}</Text>
      <Stack direction="row">
        <Text style={styles.count}>
          {displayCount(
            followingsCount,
            t("oneFollowing"),
            t("followings"),
            t("ofFollowings")
          )}
        </Text>
        <Text> - </Text>
        <Text style={styles.count}>
          {displayCount(
            followersCount,
            t("follower"),
            t("followers"),
            t("ofFollowers")
          )}
        </Text>
      </Stack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  name: {
    fontWeight: "600",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 2.5,
  },
  count: { color: grey0, fontSize: 13, textTransform: "lowercase" },
});
