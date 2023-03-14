import { StyleSheet, Text } from "react-native";
import { Switch } from "@rneui/themed";
import { Stack } from "../../core";
import theme from "../../../../assets/styles/theme";

const { black, grey0 } = theme?.lightColors || {};
type IProps = {
  title: string;
  sxTitle?: {};
  description?: string;
  sxDescription?: {};
  value: any;
  onValueChange: () => void;
};

export const SettingsSwitchListItem = ({
  title,
  sxTitle,
  sxDescription,
  description,
  value,
  onValueChange,
}: IProps) => {
  return (
    <Stack direction="row" sx={styles.container}>
      <Stack align="start" sx={{ marginRight: 10, flex: 1 }}>
        <Text style={[styles.title, sxTitle]}>{title}</Text>
        {description && (
          <Text style={[styles.description, sxDescription]}>{description}</Text>
        )}
      </Stack>
      <Switch value={value} onValueChange={onValueChange} />
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 10 },
  title: {
    color: black,
    fontWeight: "600",
    fontSize: 14,
  },
  description: {
    color: grey0,
    marginTop: 5,
  },
});
