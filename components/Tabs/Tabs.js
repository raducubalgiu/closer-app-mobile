import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../assets/styles/Colors";
import { Tab, TabView } from "react-native-elements";

const Tabs = () => {
  const [index, setIndex] = useState(0);

  return (
    <View>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={styles.activeIndicator}
      >
        <Tab.Item
          style={{ backgroundColor: "white" }}
          title="Servicii"
          titleStyle={styles.tabItem}
        />
        <Tab.Item
          style={{ backgroundColor: "white" }}
          title="Recenzii"
          titleStyle={styles.tabItem}
        />
        <Tab.Item
          style={{ backgroundColor: "white" }}
          title="Contact"
          titleStyle={styles.tabItem}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={styles.tabViewItem}>
          <Text h1>Recent</Text>
        </TabView.Item>
        <TabView.Item style={styles.tabViewItem}>
          <Text h1>Favorite</Text>
        </TabView.Item>
        <TabView.Item style={styles.tabViewItem}>
          <Text h1>Cart</Text>
        </TabView.Item>
      </TabView>
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tabItem: {
    fontSize: 15,
    fontFamily: "Exo-Medium",
    color: Colors.textLight,
    textTransform: "capitalize",
  },
  tabViewItem: {
    backgroundColor: "white",
    width: "100%",
  },
  activeIndicator: {
    backgroundColor: Colors.yellowRatings,
    height: 3,
  },
});
