import { StyleSheet } from "react-native";
import { ListItem } from "@rneui/themed";
import React, { useState } from "react";
import theme from "../../../assets/styles/theme";

export const Accordion = ({ title, children, initExpand, ...props }) => {
  const [expanded, setExpanded] = useState(initExpand);

  return (
    <ListItem.Accordion
      containerStyle={{ ...styles.containerStyle, ...props.sx }}
      content={
        <ListItem.Content>
          <ListItem.Title style={styles.title}>{title}</ListItem.Title>
        </ListItem.Content>
      }
      isExpanded={expanded}
      onPress={() => setExpanded(!expanded)}
    >
      {children}
    </ListItem.Accordion>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    padding: 0,
  },
  title: {
    color: theme.lightColors.black,
    fontSize: 15,
  },
});
