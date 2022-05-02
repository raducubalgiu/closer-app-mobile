import { StyleSheet, Text, View, TouchableOpacity, Share } from "react-native";
import { Image, Icon, Divider } from "@rneui/themed";
import theme from "../../../assets/styles/theme";
import React, { useState } from "react";
import { Stack, CustomAvatar } from "../../core";
import LikeIButton from "../Buttons/LikeIButton";
import BookmarkIButton from "../Buttons/BookmarkIButton";
import ShareIButton from "../Buttons/ShareIButton";
import CommentsIButton from "../Buttons/CommentsIButton";
import { Checkmark } from "../../core";
import { useNavigation } from "@react-navigation/native";

const CardPost = (props) => {
  const navigation = useNavigation();
  const [likes, setLikes] = useState(props.likesCount);
  const [comments, setComments] = useState(props.commentsCount);

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

  return (
    <View style={styles.container}>
      <Stack direction="row" sx={{ paddingHorizontal: 10 }}>
        <Stack direction="row" sx={styles.avatarContainer}>
          <CustomAvatar avatar={props?.avatar} size={35} iconSize={15} />
          <Stack align="start">
            <Stack direction="row">
              <Text style={styles.name}>{props.username}</Text>
              {props.checkmark && <Checkmark />}
            </Stack>
            <Text style={styles.job}>{props.job}</Text>
          </Stack>
        </Stack>
      </Stack>
      <View>
        <Image
          source={{
            uri: `${props.image}`,
          }}
          style={styles.image}
        />
        <View
          style={{
            position: "absolute",
            bottom: 70,
            right: 15,
          }}
        >
          <Stack sx={{ marginBottom: 20 }}>
            <LikeIButton
              postId={props.postId}
              onAddLike={() => setLikes((likes) => likes + 1)}
              onRemoveLike={() => setLikes((likes) => likes - 1)}
              sx={{ marginBottom: 5 }}
            />
            <Text
              style={{
                fontFamily: "Exo-ExtraBold",
                color: "white",
              }}
            >
              {likes}
            </Text>
          </Stack>
          <Stack sx={{ marginBottom: 20 }}>
            <CommentsIButton
              onPress={() =>
                navigation.navigate("Comments", {
                  postId: props.postId,
                  description: props.description,
                  username: props.username,
                  date: props.date,
                  avatar: props.avatar,
                  focus: true,
                })
              }
              sx={{ marginBottom: 5 }}
            />
            <Text
              style={{
                fontFamily: "Exo-ExtraBold",
                color: "white",
              }}
            >
              {comments}
            </Text>
          </Stack>
          <Stack>
            <ShareIButton onPress={onShare} sx={{ marginBottom: 5 }} />
            <Text
              style={{
                fontFamily: "Exo-ExtraBold",
                color: "white",
              }}
            >
              0
            </Text>
          </Stack>
        </View>
        <Stack
          align="start"
          sx={{ position: "absolute", bottom: 15, left: 15 }}
        >
          <Text style={{ fontFamily: "Exo-SemiBold", color: "white" }}>
            @{props.username}
          </Text>
          <Text
            style={{
              fontFamily: "Exo-Regular",
              color: "white",
              marginTop: 2.5,
            }}
          >
            {props.description}
          </Text>
        </Stack>
      </View>
      {props.bookable && (
        <>
          <Stack direction="row" sx={styles.bookableContainer}>
            <TouchableOpacity>
              <Text style={styles.bookable}>
                Acest produs poate fi rezervat
              </Text>
            </TouchableOpacity>
            <Icon name="keyboard-arrow-right" />
          </Stack>
        </>
      )}
      <Stack direction="row" sx={{ marginHorizontal: 15, paddingVertical: 5 }}>
        <Stack direction="row">
          <Text
            style={{ fontFamily: "Exo-Medium", marginRight: 10, fontSize: 13 }}
          >
            Poti rezerva acest produs
          </Text>
          <Icon name="keyboard-arrow-right" />
        </Stack>
        <BookmarkIButton />
      </Stack>
      <Divider color="#ddd" />
      {/* <TouchableOpacity
        style={{ paddingHorizontal: 10, marginTop: 5 }}
        activeOpacity={1}
        onPress={() => {}}
      >
        {comments > 0 && (
          <TouchableOpacity
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
                  : `Vezi 1 comentariu`}
              </Text>
              <Icon
                name="down"
                type="antdesign"
                size={14}
                style={{ marginLeft: 5 }}
                color={Colors.textLight}
              />
            </Stack>
          </TouchableOpacity>
        )}
      </TouchableOpacity> */}
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
  job: {
    marginLeft: 10,
    fontFamily: "Exo-Medium",
    color: theme.lightColors.black,
    fontSize: 13,
    textTransform: "capitalize",
  },
  date: {
    marginLeft: 10,
    color: theme.lightColors.grey0,
    fontSize: 13,
    marginTop: 5,
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
    height: 530,
    flex: 1,
  },
  likes: { color: theme.lightColors.black, fontWeight: "bold" },
  description: {
    flex: 1,
    paddingHorizontal: 10,
    color: theme.lightColors.black,
    marginTop: 7.5,
  },
  actionBtns: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f9f9f9",
  },
  bookableContainer: {
    paddingHorizontal: 10,
    paddingVertical: 7.5,
    backgroundColor: "#f1f1f1",
  },
  bookable: {
    color: theme.lightColors.black,
    fontSize: 13.5,
    fontFamily: "Exo-SemiBold",
  },
  comments: { color: theme.lightColors.grey0, marginTop: 2.5 },
});
