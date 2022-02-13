import { StyleSheet, Text, View } from "react-native";
import React from "react";

const FiltersScreen = ({ route }) => {
  const { serviceId } = route.params;

  console.log(serviceId);

  return (
    <View style={styles.screen}>
      <Text>FilterScreen</Text>
    </View>
  );
};

export default FiltersScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
