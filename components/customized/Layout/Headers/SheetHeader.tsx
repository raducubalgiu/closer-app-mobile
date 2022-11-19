import { StyleSheet, Text } from "react-native";
import { Icon } from "@rneui/themed";
import { IconBackButton, Stack } from "../../../core";
import theme from "../../../../assets/styles/theme";

const { grey0 } = theme.lightColors;

export const SheetHeader = ({ title, description, sx = {} }) => {
  return (
    <Stack direction="row" sx={{ ...styles.sheetOverview, ...sx }}>
      <IconBackButton size={20} />
      <Stack>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </Stack>
      <Icon name="chevron-back" type="ionicon" color="white" />
    </Stack>
  );
};

export default SheetHeader;

const styles = StyleSheet.create({
  sheetOverview: {
    marginHorizontal: 15,
  },
  title: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 17,
    fontWeight: "600",
  },
  description: {
    color: grey0,
    marginTop: 5,
    textAlign: "center",
    fontSize: 15,
    marginBottom: 15,
  },
});
