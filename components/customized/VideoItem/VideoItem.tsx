import { StyleSheet, Pressable } from "react-native";
import VisibilitySensor from "@svanboxel/visibility-sensor-react-native";
import React, { useState, useRef, useCallback } from "react";
import { Video } from "expo-av";
import { Icon } from "@rneui/themed";

type IProps = { videoUrl: string; isMuted: boolean; sx?: {} };

const VideoItem = ({ videoUrl, isMuted, sx }: IProps) => {
  const video = useRef<any>(null);
  const [status, setStatus] = useState({});

  const styles = StyleSheet.create({
    video: {
      alignSelf: "center",
      width: "100%",
    },
    mute: {
      position: "absolute",
      bottom: 10,
      left: 10,
      backgroundColor: "rgba(51, 51, 51, 0.7)",
      padding: 5,
      borderRadius: 50,
    },
  });

  const handleImageVisibility = (visible: boolean) => {
    if (visible) {
      video.current.playAsync();
    } else {
      video.current.pauseAsync();
      video.current.setStatusAsync({ isMuted: true });
    }
  };

  const handleMute = useCallback(() => {
    if (!status.isMuted) {
      video.current.setStatusAsync({ isMuted: true });
    } else {
      video.current.setStatusAsync({ isMuted: false });
    }
  }, [status]);

  return (
    <VisibilitySensor onChange={handleImageVisibility}>
      <Video
        ref={video}
        style={{ ...styles.video, ...sx }}
        source={{
          uri: `${videoUrl}`,
        }}
        useNativeControls={false}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        shouldPlay={false}
        isMuted={isMuted}
        isLooping={true}
      />
      <Pressable onPress={handleMute} style={styles.mute}>
        <Icon
          name={!status.isMuted ? "unmute" : "mute"}
          type="octicon"
          color="white"
          size={14}
        />
      </Pressable>
    </VisibilitySensor>
  );
};

export default VideoItem;
