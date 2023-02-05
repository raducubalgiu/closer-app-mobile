import { StyleSheet, Text, Pressable } from "react-native";
import { memo } from "react";
import { Icon } from "@rneui/themed";
import { Stack, ShareIButton } from "../../../core";
import { LikeButton } from "../../Buttons/LikeButton";
import { VideoCommentButton } from "../../Buttons/VideoCommentButton";
import { MoreVerticalButton } from "../../Buttons/MoreVerticalButton";

type IProps = {
  postId: string;
  onShowCommentsSheet: () => void;
  onShowMoreSheet: () => void;
  onShowLikesSheet: () => void;
  reactions: string;
};

const VideoListItemButtons = ({
  postId,
  onShowCommentsSheet,
  onShowMoreSheet,
  onShowLikesSheet,
  reactions,
}: IProps) => {
  return (
    <Stack direction="row" align="center">
      <Pressable style={styles.button} onPress={onShowLikesSheet}>
        <Stack direction="row" align="center">
          <Icon name="bar-chart" type="feather" size={27.5} color="white" />
          <Stack direction="row" sx={{ marginLeft: 7.5 }}>
            <Text style={styles.reactions}>{reactions}</Text>
          </Stack>
        </Stack>
      </Pressable>
      <Stack direction="row">
        <LikeButton
          size={27.5}
          postId={postId}
          onAddLike={() => {}}
          onRemoveLike={() => {}}
          sx={styles.button}
          color="white"
        />
        <VideoCommentButton onPress={onShowCommentsSheet} hasComments={true} />
        <ShareIButton
          onPress={() => {}}
          size={27.5}
          sx={styles.button}
          color="white"
        />

        <MoreVerticalButton
          sx={{ paddingHorizontal: 7.5, paddingVertical: 5 }}
          onPress={onShowMoreSheet}
        />
      </Stack>
    </Stack>
  );
};

export default memo(VideoListItemButtons);

const styles = StyleSheet.create({
  button: { paddingHorizontal: 10, paddingVertical: 5 },
  reactions: {
    color: "white",
    fontSize: 15.5,
    fontWeight: "700",
  },
});
