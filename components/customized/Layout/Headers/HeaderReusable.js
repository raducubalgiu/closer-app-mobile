import { StyleSheet } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import Stack from "../../../core/Containers/Stack";

const HeaderReusable = (props) => {
  return (
    <Stack direction="row" sx={{ ...styles.container, ...props.sx }}>
      <Stack>{props.firstBox}</Stack>
      <Stack>{props.secondBox}</Stack>
      <Stack>
        {props.thirdBox ? (
          props.thirdBox
        ) : (
          <Icon name="arrow-back" type="material" color="white" />
        )}
      </Stack>
    </Stack>
  );
};

export default HeaderReusable;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
