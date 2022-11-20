import { Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";
import { Stack, CModal } from "../../core";
import theme from "../../../assets/styles/theme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../models/navigation/rootStackParams";

const { black, grey0 } = theme.lightColors;

export const EditProfileSheet = ({ onCloseSheet }) => {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [modal, setModal] = useState<boolean>(false);
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goToLibrary = () => {
    if (permissionResponse.granted) {
      navigation.navigate("PhotoLibrary", { nav: "EditAvatar" });
      onCloseSheet();
    } else {
      setModal(true);
      requestPermission();
    }
  };

  return (
    <>
      <Stack sx={{ padding: 15 }}>
        <Pressable style={styles.title}>
          <Text style={styles.text}>Fă o fotografie</Text>
        </Pressable>
        <Pressable style={styles.title} onPress={goToLibrary}>
          <Text style={styles.text}>{t("chooseFromLibrary")}</Text>
        </Pressable>
        <Pressable style={styles.cancelBtn} onPress={onCloseSheet}>
          <Text style={styles.cancelBtnTxt}>{t("cancel")}</Text>
        </Pressable>
      </Stack>
      <CModal
        size="xs"
        visible={modal}
        onCloseModal={() => setModal(false)}
        header={false}
        footer={
          <Pressable style={{ alignItems: "center" }}>
            <Text style={styles.goToSettings}>{t("goToSettings")}</Text>
          </Pressable>
        }
      >
        <Stack sx={{ paddingHorizontal: 15 }}>
          <Text style={styles.modalTitle}>{t("photoDontAccess")}</Text>
          <Text style={styles.modalBody}>{t("goToSettingsPhoto")}</Text>
        </Stack>
      </CModal>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
  text: {
    color: black,
    fontWeight: "500",
    fontSize: 15.5,
  },
  cancelBtn: {
    width: "100%",
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  cancelBtnTxt: {
    textAlign: "center",
    color: black,
    fontWeight: "700",
    fontSize: 16,
  },
  modalTitle: {
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginHorizontal: 20,
  },
  modalBody: {
    color: grey0,
    textAlign: "center",
  },
  goToSettings: {
    fontSize: 15,
    fontWeight: "700",
    paddingVertical: 5,
    color: black,
  },
});
