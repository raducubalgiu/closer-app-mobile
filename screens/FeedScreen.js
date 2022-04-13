import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import CardUserRecommend from "../components/customized/Cards/CardUserRecommend";
import CardPost from "../components/customized/Cards/CardPost";
import { Colors } from "../assets/styles/Colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  FeedFollowingTab,
  FeedRecommendedTab,
  FeedLastMinuteTab,
} from "../components/customized/FeedTabs";

const DUMMY_RECOMMEND_PROF = [
  {
    _id: "1",
    name: "Raducu Balgiu",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    job: "Stylist",
    posts: [
      {
        image: "",
      },
      {
        image: "",
      },
      {
        image: "",
      },
    ],
    followersCount: "10k",
  },
  {
    _id: "2",
    name: "Gindac Mihai",
    avatar:
      "https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg",
    job: "Avocat",
    posts: [
      {
        image: "",
      },
      {
        image: "",
      },
      {
        image: "",
      },
    ],
    followersCount: "100",
  },
  {
    _id: "3",
    name: "Gigi Becali",
    avatar:
      "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",
    job: "Stomatolog",
    posts: [
      {
        image: "",
      },
      {
        image: "",
      },
      {
        image: "",
      },
    ],
    followersCount: "5",
  },
  {
    _id: "4",
    name: "Popescu Ionel",
    avatar:
      "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",
    job: "Stylist",
    posts: [
      {
        image: "",
      },
      {
        image: "",
      },
      {
        image: "",
      },
    ],
    followersCount: "5",
  },
  {
    _id: "5",
    name: "Gigi Becali",
    avatar:
      "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",
    job: "Stomatolog",
    posts: [
      {
        image: "",
      },
      {
        image: "",
      },
      {
        image: "",
      },
    ],
    followersCount: "5",
  },
  {
    _id: "6",
    name: "Gigi Becali",
    avatar:
      "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",
    job: "Stomatolog",
    posts: [
      {
        image: "",
      },
      {
        image: "",
      },
      {
        image: "",
      },
    ],
    followersCount: "5",
  },
  {
    _id: "7",
    name: "Gigi Becali",
    avatar:
      "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",
    job: "Stomatolog",
    posts: [
      {
        image: "",
      },
      {
        image: "",
      },
      {
        image: "",
      },
    ],
    followersCount: "5",
  },
];
const DUMMY_POSTS = [
  {
    _id: "1",
    description: "This description is just very very cool...",
    image:
      "https://scontent.fotp3-1.fna.fbcdn.net/v/t1.6435-9/71498148_2594599870570594_298053640667529216_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=aC8ZXpx_xuEAX_aGm48&_nc_ht=scontent.fotp3-1.fna&oh=00_AT-6dhu68XyoRTuvt3TQJ3b80pAUGxYLH7DHSIZiJlTYwA&oe=6262C37F",
    likes: 150,
    createdDate: "3 days ago",
    user: {
      _id: "1",
      name: "Raducu Balgiu",
      avatar: "https://randomuser.me/api/portraits/men/36.jpg",
      job: "Stylist",
    },
  },
  {
    _id: "2",
    description: "This description is just very very cool...",
    image:
      "https://stailer.ro/files/NVIJREJX/portfolio/tuns-special-bucuresti-1648062304.jpg",
    likes: 150,
    createdDate: "3 days ago",
    user: {
      _id: "1",
      name: "Popescu Ionel",
      avatar: "https://randomuser.me/api/portraits/men/36.jpg",
      job: "Stylist",
    },
  },
  {
    _id: "3",
    description: "This description is just very very cool...",
    image:
      "https://stailer.ro/files/CWAHYHHJ/portfolio/machiaj-evenimente-cluj-napoca-1648055118.jpg",
    likes: 150,
    createdDate: "3 days ago",
    user: {
      _id: "1",
      name: "Ionela Paraschiv",
      avatar: "https://randomuser.me/api/portraits/men/36.jpg",
      job: "Stylist",
    },
  },
  {
    _id: "4",
    description: "This description is just very very cool...",
    image:
      "https://doctoruldedinti.info/wp-content/uploads/2013/07/amenajarea-unui-cabinet-dentar.jpg",
    likes: 150,
    createdDate: "3 days ago",
    user: {
      _id: "1",
      name: "Radu Ion",
      avatar: "https://randomuser.me/api/portraits/men/36.jpg",
      job: "Stomatolog",
    },
  },
];

const FeedScreen = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <TouchableOpacity
          style={{
            marginHorizontal: 15,
            marginTop: 5,
            backgroundColor: "#f1f1f1",
            paddingHorizontal: 10,
            paddingVertical: 8.5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View flexDirection="row" alignItems="center">
              <Icon
                type="antdesign"
                name="search1"
                size={18}
                color={Colors.textLight}
              />
              <Text
                style={{
                  fontFamily: "Exo-Regular",
                  marginLeft: 15,
                  color: Colors.textLight,
                }}
              >
                Cauta
              </Text>
            </View>
            {/* <Icon type="antdesign" name="team" color={Colors.textLight} /> */}
          </View>
        </TouchableOpacity>
      </SafeAreaView>
      <Tab.Navigator
        initialRouteName="Following"
        screenOptions={{
          tabBarActiveTintColor: "#e91e63",
          tabBarLabelStyle: { fontSize: 12 },
        }}
      >
        <Tab.Screen
          name="Following"
          component={FeedFollowingTab}
          options={{ tabBarLabel: "Urmaresti" }}
        />
        <Tab.Screen
          name="Recommended"
          component={FeedRecommendedTab}
          options={{ tabBarLabel: "Recomandari" }}
        />
        <Tab.Screen
          name="LastMinute"
          component={FeedLastMinuteTab}
          options={{ tabBarLabel: "Last Minute" }}
        />
      </Tab.Navigator>
      {/* <FlatList
        ListHeaderComponent={
          <View style={{ marginTop: 15 }}>
            <View style={{ alignItems: "center", marginBottom: 5 }}>
              <Icon
                type="material"
                name="local-fire-department"
                size={35}
                color={Colors.primary}
                style={{ marginBottom: 20 }}
              />
              <Text style={styles.welcome}>Bun venit in Social</Text>
              <Text style={styles.description}>
                Urmareste profesionisti din toate domeniile si vezi postarile
                lor
              </Text>
            </View>
            <FlatList
              nestedScrollEnabled={true}
              horizontal
              data={DUMMY_RECOMMEND_PROF}
              keyExtractor={(item) => item._id}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <CardUserRecommend
                  avatar={item.avatar}
                  name={item.name}
                  folllowersCount={item.followersCount}
                  job={item.job}
                />
              )}
            />
            <Text style={styles.title}>Postari sugerate</Text>
          </View>
        }
        data={DUMMY_POSTS}
        nestedScrollEnabled={true}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CardPost
            avatar={item.user.avatar}
            name={item.user.name}
            job={item.user.job}
            date={item.createdDate}
            image={item.image}
            description={item.description}
            likes={item.likes}
          />
        )}
      /> */}
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "white" },
  welcome: {
    fontFamily: "Exo-SemiBold",
    fontSize: 21,
    marginBottom: 2.5,
  },
  description: {
    fontFamily: "Exo-Regular",
    color: Colors.textLight,
    fontSize: 15,
    textAlign: "center",
    paddingHorizontal: 30,
  },
  container: {
    marginTop: 10,
    flex: 1,
  },
  title: {
    fontFamily: "Exo-SemiBold",
    fontSize: 18,
    color: Colors.textDark,
    paddingLeft: 10,
    marginTop: 30,
  },
});
