import { StyleSheet, Text } from "react-native";
import { Icon, Tooltip } from "@rneui/themed";
import React from "react";
import theme from "../../../assets/styles/theme";
import { Stack } from "../../core";

const TooltipTitle = (props) => {
  return (
    <Stack direction="row" justify="start" sx={props.sx}>
      <Tooltip
        backgroundColor={theme.lightColors.primary}
        popover={
          <>
            <Text style={styles.tooltipText}>{props.tooltipText}</Text>
          </>
        }
        containerStyle={{
          ...styles.tooltipContainer,
          ...props.tooltipDimensions,
        }}
      >
        <Icon
          name="info"
          type="feather"
          color={theme.lightColors.black}
          size={20}
        />
      </Tooltip>
      <Text style={styles.step}>{props.title}</Text>
    </Stack>
  );
};

export default TooltipTitle;

const styles = StyleSheet.create({
  step: {
    fontFamily: "Exo-Medium",
    marginLeft: 10,
    color: theme.lightColors.black,
    fontSize: 14.5,
  },
  tooltipContainer: { color: "white", fontFamily: "Exo-Medium" },
  tooltipText: { color: "white", fontFamily: "Exo-Medium" },
});
