import { useTranslation } from "react-i18next";
import { StyleSheet, Text } from "react-native";
import { Button, Stack } from "../../core";
import theme from "../../../assets/styles/theme";

const { black, grey0 } = theme.lightColors;

export const HashtagListItem = ({ name, postsCount, onPress, sx }) => {
  const { t } = useTranslation();

  return (
    <Button onPress={onPress} sx={sx}>
      <Stack direction="row" sx={{ marginBottom: 20 }}>
        <Stack direction="row">
          <Stack sx={styles.hashtagIc}>
            <Text style={styles.hashtagT}>#</Text>
          </Stack>
          <Stack align="start">
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.posts}>
              {postsCount} {t("posts")}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Button>
  );
};

const styles = StyleSheet.create({
  hashtagIc: {
    paddingVertical: 10,
    paddingHorizontal: 15.5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 50,
    marginRight: 10,
  },
  hashtagT: { fontSize: 17, color: black },
  name: { color: black },
  posts: {
    color: grey0,
    textTransform: "lowercase",
    fontSize: 13,
  },
});
