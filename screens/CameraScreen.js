import { StyleSheet, Text, SafeAreaView } from "react-native";
import { useRef, useState, useCallback } from "react";
import { Camera, CameraType, FlashMode } from "expo-camera";
import * as Haptics from "expo-haptics";
import * as MediaLibrary from "expo-media-library";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { CustomAvatar, IconButton, Stack } from "../components/core";
import theme from "../assets/styles/theme";
import {
  CloseIconButton,
  RevertIconButton,
  PhotoLibraryButton,
} from "../components/customized";
import axios from "axios";
const { black, grey0 } = theme.lightColors;

export const CameraScreen = ({ route }) => {
  const { name, avatar } = route.params;
  const [galleryUrl, setGalleryUrl] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  let cameraRef = useRef();
  const navigation = useNavigation();
  const { t } = useTranslation();

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchPhotos = async () => {
        const getPhotos = await MediaLibrary.getAlbumAsync("Recents");
        const { assets } = await MediaLibrary.getAssetsAsync({
          album: getPhotos,
          mediaType: ["photo"],
          first: 1,
        });

        setGalleryUrl(assets[0]?.uri);
      };

      fetchPhotos();
      return () => {
        isActive = false;
      };
    }, [])
  );

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
        <Stack direction="row" sx={{ margin: 20 }}>
          <Stack direction="row" sx={styles.user}>
            <CustomAvatar avatar={avatar} size={30} iconSize="15" />
            <Stack align="start" sx={{ marginLeft: 10 }}>
              <Text style={styles.to}>{t("to")}</Text>
              <Text style={styles.name}>{name}</Text>
            </Stack>
          </Stack>
          <Stack direction="row">
            <IconButton
              iconName="flash"
              iconType="ionicon"
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
            uri={galleryUrl}
            onPress={() =>
              navigation.push("PhotoLibrary", { nav: "CameraPreview" })
            }
          />
          <IconButton
            iconName="camera"
            iconType="entypo"
            onPress={handleTakePicture}
            size={32.5}
            color={black}
            sx={styles.cameraBtn}
          />
          <RevertIconButton size={35} onPress={handleRevertCamera} />
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
    opacity: 0.85,
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
