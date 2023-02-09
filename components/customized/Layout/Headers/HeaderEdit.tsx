import { StyleSheet, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Stack } from "../../../core";
import theme from "../../../../assets/styles/theme";
import { Divider } from "@rneui/themed";

const { grey0, primary } = theme.lightColors || {};

type IProps = {
  onSave: (data: any) => void;
  title: string;
  disabled?: boolean;
  divider?: boolean;
};

export const HeaderEdit = ({
  onSave,
  title,
  disabled = false,
  divider = false,
}: IProps) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <>
      <Stack direction="row" sx={styles.headerCont}>
        <Pressable onPress={() => navigation.goBack()} disabled={disabled}>
          <Text style={styles.cancel}>{t("cancel")}</Text>
        </Pressable>
        <Text style={styles.title}>{title}</Text>
        <Pressable onPress={onSave} disabled={disabled}>
          <Text style={{ ...styles.save, color: disabled ? "#ccc" : primary }}>
            {t("save")}
          </Text>
        </Pressable>
      </Stack>
      {divider && <Divider color="#ddd" />}
    </>
  );
};

const styles = StyleSheet.create({
  headerCont: {},
  cancel: {
    color: grey0,
    fontSize: 16,
    fontWeight: "600",
    padding: 10,
  },
  title: { fontSize: 17, fontWeight: "600" },
  save: {
    fontSize: 16,
    fontWeight: "700",
    padding: 15,
  },
});
