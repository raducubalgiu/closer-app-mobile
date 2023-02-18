import { StyleSheet, Text, Pressable } from "react-native";
import { Icon } from "@rneui/themed";
import { Stack } from "../Stack/Stack";
import theme from "../../../assets/styles/theme";
import { useTranslation } from "react-i18next";

const { black } = theme.lightColors || {};
type IProps = { title: string; onPress: () => void; sx?: {} };

export const HeadingAction = ({ title, onPress, sx }: IProps) => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" sx={{ ...styles.container, ...sx }}>
      <Text style={styles.title}>{title}</Text>
      <Pressable onPress={onPress}>
        <Stack direction="row" sx={styles.actionBtnContainer}>
          <Icon name="arrow-right" />
          <Text style={styles.actionBtn}>{t("seeAll")}</Text>
        </Stack>
      </Pressable>
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: { paddingLeft: 10, paddingVertical: 10 },
  title: { color: black, fontWeight: "600", fontSize: 14.5 },
  actionBtnContainer: {
    paddingVertical: 2.5,
    paddingHorizontal: 15,
  },
  actionBtn: { color: black, fontWeight: "600", fontSize: 13 },
});
