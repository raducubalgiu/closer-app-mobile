import {
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  Dimensions,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";
import { Stack, IconButton } from "../../../core";
import theme from "../../../../../assets/styles/theme";
import { emoji } from "../../../../../assets/emojis/emoji-comm.json";

const { primary } = theme.lightColors || {};
const { width } = Dimensions.get("window");

type IProps = {
  message: string;
  onChangeText: (text: string) => void;
  onSendMessage: () => void;
  onOpenCamera: () => void;
  onOpenMediaLibrary: () => void;
  onAddEmojy: (emojy: string) => void;
};

export const FooterMessageItem = ({
  message,
  onChangeText,
  onSendMessage,
  onOpenCamera,
  onOpenMediaLibrary,
  onAddEmojy,
}: IProps) => {
  const { t } = useTranslation("common");

  return (
    <Stack>
      <Stack direction="row" sx={styles.emojies}>
        {emoji.map((emoji, i) => (
          <Pressable key={i} onPress={() => onAddEmojy(emoji.char)}>
            <Text style={{ fontSize: 25 }}>{emoji.char}</Text>
          </Pressable>
        ))}
      </Stack>
      <Stack direction="row" sx={styles.inputContainer}>
        <Stack direction="row" justify="start" sx={{ flex: 1 }}>
          <IconButton
            name="camera"
            type="font-awesome"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onOpenCamera();
            }}
            size={22.5}
          />
          <TextInput
            onChangeText={(text) => onChangeText(text)}
            value={message}
            style={styles.input}
            placeholder={`${t("message")}...`}
          />
        </Stack>
        {message?.length === 0 && (
          <Stack direction="row">
            <IconButton
              name="photo-library"
              type="material"
              size={25}
              onPress={onOpenMediaLibrary}
            />
            <IconButton
              name="sticker-emoji"
              type="material-community"
              size={25}
              sx={{ marginLeft: 10 }}
            />
          </Stack>
        )}
        {message?.length > 0 && (
          <Pressable style={styles.sendBtn} onPress={onSendMessage}>
            <Text style={styles.sendBtnText}>{t("send")}</Text>
          </Pressable>
        )}
      </Stack>
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
  emojies: {
    width: width - 30,
    paddingVertical: 7.5,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});
