import { Icon } from "@rneui/themed";
import Stack from "../Stack/Stack";
import theme from "../../../../assets/styles/theme";
import { StyleSheet, View } from "react-native";

const { primary } = theme.lightColors || {};

type IProps = { rating: number; sx?: {}; size?: number };

const Rating = ({ rating, sx = {}, size = 16 }: IProps) => {
  let ratings = [];

  const solidStars = Math.floor(rating);
  const halfStars = Math.ceil(rating - solidStars);
  const emptyStars = 5 - solidStars - halfStars;

  for (let i = 0; i < solidStars; i++) {
    ratings.push(
      <Icon
        name="star-fill"
        type="octicon"
        color={primary}
        size={size}
        style={{ marginRight: 8 }}
      />
    );
  }

  if (halfStars) {
    ratings.push(
      <Icon
        name="star-half-o"
        type="font-awesome"
        color={primary}
        size={size + 1}
        style={{ marginRight: 8 }}
      />
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    ratings.push(
      <Icon
        name="star-fill"
        type="octicon"
        color="#ddd"
        size={size}
        style={{ marginRight: 8 }}
      />
    );
  }

  return (
    <Stack direction="row" justify="start" sx={{ ...styles.container, ...sx }}>
      {ratings.map((r, i) => (
        <View key={i}>{r}</View>
      ))}
    </Stack>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
});
