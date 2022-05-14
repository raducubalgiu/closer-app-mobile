import { StyleSheet, View } from "react-native";
import { Image } from "@rneui/themed";
import React from "react";
import { Video, AVPlaybackStatus } from "expo-av";
import {
  CardPostHeader,
  CardPostButtons,
  CardPostFooter,
} from "./CardPostHeader";

export const CardPost = (props) => {
  const videoRef = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const image = (
    <Image
      source={{
        uri: `${props.image}`,
      }}
      style={
        !props.bookable ? { ...styles.image, height: 450 } : { ...styles.image }
      }
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
    />
  );

  return (
    <View style={styles.container}>
      <CardPostHeader
        userId={props.userId}
        avatar={props.avatar}
        username={props.username}
        checkmark={props.checkmark}
      />
      <View>{props.postType === "video" ? video : image}</View>
      <CardPostButtons
        bookable={props.bookable}
        postId={props.postId}
        likesCount={props.likesCount}
      />
      <CardPostFooter
        postId={props.postId}
        description={props.description}
        username={props.username}
        date={props.date}
        avatar={props.avatar}
        bookable={props.bookable}
        commentsCount={props.commentsCount}
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
