import { StyleSheet, Text } from "react-native";
import React from "react";
import {
  Button,
  CustomAvatar,
  FollowButton,
  Stack,
  IconStar,
} from "../../core";
import theme from "../../../assets/styles/theme";
import { useTranslation } from "react-i18next";

export const CardSuggestedPeople = ({
  avatar,
  username,
  business,
  noFollowers,
  onPress,
  followeeId,
  ratingsAverage,
}) => {
  const { t } = useTranslation();

  return (
    <Button sx={styles.container} onPress={onPress}>
      <Stack>
        <CustomAvatar avatar={avatar} size={75} iconSize={35} />
      </Stack>
      <Text style={styles.username}>@{username}</Text>
      <Stack direction="row">
        <Text style={styles.business}>{business}</Text>
        <Stack direction="row" sx={{ marginLeft: 2.5 }}>
          <IconStar />
          <Text style={styles.ratingsAverage}>{ratingsAverage}</Text>
        </Stack>
      </Stack>
      <Text style={styles.followers}>
        {noFollowers} {t("followers")}
      </Text>
      <FollowButton
        sxBtn={styles.followBtn}
        sxBtnText={styles.followBtnText}
        followeeId={followeeId}
      />
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    marginRight: 15,
    borderRadius: 5,
    minWidth: 200,
  },
  name: {
    fontFamily: "Exo-Medium",
    color: theme.lightColors.black,
  },
  username: {
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.black,
    marginTop: 5,
    marginBottom: 1,
  },
  followers: {
    fontFamily: "Exo-Medium",
    color: theme.lightColors.grey0,
    fontSize: 13,
    marginTop: 20,
  },
  business: {
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.primary,
    textTransform: "capitalize",
  },
  followBtn: { width: "100%", marginTop: 10 },
  followBtnText: { textAlign: "center" },
  ratingsAverage: { fontFamily: "Exo-SemiBold", marginLeft: 2.5 },
});
