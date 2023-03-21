import { StyleSheet, View } from "react-native";
import { forwardRef, memo } from "react";
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

const PostListItem = forwardRef(
  ({ post, isLiked, isBookmarked, isVisible }: IProps, ref: any) => {
    const { id, userId, bookable, images, product, serviceId } = post;
    const { likesCount, commentsCount, createdAt, description, postType } =
      post;
    const { avatar, username, checkmark } = userId;

    return (
      <View style={styles.container}>
        <PostHeader avatar={avatar} username={username} checkmark={checkmark} />
        {postType === "photo" && (
          <PostImage id={post.id} uri={images[0]?.url} />
        )}
        {postType === "video" && <PostVideo uri={images[0]?.url} ref={ref} />}
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
        />
        <PostDescription
          description={description}
          commentsCount={commentsCount}
          date={FROM_NOW(createdAt)}
        />
      </View>
    );
  }
);

export default memo(PostListItem);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});
