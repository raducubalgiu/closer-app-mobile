import { StyleSheet, View } from "react-native";
import { Image } from "@rneui/themed";
import React, { memo } from "react";
import CardPostHeader from "./CardPostHeader";
import CardPostButtons from "./CardPostButtons";
import CardPostFooter from "./CardPostFooter";
import { dateFormat } from "../../../../utils";

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
        <Image
          source={{
            uri: `${post?.images[0]?.url}`,
          }}
          style={
            !bookable ? { ...styles.image, height: 450 } : { ...styles.image }
          }
        />
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
        date={dateFormat(createdAt)}
        avatar={avatar}
        bookable={bookable}
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
