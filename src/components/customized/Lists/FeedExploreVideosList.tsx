import { StyleSheet, FlatList, ListRenderItemInfo, View } from "react-native";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Divider } from "@rneui/themed";
import HeadingAction from "../../core/Heading/HeadingAction";
import VideoOverviewListItem from "../ListItems/Video/VideoOverviewListItem/VideoOverviewListItem";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigation/rootStackParams";
import { Post } from "../../../models";

type VideoListItem = {
  id: string;
  post: Post;
  isLiked: boolean;
  isBookmarked: boolean;
};

type IProps = {
  videos: any;
};

const FeedExploreVideosList = ({ videos }: IProps) => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const renderVideo = useCallback(
    ({ item, index }: ListRenderItemInfo<VideoListItem>) => {
      return (
        <VideoOverviewListItem
          uri={item?.post?.images[0]?.url}
          id={item?.id}
          onPress={() => {
            navigation.navigate("FeedExploreVideo", {
              video: item.post,
              videos,
              index,
            });
          }}
        />
      );
    },
    []
  );

  const keyExtractorVideo = useCallback((item: VideoListItem) => item?.id, []);

  return (
    <View>
      <HeadingAction title={t("videoclips")} onPress={() => {}} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={videos}
        keyExtractor={keyExtractorVideo}
        renderItem={renderVideo}
        contentContainerStyle={styles.flatList}
      />
      <Divider color="#ddd" style={{ marginTop: 15 }} />
    </View>
  );
};

export default memo(FeedExploreVideosList);

const styles = StyleSheet.create({
  flatList: { paddingLeft: 10, paddingRight: 5 },
});
