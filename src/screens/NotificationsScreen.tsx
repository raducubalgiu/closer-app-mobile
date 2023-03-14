import { SafeAreaView, StyleSheet, Text, Pressable } from "react-native";
import { useState, useRef } from "react";
import { Stack } from "../components/core";
import { Header } from "../components/core";
import { useTranslation } from "react-i18next";
import { Video, AVPlaybackStatus } from "expo-av";

export const NotificationsScreen = () => {
  const { t } = useTranslation("common");
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [play, setPlay] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

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
      <Pressable onPress={() => setPlay(!play)}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: "https://res.cloudinary.com/closer-app/video/upload/v1652475925/fashion-1_vkcrms.mp4",
          }}
          useNativeControls={false}
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          shouldPlay={play}
          isMuted={isMuted}
          //onMagicTap={() => setPlay(!play)}
        />
      </Pressable>
      <Stack direction="row" justify="center">
        <Pressable
          onPress={handlePlay}
          style={{
            marginVertical: 10,
            backgroundColor: "red",
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginRight: 20,
          }}
        >
          <Text>Play</Text>
        </Pressable>
        <Pressable
          onPress={handleStop}
          style={{
            marginVertical: 10,
            backgroundColor: "red",
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          <Text>Stop</Text>
        </Pressable>
      </Stack>
    </SafeAreaView>
  );
};

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
