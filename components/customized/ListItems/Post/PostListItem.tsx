import { StyleSheet, View } from "react-native";
import { memo } from "react";
import { Post } from "../../../../models";
import { FROM_NOW } from "../../../../utils/date-utils";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostBookable from "./PostBookable";
import PostActions from "./PostActions";
import PostDescription from "./PostDescription";

type IProps = { post: Post; isLiked: boolean; isBookmarked: boolean };

const PostListItem = ({ post, isLiked, isBookmarked }: IProps) => {
  const { id, userId, bookable, images, product, orientation } = post;
  const { likesCount, commentsCount, createdAt, description } = post;
  const { avatar, username, checkmark } = userId;

  return (
    <View style={styles.container}>
      <PostHeader avatar={avatar} username={username} checkmark={checkmark} />
      <PostImage uri={images[0]?.url} orientation={orientation} />
      {bookable && <PostBookable product={product} />}
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
};

export default memo(PostListItem);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});
