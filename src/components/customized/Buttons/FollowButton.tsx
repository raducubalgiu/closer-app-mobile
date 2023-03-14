import { StyleSheet, Text, Pressable } from "react-native";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import theme from "../../../../assets/styles/theme";

const { primary, black } = theme.lightColors || {};
type IProps = {
  onPress: () => void;
  isFollow: boolean | undefined;
  sxBtn?: {};
  sxBtnText?: {};
  fullWidth?: boolean;
};

const FollowButton = ({
  onPress,
  isFollow,
  sxBtn = {},
  sxBtnText = {},
  fullWidth = false,
}: IProps) => {
  const { t } = useTranslation();

  const styles = StyleSheet.create({
    btn: {
      borderRadius: 2.5,
      borderWidth: 1,
      borderColor: isFollow ? "#ddd" : primary,
      backgroundColor: isFollow ? "white" : primary,
      width: fullWidth ? "100%" : 100,
      height: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    btnText: {
      color: isFollow ? black : "white",
      fontSize: 13,
      textAlign: "center",
      fontWeight: "600",
    },
  });

  return (
    <Pressable style={[styles.btn, sxBtn]} onPress={onPress}>
      <Text style={[styles.btnText, sxBtnText]}>
        {isFollow ? t("following") : t("follow")}
      </Text>
    </Pressable>
  );
};

export default memo(FollowButton);
