import { StyleSheet, Text } from "react-native";
import { Icon } from "@rneui/themed";
import { ListItem, Stack } from "../../core";
import theme from "../../../assets/styles/theme";

const { black, grey0 } = theme.lightColors || {};
type IProps = {
  onPress: () => void;
  title: string;
  sxTitle?: {};
  description?: string;
  sxDescription?: {};
  rightIcon?: boolean;
  defaultIconProps?: {
    name: string;
    type: string;
    size: number;
    color: string;
  };
  iconLeftProps?: {
    name: string;
    type?: string;
    size?: number;
    color?: string;
  };
};

export const SettingsListItem = ({
  onPress,
  title,
  sxTitle,
  description,
  sxDescription,
  rightIcon = true,
  defaultIconProps = { name: "", type: "feather", size: 20, color: `${black}` },
  iconLeftProps,
}: IProps) => {
  return (
    <ListItem between align="center" onPress={onPress} sx={styles.container}>
      <Stack justify="start" direction="row" sx={{ flex: 1 }}>
        {!!iconLeftProps && (
          <Icon
            {...defaultIconProps}
            {...iconLeftProps}
            style={styles.iconLeft}
          />
        )}
        <Stack align="start">
          <Text style={[styles.title, sxTitle]}>{title}</Text>
          {description && (
            <Text style={[styles.description, sxDescription]}>
              {description}
            </Text>
          )}
        </Stack>
      </Stack>
      {rightIcon && (
        <Icon
          name="keyboard-arrow-right"
          color={grey0}
          style={styles.iconRight}
        />
      )}
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  title: {
    color: black,
    fontWeight: "600",
    fontSize: 14,
  },
  description: {
    color: grey0,
    marginTop: 5,
  },
  iconLeft: {
    marginRight: 10,
    paddingHorizontal: 5,
  },
  iconRight: {
    marginLeft: 10,
  },
});
