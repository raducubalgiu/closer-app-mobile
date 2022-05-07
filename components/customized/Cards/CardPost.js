import { StyleSheet, Text, View, TouchableOpacity, Share } from "react-native";
import { Image, Icon, Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../assets/styles/theme";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  LikeIButton,
  BookmarkIButton,
  ShareIButton,
  Checkmark,
  Stack,
  CustomAvatar,
} from "../../core";
import { useAuth } from "../../../context/auth";
import { trimFunc } from "../../../utils";

const CardPost = (props) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [likes, setLikes] = useState(props.likesCount);
  const [comments, setComments] = useState(props.commentsCount);
  const { t } = useTranslation();

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

  const goToUser = (userId) => {
    if (user?._id === userId) {
      navigation.navigate("Profile");
    } else {
      navigation.navigate("ProfileGeneralStack", {
        screen: "ProfileGeneral",
        params: { userId },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Stack direction="row" sx={{ paddingHorizontal: 10 }}>
        <TouchableOpacity onPress={() => goToUser(props.userId)}>
          <Stack direction="row" sx={styles.avatarContainer}>
            <CustomAvatar avatar={props?.avatar} size={35} iconSize={15} />
            <Stack align="start">
              <Stack direction="row">
                <Text style={styles.name}>{props.username}</Text>
                {props.checkmark && <Checkmark />}
              </Stack>
              <Text style={styles.job}>Service Auto</Text>
            </Stack>
          </Stack>
        </TouchableOpacity>
      </Stack>
      <View>
        <Image
          source={{
            uri: `${props.image}`,
          }}
          style={
            !props.bookable
              ? { ...styles.image, height: 450 }
              : { ...styles.image }
          }
        />
      </View>
      {props.bookable && (
        <>
          <Stack direction="row" sx={styles.bookableContainer}>
            <TouchableOpacity>
              <Text style={styles.bookable}>{t("book")}</Text>
            </TouchableOpacity>
            <Icon name="keyboard-arrow-right" color={theme.lightColors.black} />
          </Stack>
        </>
      )}
      <Stack direction="row" sx={styles.btnsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Likes", { postId: props.postId })}
        >
          <Text style={styles.likes}>{likes} aprecieri</Text>
        </TouchableOpacity>
        <Stack direction="row">
          <LikeIButton
            postId={props.postId}
            onAddLike={() => setLikes((likes) => likes + 1)}
            onRemoveLike={() => setLikes((likes) => likes - 1)}
            sx={{ marginLeft: 15 }}
          />
          <BookmarkIButton postId={props.postId} sx={{ marginLeft: 15 }} />
          <ShareIButton onPress={onShare} sx={{ marginLeft: 15 }} />
        </Stack>
      </Stack>
      <Divider color="#ddd" />
      <Stack align="start" sx={{ paddingHorizontal: 15, paddingTop: 10 }}>
        <Text>
          <Text style={styles.description}>
            {trimFunc(props.description, 120)}
          </Text>
        </Text>
      </Stack>
      {comments > 0 && (
        <TouchableOpacity
          style={styles.commentsContainer}
          onPress={() =>
            navigation.navigate("Comments", {
              postId: props.postId,
              description: props.description,
              username: props.username,
              date: props.date,
              avatar: props.avatar,
            })
          }
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
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={{ paddingHorizontal: 15, marginTop: 10 }}
        onPress={() =>
          navigation.navigate("Comments", {
            postId: props.postId,
            description: props.description,
            avatar: props.avatar,
            username: props.username,
            date: props.date,
            focus: true,
          })
        }
      >
        <Stack direction="row" justify="start">
          <CustomAvatar size={30} iconSize={10} avatar={user?.avatar} />
          <Text style={styles.addCommText}>{t("addComment")}</Text>
        </Stack>
      </TouchableOpacity>
      <Stack direction="row" sx={{ marginTop: 7.5, marginHorizontal: 15 }}>
        <Text style={styles.date}>{props.date}</Text>
        {props.bookable && (
          <Stack direction="row">
            <Icon
              name="enviromento"
              type="antdesign"
              color={theme.lightColors.grey0}
            />
            <Text style={styles.distanceText}>{t("at")} 5 km</Text>
          </Stack>
        )}
      </Stack>
    </View>
  );
};

export default CardPost;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    borderRadius: 20,
  },
  avatarContainer: {
    marginVertical: 10,
  },
  name: { fontFamily: "Exo-SemiBold", marginLeft: 10 },
  username: {
    fontWeight: "bold",
    color: theme.lightColors.black,
  },
  job: {
    marginLeft: 10,
    fontFamily: "Exo-Medium",
    color: theme.lightColors.black,
    fontSize: 13,
    textTransform: "capitalize",
  },
  btnsContainer: { paddingHorizontal: 15, paddingVertical: 2.5 },
  date: {
    color: theme.lightColors.grey0,
    fontSize: 13,
  },
  followBtn: {
    marginRight: 15,
    backgroundColor: "#eee",
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  followBtnText: {
    color: theme.lightColors.black,
    fontFamily: "Exo-SemiBold",
    fontSize: 13,
  },
  image: {
    aspectRatio: 1,
    width: "100%",
    flex: 1,
  },
  likes: { color: theme.lightColors.black, fontWeight: "bold" },
  description: {
    flex: 1,
    paddingHorizontal: 10,
    color: theme.lightColors.black,
  },
  actionBtns: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f9f9f9",
  },
  bookableContainer: {
    paddingHorizontal: 15,
    paddingVertical: 7.5,
    backgroundColor: "#f1f1f1",
  },
  bookable: {
    color: theme.lightColors.black,
    fontSize: 13.5,
    fontFamily: "Exo-SemiBold",
  },
  commentsContainer: { paddingHorizontal: 15, marginTop: 5 },
  comments: { color: theme.lightColors.grey0, fontSize: 13 },
  addCommText: {
    color: theme.lightColors.grey0,
    marginLeft: 5,
    borderWidth: 0.5,
    borderColor: "#ddd",
    paddingVertical: 7.5,
    paddingHorizontal: 10,
    flex: 1,
    borderRadius: 15,
  },
  distanceText: {
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 5,
    color: theme.lightColors.black,
  },
});
