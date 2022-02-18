import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../assets/styles/Colors";
import { Tab, TabView } from "react-native-elements";
import CardPriceHeader from "../Cards/CardPriceHeader";
import { FlatList } from "react-native-gesture-handler";

const data = [
  {
    _id: 1,
    personImage:
      "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg",
    personName: "Cristiana Dumitrache",
    personJob: "Stylist",
    personRatingsAverage: 4.5,
    personRatingsQuantity: 100,
    services: [
      {
        _id: 1,
        serviceTitle: "Tuns Scurt",
        gender: "Femeie",
        description: "Some description for this service",
        servicePrice: 50,
      },
      {
        _id: 2,
        serviceTitle: "Tuns Mediu",
        gender: "Femei",
        description: "Some description for this service",
        servicePrice: 75,
      },
      {
        _id: 3,
        serviceTitle: "Tuns Lung",
        gender: "Femei",
        description: "Some description for this service",
        servicePrice: 100,
      },
    ],
  },
  {
    _id: 2,
    personImage: "https://randomuser.me/api/portraits/men/36.jpg",
    personName: "Cristiano Ronaldo",
    personJob: "Stylist",
    personRatingsAverage: 4.5,
    personRatingsQuantity: 100,
    services: [
      {
        _id: 1,
        serviceTitle: "Tuns Scurt",
        gender: "Femei",
        description: "Some description for this service",
        servicePrice: 50,
      },
      {
        _id: 2,
        serviceTitle: "Tuns Mediu",
        gender: "Femei",
        description: "Some description for this service",
        servicePrice: 75,
      },
      {
        _id: 3,
        serviceTitle: "Tuns Lung",
        gender: "Femei",
        description: "Some description for this service",
        servicePrice: 100,
      },
    ],
  },
];

const Tabs = () => {
  const [index, setIndex] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={styles.activeIndicator}
      >
        <Tab.Item
          style={{ backgroundColor: "white" }}
          title="Servicii"
          titleStyle={styles.tabItemActive}
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
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <CardPriceHeader
                personImage={item.personImage}
                personName={item.personName}
                personJob={item.personJob}
                personRatingsAverage={item.personRatingsAverage}
                personRatingsQuantity={item.personRatingsQuantity}
                services={item.services}
              />
            )}
          />
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
  container: {
    flex: 1,
  },
  tabItem: {
    fontSize: 15,
    fontFamily: "Exo-SemiBold",
    color: Colors.textLight,
    textTransform: "capitalize",
  },
  tabItemActive: {
    fontSize: 16,
    fontFamily: "Exo-Bold",
    color: Colors.textDark,
    textTransform: "capitalize",
  },
  tabViewItem: {
    flex: 1,
    width: "100%",
    padding: 15,
  },
  activeIndicator: {
    backgroundColor: Colors.yellowRatings,
    height: 3,
  },
});
