import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import React from "react";
import { Button } from "../components/core";
import { Header } from "../components/core";
import { useTranslation } from "react-i18next";
import { Video, AVPlaybackStatus } from "expo-av";

const NotificationsScreen = () => {
  const { t } = useTranslation();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("notifications")} />
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: "https://res.cloudinary.com/closer-app/video/upload/v1652475925/fashion-1_vkcrms.mp4",
        }}
        useNativeControls={false}
        resizeMode="cover"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        shouldPlay={true}
        onTouchStart={() => console.log("Start")}
      />
      <Button sx={{ marginVertical: 20 }} onPress={() => video.pauseAsync()}>
        <Text>Full screen</Text>
      </Button>
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
