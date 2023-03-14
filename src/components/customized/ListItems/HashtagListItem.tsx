import { useTranslation } from "react-i18next";
import { StyleSheet, Text, Pressable } from "react-native";
import { Stack } from "../../core";
import theme from "../../../../assets/styles/theme";

const { black, grey0 } = theme.lightColors || {};

type IProps = {
  name: string;
  postsCount: number;
  onPress: () => void;
  sx?: {};
};

export const HashtagListItem = ({
  name,
  postsCount,
  onPress,
  sx = {},
}: IProps) => {
  const { t } = useTranslation();

  return (
    <Pressable onPress={onPress} style={{ ...styles.container, ...sx }}>
      <Stack direction="row">
        <Stack direction="row">
          <Stack sx={styles.hashtagIc}>
            <Text style={styles.hashtagT}>#</Text>
          </Stack>
          <Stack align="start">
            <Text style={styles.name}>#{name}</Text>
            <Text style={styles.posts}>
              {postsCount} {t("posts")}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  hashtagIc: {
    paddingVertical: 10,
    paddingHorizontal: 15.5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 50,
    marginRight: 10,
  },
  hashtagT: { fontSize: 17, color: black, fontWeight: "600" },
  name: { color: black, fontWeight: "500", fontSize: 15, marginBottom: 2.5 },
  posts: {
    color: grey0,
    textTransform: "lowercase",
    fontSize: 13,
  },
});
