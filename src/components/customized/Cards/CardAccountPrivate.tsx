import { StyleSheet, Text } from "react-native";
import { Icon } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import theme from "../../../../assets/styles/theme";
import { Stack } from "../../core";

const { black, grey0 } = theme.lightColors || {};
type IProps = { headerHeight: number; isBlocked: boolean; username: string };

export const CardAccountPrivate = ({
  headerHeight,
  isBlocked,
  username,
}: IProps) => {
  const { t } = useTranslation("common");

  const title = isBlocked
    ? `Ai blocat pe @${username}`
    : t("thisAccountIsPrivate");

  const description = isBlocked
    ? t("cannotSeeEachOtherContent")
    : t("followThisAccountForSeeContent");

  return (
    <Stack
      direction="row"
      justify="start"
      sx={{ marginTop: headerHeight + 30, marginHorizontal: 15 }}
    >
      <Icon
        name="eye-off"
        type="feather"
        size={27.5}
        color={grey0}
        style={{ padding: 15 }}
      />
      <Stack align="start" sx={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </Stack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontWeight: "600", fontSize: 16, marginBottom: 5, color: black },
  description: { color: grey0, fontSize: 14.5 },
});
