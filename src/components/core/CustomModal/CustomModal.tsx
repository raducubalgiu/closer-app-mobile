import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { Divider, Icon } from "@rneui/themed";
import Stack from "../Stack/Stack";
import theme from "../../../../assets/styles/theme";
import { Button } from "../Buttons/Button";

type IProps = {
  visible: boolean;
  title: string;
  children: any;
  action: string;
  disabled?: boolean;
  loading?: boolean;
  customFooter?: any;
  onClose: () => void;
  onAction: () => void;
};
const { black } = theme.lightColors || {};

const CustomModal = (props: IProps) => {
  const { width, height } = useWindowDimensions();

  const backdrop = (
    <TouchableWithoutFeedback onPress={props?.onClose}>
      <View style={{ flex: 1, backgroundColor: "black" }} />
    </TouchableWithoutFeedback>
  );

  return (
    <View>
      <Modal
        isVisible={props?.visible}
        deviceHeight={height}
        deviceWidth={width}
        customBackdrop={backdrop}
      >
        <View style={styles.container}>
          <View>
            <Stack direction="row">
              <Icon name="close" type="antdesign" color="white" />
              <Text style={styles.title}>{props?.title}</Text>
              <Pressable style={{ padding: 10 }} onPress={props?.onClose}>
                <Icon name="close" type="antdesign" color={black} />
              </Pressable>
            </Stack>
          </View>
          <Divider />
          <View style={{ padding: 15 }}>{props?.children}</View>
          <Divider />
          <View style={styles.footer}>
            {!props.customFooter && (
              <Button
                title={props?.action}
                disabled={props?.disabled}
                loading={props?.loading}
                onPress={props?.onAction}
              />
            )}
            {props.customFooter && props.customFooter}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  title: {
    color: black,
    fontWeight: "600",
    fontSize: 16.5,
  },
  footer: { marginHorizontal: 15 },
});
