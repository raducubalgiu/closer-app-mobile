import { Pressable, StyleSheet, Dimensions, View, Text } from "react-native";
import { memo, useCallback, useRef, useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSheet } from "../../../../hooks";
import { LikesSheet, CommentsSheet, MoreSheet } from "../..";
import { RootStackParams } from "../../../../navigation/rootStackParams";
import VisibilitySensor from "@svanboxel/visibility-sensor-react-native";
import { Post } from "../../../../models/post";
import VideoListItemButtons from "./VideoListItemButtons";
import VideoListItemDetails from "./VideoListItemDetails";
import VideoListItemSlider from "./VideoListItemSlider";
import { Icon } from "@rneui/themed";
import { Stack } from "../../../core";

type IProps = {
  post: Post;
  isLoading: boolean;
  setScrollEnabled: (scroll: boolean) => void;
};

type Status = {
  positionMillis: number;
  durationMillis: number;
  shouldPlay: boolean;
  rate: number;
  shouldCorrectPitch: boolean;
  volume: number;
  isMuted: boolean;
  isLooping: boolean;
};

const { width, height } = Dimensions.get("window");

const VideoListItem = ({ post, isLoading, setScrollEnabled }: IProps) => {
  const { id, description, bookable, images, userId, product } = post;
  const { likesCount, commentsCount, bookmarksCount } = post;
  const reactions = likesCount + commentsCount + bookmarksCount;
  const video = useRef<any>(null);
  const [status, setStatus] = useState<Status>({
    positionMillis: 0,
    durationMillis: 0,
    shouldPlay: false,
    rate: 1.0,
    shouldCorrectPitch: false,
    volume: 1.0,
    isMuted: false,
    isLooping: false,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const VIDEO_HEIGHT = height - insets.bottom - 55;
  const sheetSm = height / 1.5;
  const sheetBig = height / 1.1;

  const handlePlay = useCallback(() => {
    setIsPlaying((isPlaying) => !isPlaying);
  }, [isPlaying]);

  const likesSheet = (
    <LikesSheet
      postId={id}
      likesCount={likesCount}
      commentsCount={commentsCount}
      bookmarksCount={bookmarksCount}
    />
  );
  const commentsSheet = <CommentsSheet postId={id} />;
  const moreSheet = <MoreSheet postId={id} />;

  const { BOTTOM_SHEET: LikesBSheet, SHOW_BS: showLikesSheet } = useSheet(
    [1, sheetSm, sheetBig],
    likesSheet,
    { duration: 400 }
  );

  const { BOTTOM_SHEET: CommSheet, SHOW_BS: showCommSheet } = useSheet(
    [1, sheetSm, sheetBig],
    commentsSheet,
    { duration: 400 }
  );

  const { BOTTOM_SHEET: VideoMoreSheet, SHOW_BS: showMore } = useSheet(
    [1, sheetSm],
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

  const updatePlaybackStatus = useCallback(
    (stat: any) => setStatus({ ...stat }),
    []
  );

  const onSlidingStart = useCallback(async () => {
    await video.current.pauseAsync();
    setScrollEnabled(false);
    setIsSliding(true);
  }, [isSliding, video]);

  const onSlidingComplete = useCallback(
    async (value: any) => {
      await video.current.setStatusAsync({
        ...status,
        positionMillis: value,
      });
      await video.current.playAsync();
      setIsSliding(false);
      setScrollEnabled(true);
    },
    [video, isSliding]
  );

  const goToCalendar = () => {
    navigation.push("CalendarBig", {
      product: { ...product, ownerId: userId },
      serviceId: product?.serviceId,
    });
  };

  const hasSlider = status?.durationMillis > 29999;
  const pausePlay =
    !status.shouldPlay && status.positionMillis > 0 && !isSliding;

  const getTime = useCallback((millis: number) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (parseFloat(seconds) < 10 ? "0" : "") + seconds;
  }, []);

  const handleValue = useCallback(
    (value: number) => {
      setCurrentValue(value);
    },
    [currentValue]
  );

  return (
    <VisibilitySensor onChange={handleImageVisibility}>
      <View style={styles.container}>
        <Pressable style={styles.video} onPress={handlePlay}>
          <Video
            ref={video}
            style={{ ...styles.video, height: VIDEO_HEIGHT }}
            source={{ uri: images[0]?.url }}
            useNativeControls={false}
            onPlaybackStatusUpdate={updatePlaybackStatus}
            shouldCorrectPitch={true}
            shouldPlay={isPlaying}
            isMuted={false}
            isLooping={true}
            resizeMode={ResizeMode.COVER}
          />
          {pausePlay && (
            <View style={[StyleSheet.absoluteFill, styles.isPlaying]}>
              <Icon
                name="play"
                type="font-awesome-5"
                color="#f1f1f1"
                size={37.5}
                style={{ opacity: 0.4 }}
              />
            </View>
          )}
          {isSliding && (
            <View style={[StyleSheet.absoluteFill, styles.timer]}>
              <Stack direction="row">
                <Text style={styles.time}>{getTime(currentValue)}</Text>
                <Text style={{ marginHorizontal: 5, ...styles.time }}>/</Text>
                <Text style={{ ...styles.time, color: "#bbb" }}>
                  {getTime(status?.durationMillis)}
                </Text>
              </Stack>
            </View>
          )}
          {!isSliding && (
            <VideoListItemDetails
              isLoading={isLoading}
              userDetails={userId}
              product={product}
              description={description}
              bookable={bookable}
              onGoBack={() => navigation.goBack()}
              onGoToCalendar={goToCalendar}
              status={status}
            />
          )}
        </Pressable>
        <View style={{ height: 55 + insets.bottom }}>
          {hasSlider ? (
            <VideoListItemSlider
              width={width}
              onSlidingStart={onSlidingStart}
              onSlidingComplete={onSlidingComplete}
              value={status?.positionMillis}
              maximumValue={status?.durationMillis}
              onValueChange={handleValue}
            />
          ) : (
            <View style={{ height: 10 }} />
          )}
          <VideoListItemButtons
            postId={id}
            reactions={reactions}
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
  isPlaying: { alignItems: "center", justifyContent: "center" },
  timer: {
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 50,
  },
  time: { fontSize: 18, fontWeight: "600", color: "white" },
});
