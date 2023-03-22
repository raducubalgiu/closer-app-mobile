import { StyleSheet, View } from "react-native";
import { memo } from "react";
import { Post } from "../../../../models";
import { FROM_NOW } from "../../../../utils/date-utils";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostBookable from "./PostBookable";
import PostActions from "./PostActions";
import PostDescription from "./PostDescription";
import PostVideo from "./PostVideo";

type IProps = {
  post: Post;
  isLiked: boolean;
  isBookmarked: boolean;
  isVisible: boolean;
};

const PostListItem = ({ post, isLiked, isBookmarked, isVisible }: IProps) => {
  const { id, userId, bookable, images, product, serviceId } = post;
  const { createdAt, description, postType } = post;
  const { viewsCount, likesCount, commentsCount, bookmarksCount } = post;
  const { avatar, username, checkmark } = userId;

  return (
    <View style={styles.container}>
      <PostHeader avatar={avatar} username={username} checkmark={checkmark} />
      {postType === "photo" && <PostImage id={post.id} uri={images[0]?.url} />}
      {postType === "video" && (
        <PostVideo uri={images[0]?.url} isVisible={isVisible} />
      )}
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
      />
      <PostDescription
        description={description}
        commentsCount={commentsCount}
        date={FROM_NOW(createdAt)}
      />
    </View>
  );
};

export default memo(PostListItem);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});
