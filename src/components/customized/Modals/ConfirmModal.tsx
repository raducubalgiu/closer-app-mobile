import { StyleSheet, Text, Dimensions, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { Divider } from "@rneui/base";
import { CModal, Stack } from "../../core";
import theme from "../../../../assets/styles/theme";

const { black, error, grey0 } = theme.lightColors || {};
const { width, height } = Dimensions.get("window");

type IProps = {
  visible: boolean;
  onCloseModal: () => void;
  onDelete: () => void;
  title: string;
  description: string;
};

export const ConfirmModal = ({
  visible,
  onCloseModal,
  onDelete,
  title,
  description,
}: IProps) => {
  const { t } = useTranslation("common");

  const footer = (
    <>
      <Pressable onPress={onDelete} style={styles.deleteBtn}>
        <Text style={styles.deleteTxt}>{t("delete")}</Text>
      </Pressable>
      <Divider />
      <Pressable onPress={onCloseModal} style={styles.cancelBtn}>
        <Text style={styles.cancelTxt}>{t("cancel")}</Text>
      </Pressable>
    </>
  );

  return (
    <CModal
      size="sm"
      visible={visible}
      headerTitle={t("deletePost")}
      onCloseModal={onCloseModal}
      header={false}
      footer={footer}
      sx={styles.container}
    >
      <Stack sx={styles.bodyCont}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </Stack>
    </CModal>
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: width / 7, marginVertical: height / 2.8 },
  deleteBtn: {
    alignItems: "center",
    paddingTop: 2.5,
    paddingBottom: 12.5,
  },
  cancelBtn: { alignItems: "center", paddingTop: 12.5, paddingBottom: 2.5 },
  deleteTxt: {
    fontWeight: "bold",
    color: error,
    fontSize: 15.5,
  },
  cancelTxt: {
    color: black,
    fontSize: 14.5,
  },
  bodyCont: {
    padding: 30,
  },
  title: {
    fontWeight: "bold",
    color: black,
    fontSize: 16,
    textAlign: "center",
  },
  description: {
    color: grey0,
    fontSize: 14,
    textAlign: "center",
    marginTop: 12.5,
  },
});
