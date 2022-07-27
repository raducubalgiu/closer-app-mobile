import { ScrollView, StyleSheet, Text } from "react-native";
import { ListItem } from "../../core";
import theme from "../../../assets/styles/theme";
import { useTranslation } from "react-i18next";

const { error, black } = theme.lightColors;

export const PostInfoSheet = ({ onShowConfirm }) => {
  const { t } = useTranslation();

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <ListItem center sx={styles.listItem}>
        <Text style={styles.text}>{t("stopComments")}</Text>
      </ListItem>
      <ListItem center sx={styles.listItem}>
        <Text style={styles.text}>{t("postInOtherApps")}</Text>
      </ListItem>
      <ListItem
        center
        onPress={onShowConfirm}
        sx={{ ...styles.listItem, backgroundColor: "#f1f1f1" }}
      >
        <Text style={{ ...styles.text, color: error, fontWeight: "bold" }}>
          {t("delete")}
        </Text>
      </ListItem>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  listItem: {
    padding: 15,
    borderRadius: 5,
  },
  text: {
    fontSize: 15.5,
    color: black,
  },
});
