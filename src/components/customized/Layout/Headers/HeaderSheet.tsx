import { StyleSheet, Text, Pressable, ViewStyle } from "react-native";
import { Stack } from "../../../core";
import { Icon, Divider } from "@rneui/themed";
import theme from "../../../../../assets/styles/theme";

const { black } = theme.lightColors || {};

type IProps = {
  onClose: () => void;
  divider?: boolean;
  title: string;
  sx?: ViewStyle;
};

const HeaderSheet = ({ onClose, divider = true, title, sx }: IProps) => {
  return (
    <>
      <Stack direction="row" sx={sx}>
        <Icon name="close" type="ionicon" color="white" style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
        <Pressable style={styles.icon} onPress={onClose}>
          <Icon name="close" type="ionicon" />
        </Pressable>
      </Stack>
      {divider && <Divider color="#ddd" />}
    </>
  );
};

export default HeaderSheet;

const styles = StyleSheet.create({
  icon: { paddingVertical: 10, paddingHorizontal: 15 },
  title: { color: black, fontWeight: "700", fontSize: 15 },
});
