import { Pressable, StyleSheet, Dimensions, View, Text } from "react-native";
import { memo, useCallback, useRef, useState, useEffect, useMemo } from "react";
import { ResizeMode, Video } from "expo-av";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../../../../src/hooks";
import ProductSheet from "../../Sheets/ProductSheet";
import MoreSheet from "../../Sheets/MoreSheet";
import LikesSheet from "../../Sheets/LikesSheet";
import CommentsSheet from "../../Sheets/CommentsSheet";
import { RootStackParams } from "../../../../navigation/rootStackParams";
import { Post } from "../../../../models/post";
import VideoListItemButtons from "./VideoListItemButtons";
import VideoListItemDetails from "./VideoListItemDetails";
import VideoListItemSlider from "./VideoListItemSlider";
import { Icon } from "@rneui/themed";
import { Stack } from "../../../core";
import { VideoStatusType } from "../../../../models/videoStatus";
import SheetModal from "../../../core/SheetModal/SheetModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

type IProps = {
  post: Post;
  setScrollEnabled: (scroll: boolean) => void;
  isVisible: boolean;
};

const defaultStatus = {
  positionMillis: 0,
  durationMillis: 0,
  shouldPlay: false,
  rate: 1.0,
  shouldCorrectPitch: true,
  volume: 1.0,
  isMuted: false,
  isLooping: false,
};

const { width, height } = Dimensions.get("window");

const VideoListItem = ({ post, setScrollEnabled, isVisible }: IProps) => {
  const { user } = useAuth();
  const { id, description, bookable, images, userId, product } = post;
  const {
    likesCount,
    commentsCount,
    bookmarksCount,
    expirationTime,
    viewsCount,
  } = post;
  const reactions = likesCount + commentsCount + bookmarksCount;
  const video = useRef<any>(null);
  const [status, setStatus] = useState<VideoStatusType>(defaultStatus);

  const [isSliding, setIsSliding] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const VIDEO_HEIGHT = height - insets.bottom - 55;
  const sheetSm = height / 1.5;
  const sheetBig = height / 1.1;

  const likesRef = useRef<BottomSheetModal>(null);
  const commentsRef = useRef<BottomSheetModal>(null);
  const moreRef = useRef<BottomSheetModal>(null);
  const productRef = useRef<BottomSheetModal>(null);

  const likesSnapPoints = useMemo(() => [1, sheetSm, sheetBig], []);
  const commentsSnapPoints = useMemo(() => [1, height / 1.3], []);
  const moreSnapPoints = useMemo(() => [1, 300], []);
  const productSnapPoints = useMemo(() => [1, 500], []);

  const handlePlay = useCallback(() => {
    if (status.shouldPlay) {
      video.current.pauseAsync();
    } else {
      video.current.playAsync();
    }
  }, [status]);

  const updatePlaybackStatus = useCallback((stat: any) => {
    setStatus({ ...stat });
  }, []);

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

  useFocusEffect(
    useCallback(() => {
      if (isVisible) {
        video.current.playFromPositionAsync(0);
      } else {
        video.current.pauseAsync();
      }
    }, [isVisible, setStatus])
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      video.current.pauseAsync();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Pressable style={styles.video} onPress={handlePlay}>
        <Video
          ref={video}
          style={{ ...styles.video, height: VIDEO_HEIGHT }}
          source={{ uri: images[0]?.url }}
          useNativeControls={false}
          onPlaybackStatusUpdate={updatePlaybackStatus}
          shouldCorrectPitch={true}
          shouldPlay={status.shouldPlay}
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
            userDetails={userId}
            product={product}
            description={description}
            bookable={bookable}
            expirationTime={expirationTime}
            onGoBack={() => navigation.goBack()}
            onGoToCalendar={goToCalendar}
            onShowProductSheet={() => {}}
            status={status}
            uri={images[0]?.url}
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
          commentsCount={commentsCount}
          onShowCommentsSheet={() => {}}
          onShowMoreSheet={() => {}}
          onShowLikesSheet={() => {}}
        />
      </View>
      <SheetModal ref={likesRef} snapPoints={likesSnapPoints}>
        <LikesSheet
          postId={id}
          counter={{ likesCount, commentsCount, bookmarksCount, viewsCount }}
        />
      </SheetModal>
      <SheetModal ref={commentsRef} snapPoints={commentsSnapPoints}>
        <CommentsSheet postId={id} creatorId={userId.id} />
      </SheetModal>
      <SheetModal ref={moreRef} snapPoints={moreSnapPoints}>
        <MoreSheet postId={id} userId={user?.id} />
      </SheetModal>
      <SheetModal ref={productRef} snapPoints={productSnapPoints}>
        <ProductSheet product={product} expirationTime={expirationTime} />
      </SheetModal>
    </View>
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
