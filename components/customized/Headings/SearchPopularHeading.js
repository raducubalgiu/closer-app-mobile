import { StyleSheet, Text } from "react-native";
import { Button, Stack } from "../../core";
import theme from "../../../assets/styles/theme";
import { Divider, Icon } from "@rneui/themed";

const { black, grey0 } = theme.lightColors;

export const SearchPopularHeading = ({
  heading,
  onSeeAll,
  collection,
  seeAll,
}) => {
  return (
    <>
      {collection?.length > 0 && (
        <Button onPress={onSeeAll}>
          <Stack direction="row" sx={styles.container}>
            <Text style={styles.heading}>{heading}</Text>
            {seeAll && (
              <Icon name="keyboard-arrow-right" color={black} size={20} />
            )}
          </Stack>
        </Button>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 20, paddingHorizontal: 15 },
  heading: { fontFamily: "Exo-Bold", color: black, fontSize: 16 },
  seeAll: { color: grey0, fontSize: 13, fontFamily: "Exo-Medium" },
});
