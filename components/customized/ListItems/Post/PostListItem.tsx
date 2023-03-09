import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { memo } from "react";
import { Post } from "../../../../models";
import { Icon, Image } from "@rneui/themed";
import PostGradient from "../../Gradients/PostGradient";
import PostHeaderListItem from "./PostHeaderListItem";

const PostImage = memo(({ uri }: { uri: string }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={{ width, height: 400 }}>
      <Image
        source={{ uri }}
        containerStyle={{
          width: undefined,
          height: undefined,
          flex: 1,
        }}
        resizeMode="cover"
        transition={true}
        PlaceholderContent={<PostGradient width={width} height={400} />}
      />
    </View>
  );
});

type IProps = { post: Post; isLiked: boolean; isBookmarked: boolean };

const PostListItem = ({ post, isLiked, isBookmarked }: IProps) => {
  const { width } = useWindowDimensions();
  const { userId, bookable } = post;
  const { avatar, username } = userId;

  return (
    <View style={styles.container}>
      <PostHeaderListItem avatar={avatar} username={username} />
      <PostImage uri={post?.images[0]?.url} />
    </View>
  );
};

export default memo(PostListItem);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});
