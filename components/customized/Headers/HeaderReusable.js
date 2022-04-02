import { StyleSheet } from "react-native";
import React from "react";
import Stack from "../../core/Containers/Stack";

const HeaderReusable = (props) => {
  return (
    <Stack direction="row" sx={styles.container}>
      <Stack>{props.firstBox}</Stack>
      <Stack>{props.secondBox}</Stack>
      <Stack>{props.thirdBox}</Stack>
    </Stack>
  );
};

export default HeaderReusable;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
  },
});
