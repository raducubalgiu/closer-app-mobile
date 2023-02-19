import { StyleSheet, View, Dimensions, Text } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { memo, useCallback } from "react";
import theme from "../../../../assets/styles/theme";
import { Image, Icon } from "@rneui/themed";
import CardPostHeader from "./CardPostHeader";
import CardPostButtons from "./CardPostButtons";
import CardPostFooter from "./CardPostFooter";
import PostGradient from "../../Gradients/PostGradient";
import { FROM_NOW } from "../../../../utils/date-utils";
import { Post } from "../../../../models/post";
import { ResizeMode, Video } from "expo-av";
import VisibilitySensor from "@svanboxel/visibility-sensor-react-native";
import { usePatch, useSheet } from "../../../../hooks";
import { Stack } from "../../../core";

type StatsItem = { icon: string; counter: number };
const StatsItem = ({ icon, counter }: StatsItem) => {
  return (
    <Stack>
      <Icon name={icon} type="feather" color={"#ccc"} size={25} />
      <Text style={styles.counter}>{counter}</Text>
    </Stack>
  );
};

const { width } = Dimensions.get("window");
const { black } = theme.lightColors || {};
type IProps = { post: Post; onShowDetails: () => void };

const CardPost = ({ post, onShowDetails }: IProps) => {
  const {
    id,
    bookable,
    likesCount,
    commentsCount,
    description,
    createdAt,
    userId,
    product,
    postType,
    viewsCount,
  } = post || {};
  const { name, username, avatar, checkmark, profession, role } = userId || {};

  const viewsSheet = (
    <Stack direction="row" justify="around" sx={{ margin: 15 }}>
      <StatsItem icon="eye" counter={viewsCount} />
      <StatsItem icon="heart" counter={likesCount} />
      <StatsItem icon="message-circle" counter={commentsCount} />
      <StatsItem icon="bookmark" counter={0} />
    </Stack>
  );
  const { BOTTOM_SHEET, SHOW_BS } = useSheet([1, 150], viewsSheet);

  const { mutate } = usePatch({
    uri: `/posts/${id}/views`,
  });

  const handleViews = useCallback((visible: boolean) => {
    if (visible) mutate({});
  }, []);

  return (
    <VisibilitySensor onChange={handleViews}>
      <View style={styles.container}>
        <CardPostHeader
          userId={userId?.id}
          avatar={avatar}
          username={username}
          name={name}
          role={role}
          profession={profession}
          checkmark={checkmark}
          onShowDetails={onShowDetails}
          ratingsAverage={userId?.ratingsAverage}
        />
        <SharedElement id={id}>
          {postType === "photo" && (
            <Image
              source={{ uri: `${post?.images[0]?.url}` }}
              containerStyle={{ width, height: 400 }}
              transition={true}
              PlaceholderContent={<PostGradient width={width} height={400} />}
            />
          )}
          {postType === "video" && (
            <Video
              source={{ uri: `${post?.images[0]?.url}` }}
              useNativeControls={false}
              onPlaybackStatusUpdate={(status) => {}}
              shouldPlay={true}
              isMuted={true}
              isLooping={true}
              style={{ width, height: 500 }}
              resizeMode={ResizeMode.COVER}
            />
          )}
        </SharedElement>
        <CardPostButtons
          bookable={bookable}
          product={{ ...product, ownerId: userId }}
          postId={id}
          likesCount={likesCount}
          onShowSheetViews={() => SHOW_BS()}
        />
        <CardPostFooter
          postId={id}
          creatorId={userId?.id}
          description={description}
          username={username}
          name={name}
          date={FROM_NOW(createdAt)}
          avatar={avatar}
          commentsCount={commentsCount}
        />
      </View>
      {BOTTOM_SHEET}
    </VisibilitySensor>
  );
};

export default memo(CardPost);

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    borderRadius: 20,
  },
  image: {
    aspectRatio: 1,
    width: "100%",
    flex: 1,
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: 500,
  },
  counter: {
    marginTop: 10,
    fontWeight: "600",
    color: black,
    fontSize: 13.5,
  },
});
