import { StyleSheet, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Stack } from "../../../core";
import theme from "../../../../assets/styles/theme";

const { grey0, primary } = theme.lightColors || {};

type IProps = {
  onSave: () => void;
  title: string;
  disabled: boolean;
};

export const HeaderEdit = ({ onSave, title, disabled = false }: IProps) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <Stack direction="row" sx={styles.headerCont}>
      <Pressable onPress={() => navigation.goBack()} disabled={disabled}>
        <Text style={styles.cancel}>{t("cancel")}</Text>
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <Pressable onPress={onSave} disabled={disabled}>
        <Text style={styles.save}>{t("save")}</Text>
      </Pressable>
    </Stack>
  );
};

const styles = StyleSheet.create({
  headerCont: {
    paddingHorizontal: 15,
    paddingVertical: 7.5,
  },
  cancel: {
    color: grey0,
    fontSize: 15,
    fontWeight: "500",
  },
  title: { fontSize: 17, fontWeight: "600" },
  save: {
    color: primary,
    fontSize: 16,
    fontWeight: "700",
  },
});
