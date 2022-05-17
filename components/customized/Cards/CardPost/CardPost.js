import { StyleSheet, View } from "react-native";
import { Image } from "@rneui/themed";
import React from "react";
import CardPostHeader from "./CardPostHeader";
import CardPostButtons from "./CardPostButtons";
import CardPostFooter from "./CardPostFooter";
import VideoItem from "../../VideoItem/VideoItem";

export const CardPost = ({
  userId,
  avatar,
  username,
  checkmark,
  bookable,
  postId,
  likesCount,
  description,
  date,
  commentsCount,
  postType,
  image,
}) => {
  const renderImage = (
    <Image
      source={{
        uri: `${image}`,
      }}
      style={!bookable ? { ...styles.image, height: 450 } : { ...styles.image }}
    />
  );

  const renderVideo = <VideoItem videoUrl={`${image}`} sx={{ height: 500 }} />;

  return (
    <View style={styles.container}>
      <CardPostHeader
        userId={userId}
        avatar={avatar}
        username={username}
        checkmark={checkmark}
      />
      <View>{postType === "video" ? renderVideo : renderImage}</View>
      <CardPostButtons
        bookable={bookable}
        postId={postId}
        likesCount={likesCount}
      />
      <CardPostFooter
        postId={postId}
        description={description}
        username={username}
        date={date}
        avatar={avatar}
        bookable={bookable}
        commentsCount={commentsCount}
      />
    </View>
  );
};

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
