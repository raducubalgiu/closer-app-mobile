import { StyleSheet, Text, Share } from "react-native";
import { useState } from "react";
import { Icon, Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { SECOND_ROLE, THIRD_ROLE } from "@env";
import { Stack, Button, ShareIButton, Protected } from "../../../core";
import { useAuth } from "../../../../hooks";
import theme from "../../../../assets/styles/theme";
import { LikeButton } from "../../Buttons/LikeButton";
import { BookmarkIconButton } from "../../Buttons/BookmarkIconButton";

const { black } = theme.lightColors;

const CardPostButtons = ({ bookable, postId, likesCount }) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState(likesCount);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const goToLikes = () => navigation.navigate("Likes", { postId: postId });
  const goToCalendar = () =>
    navigation.navigate("CalendarBig", {
      product,
      service,
      owner: user,
      hours,
      employee,
    });

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
    <Protected roles={[SECOND_ROLE, THIRD_ROLE]} userRole={user.role}>
      <Button onPress={goToCalendar}>
        <Stack direction="row" sx={styles.bookable}>
          <Text style={styles.book}>{t("book")}</Text>
          <Icon name="keyboard-arrow-right" color={black} size={22.5} />
        </Stack>
      </Button>
    </Protected>
  );

  return (
    <>
      {bookable && bookableSection}
      <Divider color="#ddd" style={{ marginHorizontal: 15 }} />
      <Stack direction="row" sx={styles.buttons}>
        <Button onPress={goToLikes}>
          <Text style={styles.likes}>
            {likes} {t("likes")}
          </Text>
        </Button>
        <Stack direction="row">
          <LikeButton
            postId={postId}
            onAddLike={() => setLikes((likes) => likes + 1)}
            onRemoveLike={() => setLikes((likes) => likes - 1)}
            sx={styles.button}
          />
          <BookmarkIconButton type="posts" typeId={postId} sx={styles.button} />
          <ShareIButton onPress={onShare} sx={styles.button} />
        </Stack>
      </Stack>
      <Divider color="#ddd" style={{ marginHorizontal: 15 }} />
    </>
  );
};

export default CardPostButtons;

const styles = StyleSheet.create({
  bookable: {
    paddingHorizontal: 15,
    paddingVertical: 7.5,
  },
  book: {
    color: black,
    fontSize: 14.5,
  },
  buttons: { paddingHorizontal: 15, paddingVertical: 2.5 },
  button: { marginLeft: 15 },
  likes: { color: black, fontWeight: "bold", textTransform: "lowercase" },
});
