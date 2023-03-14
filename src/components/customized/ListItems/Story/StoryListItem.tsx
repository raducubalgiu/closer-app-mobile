import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  Pressable,
} from "react-native";
import { memo } from "react";
import dayjs from "dayjs";
import { Image } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack } from "../../../core";
import { StoryLabel } from "../../Typography/Labels/StoryLabel";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../../../../hooks";
import PostGradient from "../../Gradients/PostGradient";
import StoryFooterListItem from "./StoryFooterListItem";
import StoryHeaderListItem from "./StoryHeaderListItem";
import { StoryViewsSheet } from "../../Sheets/StoryViewsSheet";

const { width, height } = Dimensions.get("window");
type IProps = {
  story: any;
  sliders: any;
  goToNextStory: () => void;
  goToPreviousStory: () => void;
};

const StoryListItem = ({
  story,
  goToNextStory,
  goToPreviousStory,
  sliders,
}: IProps) => {
  const { user } = useAuth();
  const { id, userId, file, createdAt, viewsCount, likesCount } = story;
  const insets = useSafeAreaInsets();
  const HEIGHT = height - 55 - insets.bottom;

  const storyViewsSheet = (
    <StoryViewsSheet
      storyId={id}
      viewsCount={viewsCount}
      likesCount={likesCount}
    />
  );
  const { BOTTOM_SHEET, SHOW_BS } = useSheet(
    [1, height / 1.1],
    storyViewsSheet
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ width, height: HEIGHT }}>
        <Image
          source={{ uri: file?.uri }}
          style={{ width, height: HEIGHT }}
          resizeMode="cover"
          transition={true}
          PlaceholderContent={<PostGradient width={width} height={HEIGHT} />}
        />
        <SafeAreaView
          style={[StyleSheet.absoluteFill, { justifyContent: "space-between" }]}
        >
          <StoryHeaderListItem
            avatar={userId?.avatar}
            username={userId?.username}
            date={dayjs(createdAt).fromNow()}
          />
          <LinearGradient
            colors={["rgba(0,0,0,0.5)", "transparent"]}
            start={{ x: 0, y: 0.6 }}
            end={{ x: 0, y: 0 }}
          >
            <StoryLabel text="Poveste" sx={{ marginLeft: 10 }} />
            <Stack direction="row" sx={{ marginHorizontal: 10 }}>
              {sliders}
            </Stack>
          </LinearGradient>
          <Pressable
            onPress={goToPreviousStory}
            style={{
              position: "absolute",
              top: 55 + insets.top,
              bottom: 55 + insets.bottom,
              left: 0,
              width: width / 4.5,
            }}
          />
          <Pressable
            onPress={goToNextStory}
            style={{
              position: "absolute",
              top: 55 + insets.top,
              bottom: 55 + insets.bottom,
              right: 0,
              width: width / 1.3,
            }}
          />
        </SafeAreaView>
      </View>
      <StoryFooterListItem storyId={id} onShowViews={() => SHOW_BS()} />
      {BOTTOM_SHEET}
    </View>
  );
};

export default memo(StoryListItem);
