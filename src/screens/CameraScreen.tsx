import { StyleSheet, Text, SafeAreaView, Pressable } from "react-native";
import { useRef, useState, useCallback } from "react";
import { Icon } from "@rneui/themed";
import { Camera, CameraType, FlashMode } from "expo-camera";
import * as Haptics from "expo-haptics";
import * as MediaLibrary from "expo-media-library";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { IconButton, Stack } from "../components/core";
import CustomAvatar from "../components/core/Avatars/CustomAvatar";
import theme from "../../assets/styles/theme";
import { CloseIconButton, RevertIconButton } from "../components/customized";
import { PhotoLibraryButton } from "../components/customized/Buttons/PhotoLibraryButton";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/rootStackParams";

const { black, grey0 } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "Camera">;

export const CameraScreen = ({ route }: IProps) => {
  const { name, avatar } = route.params;
  const [galleryUrl, setGalleryUrl] = useState("");
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  let cameraRef = useRef<any>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation("common");

  let handleTakePicture = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let photo = await cameraRef.current.takePictureAsync(options);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    navigation.navigate("CameraPreview", {
      photo,
      avatar,
      name,
    });
  };

  const handleRevertCamera = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };
  const handleCloseCamera = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.screen}>
      <Camera ref={cameraRef} type={type} style={styles.container}>
        <Stack direction="row" sx={{ margin: 15 }}>
          <Stack direction="row" sx={styles.user}>
            <CustomAvatar avatar={avatar} size={30} />
            <Stack align="start" sx={{ marginLeft: 10 }}>
              <Text style={styles.to}>{t("to")}</Text>
              <Text style={styles.name}>{name}</Text>
            </Stack>
          </Stack>
          <Stack direction="row">
            <IconButton
              name="flash"
              type="ionicon"
              size={25}
              color="white"
              onPress={() => {}}
              sx={{
                shadowColor: "#171717",
                shadowOffset: { width: -2, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
                marginRight: 25,
              }}
            />
            <CloseIconButton onPress={handleCloseCamera} />
          </Stack>
        </Stack>
        <Stack direction="row" sx={{ margin: 20 }}>
          <PhotoLibraryButton
            onPress={() =>
              navigation.push("PhotoLibrary", { nav: "CameraPreview" })
            }
          />
          <Pressable onPress={handleTakePicture}>
            <Icon
              name="ios-radio-button-on-outline"
              type="ionicon"
              color="white"
              size={85}
            />
          </Pressable>
          <Pressable
            onPress={handleRevertCamera}
            style={{
              padding: 10,
              backgroundColor: "rgba(64, 64, 64, 0.6)",
              borderRadius: 50,
            }}
          >
            <Icon name="refresh-ccw" type="feather" color="white" size={22.5} />
          </Pressable>
        </Stack>
      </Camera>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  user: {
    backgroundColor: "#ebebe0",
    padding: 7.5,
    paddingRight: 12.5,
    borderRadius: 25,
    opacity: 0.9,
  },
  to: { color: grey0, fontSize: 12 },
  name: { color: black, fontWeight: "500", fontSize: 13.5 },
  cameraBtn: {
    backgroundColor: "white",
    padding: 17.5,
    borderRadius: 50,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
