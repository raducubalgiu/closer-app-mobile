import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  Animated,
} from "react-native";
import { Slider } from "@rneui/themed";
import { useAuth, useGet, usePost } from "../hooks";
import { useCallback, useRef } from "react";
import StoryListItem from "../components/customized/ListItems/Story/StoryListItem";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/rootStackParams";

const { width } = Dimensions.get("window");
const STORY_WIDTH = width - 20;
const STORY_PADDING = 2.5;

type IProps = NativeStackScreenProps<RootStackParams, "Story">;

export const StoryScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const { userId } = route?.params;
  const navigation = useNavigation();
  const ref = useRef<FlatList>(null);

  const { data } = useGet({
    model: "userStories",
    uri: `/users/${userId}/stories`,
  });
  const stories = data?.results;
  const storiesCount = stories?.length;

  const sliders: any = [];
  stories?.forEach((el: any, i: number) => {
    sliders.push(
      <Slider
        key={i}
        value={0}
        step={1}
        minimumValue={0}
        maximumValue={30}
        onValueChange={() => {}}
        allowTouchTrack
        trackStyle={{
          height: 3,
          width: STORY_WIDTH / storiesCount - STORY_PADDING,
          backgroundColor: "transparent",
        }}
        thumbStyle={{
          height: 1,
          width: 1,
          backgroundColor: "transparent",
        }}
        minimumTrackTintColor="white"
        style={{ padding: 0 }}
      />
    );
  });

  const goToPreviousStory = (index: number) => {
    if (index === 0) {
      return;
    } else {
      ref.current?.scrollToIndex({
        index: index - 1,
        animated: false,
      });
    }
  };

  const goToNextStory = (index: number) => {
    if (index === storiesCount - 1) {
      navigation.goBack();
    } else {
      ref.current?.scrollToIndex({
        index: index + 1,
        animated: false,
      });
    }
  };

  const renderStory = useCallback(
    ({ item, index }: ListRenderItemInfo<any>) => (
      <StoryListItem
        story={item}
        sliders={sliders}
        goToNextStory={() => goToNextStory(index)}
        goToPreviousStory={() => goToPreviousStory(index)}
      />
    ),
    []
  );
  const keyExtractor = useCallback((item: any) => item.id, []);

  const { mutate } = usePost({ uri: `/stories/views` });

  const viewabilityConfig = { itemVisiblePercentThreshold: 75 };

  const trackItem = useCallback((item: any) => {
    mutate({ storyId: item.id, userId: user?.id });
  }, []);

  const onViewableItemsChanged = useCallback((info: { changed: any }): void => {
    const visibleItems = info.changed.filter((entry: any) => entry.isViewable);
    visibleItems.forEach((visible: any) => {
      trackItem(visible.item);
    });
  }, []);

  return (
    <View style={styles.screen}>
      <Animated.FlatList
        ref={ref}
        horizontal
        data={stories}
        pagingEnabled={true}
        keyExtractor={keyExtractor}
        renderItem={renderStory}
        scrollEnabled={false}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "black",
  },
  button: { paddingHorizontal: 10, paddingVertical: 5 },
});
