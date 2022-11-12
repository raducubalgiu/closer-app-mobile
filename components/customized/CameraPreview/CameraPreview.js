import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import { Stack, Button, CustomAvatar } from "../../core";
import { CloseIconButton } from "../IconButtons/CloseIconButton";
import { DownloadIconButton } from "../IconButtons/DownloadIconButton";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors;

export const CameraPreview = ({
  uri,
  avatar,
  onClosePreview,
  onDownload,
  onSendPhoto,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Image
        style={styles.preview}
        source={{
          uri,
        }}
      />
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <Stack direction="row" sx={{ margin: 20 }}>
            <CloseIconButton onPress={onClosePreview} />
            <DownloadIconButton onPress={onDownload} />
          </Stack>
          <Button style={styles.sendBtn} onPress={onSendPhoto}>
            <Stack direction="row" sx={styles.sendCont}>
              <CustomAvatar avatar={avatar} size={30} iconSize={15} />
              <Text style={styles.sendTxt}>{t("send")}</Text>
            </Stack>
          </Button>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  safeArea: { justifyContent: "space-between", height: "100%" },
  sendBtn: {
    margin: 20,
    alignItems: "flex-end",
  },
  sendCont: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 50,
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
