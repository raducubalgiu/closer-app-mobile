import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text } from "react-native";
import theme from "../../../../assets/styles/theme";

const { black, primary } = theme.lightColors || {};
type IProps = { isFollow: boolean; isBlocked: boolean; onPress: () => void };

export const FollowProfileButton = ({
  isFollow = false,
  isBlocked = false,
  onPress,
}: IProps) => {
  const { t } = useTranslation("common");

  const contained = !isFollow || isBlocked;

  const styles = StyleSheet.create({
    container: {
      height: 45,
      borderWidth: 1,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 2.5,
      width: contained ? 150 : 100,
      borderColor: contained ? primary : "#ddd",
      backgroundColor: contained ? primary : "white",
    },
    text: {
      color: contained ? "white" : black,
      fontWeight: "600",
    },
  });

  let name;

  switch (true) {
    case isBlocked:
      name = t("unblock");
      break;
    case isFollow:
      name = t("following");
      break;
    default:
      name = t("follow");
  }

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  );
};
