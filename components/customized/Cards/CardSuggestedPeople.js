import { StyleSheet, Text } from "react-native";
import React from "react";
import {
  Button,
  CustomAvatar,
  FollowButton,
  Stack,
  IconStar,
  IconButton,
} from "../../core";
import theme from "../../../assets/styles/theme";
import { useTranslation } from "react-i18next";
import { trimFunc } from "../../../utils";

const { grey0, black, primary } = theme.lightColors;

export const CardSuggestedPeople = ({
  avatar,
  username,
  profession,
  noFollowers,
  onPress,
  followeeId,
  ratingsAverage,
  onRemoveCard,
}) => {
  const { t } = useTranslation();

  return (
    <Button sx={styles.container} onPress={onPress}>
      <Stack justify="end" align="end" sx={{ width: "100%" }}>
        <IconButton
          onPress={onRemoveCard}
          iconName="close"
          iconType="antdesign"
          size={15}
          color={grey0}
          sx={{ marginRight: 10 }}
        />
      </Stack>
      <Stack sx={styles.content}>
        <Stack>
          <CustomAvatar avatar={avatar} size={75} iconSize={35} />
        </Stack>
        <Text style={styles.username}>@{username}</Text>
        <Stack direction="row" sx={{ marginTop: 2.5 }}>
          <Text style={styles.business}>{trimFunc(profession, 12)}</Text>
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
      </Stack>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    marginRight: 15,
    borderRadius: 5,
    minWidth: 200,
    paddingVertical: 10,
  },
  content: {
    paddingHorizontal: 25,
  },
  name: {
    color: black,
    fontWeight: "600",
  },
  username: {
    color: black,
    marginTop: 5,
    marginBottom: 1,
    fontWeight: "600",
  },
  followers: {
    color: grey0,
    fontSize: 13,
    marginTop: 20,
  },
  business: {
    color: primary,
    textTransform: "capitalize",
    fontWeight: "600",
  },
  followBtn: { width: "100%", marginTop: 10 },
  followBtnText: { textAlign: "center" },
  ratingsAverage: { marginLeft: 2.5, fontWeight: "600" },
});
