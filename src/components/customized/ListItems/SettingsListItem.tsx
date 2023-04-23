import { StyleSheet, Text } from "react-native";
import { Icon } from "@rneui/themed";
import { ListItem, Stack } from "../../core";
import theme from "../../../../assets/styles/theme";

const { black, grey0 } = theme.lightColors || {};
type IProps = {
  onPress: () => void;
  title: string;
  sx?: {};
  sxTitle?: {};
  description?: string;
  sxDescription?: {};
  defaultLeftIconProps?: {
    name: string;
    type: string;
    size: number;
    color: string;
  };
  defaultRightIconProps?: {
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
  iconRightProps?: {
    name?: string;
    type?: string;
    size?: number;
    color?: string;
  };
  rightIcon?: boolean;
};

export const SettingsListItem = ({
  onPress,
  title,
  sx,
  sxTitle,
  description,
  sxDescription,
  defaultLeftIconProps = {
    name: "",
    type: "feather",
    size: 20,
    color: `${black}`,
  },
  defaultRightIconProps = {
    name: "keyboard-arrow-right",
    type: "material",
    size: 20,
    color: `${grey0}`,
  },
  iconLeftProps,
  iconRightProps,
  rightIcon = true,
}: IProps) => {
  return (
    <ListItem
      between
      align="center"
      onPress={onPress}
      sx={{ ...styles.container, ...sx }}
    >
      <Stack justify="start" direction="row" sx={{ flex: 1 }}>
        {!!iconLeftProps && (
          <Icon
            {...defaultLeftIconProps}
            {...iconLeftProps}
            style={styles.iconLeft}
            size={22}
          />
        )}
        <Stack align="start" sx={{ flex: 1 }}>
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
          {...defaultRightIconProps}
          {...iconRightProps}
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
    fontSize: 16,
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
