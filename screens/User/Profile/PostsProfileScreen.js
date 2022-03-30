import {
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  View,
} from "react-native";
import { Image, Avatar, Icon } from "react-native-elements";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const posts = [
  {
    _id: "1",
    name: "Post 1",
    image:
      "https://www.menshairstylestoday.com/wp-content/uploads/2021/07/Comb-Over.jpg",
    bookable: false,
  },
  {
    _id: "2",
    name: "Post 2",
    image:
      "https://hairmanz.com/wp-content/uploads/2021/04/professional-hairstyles-for-men-41.jpg",
    bookable: true,
  },
  {
    _id: "3",
    name: "Post 3",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYpti3O_kLfEDyzlwiIY0oiVM5WYw0eS1k3OhWjfevZQdlZsMs8xbIRVAhYN8osBZkBI8&usqp=CAU",
    bookable: true,
  },
  {
    _id: "4",
    name: "Post 4",
    image:
      "https://i2.wp.com/therighthairstyles.com/wp-content/uploads/2015/03/8-spiky-taper-fade.jpg?resize=500%2C514&ssl=1",
    bookable: false,
  },
  {
    _id: "5",
    name: "Post 1",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCqq8hdtxInuBfD3zj2efUzW2CbMdjBadUFQ&usqp=CAU",
    bookable: true,
  },
  {
    _id: "6",
    name: "Post 2",
    image:
      "https://www.thevoguetrends.com/wp-content/uploads/2020/09/118876408_645606756364171_8012788514961451206_n-1024x1024.jpg",
    bookable: false,
  },
  {
    _id: "7",
    name: "Post 3",
    image:
      "https://urbanmenoutfits.com/wp-content/uploads/2018/11/medium-hairstyles-mid-skin-taper-fade-pompadour-02.jpg",
    bookable: true,
  },
  {
    _id: "8",
    name: "Post 4",
    image:
      "https://www.bosshunting.com.au/wp-content/uploads/2020/03/Mens-Low-Fade-Haircut-819x1024.jpg",
    bookable: false,
  },
  {
    _id: "9",
    name: "Post 4",
    image:
      "https://www.whatawink.com/blog/wp-content/uploads/2019/05/Long-spikes-and-partitioned-Hairstyles-For-Men-300x277.jpg",
    bookable: true,
  },
];

const { width } = Dimensions.get("window");

const PostsProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <FlatList
      listKey="posts"
      data={posts}
      numColumns={3}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate("Products")}
        >
          <View style={{ position: "relative" }}>
            <Image
              containerStyle={styles.image}
              source={{ uri: item?.image }}
            />
            {item.bookable && (
              <View
                style={{
                  position: "absolute",
                  zIndex: 10000,
                  top: 5,
                  right: 5,
                }}
              >
                <Icon
                  name="shopping"
                  type="material-community"
                  color="white"
                  size={18}
                />
              </View>
            )}
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default PostsProfileScreen;

const styles = StyleSheet.create({
  box: {
    width: width / 3,
    borderWidth: 1,
    borderColor: "white",
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    width: "100%",
  },
});