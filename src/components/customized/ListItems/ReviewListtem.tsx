import { StyleSheet, Text, View, Pressable } from "react-native";
import { memo } from "react";
import { Icon } from "@rneui/themed";
import { Stack, CustomAvatar, Rating } from "../../core";
import { Review } from "../../../ts";
import theme from "../../../../assets/styles/theme";
import { FROM_NOW } from "../../../utils/date-utils";

const { black, grey0 } = theme.lightColors || {};

type IProps = { item: Review };

const ReviewListtem = ({ item }: IProps) => {
  const { reviewerId, rating, review, createdAt } = item;

  return (
    <Stack direction="row" align="start" sx={styles.container}>
      <Stack direction="row" align="start" justify="start" sx={styles.reviewer}>
        <CustomAvatar avatar={reviewerId.avatar} size={30} />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.username}>@{reviewerId.username}</Text>
          <Rating rating={rating} size={14} />
          <Text style={styles.review}>{review}</Text>
          <Text style={{ color: grey0, marginTop: 5 }}>
            {FROM_NOW(createdAt)}
          </Text>
        </View>
      </Stack>
      <Pressable style={{ padding: 15 }}>
        <Icon name="heart" type="feather" size={20} color="#ddd" />
      </Pressable>
    </Stack>
  );
};

export default memo(ReviewListtem);

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  reviewer: { flex: 1, marginRight: 20, paddingLeft: 15 },
  review: { flex: 1, marginTop: 2.5, color: black },
  username: { color: black, fontWeight: "500" },
  point: { fontSize: 3, color: grey0, marginHorizontal: 7.5 },
});
