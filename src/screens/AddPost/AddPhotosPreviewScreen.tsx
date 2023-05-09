import {
  SafeAreaView,
  StyleSheet,
  View,
  useWindowDimensions,
  Pressable,
  ImageResizeMode,
  Text,
} from "react-native";
import { useState } from "react";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { RootStackParams } from "../../navigation/rootStackParams";
import { Button, Stack } from "../../components/core";
import { CameraReusableIconButton } from "../../components/customized";
import {
  PanGestureHandler,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useVector } from "react-native-redash";

type IProps = NativeStackScreenProps<RootStackParams, "AddPhotosPreview">;

export const AddPhotosPreviewScreen = ({ route }: IProps) => {
  const { uri } = route.params;
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { width } = useWindowDimensions();
  const [resize, setResize] = useState<ImageResizeMode>("contain");
  const aspectRatio = 5 / 4;

  // Pinch values
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  // Gesture handler values
  const translation = useVector();
  const savedTranslation = useVector();

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {},
    onActive: ({ translationX, translationY }) => {
      translation.x.value = savedTranslation.x.value + translationX;
      translation.y.value = savedTranslation.y.value + translationY;
    },
    onEnd: ({ translationX, translationY, velocityX, velocityY }) => {
      savedTranslation.x.value = translation.x.value;
      savedTranslation.y.value = translation.y.value;
    },
  });

  const style = useAnimatedStyle(() => {
    return {
      flex: 1,
      transform: [
        { translateX: translation.x.value },
        { translateY: translation.y.value },
      ],
    };
  });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      if (savedScale.value * e.scale < 1) {
        scale.value = 1;
      } else {
        scale.value = savedScale.value * e.scale;
      }
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    flex: 1,
    transform: [{ scale: scale.value }],
  }));

  const onResize = () => {
    if (
      scale.value > 1 ||
      translation.x.value !== 0 ||
      translation.y.value !== 0
    ) {
      scale.value = 1;
      savedScale.value = 1;
      translation.x.value = 0;
      savedTranslation.x.value = 0;
      translation.y.value = 0;
      savedTranslation.y.value = 0;
      setResize("contain");
    } else {
      setResize((resize) => (resize === "contain" ? "cover" : "contain"));
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <View>
          <View
            style={{
              width,
              height: width * aspectRatio,
              overflow: "hidden",
              backgroundColor: "rgba(128, 128, 128, 0.8)",
            }}
          >
            <PanGestureHandler onGestureEvent={onGestureEvent}>
              <Animated.View style={style}>
                <GestureDetector gesture={pinchGesture}>
                  <Animated.Image
                    source={{ uri }}
                    style={[animatedStyle, styles.image]}
                    resizeMode={resize}
                  />
                </GestureDetector>
              </Animated.View>
            </PanGestureHandler>
            <Stack
              direction="row"
              sx={{ position: "absolute", bottom: 10, left: 10, right: 10 }}
            >
              <Pressable
                onPress={onResize}
                style={{
                  backgroundColor: "rgba(51, 51, 51, 0.8)",
                  padding: 7.5,
                  borderRadius: 50,
                  shadowColor: "#171717",
                  shadowOffset: { width: -2, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 2,
                }}
              >
                <Icon
                  name="arrow-expand"
                  type="material-community"
                  color="white"
                  size={17.5}
                />
              </Pressable>
              <Pressable
                onPress={onResize}
                style={{
                  backgroundColor: "rgba(51, 51, 51, 0.9)",
                  padding: 7.5,
                  borderRadius: 50,
                }}
              >
                <Icon
                  name="checkbox-multiple-blank-outline"
                  type="material-community"
                  color="white"
                  size={17.5}
                />
              </Pressable>
            </Stack>
          </View>
          <View
            style={{
              position: "absolute",
              top: 5,
              left: 5,
              right: 0,
              alignItems: "flex-start",
            }}
          >
            <CameraReusableIconButton
              name="arrow-back-ios"
              onPress={() => navigation.goBack()}
              size={22.5}
            />
          </View>
        </View>
        <Stack direction="row" justify="center">
          <View>
            <Text style={{ color: "white" }}>Hello World</Text>
          </View>
          <View>
            <Text style={{ color: "white" }}>Hello World</Text>
          </View>
          <View>
            <Text style={{ color: "white" }}>Hello World</Text>
          </View>
        </Stack>
        <View style={styles.footer}>
          <Button
            title={t("next")}
            onPress={() =>
              navigation.navigate("AddPost", {
                uri: route.params.uri,
                taggedUsers: [],
              })
            }
            sxBtn={{ width: width - 30 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  imageBox: {
    backgroundColor: "red",
    width: "100%",
    height: "100%",
    flex: 1,
  },
  image: {
    width: undefined,
    height: undefined,
    ...StyleSheet.absoluteFillObject,
  },
  footer: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
});
