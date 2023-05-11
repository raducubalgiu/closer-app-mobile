import { StyleSheet, Text } from "react-native";
import { Switch, Icon } from "@rneui/themed";
import { ListItem, Stack } from "../../core";
import theme from "../../../../assets/styles/theme";

const { black, grey0 } = theme?.lightColors || {};
type IProps = {
  title: string;
  description?: string;
  sx?: {};
  sxTitle?: {};
  sxDescription?: {};
  value: any;
  onValueChange: () => void;
  defaultLeftIconProps?: {
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

export const SettingsSwitchListItem = ({
  title,
  description,
  value,
  onValueChange,
  sx,
  sxTitle,
  sxDescription,
  defaultLeftIconProps = {
    name: "",
    type: "feather",
    size: 20,
    color: `${black}`,
  },
  iconLeftProps,
}: IProps) => {
  return (
    <ListItem between align="center" sx={{ ...styles.container, ...sx }}>
      {!!iconLeftProps && (
        <Icon
          {...defaultLeftIconProps}
          {...iconLeftProps}
          style={styles.iconLeft}
          size={22}
        />
      )}
      <Stack align="start" sx={{ marginRight: 10, flex: 1 }}>
        <Text style={[styles.title, sxTitle]}>{title}</Text>
        {description && (
          <Text style={[styles.description, sxDescription]}>{description}</Text>
        )}
      </Stack>
      <Switch value={value} onValueChange={onValueChange} />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 10 },
  title: {
    color: black,
    fontWeight: "600",
    fontSize: 15,
  },
  description: {
    color: grey0,
    marginTop: 5,
  },
  iconLeft: {
    marginRight: 10,
    paddingHorizontal: 5,
  },
});
