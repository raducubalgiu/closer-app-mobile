import { Pressable, StyleSheet, Text, View } from "react-native";
import { memo, useState } from "react";
import { Divider, Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";
import { Checkmark, Stack, Rating } from "../../core";
import CustomAvatar from "../../core/Avatars/CustomAvatar";
import dayjs from "dayjs";
import { User } from "../../../models/user";
import { useAuth, useDelete, useGet, usePost } from "../../../hooks";

const { black, grey0, error } = theme.lightColors || {};

type IProps = {
  id: string;
  reviewer: User;
  date: string;
  rating: number;
  product: string;
  service: string;
  review: string;
  likesCount: number;
};

const RatingListItem = ({
  id,
  reviewer,
  date,
  rating,
  product,
  service,
  review,
  likesCount,
}: IProps) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const endpoint = `/users/${user?.id}/reviews/${id}/likes`;

  useGet({
    model: "checkLike",
    uri: endpoint,
    onSuccess: (res) => setLiked(res.data.status),
  });

  const { mutate: like } = usePost({ uri: endpoint });
  const { mutate: unlike } = useDelete({ uri: endpoint });

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      like({});
    } else {
      setLiked(false);
      unlike();
    }
  };

  return (
    <View style={styles.container}>
      <Stack direction="row" align="start">
        <Stack direction="row">
          <CustomAvatar size={42.5} avatar={reviewer?.avatar} />
          <View style={{ marginLeft: 10 }}>
            <Stack direction="row">
              <Text style={styles.name}>{reviewer?.name}</Text>
              {reviewer?.checkmark && <Checkmark sx={{ marginLeft: 5 }} />}
            </Stack>
            <Text style={styles.date}>{dayjs(date).fromNow()}</Text>
          </View>
        </Stack>
      </Stack>
      <Divider style={{ marginTop: 15 }} />
      <Stack align="start" sx={{ marginVertical: 5 }}>
        <Rating rating={rating} />
        <Stack direction="row">
          <Text style={styles.product}>{service}</Text>
          <Text style={styles.product}>{product}</Text>
        </Stack>
      </Stack>
      <Text style={styles.review}>{review}</Text>
      <Stack direction="row" sx={{ marginTop: 10 }}>
        <Pressable onPress={() => {}}>
          <Stack direction="row">
            <CustomAvatar avatar={user?.avatar} size={25} />
            <Text style={{ marginLeft: 7.5, color: grey0 }}>Răspunde...</Text>
          </Stack>
        </Pressable>
        <Pressable style={styles.likeCont} onPress={handleLike}>
          <Stack direction="row">
            <Icon
              name="heart"
              type={liked ? "antdesign" : "feather"}
              color={liked ? error : grey0}
              size={15}
            />
            <Text style={styles.likesCount}>{likesCount}</Text>
          </Stack>
        </Pressable>
      </Stack>
    </View>
  );
};

export default memo(RatingListItem);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 15,
    padding: 15,
    borderRadius: 2.5,
    borderWidth: 0.5,
    borderColor: "#ddd",
  },
  name: {
    fontSize: 15,
    marginBottom: 1,
    fontWeight: "600",
    color: black,
  },
  date: {
    color: grey0,
    fontSize: 13.5,
  },
  product: {
    color: black,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 5,
    fontWeight: "500",
  },
  review: {
    fontSize: 14,
    marginVertical: 10,
    color: black,
  },
  comments: {
    color: grey0,
    fontWeight: "500",
    marginLeft: 5,
  },
  likeCont: {
    paddingVertical: 5,
    paddingLeft: 7.5,
  },
  likesCount: {
    color: grey0,
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 5,
  },
});
