import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { IconButton } from "../../core";
import theme from "../../../assets/styles/theme";
import { useHttpPost, useHttpDelete, useHttpGet } from "../../../hooks";

const { grey0, error } = theme.lightColors;

export const LikeCommentButton = ({ userId, commentId, onLikes }) => {
  const [liked, setLiked] = useState(false);
  const likeEndpoints = `/users/${userId}/comments/${commentId}`;

  useHttpGet(`${likeEndpoints}/check-like`, (data) => {
    if (data.status === true) setLiked(true);
  });

  const { makePost } = useHttpPost(`${likeEndpoints}/like`);
  const { makeDelete } = useHttpDelete(`${likeEndpoints}/unlike`);

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      onLikes(1);
      makePost();
    } else {
      setLiked(false);
      onLikes(-1);
      makeDelete();
    }
  };

  return (
    <IconButton
      onPress={handleLike}
      sx={styles.btn}
      iconName={liked ? "heart" : "hearto"}
      iconType="antdesign"
      size={12.5}
      color={liked ? error : grey0}
    />
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 2.5,
    paddingHorizontal: 5,
  },
  likesNo: {
    fontWeight: "500",
    marginLeft: 5,
    fontSize: 12.5,
  },
});
