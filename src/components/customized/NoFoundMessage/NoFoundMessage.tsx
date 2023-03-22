import { StyleSheet, Text } from "react-native";
import { Stack } from "../../core";
import { Icon } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";

const { black, grey0 } = theme.lightColors || {};

type IProps = {
  title?: string;
  description: string;
  defaultIconProps?: {
    name: string;
    type: string;
    size: number;
    color: string;
  };
  iconProps?: {
    name: string;
    type?: string;
    size?: number;
    color?: string;
  };
  sx?: {};
};

export const NoFoundMessage = ({
  title,
  description,
  sx = {},
  defaultIconProps = {
    name: "alert-circle",
    type: "feather",
    size: 45,
    color: "#ddd",
  },
  iconProps,
}: IProps) => {
  return (
    <Stack align="center" justify="center" sx={{ ...styles.container, ...sx }}>
      <Icon {...defaultIconProps} {...iconProps} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 50, paddingHorizontal: 50 },
  title: {
    fontSize: 19,
    marginTop: 15,
    marginBottom: 5,
    color: black,
    fontWeight: "600",
  },
  description: {
    color: grey0,
    textAlign: "center",
    fontSize: 15.5,
  },
});
