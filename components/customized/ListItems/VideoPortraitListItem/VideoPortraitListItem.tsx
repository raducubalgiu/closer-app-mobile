import { Pressable, StyleSheet, Dimensions, View, Text } from "react-native";
import { memo, useRef, useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "../../../../assets/styles/theme";
import { Icon, Badge } from "@rneui/themed";
import { Stack, AvatarGroup, Button, Checkmark } from "../../../core";
import CustomAvatar from "../../../core/Avatars/CustomAvatar";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Slider } from "@rneui/themed";
import { trimFunc } from "../../../../utils";
import { LinearGradient } from "expo-linear-gradient";

type IProps = {
  post: {
    uri: string;
    description: string;
    username: string;
    avatar: string;
    ratingsAverage: string;
    checkmark: boolean;
    bookable: boolean;
  };
};

const { width, height } = Dimensions.get("window");
const { error, primary, black } = theme.lightColors || {};

const VideoPortraitListItem = ({ post }: IProps) => {
  const {
    uri,
    description,
    username,
    avatar,
    ratingsAverage,
    checkmark,
    bookable,
  } = post;
  const [isPlaying, setIsPlaying] = useState(false);
  const video = useRef<any>(null);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const VIDEO_HEIGHT = height - insets.bottom - 55;
  const { t } = useTranslation();

  const handlePlay = () => {
    setIsPlaying((isPlaying) => !isPlaying);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.video} onPress={handlePlay}>
        <Video
          ref={video}
          style={{ ...styles.video, height: VIDEO_HEIGHT }}
          source={{ uri }}
          useNativeControls={false}
          onPlaybackStatusUpdate={() => {}}
          shouldPlay={isPlaying}
          isMuted={false}
          isLooping={true}
          resizeMode={ResizeMode.COVER}
        />
        <Stack sx={styles.infoContainer}>
          <Stack sx={{ flex: 1, width: "100%" }}>
            <Stack
              direction="row"
              sx={{ ...styles.header, marginTop: insets.top }}
            >
              <Pressable
                onPress={() => navigation.goBack()}
                style={styles.back}
              >
                <Icon name="arrow-back-ios" size={22.5} color="white" />
              </Pressable>
              <Pressable style={styles.camera}>
                <Icon name="camera" type="feather" size={25} color="white" />
              </Pressable>
            </Stack>
          </Stack>
          <LinearGradient
            colors={["rgba(0,0,0,0.6)", "transparent"]}
            start={{ x: 0, y: 0.75 }}
            end={{ x: 0, y: 0 }}
          >
            <Stack
              align="start"
              direction="row"
              sx={{ width: "100%", paddingHorizontal: 15 }}
            >
              <Stack align="start" sx={{ flex: 1, width: "100%" }}>
                <Stack
                  direction="row"
                  sx={{
                    width: "100%",
                    marginBottom: 7.5,
                  }}
                >
                  <Stack direction="row" align="center">
                    <CustomAvatar size={30} avatar={[{ url: avatar }]} />
                    <Stack align="start" sx={{ marginLeft: 7.5 }}>
                      <Stack direction="row" align="start">
                        <Stack align="start">
                          <Text style={{ color: "#f2f2f2", fontWeight: "500" }}>
                            @{username}
                          </Text>
                          <Stack sx={styles.professionCont}>
                            <Stack direction="row">
                              <Text style={styles.profession}>Creator</Text>
                              <Stack direction="row">
                                <Icon
                                  name="star"
                                  type="antdesign"
                                  size={15}
                                  color={primary}
                                />
                                <Text style={styles.rating}>
                                  {ratingsAverage}
                                </Text>
                              </Stack>
                            </Stack>
                          </Stack>
                        </Stack>

                        {checkmark && <Checkmark sx={{ marginLeft: 7.5 }} />}
                        {!bookable && (
                          <Pressable
                            style={{
                              marginLeft: 15,
                              borderWidth: 1.25,
                              borderColor: "#ccc",
                              paddingVertical: 2.5,
                              paddingHorizontal: 10,
                              borderRadius: 5,
                            }}
                          >
                            <Text style={{ color: "white", fontWeight: "600" }}>
                              {t("following")}
                            </Text>
                          </Pressable>
                        )}
                      </Stack>
                    </Stack>
                  </Stack>
                  {bookable && (
                    <Button
                      title={t("book")}
                      sxBtn={{ width: 120, opacity: 0.9, marginVertical: 0 }}
                      onPress={() => {}}
                    />
                  )}
                </Stack>
                <Pressable
                  style={{
                    width: "100%",
                    marginBottom: 15,
                  }}
                >
                  <Stack align="start">
                    <Text
                      style={{
                        color: "#f2f2f2",
                      }}
                    >
                      {trimFunc(description, 35)}
                    </Text>
                  </Stack>
                </Pressable>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              sx={{
                paddingHorizontal: 15,
                marginBottom: 10,
              }}
            >
              <Stack direction="row">
                <Stack
                  direction="row"
                  sx={{
                    paddingVertical: 1.5,
                    borderRadius: 2.5,
                  }}
                >
                  <Icon
                    name="user-alt"
                    type="font-awesome-5"
                    size={12.5}
                    color="white"
                  />
                  <Text
                    style={{ marginLeft: 5, fontSize: 13, color: "#f2f2f2" }}
                  >
                    5 persoane
                  </Text>
                </Stack>
                {/* <Stack direction="row" sx={{ marginLeft: 10 }}>
                <Icon
                  name="music"
                  type="font-awesome"
                  size={15}
                  color="white"
                />
                <Text style={{ marginLeft: 5, color: "white" }}>
                  Continut original
                </Text>
              </Stack> */}
              </Stack>
              <Stack>
                <Text>Hello</Text>
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
                width: width,
                backgroundColor: "transparent",
                padding: 0,
              }}
              thumbStyle={{
                height: 12.5,
                width: 12.5,
                backgroundColor: "white",
              }}
              containerStyle={{ padding: 0 }}
            />
          </LinearGradient>
        </Stack>
      </Pressable>
      <View style={styles.buttonsCont}>
        <Stack direction="row" align="center">
          <Pressable style={{ marginLeft: 10, padding: 5 }}>
            <Stack direction="row">
              <AvatarGroup />
              <Stack direction="row" sx={{ marginLeft: 7.5 }}>
                <Text style={styles.likesNo}>17.k</Text>
              </Stack>
            </Stack>
          </Pressable>
          <Stack direction="row">
            <Pressable
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
            >
              <Icon name="heart" type="antdesign" color={error} size={27.5} />
            </Pressable>
            <Pressable style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Icon
                  name="message-circle"
                  type="feather"
                  size={27.5}
                  color="white"
                />
                <Badge
                  containerStyle={{ width: 2.5, height: 2.5 }}
                  badgeStyle={{
                    backgroundColor: error,
                    borderWidth: 0,
                    left: 2.5,
                    top: -2.5,
                  }}
                />
              </View>
            </Pressable>
            <Pressable style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
              <Icon name="send" type="feather" size={27.5} color="white" />
            </Pressable>
            <Pressable style={{ paddingHorizontal: 7.5, paddingVertical: 5 }}>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    height,
    width,
    flex: 1,
  },
  video: { width, flex: 1 },
  infoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: { padding: 10, width: "100%" },
  back: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  camera: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  professionCont: {
    paddingVertical: 1.5,
    marginTop: 1,
    opacity: 0.9,
    borderRadius: 2.5,
  },
  profession: {
    fontWeight: "600",
    color: "white",
    fontSize: 13,
    marginRight: 5,
  },
  rating: {
    marginLeft: 2.5,
    color: "white",
    fontWeight: "600",
    fontSize: 13,
  },
  buttonsCont: {
    height: 60,
    justifyContent: "center",
  },
  likesNo: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
