import { Text, StyleSheet } from "react-native";
import { Button, CustomAvatar, IconButton, Stack } from "../../core";
import theme from "../../../assets/styles/theme";
import { dateFormat } from "../../../utils";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const { black, grey0, error } = theme.lightColors;

export const CommentListItem = ({
  avatar,
  username,
  comment,
  createdAt,
  name,
  userId,
}) => {
  const [liked, setLiked] = useState(false);
  const navigation = useNavigation();

  const goToUser = (userId) => {
    navigation.push("ProfileGeneral", {
      userId,
      avatar,
      username,
      name,
    });
  };

  return (
    <Stack align="start" direction="row" sx={styles.commentsCont}>
      <Button onPress={() => goToUser(userId)}>
        <CustomAvatar size={32.5} iconSize={15} avatar={avatar} />
      </Button>
      <Stack direction="row" align="start" sx={{ marginLeft: 10, flex: 1 }}>
        <Stack align="start" sx={{ flex: 1, marginRight: 15 }}>
          <Text>
            <Text style={styles.username}>{username} </Text>
            {comment}
          </Text>
          <Text style={styles.date}>{dateFormat(createdAt)}</Text>
        </Stack>
        <IconButton
          iconName={liked ? "heart" : "hearto"}
          iconType="antdesign"
          size={13}
          color={liked ? error : grey0}
        />
      </Stack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  commentsCont: {
    padding: 15,
  },
  username: {
    color: black,
  },
  date: {
    color: grey0,
    fontSize: 13,
    marginTop: 5,
  },
});
