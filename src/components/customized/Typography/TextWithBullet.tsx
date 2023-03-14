import { StyleSheet, Text } from "react-native";
import { Stack } from "../../core";
import theme from "../../../assets/styles/theme";

const { black, grey0 } = theme.lightColors || {};

type IProps = { sx?: {}; sxText?: {}; text: string };

export const TextWithBullet = ({ sx, text, sxText }: IProps) => {
  return (
    <Stack
      direction="row"
      justify="start"
      align="start"
      sx={{ marginBottom: 15, ...sx }}
    >
      <Text style={styles.point}>{"\u2B24"}</Text>
      <Text style={[styles.text, sxText]}>{text}</Text>
    </Stack>
  );
};

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    color: grey0,
    flex: 1,
  },
  point: { fontSize: 4, color: black, marginTop: 5 },
});
