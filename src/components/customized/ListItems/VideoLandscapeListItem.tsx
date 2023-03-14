import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { memo, useEffect, useRef, useState } from "react";
import VisibilitySensor from "@svanboxel/visibility-sensor-react-native";
import { Video } from "expo-av";
import { Icon } from "@rneui/themed";
import { Stack } from "../../core";
import CustomAvatar from "../../core/Avatars/CustomAvatar";
import theme from "../../../../assets/styles/theme";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { Slider } from "@rneui/themed";

const { height, width } = Dimensions.get("window");
const { error, black, primary } = theme.lightColors || {};

type IProps = { uri: string; avatar: any; description: string };

const VideoLandscapeListItem = ({ uri, avatar, description }: IProps) => {
  const [status, setStatus] = useState(null);
  const video = useRef<any>(null);
  const navigation = useNavigation();

  const handleImageVisibility = (visible: boolean) => {
    if (visible) {
      video.current.playAsync();
      video.current.setStatusAsync({ isMuted: false });
    } else {
      video.current.pauseAsync();
      //video.current.setStatusAsync({ isMuted: true });
    }
  };

  const handleBookmark = () => {
    Toast.show("This is a message", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: false,
      animation: true,
      hideOnPress: true,
      delay: 0,
      containerStyle: { width: 600, marginBottom: 50 },
    });
  };

  const handleStatusUpdate = (status: any) => {
    setStatus(status);
  };

  return (
    <VisibilitySensor onChange={handleImageVisibility}>
      <View style={styles.container}>
        <Video
          ref={video}
          style={styles.video}
          source={{ uri }}
          useNativeControls={false}
          onPlaybackStatusUpdate={handleStatusUpdate}
          shouldPlay={false}
          isMuted={false}
          isLooping={true}
        />
        <View style={styles.infoCont}>
          <SafeAreaView style={styles.safearea}>
            <View
              style={{
                paddingVertical: 15,
                paddingHorizontal: 40,
              }}
            >
              <Stack direction="row">
                <Stack direction="row" sx={{ flex: 1 }}>
                  <Pressable
                    style={styles.back}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  >
                    <Icon name="arrow-back-ios" size={22.5} color="white" />
                  </Pressable>
                </Stack>
                <Pressable style={styles.camera}>
                  <Icon name="camera" type="feather" size={25} color="white" />
                </Pressable>
              </Stack>
            </View>
            <View
              style={{
                paddingVertical: 15,
                paddingHorizontal: 40,
              }}
            >
              <Stack direction="row">
                <Stack align="start" sx={{ flex: 1 }}>
                  <Stack justify="start" direction="row">
                    <CustomAvatar avatar={avatar} size={30} />
                    <Stack align="start" sx={{ marginLeft: 10 }}>
                      <Text style={styles.description}>{description}</Text>
                      <Text style={styles.username}>@raducubalgiu</Text>
                    </Stack>
                  </Stack>
                  <Slider
                    value={0}
                    onValueChange={() => {}}
                    maximumValue={10}
                    minimumValue={0}
                    allowTouchTrack
                    trackStyle={{
                      height: 2.5,
                      width: 400,
                      backgroundColor: "transparent",
                    }}
                    thumbStyle={{
                      height: 12.5,
                      width: 12.5,
                      backgroundColor: error,
                    }}
                  />
                </Stack>
                <Stack direction="row">
                  <Pressable style={styles.button}>
                    <Icon
                      name="heart"
                      type="antdesign"
                      color={error}
                      size={22.5}
                    />
                  </Pressable>
                  <Pressable style={styles.button} onPress={handleBookmark}>
                    <Icon
                      name="bookmark"
                      type="check-circle"
                      size={22.5}
                      color="white"
                    />
                  </Pressable>
                  <Pressable style={styles.button}>
                    <Icon
                      name="message-circle"
                      type="feather"
                      size={22.5}
                      color="white"
                    />
                  </Pressable>
                  <Pressable style={styles.button}>
                    <Icon
                      name="send"
                      type="feather"
                      size={22.5}
                      color="white"
                    />
                  </Pressable>
                </Stack>
              </Stack>
            </View>
          </SafeAreaView>
        </View>
      </View>
    </VisibilitySensor>
  );
};

export default memo(VideoLandscapeListItem);

const styles = StyleSheet.create({
  container: { width, height, backgroundColor: "black", flex: 1 },
  infoCont: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  safearea: {
    justifyContent: "space-between",
    flex: 1,
  },
  video: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  button: {
    marginLeft: 15,
    padding: 6,
    borderRadius: 50,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderWidth: 1.25,
    borderColor: "white",
  },
  back: {
    padding: 7.5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  camera: {
    padding: 7.5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginLeft: 20,
  },
  description: {
    color: "white",
    fontSize: 16,
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    fontWeight: "600",
  },
  username: {
    color: "#d9d9d9",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
