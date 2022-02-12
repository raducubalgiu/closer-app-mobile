import { StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import ServicesCategories from "../components/ServicesCategories.js/ServicesCategories";
import BottomSheetRecommend from "../components/BottomSheets/BottomSheetRecommend";
import FakeSearchBar from "../components/FakeSearchBar/FakeSearchBar";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <FakeSearchBar />
      <ServicesCategories />
      <BottomSheetRecommend />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
