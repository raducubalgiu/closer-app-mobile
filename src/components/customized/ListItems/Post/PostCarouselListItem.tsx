import { StyleSheet, View } from "react-native";
import { memo } from "react";
import { Post } from "../../../../ts";
import { FROM_NOW } from "../../../../utils/date-utils";
import PostHeader from "./sections/PostHeader";
import PostBookable from "./sections/PostBookable";
import PostActions from "./sections/PostActions";
import PostDescription from "./sections/PostDescription";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";
import PostCarousel from "./sections/PostCarousel";

type IProps = {
  post: Post;
  isLiked: boolean;
  isBookmarked: boolean;
  isVisible: boolean;
};

const PostCarouselListItem = ({
  post,
  isLiked,
  isBookmarked,
  isVisible,
}: IProps) => {
  const { id, userId, bookable, images, product, serviceId } = post;
  const { createdAt, description, postType } = post;
  const { viewsCount, likesCount, commentsCount, bookmarksCount } = post;
  const { avatar, username, checkmark, settings } = userId;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goToComments = () => navigation.navigate("Comments", { post });

  return (
    <View style={styles.container}>
      <PostHeader
        avatar={avatar}
        username={username}
        checkmark={checkmark}
        postType={postType}
      />
      <PostCarousel images={images} />
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

export default memo(PostCarouselListItem);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});
