import { Icon } from "@rneui/themed";
import { Stack } from "../Stack/Stack";
import theme from "../../../assets/styles/theme";
import { View } from "react-native";

const { primary } = theme.lightColors || {};

export const Rating = ({ rating, sx }: { rating: number; sx?: {} }) => {
  let ratings = [];

  for (let i = 1; i <= 5; i++) {
    ratings.push(
      <Icon
        name="star-fill"
        type="octicon"
        color={i <= rating ? primary : "#ddd"}
        size={16}
        style={{ marginRight: 7.5 }}
      />
    );
  }

  return (
    <Stack direction="row" sx={{ marginVertical: 5, flex: 1, ...sx }}>
      {ratings.map((r, i) => (
        <View key={i}>{r}</View>
      ))}
    </Stack>
  );
};
