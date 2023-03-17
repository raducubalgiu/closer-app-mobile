import { StyleSheet, Text, Animated } from "react-native";
import { Icon } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import theme from "../../../../assets/styles/theme";
import { Stack } from "../../core";

const { black, grey0 } = theme.lightColors || {};
type IProps = { headerHeight: number };

export const CardAccountPrivate = ({ headerHeight }: IProps) => {
  const { t } = useTranslation("common");

  return (
    <Stack
      direction="row"
      justify="start"
      sx={{ marginTop: headerHeight + 30, marginHorizontal: 15 }}
    >
      <Icon name="eye-off" type="feather" size={30} style={{ padding: 15 }} />
      <Stack align="start" sx={{ flex: 1 }}>
        <Text style={styles.title}>{t("thisAccountIsPrivate")}</Text>
        <Text style={styles.description}>
          {t("followThisAccountForSeeContent")}
        </Text>
      </Stack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontWeight: "600", fontSize: 16, marginBottom: 5, color: black },
  description: { color: grey0, fontSize: 14.5 },
});
