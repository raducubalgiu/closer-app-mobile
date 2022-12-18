import { StyleSheet, View, Image } from "react-native";
import Animated from "react-native-reanimated";
import React, { memo } from "react";
import CardPostHeader from "./CardPostHeader";
import CardPostButtons from "./CardPostButtons";
import CardPostFooter from "./CardPostFooter";
import { FROM_NOW } from "../../../../utils/date-utils";
import { Post } from "../../../../models/post";

type IProps = { post: Post; onShowDetails: () => void };

const CardPost = ({ post, onShowDetails }: IProps) => {
  const {
    id,
    bookable,
    likesCount,
    commentsCount,
    description,
    createdAt,
    userId,
    product,
  } = post || {};
  const { name, username, avatar, checkmark, profession } = userId || {};

  return (
    <View style={styles.container}>
      <CardPostHeader
        userId={userId?.id}
        avatar={avatar}
        username={username}
        name={name}
        profession={profession}
        checkmark={checkmark}
        onShowDetails={onShowDetails}
      />
      <Image
        source={{ uri: `${post?.images[0]?.url}` }}
        style={[{ width: "100%", height: 400 }]}
      />
      <CardPostButtons
        bookable={bookable}
        product={product}
        postId={id}
        likesCount={likesCount}
      />
      <CardPostFooter
        postId={id}
        creatorId={userId?.id}
        description={description}
        username={username}
        name={name}
        date={FROM_NOW(createdAt)}
        avatar={avatar}
        commentsCount={commentsCount}
      />
    </View>
  );
};

export default memo(CardPost);

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    borderRadius: 20,
  },
  image: {
    aspectRatio: 1,
    width: "100%",
    flex: 1,
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: 500,
  },
});
