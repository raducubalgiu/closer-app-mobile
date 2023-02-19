import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Slider } from "@rneui/themed";
import { AvatarGroup, Checkmark, IconButton, Stack } from "../components/core";
import CustomAvatar from "../components/core/Avatars/CustomAvatar";
import { LikeButton, StoryLabel } from "../components/customized";
import { ShareIButton } from "../components/core";
import { MoreVerticalButton } from "../components/customized/Buttons/MoreVerticalButton";
import { LinearGradient } from "expo-linear-gradient";
import theme from "../assets/styles/theme";

const STORIES = [
  {
    userId: "632bfff6a3f6330ea4b50842",
    image:
      "https://res.cloudinary.com/closer-app/image/upload/v1671877354/raducu-balgiu-18_vgrny7.jpg",
    avatar: [
      {
        url: "https://res.cloudinary.com/closer-app/image/upload/v1671877352/raducu-balgiu-6_pjj18p.jpg",
      },
    ],
  },
];

const { primary } = theme.lightColors || {};
const { width, height } = Dimensions.get("window");
const STORY_WIDTH = width - 20;
const STORY_PADDING = 2.5;

export const StoryScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  let storiesCount = 5;

  const sliders = [];
  for (let i = 0; i < storiesCount; i++) {
    sliders.push(
      <Slider
        key={i}
        value={0}
        step={1}
        minimumValue={0}
        maximumValue={30}
        onValueChange={() => {}}
        allowTouchTrack
        trackStyle={{
          height: 3,
          width: STORY_WIDTH / storiesCount - STORY_PADDING,
          backgroundColor: "transparent",
        }}
        thumbStyle={{
          height: 1,
          width: 1,
          backgroundColor: "transparent",
        }}
        minimumTrackTintColor="white"
        style={{ padding: 0 }}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <View
        style={{
          width,
          height: height - 55 - insets.bottom,
        }}
      >
        <Image
          source={{
            uri: "https://res.cloudinary.com/closer-app/image/upload/v1671877352/raducu-balgiu-47_sqbhav.jpg",
          }}
          style={{ width: undefined, height: undefined, flex: 1 }}
          resizeMode="cover"
        />

        <SafeAreaView
          style={[StyleSheet.absoluteFill, { justifyContent: "space-between" }]}
        >
          <Stack direction="row" sx={{ margin: 10 }}>
            <Stack direction="row">
              <CustomAvatar
                avatar={[
                  {
                    url: "https://res.cloudinary.com/closer-app/image/upload/v1671877352/raducu-balgiu-6_pjj18p.jpg",
                  },
                ]}
                size={30}
                sx={{ borderWidth: 0 }}
              />
              <Stack align="start" sx={{ marginLeft: 10 }}>
                <Stack direction="row">
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "600",
                      fontSize: 13.5,
                      shadowColor: "#171717",
                      shadowOffset: { width: -2, height: 2 },
                      shadowOpacity: 0.2,
                      shadowRadius: 3,
                    }}
                  >
                    @raducubalgiu
                  </Text>
                  <Checkmark sx={{ marginLeft: 5 }} />
                </Stack>
                <Text
                  style={{
                    color: "white",
                    fontSize: 13,
                    shadowColor: "#171717",
                    shadowOffset: { width: -2, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                  }}
                >
                  acum 2 ore
                </Text>
              </Stack>
            </Stack>
            <IconButton
              name="close"
              type="antdesign"
              size={27.5}
              color="white"
              onPress={() => navigation.goBack()}
              sx={{
                shadowColor: "#171717",
                shadowOffset: { width: -2, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}
            />
          </Stack>
          <LinearGradient
            colors={["rgba(0,0,0,0.5)", "transparent"]}
            start={{ x: 0, y: 0.6 }}
            end={{ x: 0, y: 0 }}
          >
            <StoryLabel text="Poveste" sx={{ marginLeft: 10 }} />
            <Stack direction="row" sx={{ marginHorizontal: 10 }}>
              {sliders}
            </Stack>
          </LinearGradient>
        </SafeAreaView>
      </View>
      <View
        style={{
          height: 55 + insets.bottom,
          justifyContent: "flex-start",
          marginTop: 10,
        }}
      >
        <Stack direction="row">
          <AvatarGroup sx={{ marginLeft: 10 }} />
          <Stack direction="row">
            <LikeButton
              size={27.5}
              postId={""}
              onAddLike={() => {}}
              onRemoveLike={() => {}}
              sx={styles.button}
              color="white"
            />
            <ShareIButton
              onPress={() => {}}
              size={27.5}
              sx={styles.button}
              color="white"
            />
            <MoreVerticalButton
              sx={{ paddingHorizontal: 7.5, paddingVertical: 5 }}
              onPress={() => {}}
            />
          </Stack>
        </Stack>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "black",
  },
  button: { paddingHorizontal: 10, paddingVertical: 5 },
});
