import { StyleSheet, Text, Dimensions, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { CModal, Stack } from "../../core";
import theme from "../../../../assets/styles/theme";
import { memo } from "react";

const { black, error, grey0 } = theme.lightColors || {};
const { width, height } = Dimensions.get("window");

type IProps = {
  visible: boolean;
  onCloseModal: () => void;
  onAction: () => void;
  action: string;
  title: string;
  description: string;
};

const ConfirmModal = ({
  visible,
  onCloseModal,
  onAction,
  action,
  title,
  description,
}: IProps) => {
  const { t } = useTranslation("common");

  const footer = (
    <Stack direction="row">
      <Pressable onPress={onCloseModal} style={styles.cancelBtn}>
        <Text style={styles.cancelTxt}>{t("cancel")}</Text>
      </Pressable>
      <Pressable onPress={onAction} style={styles.actionBtn}>
        <Text style={styles.actionBtnTxt}>{action}</Text>
      </Pressable>
    </Stack>
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

export default memo(ConfirmModal);

const styles = StyleSheet.create({
  container: { marginHorizontal: width / 7, marginVertical: height / 2.8 },
  actionBtn: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12.5,
    width: "50%",
    borderTopWidth: 1,
    borderTopColor: "#f1f1f1",
    borderLeftWidth: 1,
    borderLeftColor: "#f1f1f1",
  },
  cancelBtn: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12.5,
    width: "50%",
    borderTopWidth: 1,
    borderTopColor: "#f1f1f1",
  },
  actionBtnTxt: {
    color: error,
    fontSize: 15,
    fontWeight: "500",
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
