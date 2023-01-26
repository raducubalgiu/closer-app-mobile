import { StyleSheet, View, Image } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
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
  const { name, username, avatar, checkmark, profession, role } = userId || {};

  return (
    <View style={styles.container}>
      <CardPostHeader
        userId={userId?.id}
        avatar={avatar}
        username={username}
        name={name}
        role={role}
        profession={profession}
        checkmark={checkmark}
        onShowDetails={onShowDetails}
        ratingsAverage={userId?.ratingsAverage}
      />
      <SharedElement id={id}>
        <Image
          source={{ uri: `${post?.images[0]?.url}` }}
          style={[{ width: "100%", height: 400 }]}
        />
      </SharedElement>
      <CardPostButtons
        bookable={bookable}
        product={{ ...product, ownerId: userId }}
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
