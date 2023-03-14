import { Pressable, StyleSheet, Text } from "react-native";
import theme from "../../../../assets/styles/theme";
import { useTranslation } from "react-i18next";

const { primary } = theme.lightColors || {};
type IProps = { bookAgain?: boolean; onPress: () => void };

export const BookButton = ({ bookAgain = false, onPress }: IProps) => {
  const { t } = useTranslation("common");

  const styles = StyleSheet.create({
    container: {
      backgroundColor: primary,
      width: 120,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 2.5,
      marginLeft: 10,
    },
    text: {
      color: "white",
      fontWeight: "600",
      fontSize: bookAgain ? 13 : 14,
    },
  });

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{bookAgain ? "Rez..din nou" : t("book")}</Text>
    </Pressable>
  );
};
