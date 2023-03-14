import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import {
  FeedExploreScreen,
  FeedBookablesScreen,
  FeedLastMinuteScreen,
} from "../screens";

const Stack = createSharedElementStackNavigator();

const FeedNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Feed"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="FeedExplore" component={FeedExploreScreen} />
      <Stack.Screen name="FeedBookables" component={FeedBookablesScreen} />
      <Stack.Screen name="FeedLastMinute" component={FeedLastMinuteScreen} />
    </Stack.Navigator>
  );
};

export default FeedNavigator;
