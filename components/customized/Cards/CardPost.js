import { StyleSheet, Text, View, TouchableOpacity, Share } from "react-native";
import { Image, Icon } from "react-native-elements";
import { Colors } from "../../../assets/styles/Colors";
import React from "react";
import Stack from "../../core/Containers/Stack";
import UserAvatar from "../Avatars/UserAvatar";
import LikeIButton from "../Buttons/LikeIButton";
import BookmarkIButton from "../Buttons/BookmarkIButton";
import ShareIButton from "../Buttons/ShareIButton";
import CommentsIButton from "../Buttons/CommentsIButton";
import { Checkmark } from "../../core";

const CardPost = (props) => {
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
          <UserAvatar avatar={props.avatar} size={35} iconSize={15} />
          <Stack align="start">
            <Stack direction="row">
              <Text style={styles.name}>{props.username}</Text>
              {props.checkmark && <Checkmark />}
              <Text style={styles.job}>{props.job}</Text>
            </Stack>
            <Text style={styles.date}>{props.date}</Text>
          </Stack>
        </Stack>
        <Stack direction="row">
          <Icon type="entypo" name="dots-three-horizontal" size={20} />
        </Stack>
      </Stack>
      <Image
        source={{
          uri: `${props.image}`,
        }}
        style={styles.image}
      />
      {props.bookable && (
        <>
          <Stack direction="row" sx={styles.bookableContainer}>
            <TouchableOpacity>
              <Text style={styles.bookable}>Rezerva instant</Text>
            </TouchableOpacity>
            <Icon name="keyboard-arrow-right" />
          </Stack>
        </>
      )}
      <Stack direction="row" sx={styles.actionBtns}>
        <Text style={styles.likes}>{props.likes} aprecieri</Text>
        <Stack direction="row">
          <LikeIButton isLike={props.isLike} onPress={() => {}} />
          <CommentsIButton onPress={props.openComments} />
          <BookmarkIButton isBookmark={props.isBookmark} onPress={() => {}} />
          <ShareIButton onPress={onShare} />
        </Stack>
      </Stack>
      <Text style={styles.description}>
        <Text style={{ fontFamily: "Exo-SemiBold" }}>{props.username}</Text>{" "}
        {props.description}
      </Text>
      <TouchableOpacity
        style={{ paddingHorizontal: 10, marginTop: 5 }}
        activeOpacity={1}
        onPress={props.openComments}
      >
        <Stack direction="row" justify="start">
          <Text style={styles.comments}>14 comentarii</Text>
          <Icon
            name="down"
            type="antdesign"
            size={14}
            style={{ marginLeft: 5 }}
            color={Colors.textLight}
          />
        </Stack>
      </TouchableOpacity>
    </View>
  );
};

export default CardPost;

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  avatarContainer: {
    marginVertical: 10,
  },
  name: { fontFamily: "Exo-SemiBold", marginLeft: 10 },
  job: {
    marginLeft: 5,
    fontFamily: "Exo-SemiBold",
    color: Colors.primary,
    textTransform: "capitalize",
  },
  date: { marginLeft: 10, color: Colors.textLight, fontSize: 13 },
  followBtn: {
    marginRight: 15,
    backgroundColor: "#eee",
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  followBtnText: {
    color: Colors.textDark,
    fontFamily: "Exo-SemiBold",
    fontSize: 13,
  },
  image: {
    aspectRatio: 1,
    width: "100%",
    flex: 1,
  },
  likes: { color: Colors.textDark, fontWeight: "bold" },
  description: {
    flex: 1,
    paddingHorizontal: 10,
    color: Colors.textDark,
    marginTop: 7.5,
  },
  actionBtns: {
    paddingVertical: 8.5,
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
    color: Colors.textDark,
    fontSize: 13.5,
    fontFamily: "Exo-SemiBold",
  },
  comments: { color: Colors.textLight, marginTop: 2.5 },
});
