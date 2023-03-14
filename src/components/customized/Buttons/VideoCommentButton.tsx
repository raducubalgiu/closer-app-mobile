import { StyleSheet, Pressable } from "react-native";
import { Icon, Badge } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";

const { error } = theme.lightColors || {};
type IProps = { onPress: () => void; sx?: {}; hasComments: boolean };

export const VideoCommentButton = ({ onPress, sx, hasComments }: IProps) => {
  return (
    <Pressable style={{ ...styles.container, ...sx }} onPress={onPress}>
      <Icon name="message-circle" type="feather" size={27.5} color="white" />
      {hasComments && (
        <Badge
          containerStyle={styles.badgeContainer}
          badgeStyle={styles.badgeStyle}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  badgeContainer: { width: 2.5, height: 2.5 },
  badgeStyle: {
    backgroundColor: error,
    borderWidth: 0,
    left: 2.5,
    top: -2.5,
  },
});
