import { StyleSheet, View } from "react-native";
import { Image } from "@rneui/themed";
import React from "react";
import { Video, AVPlaybackStatus } from "expo-av";
import CardPostHeader from "./CardPostHeader";
import CardPostButtons from "./CardPostButtons";
import CardPostFooter from "./CardPostFooter";

export const CardPost = (props) => {
  const videoRef = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const {
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
  } = props;

  const image = (
    <Image
      source={{
        uri: `${props.image}`,
      }}
      style={!bookable ? { ...styles.image, height: 450 } : { ...styles.image }}
    />
  );

  const video = (
    <Video
      ref={videoRef}
      style={styles.video}
      source={{
        uri: `${props.image}`,
      }}
      useNativeControls={false}
      resizeMode="cover"
      isLooping
      onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      shouldPlay={true}
      onTouchStart={() => console.log("Start")}
      isMuted={false}
    />
  );

  return (
    <View style={styles.container}>
      <CardPostHeader
        userId={userId}
        avatar={avatar}
        username={username}
        checkmark={checkmark}
      />
      <View>{postType === "video" ? video : image}</View>
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
