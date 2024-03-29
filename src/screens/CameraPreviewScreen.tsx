import { useTranslation } from "react-i18next";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Pressable,
} from "react-native";
import { Stack } from "../components/core";
import CustomAvatar from "../components/core/Avatars/CustomAvatar";
import { CameraReusableIconButton } from "../components/customized";
import * as MediaLibrary from "expo-media-library";
import theme from "../../assets/styles/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/rootStackParams";
import { showToast } from "../utils";

const { black } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "CameraPreview">;

export const CameraPreviewScreen = ({ route }: IProps) => {
  const { photo, avatar } = route.params;
  const navigation = useNavigation();
  const { t } = useTranslation("common");

  const handleClosePreview = () => navigation.goBack();
  const handleDownload = () => {
    MediaLibrary.saveToLibraryAsync(photo.uri)
      .then(() => showToast({ message: "Salvat in telefon" }))
      .catch((err) => console.log(err));
  };
  const handleSendPhoto = () => {};

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Image
        style={styles.preview}
        source={{ uri: photo.uri }}
        resizeMode="contain"
      />
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <Stack direction="row" sx={{ marginTop: 15 }}>
            <CameraReusableIconButton
              name="close"
              onPress={handleClosePreview}
              size={32.5}
            />
            <CameraReusableIconButton
              name="download"
              type="feather"
              onPress={handleDownload}
            />
          </Stack>
          <Pressable style={styles.sendBtn} onPress={handleSendPhoto}>
            <Stack direction="row" sx={styles.sendCont}>
              <CustomAvatar avatar={avatar} size={30} />
              <Text style={styles.sendTxt}>{t("send")}</Text>
            </Stack>
          </Pressable>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  safeArea: { justifyContent: "space-between", height: "100%" },
  sendBtn: {
    margin: 20,
    alignItems: "flex-end",
  },
  sendCont: {
    backgroundColor: "white",
    paddingVertical: 6,
    paddingHorizontal: 7.5,
    borderRadius: 50,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  sendTxt: {
    paddingHorizontal: 10,
    color: black,
    fontWeight: "600",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});
