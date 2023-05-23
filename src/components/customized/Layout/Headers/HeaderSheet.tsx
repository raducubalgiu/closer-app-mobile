import { StyleSheet, Text, Pressable, ViewStyle } from "react-native";
import { Stack } from "../../../core";
import { Icon, Divider } from "@rneui/themed";
import theme from "../../../../../assets/styles/theme";

const { black, grey3 } = theme.lightColors || {};

type IProps = {
  onClose: () => void;
  divider?: boolean;
  title?: string;
  description?: string;
  sx?: ViewStyle;
};

export const HeaderSheet = ({
  onClose,
  divider = true,
  title,
  description,
  sx,
}: IProps) => {
  const styles = StyleSheet.create({
    icon: { paddingHorizontal: 15, paddingVertical: description ? 15 : 10 },
    title: { color: black, fontWeight: "700", fontSize: description ? 16 : 15 },
    description: {
      color: grey3,
      fontSize: 15,
    },
  });

  return (
    <>
      <Stack direction="row" sx={sx}>
        <Icon name="close" type="ionicon" color="white" style={styles.icon} />
        <Stack>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </Stack>
        <Pressable style={styles.icon} onPress={onClose}>
          <Icon name="close" type="ionicon" />
        </Pressable>
      </Stack>
      {divider && <Divider color="#ddd" />}
    </>
  );
};
