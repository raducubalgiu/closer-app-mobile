import { StyleSheet, Text } from "react-native";
import { Icon } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import theme from "../../../assets/styles/theme";
import { Stack } from "../../core";

const { black, grey0 } = theme.lightColors || {};

export const CardAccountPrivate = () => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" sx={styles.container} justify="start">
      <Icon name="eye-off" type="feather" size={30} style={{ padding: 15 }} />
      <Stack align="start" sx={{ flex: 1 }}>
        <Text style={styles.title}>{t("thisAccountIsPrivate")}</Text>
        <Text style={{ color: grey0 }}>
          {t("followThisAccountForSeeContent")}
        </Text>
      </Stack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 5, marginVertical: 30 },
  title: { fontWeight: "600", fontSize: 15, marginBottom: 5, color: black },
});
