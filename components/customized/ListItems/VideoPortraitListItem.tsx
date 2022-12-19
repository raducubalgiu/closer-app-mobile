import { Pressable, StyleSheet, Dimensions, View, Text } from "react-native";
import { memo, useRef, useState } from "react";
import { Video } from "expo-av";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "../../../assets/styles/theme";
import { Icon } from "@rneui/themed";
import { Stack, AvatarGroup, Button, Checkmark } from "../../core";
import CustomAvatar from "../../core/Avatars/CustomAvatar";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

type IProps = { uri: string; bgColor: string };

const { width, height } = Dimensions.get("window");
const { error, primary } = theme.lightColors || {};

const VideoPortraitListItem = ({ uri, bgColor }: IProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const video = useRef<any>(null);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "black",
      height,
      width,
      flex: 1,
    },
    video: { height: height - insets.bottom - 55, width, flex: 1 },
    infoContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });

  const handlePlay = () => {
    setIsPlaying((isPlaying) => !isPlaying);
  };

  const url =
    "https://res.cloudinary.com/closer-app/image/upload/v1667841461/raducu-balgiu-avatar_ejmoaf.jpg";

  return (
    <View style={styles.container}>
      <Pressable style={styles.video} onPress={handlePlay}>
        <Video
          ref={video}
          style={styles.video}
          source={{ uri }}
          useNativeControls={false}
          onPlaybackStatusUpdate={() => {}}
          shouldPlay={isPlaying}
          isMuted={false}
          isLooping={true}
          resizeMode={"cover"}
        />
        <View style={styles.infoContainer}>
          <Stack sx={{ flex: 1 }}>
            <Stack
              sx={{
                marginTop: insets.top,
                padding: 10,
                width: "100%",
              }}
              direction="row"
            >
              <Pressable
                onPress={() => navigation.goBack()}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  shadowColor: "#171717",
                  shadowOffset: { width: -2, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                }}
              >
                <Icon name="arrow-back-ios" size={22.5} color="white" />
              </Pressable>
              <Pressable
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  shadowColor: "#171717",
                  shadowOffset: { width: -2, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                }}
              >
                <Icon name="camera" type="feather" size={25} color="white" />
              </Pressable>
            </Stack>
            <Stack
              align="start"
              direction="row"
              sx={{ padding: 15, width: "100%" }}
            >
              <Stack align="start" sx={{ flex: 1 }}>
                <Stack direction="row">
                  <CustomAvatar avatar={url} size={30} />
                  <Stack align="start" sx={{ marginLeft: 7.5 }}>
                    <Stack direction="row">
                      <Text style={{ color: "white", fontWeight: "500" }}>
                        @sebastian_bajan
                      </Text>
                      <Checkmark sx={{ marginLeft: 7.5 }} />
                    </Stack>
                    <Stack
                      sx={{
                        paddingVertical: 1.5,
                        marginTop: 2,
                        opacity: 0.9,
                        borderRadius: 2.5,
                      }}
                    >
                      <Stack direction="row">
                        <Text
                          style={{
                            fontWeight: "600",
                            color: "white",
                            fontSize: 13,
                            marginRight: 5,
                          }}
                        >
                          Creator
                        </Text>
                        <Stack direction="row">
                          <Icon
                            name="star"
                            type="antdesign"
                            size={15}
                            color={primary}
                          />
                          <Text
                            style={{
                              marginLeft: 2.5,
                              color: "white",
                              fontWeight: "600",
                              fontSize: 13,
                            }}
                          >
                            4.5
                          </Text>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
                <Text style={{ marginTop: 7.5, color: "white" }}>
                  Lorem ipsum dolor sit amet...
                </Text>
              </Stack>
              <Stack>
                <Button
                  title="Rezerva"
                  sxBtn={{ width: 120, opacity: 0.9 }}
                  onPress={() => {}}
                />
              </Stack>
            </Stack>
          </Stack>
        </View>
      </Pressable>
      <View
        style={{
          height: 55,
          justifyContent: "center",
        }}
      >
        <Stack direction="row" align="center">
          <Stack direction="row" sx={{ marginLeft: 10 }}>
            <AvatarGroup />
            <Stack direction="row" sx={{ marginLeft: 7.5 }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                17.k
              </Text>
            </Stack>
          </Stack>
          <Stack direction="row">
            <Pressable style={{ paddingHorizontal: 10 }}>
              <Icon name="heart" type="antdesign" color={error} size={27.5} />
            </Pressable>
            <Pressable style={{ paddingHorizontal: 10 }}>
              <Icon
                name="message-circle"
                type="feather"
                size={27.5}
                color="white"
              />
            </Pressable>
            <Pressable style={{ paddingHorizontal: 10 }}>
              <Icon name="send" type="feather" size={27.5} color="white" />
            </Pressable>
            <Pressable style={{ paddingHorizontal: 7.5 }}>
              <Icon
                name="more-vertical"
                type="feather"
                size={27.5}
                color="white"
              />
            </Pressable>
          </Stack>
        </Stack>
      </View>
      <View style={{ height: insets.bottom }} />
    </View>
  );
};

export default memo(VideoPortraitListItem);
