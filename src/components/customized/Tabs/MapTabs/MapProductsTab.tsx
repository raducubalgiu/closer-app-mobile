import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";

const MapProductsTab = () => {
  return (
    <View>
      <Text>MapProducts</Text>
    </View>
  );
};

export default memo(MapProductsTab);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
