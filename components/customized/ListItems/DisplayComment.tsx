import { Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Stack, Spinner } from "../../core";
import CustomAvatar from "../../core/Avatars/CustomAvatar";
import theme from "../../../assets/styles/theme";
import { useAuth } from "../../../hooks";
import { useTranslation } from "react-i18next";
import { LikeCommentButton } from "../Buttons/LikeCommentButton";
import { RelatedCommentsList } from "./RelatedCommentsList";
import { useState } from "react";
import { DisplayText } from "../DisplayText/DisplayText";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigation/rootStackParams";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const { black, grey0, grey1 } = theme.lightColors || {};
type IProps = {
  item: any;
  creatorId: string;
  onReply: (text: string, commentId: string, prevComment: any) => void;
  onHandleRelated: UseMutateFunction<AxiosResponse<any>>;
  relatedComments: any[];
  loadingRelated: boolean;
};

export const DisplayComment = ({
  item,
  creatorId,
  onReply,
  onHandleRelated,
  relatedComments,
  loadingRelated = false,
}: IProps) => {
  const { user: userContext } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();
  const { user, comment, id, relatedCommentsCount } = item;
  const { likesCount, previousComment, likedByCreator } = item;
  const { username, name, avatar, checkmark } = user;
  const [likes, setLikes] = useState(likesCount);
  const [creatorLike, setCreatorLike] = useState(likedByCreator);

  const goToUserExtra = () =>
    navigation.push("ProfileGeneral", {
      userId: user?.id,
      avatar,
      username,
      name,
      checkmark,
      service: null,
      option: null,
    });

  let showMore;
  if (
    relatedCommentsCount > 0 &&
    relatedComments.length < relatedCommentsCount &&
    !loadingRelated
  ) {
    showMore = (
      <Stack align="center">
        <Pressable onPress={onHandleRelated} style={{ marginBottom: 15 }}>
          <Text style={styles.seeAll}>
            {t("seeReplies")} ({relatedCommentsCount})
          </Text>
        </Pressable>
      </Stack>
    );
  }

  return (
    <Stack align="start" direction="row" sx={styles.commentsCont}>
      <Pressable onPress={goToUserExtra}>
        <CustomAvatar size={30} avatar={avatar} />
      </Pressable>
      <Stack direction="row" align="start" sx={{ marginLeft: 10, flex: 1 }}>
        <Stack align="start" sx={{ flex: 1 }}>
          <DisplayText
            text={comment}
            username={username}
            checkmark={checkmark}
            goToUserAllInfo={goToUserExtra}
          />
          <Stack direction="row" align="center" sx={{ marginTop: 5 }}>
            <Text style={styles.date}>1z</Text>
            <Text style={styles.likesCount}>
              {likes} {t("likes")}
            </Text>
            <Pressable onPress={() => onReply(username, id, previousComment)}>
              <Text style={styles.reply}>{t("reply")}</Text>
            </Pressable>
          </Stack>
          {creatorLike && (
            <Text style={styles.likeCreator}>{t("likedByCreator")}</Text>
          )}
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
          {showMore}
        </Stack>
      </Stack>
      <LikeCommentButton
        userId={userContext?.id}
        commentId={id}
        onLikes={(action) => setLikes(likes + action)}
        creatorId={creatorId}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  commentsCont: {
    marginBottom: 5,
    paddingVertical: 5,
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
    fontWeight: "600",
    marginTop: 15,
  },
  seeAll: {
    color: grey0,
    fontWeight: "500",
    fontSize: 13.5,
  },
});
