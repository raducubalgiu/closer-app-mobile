import { StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { Icon } from "@rneui/themed";
import { Button, Stack, CustomAvatar } from "../../../core";
import { trimFunc } from "../../../../utils";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import theme from "../../../../assets/styles/theme";
import { useAuth } from "../../../../hooks";
import DisplayText from "../../DisplayText/DisplayText";

const CardPostFooter = ({
  postId,
  creatorId,
  description,
  username,
  date,
  avatar,
  commentsCount,
}) => {
  const [comments, setComments] = useState(commentsCount);
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { user } = useAuth();

  const goToComments = (focus) =>
    navigation.navigate("Comments", {
      postId,
      creatorId,
      description,
      username,
      date,
      avatar,
      focus,
    });

  return (
    <>
      <Stack align="start" sx={{ paddingHorizontal: 15, paddingTop: 10 }}>
        {description && <DisplayText text={description} maxWords={10} />}
      </Stack>
      {comments > 0 && (
        <Button
          sx={styles.commentsContainer}
          onPress={() => goToComments(false)}
        >
          <Stack direction="row" justify="start">
            <Text style={styles.comments}>
              {comments > 1
                ? `Vezi toate cele ${comments} comentarii`
                : `${t("seeOneComment")}`}
            </Text>
            <Icon
              name="down"
              type="antdesign"
              size={14}
              style={{ marginLeft: 5 }}
              color={theme.lightColors.grey0}
            />
          </Stack>
        </Button>
      )}
      <Button
        sx={
          comments > 0 || description
            ? { paddingHorizontal: 15, marginTop: 10 }
            : { paddingHorizontal: 15 }
        }
        onPress={() => goToComments(true)}
      >
        <Stack direction="row" justify="start">
          <CustomAvatar size={22.5} iconSize={10} avatar={user?.avatar} />
          <Text style={styles.addCommText}>{t("addComment")}</Text>
        </Stack>
      </Button>
      <Stack direction="row" sx={{ marginTop: 7.5, marginHorizontal: 15 }}>
        <Text style={styles.date}>{date}</Text>
      </Stack>
    </>
  );
};

export default CardPostFooter;

const styles = StyleSheet.create({
  description: {
    flex: 1,
    paddingHorizontal: 10,
    color: theme.lightColors.black,
  },
  commentsContainer: { paddingHorizontal: 15, marginTop: 5 },
  comments: { color: theme.lightColors.grey0, fontSize: 13 },
  date: {
    color: theme.lightColors.grey0,
    fontSize: 13,
  },
  addCommText: {
    color: theme.lightColors.grey0,
    marginLeft: 5,
    borderWidth: 0.5,
    borderColor: "#ddd",
    paddingVertical: 6,
    paddingHorizontal: 10,
    flex: 1,
    borderRadius: 15,
    fontSize: 13,
  },
  distanceText: {
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 5,
    color: theme.lightColors.black,
  },
});
