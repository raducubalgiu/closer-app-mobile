import { StyleSheet } from "react-native";
import React, { useCallback, useState } from "react";
import { IconButton } from "../../core";
import theme from "../../../assets/styles/theme";
import { useAuth, useGet, usePost, useDelete, usePatch } from "../../../hooks";

const { grey0, error } = theme.lightColors;

export const LikeCommentButton = ({
  userId,
  commentId,
  onLikes,
  creatorId,
}) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const likeEndpoints = `/users/${userId}/comments/${commentId}/likes`;

  useGet({
    model: "checkLike",
    uri: `${likeEndpoints}/check`,
    onSuccess: (res) => setLiked(res.data.status),
  });

  const { mutate: makePost } = usePost({ uri: likeEndpoints });
  const { mutate: makeDelete } = useDelete({ uri: likeEndpoints });
  const { mutate: makePatch } = usePatch({ uri: `/comments/${commentId}` });

  const handleLike = useCallback(() => {
    if (!liked) {
      setLiked(true);
      if (creatorId === user?._id) makePatch({ likedByCreator: true });
      onLikes(1);
      makePost();
    } else {
      setLiked(false);
      if (creatorId === user?._id) makePatch({ likedByCreator: false });
      onLikes(-1);
      makeDelete();
    }
  }, [liked, likeEndpoints]);

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
