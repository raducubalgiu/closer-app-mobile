import { StyleSheet, Text, Pressable } from "react-native";
import { useTranslation } from "react-i18next";

export const FollowOutlinedButton = () => {
  const { t } = useTranslation("common");

  return (
    <Pressable style={styles.button}>
      <Text style={styles.text}>{t("following")}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 15,
    borderWidth: 1.25,
    borderColor: "#a6a6a6",
    borderRadius: 5,
    height: 30,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: "white", fontWeight: "600" },
});
