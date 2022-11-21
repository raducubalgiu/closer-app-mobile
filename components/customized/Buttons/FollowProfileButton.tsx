import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text } from "react-native";
import theme from "../../../assets/styles/theme";

const { black, primary } = theme.lightColors;

export const FollowProfileButton = ({ isFollow = false, onPress }) => {
  const { t } = useTranslation();

  const styles = StyleSheet.create({
    container: {
      width: isFollow ? 100 : 150,
      height: 45,
      borderWidth: 1,
      borderColor: isFollow ? "#ddd" : primary,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: isFollow ? "white" : primary,
      borderRadius: 2.5,
    },
    text: { color: isFollow ? black : "white", fontWeight: "600" },
  });

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{isFollow ? t("following") : t("follow")}</Text>
    </Pressable>
  );
};
