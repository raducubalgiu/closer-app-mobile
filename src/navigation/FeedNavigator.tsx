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
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        cardStyle: { backgroundColor: "rgba(0,0,0, 0.4)" },
        presentation: "card",
        detachPreviousScreen: false,
        cardStyleInterpolator: ({ current: { progress } }) => {
          return {
            cardStyle: {
              opacity: progress,
            },
          };
        },
        animationEnabled: true,
      }}
    >
      <Stack.Screen name="FeedExplore" component={FeedExploreScreen} />
      <Stack.Screen name="FeedBookables" component={FeedBookablesScreen} />
      <Stack.Screen name="FeedLastMinute" component={FeedLastMinuteScreen} />
    </Stack.Navigator>
  );
};

export default FeedNavigator;
