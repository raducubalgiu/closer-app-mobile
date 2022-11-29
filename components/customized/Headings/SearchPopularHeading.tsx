import { StyleSheet, Text, Pressable } from "react-native";
import { Icon } from "@rneui/themed";
import { Stack } from "../../core";
import theme from "../../../assets/styles/theme";

const { black, grey0 } = theme.lightColors || {};

type IProps = {
  heading: string;
  onSeeAll?: () => void;
  collection: any;
  seeAll?: boolean;
};

export const SearchPopularHeading = ({
  heading,
  onSeeAll,
  collection,
  seeAll = false,
}: IProps) => {
  return (
    <>
      {collection?.length > 0 && (
        <Pressable onPress={onSeeAll}>
          <Stack direction="row" sx={styles.container}>
            <Text style={styles.heading}>{heading}</Text>
            {seeAll && (
              <Icon name="keyboard-arrow-right" color={black} size={20} />
            )}
          </Stack>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 20, paddingHorizontal: 15 },
  heading: { color: black, fontSize: 16, fontWeight: "600" },
  seeAll: { color: grey0, fontSize: 13 },
});
