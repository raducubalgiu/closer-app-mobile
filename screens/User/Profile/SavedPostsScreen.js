import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import React from "react";
import HeaderReusable from "../../../components/customized/Headers/HeaderReusable";
import { AllSavedTab, SavedVideoTab, OpportunitiesTab } from "./SavedTabs";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../assets/styles/Colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";


const SavedPostsScreen = () => {
  const Tab = createMaterialTopTabNavigator();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderReusable
        firstBox={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-ios" type="material" size={20} />
          </TouchableOpacity>
        }
        secondBox={<Text style={styles.headerTitle}>Salvate</Text>}
        thirdBox={<Icon name="arrow-back-ios" type="material" color="white" />}
      />
      <Tab.Navigator
        initialRouteName="SavedAll"
        screenOptions={{
          tabBarLabelStyle: {
            fontFamily: "Exo-SemiBold",
            textTransform: "capitalize",
            fontSize: 14,
          },
        }}
      >
        <Tab.Screen
          name="SavedAll"
          component={AllSavedTab}
          options={{ tabBarLabel: "Toate" }}
        />
        <Tab.Screen
          name="SavedVideo"
          component={SavedVideoTab}
          options={{ tabBarLabel: "Video" }}
        />
        <Tab.Screen
          name="Opportunities"
          component={OpportunitiesTab}
          options={{ tabBarLabel: "Oportunitati" }}
        />
      </Tab.Navigator>
      
    </SafeAreaView>
  );
};

export default SavedPostsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  headerTitle: {
    fontFamily: "Exo-Bold",
    fontSize: 16,
    color: Colors.textDark,
  },
});
