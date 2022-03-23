import { StyleSheet, Text, View } from "react-native";
import { Icon, Tab } from "react-native-elements";
import React from "react";
import { Colors } from "../../../assets/styles/Colors";

const TabsProfile = (props) => {
  return (
    <Tab
      value={props.index}
      onChange={(e) => props.onSetIndex(e)}
      indicatorStyle={styles.indicator}
    >
      <Tab.Item
        title={<Icon type="antdesign" name="isv" size={20} />}
        style={{
          backgroundColor: "white",
          padding: 5,
        }}
        titleStyle={styles.item}
      />
      <Tab.Item
        title={<Icon type="antdesign" name="appstore-o" size={20} />}
        style={{ backgroundColor: "white", padding: 5 }}
        titleStyle={styles.item}
      />
      <Tab.Item
        title={<Icon type="antdesign" name="user" size={20} />}
        style={{ backgroundColor: "white", padding: 5 }}
        titleStyle={styles.item}
      />
    </Tab>
  );
};

export default TabsProfile;

const styles = StyleSheet.create({
  indicator: {
    height: 3,
    backgroundColor: Colors.primary,
  },
  item: {
    fontSize: 12,
    fontFamily: "Exo-Medium",
    color: Colors.textDark,
    textTransform: "capitalize",
    paddingVertical: 5,
  },
});
