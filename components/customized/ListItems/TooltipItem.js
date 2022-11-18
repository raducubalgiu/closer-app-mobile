import { StyleSheet, Text } from "react-native";
import { Icon, Tooltip } from "@rneui/themed";
import theme from "../../../assets/styles/theme";
import { Stack } from "../../core";

const TooltipTitle = ({ title, tooltipText, tooltipDimensions, sx }) => {
  return (
    <Stack direction="row" justify="start" sx={sx}>
      <Tooltip
        backgroundColor={theme.lightColors.primary}
        popover={<Text style={styles.tooltipText}>{tooltipText}</Text>}
        containerStyle={{
          ...styles.tooltipContainer,
          ...tooltipDimensions,
        }}
      >
        <Icon
          name="info"
          type="feather"
          color={theme.lightColors.black}
          size={20}
        />
      </Tooltip>
      <Text style={styles.step}>{title}</Text>
    </Stack>
  );
};

export default TooltipTitle;

const styles = StyleSheet.create({
  step: {
    marginLeft: 10,
    color: theme.lightColors.black,
    fontSize: 14.5,
  },
  tooltipContainer: { color: "white" },
  tooltipText: { color: "white" },
});
