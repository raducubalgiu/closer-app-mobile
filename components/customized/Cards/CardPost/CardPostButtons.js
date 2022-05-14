import { StyleSheet, Text, Share } from "react-native";
import React, { useState } from "react";
import { Icon, Divider } from "@rneui/themed";
import {
  Stack,
  Button,
  LikeIButton,
  BookmarkIButton,
  ShareIButton,
} from "../../../core";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../../assets/styles/theme";
import { useTranslation } from "react-i18next";

export const CardPostButtons = ({ bookable, postId, likesCount }) => {
  const [likes, setLikes] = useState(likesCount);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const goToLikes = () => navigation.navigate("Likes", { postId: postId });

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Trimite catre",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const bookableSection = (
    <Stack direction="row" sx={styles.bookable}>
      <Button>
        <Text style={styles.book}>{t("book")}</Text>
      </Button>
      <Icon name="keyboard-arrow-right" color={theme.lightColors.black} />
    </Stack>
  );

  return (
    <>
      {bookable && bookableSection}
      <Stack direction="row" sx={styles.buttons}>
        <Button onPress={goToLikes}>
          <Text style={styles.likes}>
            {likes} {t("likes")}
          </Text>
        </Button>
        <Stack direction="row">
          <LikeIButton
            postId={postId}
            onAddLike={() => setLikes((likes) => likes + 1)}
            onRemoveLike={() => setLikes((likes) => likes - 1)}
            sx={styles.button}
          />
          <BookmarkIButton postId={postId} sx={styles.button} />
          <ShareIButton onPress={onShare} sx={styles.button} />
        </Stack>
      </Stack>
      <Divider color="#ddd" />
    </>
  );
};

const styles = StyleSheet.create({
  bookable: {
    paddingHorizontal: 15,
    paddingVertical: 7.5,
    backgroundColor: "#f1f1f1",
  },
  book: {
    color: theme.lightColors.black,
    fontSize: 13.5,
    fontFamily: "Exo-SemiBold",
  },
  buttons: { paddingHorizontal: 15, paddingVertical: 2.5 },
  button: { marginLeft: 15 },
  likes: { color: theme.lightColors.black, fontWeight: "bold" },
});
