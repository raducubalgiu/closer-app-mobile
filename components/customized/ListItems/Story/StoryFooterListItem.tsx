import { StyleSheet, View } from "react-native";
import { memo } from "react";
import { AvatarGroup, Stack, ShareIButton } from "../../../core";
import { LikeButton } from "../../Buttons/LikeButton";
import { MoreVerticalButton } from "../../Buttons/MoreVerticalButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type IProps = { storyId: string };

const StoryFooterListItem = ({ storyId }: IProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ ...styles.container, height: 55 + insets.bottom }}>
      <Stack direction="row">
        <AvatarGroup sx={{ marginLeft: 10 }} />
        <Stack direction="row">
          <LikeButton
            size={27.5}
            model="stories"
            modelId={storyId}
            onAddLike={() => {}}
            onRemoveLike={() => {}}
            sx={styles.button}
            color="white"
          />
          <ShareIButton
            onPress={() => {}}
            size={27.5}
            sx={styles.button}
            color="white"
          />
          <MoreVerticalButton
            sx={{ paddingHorizontal: 7.5, paddingVertical: 5 }}
            onPress={() => {}}
          />
        </Stack>
      </Stack>
    </View>
  );
};

export default memo(StoryFooterListItem);

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    marginTop: 10,
  },
  button: { paddingHorizontal: 10, paddingVertical: 5 },
});
