import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState, useCallback } from "react";
import axios from "axios";
import theme from "../../../assets/styles/theme";
import { useAuth } from "../../../hooks/auth";
import { useTranslation } from "react-i18next";
import * as Haptics from "expo-haptics";
import { useHttpGet } from "../../../hooks";

const { primary, black } = theme.lightColors;

export const FollowButton = ({
  followeeId,
  fetchUser,
  fetchSuggested,
  fullWidth,
  size,
  sxBtn,
  sxBtnText,
}) => {
  const { user, setUser } = useAuth();
  const [follow, setFollow] = useState(false);
  const { followingCount } = user.counter || {};
  const FOLLOW_ENDPOINT = `${process.env.BASE_ENDPOINT}/follows?userId=${user?._id}&followeeId=${followeeId}`;
  const { t } = useTranslation();

  const { loading } = useHttpGet(
    `/follows?userId=${user?._id}&followeeId=${followeeId}`,
    (data) => setFollow(data.status)
  );

  const followHandler = useCallback(() => {
    setFollow(true);
    setUser({
      ...user,
      counter: { ...user.counter, followingCount: followingCount + 1 },
    });

    if (!follow) {
      axios
        .post(
          `${process.env.BASE_ENDPOINT}/follows`,
          { userId: user?._id, followeeId },
          { headers: { Authorization: `Bearer ${user?.token}` } }
        )
        .then(() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          fetchUser ? fetchUser() : null;
          fetchSuggested ? fetchSuggested() : null;
        })
        .catch(() => setFollow(false));
    }
    if (follow) {
      setFollow(false);
      setUser({
        ...user,
        counter: { ...user.counter, followingCount: followingCount - 1 },
      });

      axios
        .delete(FOLLOW_ENDPOINT, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then(() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          fetchUser ? fetchUser() : null;
        })
        .catch(() => setFollow(false));
    }
  }, [user, followeeId, follow]);

  const styles = StyleSheet.create({
    btn: {
      borderWidth: 1,
      borderColor: follow ? "#ddd" : primary,
      paddingVertical: size === "md" ? 11 : 4.5,
      paddingHorizontal: size === "md" ? 20 : 15,
      borderRadius: 2.5,
      backgroundColor: follow ? "white" : primary,
      width: fullWidth && "100%",
    },
    btnText: {
      fontFamily: "Exo-SemiBold",
      color: follow ? black : "white",
      fontSize: size === "md" ? 14 : 13,
      textAlign: "center",
    },
  });

  return (
    <>
      {!loading && (
        <TouchableOpacity
          activeOpacity={1}
          style={{ ...styles.btn, ...sxBtn }}
          onPress={followHandler}
        >
          <Text style={{ ...styles.btnText, ...sxBtnText }}>
            {follow ? t("following") : t("follow")}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};
