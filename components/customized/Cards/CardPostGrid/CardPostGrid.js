import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import React from "react";
import { Button, IconBook, IconVideo } from "../../../core";
import { useNavigation } from "@react-navigation/native";
import { Video, AVPlaybackStatus } from "expo-av";
import theme from "../../../../assets/styles/theme";

const { width } = Dimensions.get("window");

export const CardPostGrid = ({ bookable, fixed, postType, image }) => {
  const videoRef = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const navigation = useNavigation();

  const renderImage = (
    <Image containerStyle={styles.image} source={{ uri: `${image}` }} />
  );

  const renderVideo = (
    <Video
      ref={videoRef}
      style={styles.video}
      source={{
        uri: `${image}`,
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
    <Button sx={styles.box} onPress={() => navigation.navigate("Products")}>
      <View style={styles.box}>
        {postType === "video" ? (
          <Video
            ref={videoRef}
            style={styles.video}
            source={{
              uri: `${image}`,
            }}
            useNativeControls={false}
            resizeMode="cover"
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            shouldPlay={true}
            onTouchStart={() => console.log("Start")}
            isMuted={false}
          />
        ) : (
          <Image containerStyle={styles.image} source={{ uri: `${image}` }} />
        )}
      </View>
      {/* {bookable && (
        <View style={styles.bookable}>
          <IconBook sx={{ marginLeft: 5 }} />
        </View>
      )}
      {fixed && (
        <View style={styles.fixed}>
          <Text style={styles.fixedText}>Fixat</Text>
        </View>
      )}
      {!fixed && postType === "video" && (
        <View style={styles.type}>
          <IconVideo sx={{ marginLeft: 5 }} />
        </View>
      )} */}
    </Button>
  );
};

const styles = StyleSheet.create({
  box: {
    width: width / 3,
    borderWidth: 1,
    borderColor: "white",
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    width: "100%",
  },
  video: {
    width: "100%",
    alignSelf: "center",
    flex: 1,
  },
  fixed: {
    position: "absolute",
    zIndex: 10000,
    bottom: 5,
    left: 5,
    backgroundColor: "white",
    opacity: 0.8,
    paddingHorizontal: 10,
  },
  fixedText: {
    fontSize: 12,
    color: theme.lightColors.black,
  },
  type: {
    position: "absolute",
    zIndex: 10000,
    bottom: 5,
    left: 5,
  },
});
