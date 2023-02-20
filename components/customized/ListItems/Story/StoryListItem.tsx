import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  Pressable,
} from "react-native";
import { memo, useCallback } from "react";
import CustomAvatar from "../../../core/Avatars/CustomAvatar";
import { Image } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack, Checkmark, IconButton, AvatarGroup } from "../../../core";
import { LikeButton } from "../../Buttons/LikeButton";
import { ShareIButton } from "../../../core";
import { MoreVerticalButton } from "../../Buttons/MoreVerticalButton";
import { StoryLabel } from "../../Typography/Labels/StoryLabel";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useAuth, usePost } from "../../../../hooks";
import VisibilitySensor from "@svanboxel/visibility-sensor-react-native";

const { width, height } = Dimensions.get("window");
type IProps = {
  story: any;
  sliders: any;
  goToNextStory: () => void;
  goToPreviousStory: () => void;
};

const StoryListItem = ({
  story,
  goToNextStory,
  goToPreviousStory,
  sliders,
}: IProps) => {
  const { user } = useAuth();
  const { id, userId, file } = story;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const { mutate } = usePost({ uri: `/users/${user?.id}/stories/${id}/views` });

  const handleVisible = useCallback(() => {
    mutate({});
  }, []);

  return (
    <VisibilitySensor onChange={handleVisible}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            width,
            height: height - 55 - insets.bottom,
          }}
        >
          <Image
            source={{ uri: file?.uri }}
            style={{ width, height: height - 55 - insets.bottom }}
            resizeMode="cover"
          />
          <SafeAreaView
            style={[
              StyleSheet.absoluteFill,
              { justifyContent: "space-between" },
            ]}
          >
            <Stack direction="row" sx={{ margin: 10 }}>
              <Stack direction="row">
                <CustomAvatar
                  avatar={userId?.avatar}
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
            <Pressable
              onPress={goToPreviousStory}
              style={{
                position: "absolute",
                top: 55 + insets.top,
                bottom: 55 + insets.bottom,
                left: 0,
                width: width / 4.5,
              }}
            />
            <Pressable
              onPress={goToNextStory}
              style={{
                position: "absolute",
                top: 55 + insets.top,
                bottom: 55 + insets.bottom,
                right: 0,
                width: width / 1.3,
              }}
            />
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
                model="stories"
                modelId={id}
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
    </VisibilitySensor>
  );
};

export default memo(StoryListItem);

const styles = StyleSheet.create({
  button: { paddingHorizontal: 10, paddingVertical: 5 },
});
