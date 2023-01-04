import {
  StyleSheet,
  View,
  Dimensions,
  ListRenderItemInfo,
  FlatList,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { ResizeMode, Video } from "expo-av";
import { useCallback, useRef } from "react";
import { Post } from "../../models/post";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../models/navigation/rootStackParams";
import VisibilitySensor from "@svanboxel/visibility-sensor-react-native";

const { width, height } = Dimensions.get("window");
type IProps = NativeStackScreenProps<RootStackParams, "FeedVideoExplore">;

export const FeedVideoExploreScreen = ({ route }: IProps) => {
  const { allVideos, index, item } = route.params;
  const insets = useSafeAreaInsets();
  const videoHeight = height - insets.bottom - insets.top;
  const ref = useRef<any>(null);

  const handleImageVisibility = (visible: boolean) => {
    if (visible) {
      ref.current.playAsync();
    } else {
      ref.current.pauseAsync();
    }
  };

  const renderVideo = useCallback(
    ({ item }: ListRenderItemInfo<Post>) => (
      <VisibilitySensor onChange={handleImageVisibility}>
        <SharedElement id={item.id}>
          <Video
            ref={ref}
            style={{ width, height: videoHeight }}
            source={{ uri: item?.images[0]?.url }}
            useNativeControls={false}
            shouldPlay={false}
            isMuted={false}
            isLooping={true}
            resizeMode={ResizeMode.COVER}
          />
        </SharedElement>
      </VisibilitySensor>
    ),
    []
  );

  const getItemLayout = (data: any, index: number) => ({
    length: videoHeight,
    offset: videoHeight * index,
    index,
  });

  const keyExtractor = useCallback((item: Post) => item.id, []);

  return (
    <View style={styles.screen}>
      <FlatList
        data={allVideos}
        renderItem={renderVideo}
        keyExtractor={keyExtractor}
        initialScrollIndex={index}
        getItemLayout={getItemLayout}
        pagingEnabled={true}
        bounces={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "black",
    flex: 1,
  },
});
