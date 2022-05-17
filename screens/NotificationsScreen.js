import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import { Button, Stack } from "../components/core";
import { Header } from "../components/core";
import { useTranslation } from "react-i18next";
import { Video, AVPlaybackStatus } from "expo-av";

const NotificationsScreen = () => {
  const { t } = useTranslation();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [play, setPlay] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  //console.log("VIDEO STATUS", status);

  const handlePlay = () => {
    if (!status.isPlaying) {
      setPlay(true);
    }
  };

  const handleStop = () => {
    if (status.isPlaying) {
      setPlay(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("notifications")} />
      <Button onPress={() => setPlay(!play)}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: "https://res.cloudinary.com/closer-app/video/upload/v1652475925/fashion-1_vkcrms.mp4",
          }}
          useNativeControls={false}
          resizeMode="cover"
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          shouldPlay={play}
          isMuted={isMuted}
          //onMagicTap={() => setPlay(!play)}
        />
      </Button>
      <Stack direction="row" justify="center">
        <Button
          onPress={handlePlay}
          sx={{
            marginVertical: 10,
            backgroundColor: "red",
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginRight: 20,
          }}
        >
          <Text>Play</Text>
        </Button>
        <Button
          onPress={handleStop}
          sx={{
            marginVertical: 10,
            backgroundColor: "red",
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          <Text>Stop</Text>
        </Button>
      </Stack>
    </SafeAreaView>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: 500,
  },
});
