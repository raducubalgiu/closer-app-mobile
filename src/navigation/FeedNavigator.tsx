import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import {
  FeedExploreScreen,
  FeedExploreVideoScreen,
  FeedBookablesScreen,
  FeedLastMinuteScreen,
  SearchPostsScreen,
  SearchAllScreen,
  SearchPopularDetailScreen,
} from "../screens";
import { RootStackParams } from "./rootStackParams";

const Stack = createSharedElementStackNavigator<RootStackParams>();

const FeedNavigator = () => {
  return (
    <Stack.Navigator
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
      <Stack.Screen name="SearchPosts" component={SearchPostsScreen} />
      <Stack.Screen name="SearchAll" component={SearchAllScreen} />
      <Stack.Screen
        name="FeedExploreVideo"
        component={FeedExploreVideoScreen}
        sharedElements={(route) => {
          const { video, videos, index } = route.params;
          return [
            {
              id: video.id,
              videos,
              index,
            },
          ];
        }}
      />
      <Stack.Screen
        name="SearchPopular"
        component={SearchPopularDetailScreen}
        sharedElements={(route, otherRoute, showing) => {
          const { post, posts, index } = route.params;
          return [
            {
              id: post.id,
              posts,
              index,
            },
          ];
        }}
      />
    </Stack.Navigator>
  );
};

export default FeedNavigator;
