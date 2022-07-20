import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState, useCallback } from "react";
import axios from "axios";
import theme from "../../../assets/styles/theme";
import { useAuth } from "../../../hooks/auth";
import { useTranslation } from "react-i18next";
import * as Haptics from "expo-haptics";

export const FollowButton = ({
  followeeId,
  fetchUser,
  fetchSuggested,
  fullWidth,
  ...props
}) => {
  const [follow, setFollow] = useState(true);
  const { user, setUser } = useAuth();
  const { followersCount, ratingsAverage, ratingsQuantity, followingCount } =
    user.counter || {};
  const FOLLOW_ENDPOINT = `${process.env.BASE_ENDPOINT}/follows?userId=${user?._id}&followeeId=${followeeId}`;
  const { t } = useTranslation();

  useFocusEffect(
    useCallback(() => {
      axios
        .get(FOLLOW_ENDPOINT, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then((res) => {
          setFollow(res.data.status);
        })
        .catch(() => {
          setFollow(false);
        });
    }, [user, followeeId])
  );

  const followHandler = useCallback(() => {
    setFollow(true);
    setUser({
      ...user,
      counter: {
        followersCount,
        ratingsAverage,
        ratingsQuantity,
        followingCount: followingCount + 1,
      },
    });

    if (!follow) {
      axios
        .post(
          `${process.env.BASE_ENDPOINT}/follows`,
          { userId: user?._id, followeeId },
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        )
        .then(() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          fetchUser ? fetchUser() : null;
          fetchSuggested ? fetchSuggested() : null;
        })
        .catch(() => {
          setFollow(false);
        });
    }
    if (follow) {
      setFollow(false);
      setUser({
        ...user,
        counter: {
          followersCount,
          ratingsAverage,
          ratingsQuantity,
          followingCount: followingCount - 1,
        },
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
      borderColor: follow ? "#ddd" : theme.lightColors.primary,
      paddingVertical: props.size === "md" ? 11 : 4.5,
      paddingHorizontal: props.size === "md" ? 20 : 15,
      borderRadius: 2.5,
      backgroundColor: follow ? "white" : theme.lightColors.primary,
      width: fullWidth && "100%",
    },
    btnText: {
      fontFamily: "Exo-SemiBold",
      color: follow ? theme.lightColors.black : "white",
      fontSize: props.size === "md" ? 14 : 13,
      textAlign: "center",
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{ ...styles.btn, ...props.sxBtn }}
      onPress={followHandler}
    >
      <Text style={{ ...styles.btnText, ...props.sxBtnText }}>
        {follow ? t("following") : t("follow")}
      </Text>
    </TouchableOpacity>
  );
};
