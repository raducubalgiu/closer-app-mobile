import { StyleSheet, Text, TextInput, Pressable } from "react-native";
import { Stack, IconButton } from "../../../core";
import theme from "../../../../assets/styles/theme";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";

const { primary } = theme.lightColors;

export const FooterMessageItem = ({
  message,
  onChangeText,
  onSendMessage,
  onOpenCamera,
}) => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" sx={styles.inputContainer}>
      <Stack direction="row" justify="start" sx={{ flex: 1 }}>
        <IconButton
          iconName="camera"
          iconType="feather"
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onOpenCamera();
          }}
        />
        <TextInput
          onChangeText={(text) => onChangeText(text)}
          value={message}
          style={styles.input}
          placeholder={`${t("message")}...`}
        />
      </Stack>
      <Pressable onPress={onSendMessage} style={styles.sendBtn}>
        <Text style={styles.sendBtnText}>{t("send")}</Text>
      </Pressable>
    </Stack>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 15,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 7.5,
    fontSize: 15,
  },
  sendBtn: {
    backgroundColor: primary,
    paddingVertical: 7.5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  sendBtnText: {
    color: "white",
    fontWeight: "600",
  },
});