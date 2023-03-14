import { StyleSheet, View, Image, useWindowDimensions } from "react-native";
import { forwardRef, memo } from "react";
import { Post } from "../../../../models";
import { FROM_NOW } from "../../../../utils/date-utils";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostBookable from "./PostBookable";
import PostActions from "./PostActions";
import PostDescription from "./PostDescription";
import PostVideo from "./PostVideo";
import { SharedElement } from "react-navigation-shared-element";

type IProps = { post: Post; isLiked: boolean; isBookmarked: boolean };

const PostListItem = forwardRef(
  ({ post, isLiked, isBookmarked }: IProps, ref: any) => {
    const { id, userId, bookable, images, product, orientation } = post;
    const { likesCount, commentsCount, createdAt, description, postType } =
      post;
    const { avatar, username, checkmark } = userId;
    const { width, height } = useWindowDimensions();

    return (
      <View style={styles.container}>
        <PostHeader avatar={avatar} username={username} checkmark={checkmark} />
        {postType === "photo" && (
          // <PostImage uri={images[0]?.url} orientation={orientation} />
          <View
            style={{
              height: 500,
              width,
              overflow: "hidden",
            }}
          >
            <SharedElement id={post.id} style={{ flex: 1 }}>
              <Image
                source={{ uri: images[0].url }}
                style={{
                  ...StyleSheet.absoluteFillObject,
                  height: undefined,
                  width: undefined,
                  resizeMode: "cover",
                }}
              />
            </SharedElement>
          </View>
        )}
        {postType === "video" && <PostVideo uri={images[0]?.url} ref={ref} />}
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
  }
);

export default memo(PostListItem);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});
