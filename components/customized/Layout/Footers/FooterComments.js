import { StyleSheet, TextInput } from "react-native";
import { Stack, CustomAvatar, IconButton } from "../../../core";
import theme from "../../../../assets/styles/theme";
import { useTranslation } from "react-i18next";

const { primary } = theme.lightColors;

export const FooterComments = ({
  comment,
  focus,
  onChangeText,
  avatar,
  onHandleComment,
}) => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" sx={styles.inputCont}>
      <CustomAvatar size={45} iconSize={20} avatar={avatar} />
      <TextInput
        onChangeText={(text) => onChangeText(text)}
        autoCapitalize="sentences"
        autoFocus={focus}
        value={comment}
        placeholder={t("addComment")}
        style={styles.input}
      />
      <IconButton
        size={20}
        iconName="arrowup"
        iconType="antdesign"
        sx={styles.iconBtn}
        color="white"
        onPress={onHandleComment}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  inputCont: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12.5,
    borderRadius: 25,
    marginLeft: 10,
  },
  iconBtn: {
    backgroundColor: primary,
    padding: 7.5,
    marginLeft: 10,
    borderRadius: 50,
  },
});
