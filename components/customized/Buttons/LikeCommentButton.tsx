import { Pressable, StyleSheet, Text } from "react-native";
import { useCallback, useState } from "react";
import theme from "../../../assets/styles/theme";
import { useGet, usePost, useDelete, usePatch, useAuth } from "../../../hooks";
import { Icon } from "@rneui/themed";

const { grey0, error } = theme.lightColors || {};
type IProps = {
  commentId: string;
  creatorId: string;
  likesCount: number;
};

export const LikeCommentButton = ({
  commentId,
  creatorId,
  likesCount,
}: IProps) => {
  const [liked, setLiked] = useState(false);
  const [likesNo, setLikesNo] = useState(likesCount);
  const { user } = useAuth();
  const likeEndpoints = `/users/${user?.id}/comments/${commentId}/likes`;

  useGet({
    model: "checkLike",
    uri: likeEndpoints,
    onSuccess: (res) => setLiked(res.data.status),
  });

  const { mutate: makePost } = usePost({ uri: likeEndpoints });
  const { mutate: makeDelete } = useDelete({ uri: likeEndpoints });
  const { mutate: makePatch } = usePatch({ uri: `/comments/${commentId}` });

  const handleLike = useCallback(() => {
    if (!liked) {
      setLiked(true);
      if (creatorId === user?.id) makePatch({ likedByCreator: true });
      setLikesNo((likesNo) => likesNo + 1);
      makePost({});
    } else {
      setLiked(false);
      if (creatorId === user?.id) makePatch({ likedByCreator: false });
      setLikesNo((likesNo) => likesNo - 1);
      makeDelete();
    }
  }, [liked, likeEndpoints]);

  return (
    <Pressable onPress={handleLike} style={styles.btn}>
      <Icon
        name={liked ? "heart" : "hearto"}
        type="antdesign"
        size={15}
        color={liked ? error : grey0}
      />
      <Text style={styles.likesNumber}>{likesNo}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 2.5,
    paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  likesNumber: {
    fontSize: 13.5,
    fontWeight: "500",
    color: grey0,
    marginLeft: 5,
  },
});
