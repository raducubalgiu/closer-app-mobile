import {
  StyleSheet,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import Modal from "react-native-modal";
import { Stack } from "../../core";
import theme from "../../../../assets/styles/theme";

const { black, error, grey0 } = theme.lightColors || {};

type IProps = {
  visible: boolean;
  onClose: () => void;
  onAction: () => void;
  action: string;
  title: string;
  description: string;
};

const ConfirmModal = ({
  visible,
  onClose,
  onAction,
  action,
  title,
  description,
  ...props
}: IProps) => {
  const { width, height } = useWindowDimensions();
  const { t } = useTranslation("common");

  const backdrop = (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={{ flex: 1, backgroundColor: "black" }} />
    </TouchableWithoutFeedback>
  );

  return (
    <View>
      <Modal
        {...props}
        deviceWidth={width}
        deviceHeight={height}
        customBackdrop={backdrop}
        isVisible={visible}
        animationInTiming={200}
        animationOutTiming={250}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          <Stack direction="row">
            <Pressable onPress={onClose} style={styles.cancelBtn}>
              <Text style={styles.cancelTxt}>{t("cancel")}</Text>
            </Pressable>
            <Pressable onPress={onAction} style={styles.actionBtn}>
              <Text style={styles.actionBtnTxt}>{action}</Text>
            </Pressable>
          </Stack>
        </View>
      </Modal>
    </View>
  );
};

export default memo(ConfirmModal);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 15,
  },
  content: {
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 45,
  },
  title: {
    fontWeight: "bold",
    color: black,
    fontSize: 15.5,
    textAlign: "center",
  },
  description: {
    color: grey0,
    fontSize: 14,
    textAlign: "center",
    marginTop: 12.5,
  },
  cancelBtn: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12.5,
    width: "50%",
    borderTopWidth: 1,
    borderTopColor: "#f1f1f1",
  },
  cancelTxt: {
    color: black,
    fontSize: 14.5,
    fontWeight: "500",
  },
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
  actionBtnTxt: {
    color: error,
    fontSize: 15,
    fontWeight: "600",
  },
});
