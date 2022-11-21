import { StyleSheet, View } from "react-native";
import { Image } from "@rneui/themed";
import Animated from "react-native-reanimated";
import React, { memo } from "react";
import CardPostHeader from "./CardPostHeader";
import CardPostButtons from "./CardPostButtons";
import CardPostFooter from "./CardPostFooter";
import { FROM_NOW } from "../../../../utils/date-utils";
import { SharedElement } from "react-navigation-shared-element";

const CardPost = ({ post, onShowDetails }) => {
  const {
    _id,
    bookable,
    likesCount,
    commentsCount,
    description,
    createdAt,
    user,
    product,
  } = post || {};
  const { name, username, avatar, checkmark, profession } = user || {};

  return (
    <View style={styles.container}>
      <CardPostHeader
        userId={user?._id}
        avatar={avatar}
        username={username}
        name={name}
        profession={profession}
        checkmark={checkmark}
        onShowDetails={onShowDetails}
      />
      <View>
        <SharedElement id={_id}>
          <Animated.Image
            source={{ uri: `${post?.images[0]?.url}` }}
            style={[{ width: "100%", height: 400 }]}
          />
        </SharedElement>
      </View>
      <CardPostButtons
        bookable={bookable}
        product={product}
        postId={_id}
        likesCount={likesCount}
      />
      <CardPostFooter
        postId={_id}
        creatorId={user?._id}
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
    height: 600,
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
