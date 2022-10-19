import { Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Stack, CustomAvatar, Checkmark, Spinner } from "../../core";
import theme from "../../../assets/styles/theme";
import { useAuth, useHttpGet } from "../../../hooks";
import { useTranslation } from "react-i18next";
import { LikeCommentButton } from "../Buttons/LikeCommentButton";
import { RelatedCommentsList } from "./RelatedCommentsList";
import { useState } from "react";

const { black, grey0, grey1 } = theme.lightColors;

export const DisplayComment = ({
  item,
  onReply,
  onHandleRelated,
  relatedComments,
  loadingRelated,
}) => {
  const { user: userContext } = useAuth();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const {
    user,
    comment,
    _id,
    relatedCommentsCount,
    likesCount,
    previousComment,
  } = item;
  const { username, name, avatar, checkmark } = user;
  const [likes, setLikes] = useState(likesCount);

  const { data: likedByCreator } = useHttpGet(
    `/users/${userContext?._id}/comments/${_id}/check-like`
  );

  const goToUser = (uName) =>
    navigation.push("ProfileGeneral", { username: uName });
  const goToUserExtra = () =>
    navigation.push("ProfileGeneral", {
      userId: user?._id,
      avatar,
      username,
      name,
    });

  const displayedComment = [];
  const wordsArr = comment.split(" ");

  for (let i = 0; i < wordsArr.length; i++) {
    if (wordsArr[i].startsWith("@")) {
      displayedComment.push(
        <Button
          key={wordsArr[i]}
          onPress={() => goToUser(wordsArr[i].split("@")[1])}
        >
          <Text style={{ color: "#002266" }}>{`${wordsArr[i]} `}</Text>
        </Button>
      );
    } else {
      displayedComment.push(<Text key={wordsArr[i]}>{`${wordsArr[i]} `}</Text>);
    }
  }

  let showMore;
  if (
    relatedCommentsCount > 0 &&
    relatedComments.length < relatedCommentsCount &&
    !loadingRelated
  ) {
    showMore = (
      <Stack align="center">
        <Button onPress={onHandleRelated} sx={{ marginBottom: 15 }}>
          <Text style={styles.seeAll}>
            {t("seeReplies")} ({relatedCommentsCount})
          </Text>
        </Button>
      </Stack>
    );
  }

  return (
    <Stack align="start" direction="row" sx={styles.commentsCont}>
      <Button onPress={goToUserExtra}>
        <CustomAvatar size={32.5} iconSize={15} avatar={avatar} />
      </Button>
      <Stack direction="row" align="start" sx={{ marginLeft: 10, flex: 1 }}>
        <Stack align="start" sx={{ flex: 1 }}>
          <View style={styles.comment}>
            <Button onPress={goToUserExtra}>
              <Text style={styles.username}>{username} </Text>
            </Button>
            {checkmark && <Checkmark size={7.5} sx={{ marginRight: 5 }} />}
            {displayedComment.map((el) => el)}
          </View>
          <Stack direction="row" align="center" sx={{ marginTop: 5 }}>
            <Text style={styles.date}>1z</Text>
            <Text style={styles.likesCount}>{likes} aprecieri</Text>
            <Button onPress={() => onReply(username, _id, previousComment)}>
              <Text style={styles.reply}>{t("reply")}</Text>
            </Button>
          </Stack>
          {likedByCreator.status && (
            <Text style={styles.likeCreator}>{t("likedByCreator")}</Text>
          )}
          {!loadingRelated && (
            <RelatedCommentsList
              relatedComments={relatedComments}
              onReply={onReply}
            />
          )}
          {loadingRelated && (
            <Spinner sx={{ width: "100%", marginVertical: 5 }} />
          )}
          {showMore}
        </Stack>
      </Stack>
      <LikeCommentButton
        userId={userContext?._id}
        commentId={_id}
        onLikes={(action) => setLikes(likes + action)}
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
