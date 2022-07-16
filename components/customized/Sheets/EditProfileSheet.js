import { Text, StyleSheet } from "react-native";
import React from "react";
import { Stack, Button } from "../../core";
import { useTranslation } from "react-i18next";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors;

export const EditProfileSheet = ({ onCloseSheet }) => {
  const { t } = useTranslation();

  const handleDeletePhoto = () => {
    axios
      .patch(
        `${process.env.BASE_ENDPOINT}/users/${user?._id}/update`,
        {
          avatar: [],
        },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then(() => setUser({ ...user, avatar: undefined }))
      .catch((err) => console.log(err));
  };

  return (
    <Stack sx={{ padding: 15 }}>
      <Button sx={styles.sheetTitle} onPress={handleDeletePhoto}>
        <Text style={styles.sheetText}>{t("erasePhoto")}</Text>
      </Button>
      <Button sx={styles.sheetTitle}>
        <Text style={styles.sheetText}>{t("addPhoto")}</Text>
      </Button>
      <Button
        sx={styles.sheetTitle}
        onPress={() => navigation.navigate("EditPhotoLibrary")}
      >
        <Text style={styles.sheetText}>{t("chooseFromLibrary")}</Text>
      </Button>
      <Button sx={styles.cancelBtn} onPress={onCloseSheet}>
        <Text style={styles.cancelBtnText}>{t("cancel")}</Text>
      </Button>
    </Stack>
  );
};

const styles = StyleSheet.create({
  sheetTitle: {
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
  sheetText: {
    fontFamily: "Exo-Medium",
    color: black,
  },
  cancelBtn: {
    width: "100%",
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  cancelBtnText: {
    textAlign: "center",
    fontFamily: "Exo-SemiBold",
    color: black,
  },
});
