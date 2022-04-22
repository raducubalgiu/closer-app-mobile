import { StyleSheet, Text, View } from "react-native";
import { Icon, Tooltip } from "react-native-elements";
import React from "react";
import { Colors } from "../../../assets/styles/Colors";
import { Stack } from "../../core";

const TooltipTitle = (props) => {
  return (
    <Stack direction="row" justify="start" sx={props.sx}>
      <Tooltip
        backgroundColor={Colors.primary}
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
        <Icon name="info" type="feather" color={Colors.textDark} size={20} />
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
    color: Colors.textDark,
    fontSize: 14.5,
  },
  tooltipContainer: { color: "white", fontFamily: "Exo-Medium" },
  tooltipText: { color: "white", fontFamily: "Exo-Medium" },
});
