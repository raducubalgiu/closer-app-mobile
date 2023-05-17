import { Icon } from "@rneui/themed";
import Stack from "../Stack/Stack";
import theme from "../../../../assets/styles/theme";
import { StyleSheet, View } from "react-native";

const { primary } = theme.lightColors || {};

type IProps = { rating: number; sx?: {}; size?: number };

const Rating = ({ rating, sx = {}, size = 16 }: IProps) => {
  let ratings = [];

  for (let i = 1; i <= 5; i++) {
    ratings.push(
      <Icon
        name="star-fill"
        type="octicon"
        color={i <= rating ? primary : "#ddd"}
        size={size}
        style={i === 5 ? {} : { marginRight: 7.5 }}
      />
    );
  }

  return (
    <Stack direction="row" sx={{ ...styles.container, ...sx }}>
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
    flex: 1,
  },
});
