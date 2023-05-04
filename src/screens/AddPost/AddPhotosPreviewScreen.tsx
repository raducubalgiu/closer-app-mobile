import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  useWindowDimensions,
} from "react-native";
import { useState } from "react";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { ResizeMode, Video } from "expo-av";
import { Divider } from "@rneui/themed";
import { RootStackParams } from "../../navigation/rootStackParams";
import { Button, Stack } from "../../components/core";
import { CameraReusableIconButton } from "../../components/customized";

type IProps = NativeStackScreenProps<RootStackParams, "AddPhotosPreview">;

export const AddPhotosPreviewScreen = ({ route }: IProps) => {
  const { uri, type } = route.params.photo;
  const { resizeMode } = route.params;
  const [resize, setResize] = useState(resizeMode);
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.imageBox}>
          {type === "image" && (
            <Image source={{ uri }} style={styles.image} resizeMode={resize} />
          )}
          {type === "video" && (
            <Video
              source={{ uri }}
              style={styles.image}
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay={true}
              isLooping={true}
              isMuted={false}
            />
          )}
          <View style={StyleSheet.absoluteFill}>
            <Stack direction="row" sx={{ paddingVertical: 10 }} align="start">
              <CameraReusableIconButton
                name="arrow-back-ios"
                onPress={() => navigation.goBack()}
              />
              <View>
                <CameraReusableIconButton name="settings" onPress={() => {}} />
                <View style={{ alignItems: "center", paddingVertical: 5 }}>
                  <Divider style={{ width: 20 }} />
                </View>
                <CameraReusableIconButton
                  name="text"
                  type="ionicon"
                  onPress={() => {}}
                />
                <CameraReusableIconButton
                  name="emoji-emotions"
                  onPress={() => {}}
                />
                <CameraReusableIconButton
                  name="music-note"
                  type="fontisto"
                  onPress={() => {}}
                />
                <CameraReusableIconButton
                  name="color-filter"
                  type="ionicon"
                  onPress={() => {}}
                />
              </View>
            </Stack>
          </View>
        </View>
        <View style={styles.footer}>
          <Button
            title={t("next")}
            onPress={() =>
              navigation.navigate("AddPost", {
                photo: route.params.photo,
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
