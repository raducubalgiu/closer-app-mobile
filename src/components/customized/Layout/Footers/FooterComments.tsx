import { StyleSheet, TextInput } from "react-native";
import { useTranslation } from "react-i18next";
import { Stack, IconButton } from "../../../core";
import CustomAvatar from "../../../core/Avatars/CustomAvatar";
import theme from "../../../../../assets/styles/theme";
import { useAuth } from "../../../../hooks";

const { primary } = theme.lightColors || {};

type IProps = {
  comment: string;
  onChangeText: (text: string) => void;
  onHandleComment: () => void;
};

export const FooterComments = ({
  comment,
  onChangeText,
  onHandleComment,
}: IProps) => {
  const { t } = useTranslation("common");
  const { user } = useAuth();

  return (
    <Stack direction="row" sx={styles.inputCont}>
      <CustomAvatar size={45} avatar={user?.avatar} />
      <TextInput
        onChangeText={(text) => onChangeText(text)}
        autoCapitalize="sentences"
        value={comment}
        placeholder={t("addComment")}
        style={styles.input}
      />
      <IconButton
        size={20}
        name="arrowup"
        type="antdesign"
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
