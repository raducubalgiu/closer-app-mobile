import { StyleSheet, Text, Dimensions, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { Icon } from "@rneui/themed";
import { Stack } from "../../core";
import CustomAvatar from "../../core/Avatars/CustomAvatar";
import theme from "../../../assets/styles/theme";
import { useAuth, usePatch } from "../../../hooks";
import { MessDateItem } from "./MessDateItem";

const width = Dimensions.get("window").width;
const { black, error } = theme.lightColors;

export const MessReceivedItem = ({
  avatar,
  item,
  senderSame,
  dateSame,
  date,
}) => {
  const { message, _id, liked, createdAt } = item || {};
  const [isLiked, setIsLiked] = useState(liked);
  const { user } = useAuth();

  const { mutate } = usePatch({
    uri: `/users/${user?._id}/messages/${_id}`,
  });

  const handleLike = () => {
    setIsLiked((isLiked: boolean) => !isLiked);
    mutate({ userId: user?._id, messageId: _id });
  };

  return (
    <Stack
      align="start"
      justify="start"
      sx={{ marginBottom: 5, marginHorizontal: 15 }}
    >
      <Stack direction="row">
        <Stack direction="row" align="end" justify="start" sx={{ flex: 1 }}>
          {!senderSame && (
            <Stack sx={{ width: 30 }}>
              <CustomAvatar avatar={avatar} size={30} />
            </Stack>
          )}
          {!message?.url && (
            <Stack sx={styles.message}>
              <Text style={styles.messageText}>{message?.text}</Text>
            </Stack>
          )}
          {message?.url && (
            <Image
              source={{ uri: message?.url }}
              style={{ width: width / 2, height: 300, borderRadius: 10 }}
            />
          )}
        </Stack>
        <Pressable onPress={handleLike} style={styles.like}>
          <Icon
            name={isLiked ? "heart" : "hearto"}
            type="antdesign"
            color={isLiked ? error : "#ddd"}
            size={20}
          />
        </Pressable>
      </Stack>
      {!dateSame && <MessDateItem date={date} />}
    </Stack>
  );
};

const styles = StyleSheet.create({
  message: {
    borderRadius: 25,
    marginLeft: 10,
    paddingVertical: 12.5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: width / 4,
  },
  messageText: {
    color: black,
    fontSize: 15,
  },
  like: { padding: 5 },
});
