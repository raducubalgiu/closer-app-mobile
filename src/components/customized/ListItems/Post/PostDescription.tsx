import { StyleSheet, Text, View, Pressable } from "react-native";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import DisplayText from "../../Typography/DisplayText/DisplayText";
import CustomAvatar from "../../../core/Avatars/CustomAvatar";
import { Stack } from "../../../core";
import { useAuth } from "../../../../hooks";
import theme from "../../../../../assets/styles/theme";

type IProps = { commentsCount: number; date: string; description: string };
const { grey0 } = theme.lightColors || {};

const PostDescription = ({ commentsCount, date, description }: IProps) => {
  const { user } = useAuth();
  const { t } = useTranslation("common");

  return (
    <View style={styles.container}>
      {description && (
        <DisplayText
          text={description}
          maxWords={10}
          goToUserAllInfo={() => {}}
        />
      )}
      <Pressable onPress={() => {}}>
        <Stack direction="row" justify="start">
          <CustomAvatar size={22.5} avatar={user?.avatar} />
          <Text style={styles.addCommText}>{t("addComment")}</Text>
        </Stack>
      </Pressable>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
};

export default memo(PostDescription);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  addCommText: {
    color: grey0,
    padding: 10,
    flex: 1,
    borderRadius: 15,
    fontSize: 13.5,
  },
  date: {
    color: grey0,
    fontSize: 13,
    marginTop: 5,
  },
});
