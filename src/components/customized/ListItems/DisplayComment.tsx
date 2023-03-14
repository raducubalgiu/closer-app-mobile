import { Text, StyleSheet, Pressable, View } from "react-native";
import { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { Stack, Spinner } from "../../core";
import CustomAvatar from "../../core/Avatars/CustomAvatar";
import theme from "../../../../assets/styles/theme";
import { useTranslation } from "react-i18next";
import { LikeCommentButton } from "../Buttons/LikeCommentButton";
import { RelatedCommentsList } from "./RelatedCommentsList";
import DisplayText from "../Typography/DisplayText/DisplayText";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigation/rootStackParams";

const { black, grey0, grey1 } = theme.lightColors || {};
type IProps = {
  item: any;
  creatorId: string;
  onReply: (text: string, commentId: string) => void;
  onHandleRelated?: () => void;
  relatedComments?: any[];
  loadingRelated?: boolean;
};

const DisplayComment = ({
  item,
  creatorId,
  onReply,
  onHandleRelated,
  relatedComments,
  loadingRelated = false,
}: IProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();
  const { userId, comment, id, relatedCommentsCount } = item;
  const { likesCount, likedByCreator } = item;
  const { username, name, avatar, checkmark } = userId;

  const goToUserExtra = () =>
    navigation.push("ProfileGeneral", {
      userId: userId?.id,
      avatar,
      username,
      name,
      checkmark,
      service: null,
      option: null,
    });

  return (
    <View style={styles.commentsCont}>
      <Pressable onPress={goToUserExtra}>
        <CustomAvatar size={30} avatar={avatar} />
      </Pressable>
      <Stack align="start" sx={{ flex: 1, marginLeft: 10 }}>
        <DisplayText
          text={comment}
          username={username}
          checkmark={checkmark}
          goToUserAllInfo={goToUserExtra}
        />
        <Stack direction="row" align="center" sx={{ marginTop: 5 }}>
          <Text style={styles.date}>1z</Text>
          <Pressable onPress={() => onReply(username, id)}>
            <Text style={styles.reply}>{t("reply")}</Text>
          </Pressable>
          {likedByCreator && (
            <Text style={styles.likeCreator}>{t("likedByCreator")}</Text>
          )}
        </Stack>
        {!loadingRelated && (
          <RelatedCommentsList
            relatedComments={relatedComments}
            creatorId={creatorId}
            onReply={onReply}
          />
        )}
        {loadingRelated && (
          <Spinner sx={{ width: "100%", marginVertical: 25 }} />
        )}
        {relatedCommentsCount > 0 && (
          <Stack align="center">
            <Pressable onPress={onHandleRelated} style={{ marginBottom: 15 }}>
              <Text style={styles.seeAll}>
                {t("seeReplies")} ({relatedCommentsCount})
              </Text>
            </Pressable>
          </Stack>
        )}
      </Stack>
      <LikeCommentButton
        commentId={id}
        creatorId={creatorId}
        likesCount={likesCount}
      />
    </View>
  );
};

export default memo(DisplayComment);

const styles = StyleSheet.create({
  commentsCont: {
    marginBottom: 5,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  comment: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  username: {
    color: black,
    fontWeight: "600",
  },
  date: {
    color: grey1,
    fontSize: 13,
  },
  reply: {
    color: grey0,
    fontWeight: "600",
    fontSize: 13,
    marginLeft: 15,
  },
  likesCount: {
    color: grey0,
    fontWeight: "600",
    marginHorizontal: 10,
    fontSize: 12.5,
    textTransform: "lowercase",
  },
  likeCreator: {
    color: grey0,
    fontSize: 13,
    fontWeight: "700",
    marginHorizontal: 10,
  },
  seeAll: {
    color: grey0,
    fontWeight: "500",
    fontSize: 13.5,
  },
});
