import { StyleSheet, Text, View, FlatList } from "react-native";
import { TabView } from "react-native-elements";
import React from "react";
import CardProduct from "../../Cards/CardProduct";

const TabViewProfile = (props) => {
  return (
    <TabView
      value={props.index}
      onChange={(e) => onSetIndex(e)}
      animationType="spring"
    >
      <TabView.Item style={{ width: "100%" }}>
        <Text h1>Postari</Text>
      </TabView.Item>
      <TabView.Item style={styles.item}>
        <FlatList
          data={props.products}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CardProduct
              name={item.name}
              description={item.description}
              price={item.price}
              option={item.options[0].name}
            />
          )}
        />
      </TabView.Item>
      <TabView.Item style={{ width: "100%" }}>
        <Text h1>Urmatoarele date disponibile</Text>
      </TabView.Item>
      <TabView.Item style={styles.item}>
        <View style={styles.card}>
          <Text
            style={{
              marginBottom: 10,
              fontFamily: "Exo-SemiBold",
              fontSize: 15,
            }}
          >
            Despre Raducu
          </Text>
          <Text style={{ fontFamily: "Exo-Regular" }}>
            Povestea noastra a inceput intr-o frumoasa primavara cand m-am decis
            sa deschid acest business
          </Text>
        </View>
      </TabView.Item>
    </TabView>
  );
};

export default TabViewProfile;

const styles = StyleSheet.create({
  item: {
    width: "100%",
    marginTop: 5,
    marginBottom: 10,
  },
  card: {
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
    padding: 15,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
