import { StyleSheet, Text, Pressable } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import theme from "../../../assets/styles/theme";
import { useAuth } from "../../../hooks/auth";
import { useTranslation } from "react-i18next";
import * as Haptics from "expo-haptics";
import { useDelete, usePost } from "../../../hooks";

const { primary, black } = theme.lightColors;

export const FollowButton = ({
  followeeId,
  isFollow,
  fetchSuggested = undefined,
  fullWidth = false,
  size,
  sxBtn,
  sxBtnText,
}) => {
  const { user } = useAuth();
  const [follow, setFollow] = useState(false);
  const FOLLOW_ENDPOINT = `/users/${user?._id}/followings/${followeeId}/follows`;
  const { t } = useTranslation();

  useEffect(() => {
    setFollow(isFollow);
  }, [isFollow]);

  const { mutate: makePost } = usePost({
    uri: FOLLOW_ENDPOINT,
    onSuccess: () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      fetchSuggested ? fetchSuggested() : null;
    },
  });

  const { mutate: makeDelete } = useDelete({
    uri: FOLLOW_ENDPOINT,
    onSuccess: () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    },
  });

  const followHandler = useCallback(() => {
    if (!follow) {
      setFollow(true);
      makePost({});
      // setUser({
      //   ...user,
      //   followingsCount: user.followingsCount + 1,
      // });
    }
    if (follow) {
      setFollow(false);
      // setUser({
      //   ...user,
      //   followingsCount: user.followingsCount - 1,
      // });
      makeDelete();
    }
  }, [follow]);

  const styles = StyleSheet.create({
    btn: {
      borderWidth: 1,
      borderColor: follow ? "#ddd" : primary,
      paddingVertical: size === "md" ? 11 : 5.5,
      paddingHorizontal: size === "md" ? 20 : 15,
      borderRadius: 2.5,
      backgroundColor: follow ? "white" : primary,
      width: fullWidth && "100%",
    },
    btnText: {
      color: follow ? black : "white",
      fontSize: size === "md" ? 14 : 13,
      textAlign: "center",
      fontWeight: "600",
    },
  });

  return (
    <Pressable style={{ ...styles.btn, ...sxBtn }} onPress={followHandler}>
      <Text style={{ ...styles.btnText, ...sxBtnText }}>
        {follow ? t("following") : t("follow")}
      </Text>
    </Pressable>
  );
};
