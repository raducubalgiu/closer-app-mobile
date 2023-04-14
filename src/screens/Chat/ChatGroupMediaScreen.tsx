import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Header } from "../../components/core";
import { TopTabContainer } from "../../components/customized";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

type IProps = { chatId: string };

export const ChatGroupMediaScreen = ({ chatId }: IProps) => {
  const Tab = createMaterialTopTabNavigator();

  const Media = () => {
    return (
      <View>
        <Text>Media</Text>
      </View>
    );
  };

  const Posts = () => {
    return (
      <View>
        <Text>Posts</Text>
      </View>
    );
  };

  const Products = () => {
    return (
      <View>
        <Text>Products</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Media" />
      <TopTabContainer initialRouteName="Media">
        <Tab.Screen name="Media" component={Media} />
        <Tab.Screen name="Posts" component={Posts} />
        <Tab.Screen name="Products" component={Products} />
      </TopTabContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
