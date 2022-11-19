import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  CustomAvatar,
  Stack,
  IconStar,
  IconButton,
  Checkmark,
} from "../../core";
import theme from "../../../assets/styles/theme";
import { useTranslation } from "react-i18next";
import { trimFunc } from "../../../utils";
import { FollowButton } from "../Buttons/FollowButton";

const { grey0, black, primary } = theme.lightColors;

export const CardSuggestedPeople = ({
  avatar,
  username,
  profession,
  checkmark,
  noFollowers,
  followeeId,
  ratingsAverage,
  onRemoveCard,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
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
        <Stack direction="row" justify="start">
          <Text style={styles.username}>{username}</Text>
          {checkmark && <Checkmark sx={{ marginLeft: 5 }} />}
        </Stack>
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
        {/* <FollowButton
          sxBtn={styles.followBtn}
          sxBtnText={styles.followBtnText}
          followeeId={followeeId}
          fullWidth
        /> */}
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    marginRight: 15,
    borderRadius: 5,
    minWidth: 220,
    paddingVertical: 10,
  },
  content: {
    width: "100%",
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
    fontSize: 14.5,
  },
  followers: {
    color: grey0,
    fontSize: 14,
    marginTop: 20,
    fontWeight: "500",
  },
  business: {
    color: primary,
    textTransform: "capitalize",
    fontWeight: "700",
  },
  followBtn: { marginTop: 10 },
  followBtnText: { textAlign: "center" },
  ratingsAverage: { marginLeft: 2.5, fontWeight: "600" },
});
