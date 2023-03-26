import { StyleSheet, View } from "react-native";
import { memo } from "react";
import { Post } from "../../../../ts";
import { FROM_NOW } from "../../../../utils/date-utils";
import PostHeader from "./sections/PostHeader";
import PostBookable from "./sections/PostBookable";
import PostActions from "./sections/PostActions";
import PostDescription from "./sections/PostDescription";
import PostVideo from "./sections/PostVideo";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";

type IProps = {
  post: Post;
  isLiked: boolean;
  isBookmarked: boolean;
  isVisible: boolean;
};

const PostVideoListItem = ({
  post,
  isLiked,
  isBookmarked,
  isVisible,
}: IProps) => {
  const { id, userId, bookable, images, product, serviceId } = post;
  const { createdAt, description, postType } = post;
  const { viewsCount, likesCount, commentsCount, bookmarksCount } = post;
  const { avatar, username, name, checkmark, settings } = userId;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goToComments = () => navigation.navigate("Comments", { post });

  return (
    <View style={styles.container}>
      <View>
        <PostVideo uri={images[0]?.url} isVisible={isVisible} />
        <View style={styles.header}>
          <PostHeader
            avatar={avatar}
            username={username}
            checkmark={checkmark}
            postType={postType}
          />
        </View>
      </View>
      {bookable && (
        <PostBookable
          product={product}
          isVisible={isVisible}
          expirationTime={post.expirationTime}
          serviceId={serviceId}
          ownerId={post.userId}
        />
      )}
      <PostActions
        postId={id}
        likesCount={likesCount}
        isLiked={isLiked}
        isBookmarked={isBookmarked}
        images={images}
        counters={{ viewsCount, likesCount, commentsCount, bookmarksCount }}
        postType={postType}
        settings={settings}
        userId={userId.id}
      />
      <PostDescription
        description={description}
        date={FROM_NOW(createdAt)}
        onGoToComments={goToComments}
      />
    </View>
  );
};

export default memo(PostVideoListItem);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: { position: "absolute", top: 0, left: 0, right: 0 },
});
