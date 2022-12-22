import { StyleSheet, Text, View } from "react-native";
import { memo } from "react";
import { AirbnbRating, Divider, Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";
import { AvatarGroup, Checkmark, Stack } from "../../core";
import CustomAvatar from "../../core/Avatars/CustomAvatar";
import dayjs from "dayjs";
import { User } from "../../../models/user";

const { black, primary, grey0, error } = theme.lightColors || {};

type IProps = {
  reviewer: User;
  date: string;
  rating: number;
  product: string;
  review: string;
  likesCount: number;
};

const RatingListItem = ({
  reviewer,
  date,
  rating,
  product,
  review,
  likesCount,
}: IProps) => {
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
        <AirbnbRating
          isDisabled={true}
          count={5}
          size={15}
          defaultRating={rating}
          reviewColor={black}
          selectedColor={primary}
          reviewSize={15}
          showRating={false}
        />
        <Text style={styles.product}>{product}</Text>
      </Stack>
      <Text style={styles.review}>{review}</Text>
      <Stack direction="row" sx={{ marginTop: 10 }}>
        <Stack direction="row">
          <AvatarGroup />
          <Text style={styles.comments}>1 rapuns</Text>
        </Stack>
        <Stack direction="row">
          <Icon name="heart" type="feather" color={grey0} size={17.5} />
          <Text style={styles.likesCount}>{likesCount}</Text>
        </Stack>
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
  likesCount: {
    color: grey0,
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 5,
  },
});
