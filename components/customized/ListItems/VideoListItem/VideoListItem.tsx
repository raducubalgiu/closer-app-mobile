import { Pressable, StyleSheet, Dimensions, View, Text } from "react-native";
import { memo, useCallback, useRef, useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSheet } from "../../../../hooks";
import { LikesSheet, CommentsSheet, MoreSheet } from "../..";
import { RootStackParams } from "../../../../models/navigation/rootStackParams";
import VisibilitySensor from "@svanboxel/visibility-sensor-react-native";
import { Post } from "../../../../models/post";
import VideoListItemButtons from "./VideoListItemButtons";
import VideoListItemDetails from "./VideoListItemDetails";
import VideoListItemSlider from "./VideoListItemSlider";

type IProps = { post: Post; isLoading: boolean };

type Status = {
  progressUpdateIntervalMillis: number;
  positionMillis: number;
  shouldPlay: boolean;
  rate: number;
  shouldCorrectPitch: boolean;
  volume: number;
  isMuted: boolean;
  isLooping: boolean;
  playableDurationMillis?: number;
};

const { width, height } = Dimensions.get("window");

const VideoListItem = ({ post, isLoading }: IProps) => {
  const { id, description, bookable, images, userId, product } = post;
  const { priceWithDiscount, option, discount, serviceId } = product || {};
  const video = useRef<any>(null);
  const [status, setStatus] = useState<Status>({
    progressUpdateIntervalMillis: 500,
    positionMillis: 0,
    shouldPlay: false,
    rate: 1.0,
    shouldCorrectPitch: false,
    volume: 1.0,
    isMuted: false,
    isLooping: false,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const VIDEO_HEIGHT = height - insets.bottom - 55;
  const sheetHeight = height / 1.5;

  const handlePlay = () => {
    setIsPlaying((isPlaying) => !isPlaying);
  };

  const likesSheet = <LikesSheet postId={id} />;
  const commentsSheet = <CommentsSheet postId={id} />;
  const moreSheet = <MoreSheet postId={id} />;

  const { BOTTOM_SHEET: LikesBSheet, SHOW_BS: showLikesSheet } = useSheet(
    [1, sheetHeight],
    likesSheet,
    { duration: 400 }
  );

  const { BOTTOM_SHEET: CommSheet, SHOW_BS: showCommSheet } = useSheet(
    [1, sheetHeight],
    commentsSheet,
    { duration: 400 }
  );

  const { BOTTOM_SHEET: VideoMoreSheet, SHOW_BS: showMore } = useSheet(
    [1, sheetHeight],
    moreSheet,
    { duration: 400 }
  );

  const handleImageVisibility = useCallback((visible: boolean) => {
    if (visible) {
      video.current.playAsync();
    } else {
      video.current.pauseAsync();
    }
  }, []);

  const handleChangeStatus = (value: any) => {
    video.current.setStatusAsync({
      ...status,
      positionMillis: value,
    });
  };

  return (
    <VisibilitySensor onChange={handleImageVisibility}>
      <View style={styles.container}>
        <Pressable style={styles.video} onPress={handlePlay}>
          <Video
            ref={video}
            style={{ ...styles.video, height: VIDEO_HEIGHT }}
            source={{ uri: images[0]?.url }}
            useNativeControls={false}
            onPlaybackStatusUpdate={(status: any) => setStatus(() => status)}
            shouldCorrectPitch={true}
            shouldPlay={isPlaying}
            isMuted={false}
            isLooping={true}
            resizeMode={ResizeMode.COVER}
          />
          <VideoListItemDetails
            isLoading={isLoading}
            userDetails={userId}
            product={product}
            description={description}
            bookable={bookable}
            onGoBack={() => navigation.goBack()}
            onGoToCalendar={() =>
              navigation.push("CalendarBig", {
                product: { ...product, ownerId: userId },
                serviceId,
              })
            }
          />
        </Pressable>
        <View style={{ height: 55 + insets.bottom }}>
          <VideoListItemSlider
            width={width}
            onSlidingStart={() => video.current.pauseAsync()}
            onSlidingComplete={() => video.current.playAsync()}
            value={status?.positionMillis}
            maximumValue={status?.playableDurationMillis}
            onValueChange={handleChangeStatus}
          />
          <VideoListItemButtons
            postId={id}
            reactions="17.k"
            onShowCommentsSheet={() => showCommSheet()}
            onShowMoreSheet={() => showMore()}
            onShowLikesSheet={() => showLikesSheet()}
          />
        </View>
        {LikesBSheet}
        {CommSheet}
        {VideoMoreSheet}
      </View>
    </VisibilitySensor>
  );
};

export default memo(VideoListItem);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    height,
    width,
    flex: 1,
  },
  video: { width, flex: 1 },
});
