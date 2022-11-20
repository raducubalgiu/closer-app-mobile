import { StyleSheet, Text, Pressable } from "react-native";
import { Icon } from "@rneui/themed";
import { Stack } from "../../core";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors;

export const RecentSearchListItem = ({ onPress, word }) => {
  return (
    <Pressable style={styles.item} onPress={onPress}>
      <Stack direction="row" justify="start">
        <Icon name="search" type="feather" color={black} size={20} />
        <Text style={styles.searchItem}>{word}</Text>
      </Stack>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  searchItem: {
    color: theme.lightColors.black,
    marginLeft: 10,
  },
});