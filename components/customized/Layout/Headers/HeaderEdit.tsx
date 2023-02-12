import { StyleSheet, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { IconBackButton, Stack } from "../../../core";
import theme from "../../../../assets/styles/theme";
import { Divider } from "@rneui/themed";

const { grey0, primary } = theme.lightColors || {};

type IProps = {
  onSave: (data: any) => void;
  title: string;
  iconBack?: boolean;
  disabledSave?: boolean;
  disabledBack?: boolean;
  divider?: boolean;
};

export const HeaderEdit = ({
  onSave,
  title,
  iconBack = false,
  disabledSave = false,
  disabledBack = false,
  divider = false,
}: IProps) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <>
      <Stack direction="row" sx={styles.headerCont}>
        {iconBack && <IconBackButton sx={{ padding: 15 }} />}
        {!iconBack && (
          <Pressable
            onPress={() => navigation.goBack()}
            disabled={disabledBack}
          >
            <Text style={styles.cancel}>{t("cancel")}</Text>
          </Pressable>
        )}
        <Text style={styles.title}>{title}</Text>
        <Pressable onPress={onSave} disabled={disabledSave}>
          <Text
            style={{ ...styles.save, color: disabledSave ? "#ccc" : primary }}
          >
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
