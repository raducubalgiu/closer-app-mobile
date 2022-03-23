import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { FlatList } from "react-native";
import { Colors } from "../assets/styles/Colors";
import { Avatar, Icon, Image } from "react-native-elements";
import CardUserRecommend from "../components/Cards/CardUserRecommend";

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

const SocialScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            padding: 15,
            marginHorizontal: 15,
            marginVertical: 5,
            borderTopLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon type="antdesign" name="search1" size={18} />
            <Text style={{ fontFamily: "Exo-Regular", marginLeft: 10 }}>
              Cauta profesionisti
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={{ paddingVertical: 10 }}>
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
              Urmareste profesionisti din toate domeniile si vezi postarile lor
            </Text>
          </View>
          <View>
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
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.title}>Postari sugerate</Text>

          <View
            style={{
              marginVertical: 15,
              borderTopLeftRadius: 20,
              borderBottomRightRadius: 20,
              borderWidth: 1,
              borderColor: "#f1f1f1",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                  paddingHorizontal: 10,
                }}
              >
                <Avatar
                  size={35}
                  rounded
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/36.jpg",
                  }}
                />
                <View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{ fontFamily: "Exo-SemiBold", marginLeft: 10 }}
                    >
                      Raducu Balgiu
                    </Text>
                    <Text
                      style={{
                        marginBottom: 5,
                        marginLeft: 5,
                        fontFamily: "Exo-SemiBold",
                        color: Colors.primary,
                      }}
                    >
                      Stylist
                    </Text>
                  </View>
                  <Text style={{ marginLeft: 10, color: Colors.textLight }}>
                    acum 3 zile
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    marginRight: 15,
                    backgroundColor: "#eee",
                    padding: 10,
                    borderTopLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.textDark,
                      fontFamily: "Exo-SemiBold",
                      fontSize: 13,
                    }}
                  >
                    Urmareste
                  </Text>
                </TouchableOpacity>
                <Icon
                  type="entypo"
                  name="dots-three-horizontal"
                  style={{ marginRight: 10 }}
                  size={20}
                />
              </View>
            </View>
            <Image
              source={{
                uri: "https://scontent.fotp3-1.fna.fbcdn.net/v/t1.6435-9/71498148_2594599870570594_298053640667529216_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=aC8ZXpx_xuEAX_aGm48&_nc_ht=scontent.fotp3-1.fna&oh=00_AT-6dhu68XyoRTuvt3TQJ3b80pAUGxYLH7DHSIZiJlTYwA&oe=6262C37F",
              }}
              style={{
                aspectRatio: 1,
                width: "100%",
                height: 300,
                flex: 1,
                borderBottomLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
            <View
              style={{
                padding: 10,
              }}
            >
              <Text style={{ fontFamily: "Exo-Regular" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry..
              </Text>
            </View>
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{ fontFamily: "Exo-SemiBold", color: Colors.textDark }}
                >
                  15 aprecieri
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity>
                  <Icon
                    type="antdesign"
                    name="sharealt"
                    style={{ marginRight: 15 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon
                    type="antdesign"
                    name="message1"
                    style={{ marginRight: 15 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon type="antdesign" name="hearto" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              marginVertical: 15,
              borderTopLeftRadius: 20,
              borderBottomRightRadius: 20,
              borderWidth: 1,
              borderColor: "#f1f1f1",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                  paddingHorizontal: 10,
                }}
              >
                <Avatar
                  size={35}
                  rounded
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/36.jpg",
                  }}
                />
                <View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{ fontFamily: "Exo-SemiBold", marginLeft: 10 }}
                    >
                      Raducu Balgiu
                    </Text>
                    <Text
                      style={{
                        marginBottom: 5,
                        marginLeft: 5,
                        fontFamily: "Exo-SemiBold",
                        color: Colors.primary,
                      }}
                    >
                      Stylist
                    </Text>
                  </View>
                  <Text style={{ marginLeft: 10, color: Colors.textLight }}>
                    acum 3 zile
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    marginRight: 15,
                    backgroundColor: "#eee",
                    padding: 10,
                    borderTopLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.textDark,
                      fontFamily: "Exo-SemiBold",
                      fontSize: 13,
                    }}
                  >
                    Urmareste
                  </Text>
                </TouchableOpacity>
                <Icon
                  type="entypo"
                  name="dots-three-horizontal"
                  style={{ marginRight: 10 }}
                  size={20}
                />
              </View>
            </View>
            <Image
              source={{
                uri: "https://scontent.fotp3-1.fna.fbcdn.net/v/t1.6435-9/71498148_2594599870570594_298053640667529216_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=aC8ZXpx_xuEAX_aGm48&_nc_ht=scontent.fotp3-1.fna&oh=00_AT-6dhu68XyoRTuvt3TQJ3b80pAUGxYLH7DHSIZiJlTYwA&oe=6262C37F",
              }}
              style={{
                aspectRatio: 1,
                width: "100%",
                height: 300,
                flex: 1,
                borderBottomLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
            <View
              style={{
                padding: 10,
              }}
            >
              <Text style={{ fontFamily: "Exo-Regular" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry..
              </Text>
            </View>
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{ fontFamily: "Exo-SemiBold", color: Colors.textDark }}
                >
                  15 aprecieri
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity>
                  <Icon
                    type="antdesign"
                    name="sharealt"
                    style={{ marginRight: 15 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon
                    type="antdesign"
                    name="message1"
                    style={{ marginRight: 15 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon type="antdesign" name="hearto" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              marginVertical: 15,
              borderTopLeftRadius: 20,
              borderBottomRightRadius: 20,
              borderWidth: 1,
              borderColor: "#f1f1f1",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                  paddingHorizontal: 10,
                }}
              >
                <Avatar
                  size={35}
                  rounded
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/36.jpg",
                  }}
                />
                <View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{ fontFamily: "Exo-SemiBold", marginLeft: 10 }}
                    >
                      Raducu Balgiu
                    </Text>
                    <Text
                      style={{
                        marginBottom: 5,
                        marginLeft: 5,
                        fontFamily: "Exo-SemiBold",
                        color: Colors.primary,
                      }}
                    >
                      Stylist
                    </Text>
                  </View>
                  <Text style={{ marginLeft: 10, color: Colors.textLight }}>
                    acum 3 zile
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    marginRight: 15,
                    backgroundColor: "#eee",
                    padding: 10,
                    borderTopLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.textDark,
                      fontFamily: "Exo-SemiBold",
                      fontSize: 13,
                    }}
                  >
                    Urmareste
                  </Text>
                </TouchableOpacity>
                <Icon
                  type="entypo"
                  name="dots-three-horizontal"
                  style={{ marginRight: 10 }}
                  size={20}
                />
              </View>
            </View>
            <Image
              source={{
                uri: "https://scontent.fotp3-1.fna.fbcdn.net/v/t1.6435-9/71498148_2594599870570594_298053640667529216_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=aC8ZXpx_xuEAX_aGm48&_nc_ht=scontent.fotp3-1.fna&oh=00_AT-6dhu68XyoRTuvt3TQJ3b80pAUGxYLH7DHSIZiJlTYwA&oe=6262C37F",
              }}
              style={{
                aspectRatio: 1,
                width: "100%",
                height: 300,
                flex: 1,
                borderBottomLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
            <View
              style={{
                padding: 10,
              }}
            >
              <Text style={{ fontFamily: "Exo-Regular" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry..
              </Text>
            </View>
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{ fontFamily: "Exo-SemiBold", color: Colors.textDark }}
                >
                  15 aprecieri
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity>
                  <Icon
                    type="antdesign"
                    name="sharealt"
                    style={{ marginRight: 15 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon
                    type="antdesign"
                    name="message1"
                    style={{ marginRight: 15 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon type="antdesign" name="hearto" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              marginVertical: 15,
              borderTopLeftRadius: 20,
              borderBottomRightRadius: 20,
              borderWidth: 1,
              borderColor: "#f1f1f1",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                  paddingHorizontal: 10,
                }}
              >
                <Avatar
                  size={35}
                  rounded
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/36.jpg",
                  }}
                />
                <View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{ fontFamily: "Exo-SemiBold", marginLeft: 10 }}
                    >
                      Raducu Balgiu
                    </Text>
                    <Text
                      style={{
                        marginBottom: 5,
                        marginLeft: 5,
                        fontFamily: "Exo-SemiBold",
                        color: Colors.primary,
                      }}
                    >
                      Stylist
                    </Text>
                  </View>
                  <Text style={{ marginLeft: 10, color: Colors.textLight }}>
                    acum 3 zile
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    marginRight: 15,
                    backgroundColor: "#eee",
                    padding: 10,
                    borderTopLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.textDark,
                      fontFamily: "Exo-SemiBold",
                      fontSize: 13,
                    }}
                  >
                    Urmareste
                  </Text>
                </TouchableOpacity>
                <Icon
                  type="entypo"
                  name="dots-three-horizontal"
                  style={{ marginRight: 10 }}
                  size={20}
                />
              </View>
            </View>
            <Image
              source={{
                uri: "https://scontent.fotp3-1.fna.fbcdn.net/v/t1.6435-9/71498148_2594599870570594_298053640667529216_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=aC8ZXpx_xuEAX_aGm48&_nc_ht=scontent.fotp3-1.fna&oh=00_AT-6dhu68XyoRTuvt3TQJ3b80pAUGxYLH7DHSIZiJlTYwA&oe=6262C37F",
              }}
              style={{
                aspectRatio: 1,
                width: "100%",
                height: 300,
                flex: 1,
                borderBottomLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
            <View
              style={{
                padding: 10,
              }}
            >
              <Text style={{ fontFamily: "Exo-Regular" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry..
              </Text>
            </View>
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{ fontFamily: "Exo-SemiBold", color: Colors.textDark }}
                >
                  15 aprecieri
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity>
                  <Icon
                    type="antdesign"
                    name="sharealt"
                    style={{ marginRight: 15 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon
                    type="antdesign"
                    name="message1"
                    style={{ marginRight: 15 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon type="antdesign" name="hearto" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              marginVertical: 15,
              borderTopLeftRadius: 20,
              borderBottomRightRadius: 20,
              borderWidth: 1,
              borderColor: "#f1f1f1",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                  paddingHorizontal: 10,
                }}
              >
                <Avatar
                  size={35}
                  rounded
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/36.jpg",
                  }}
                />
                <View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{ fontFamily: "Exo-SemiBold", marginLeft: 10 }}
                    >
                      Raducu Balgiu
                    </Text>
                    <Text
                      style={{
                        marginBottom: 5,
                        marginLeft: 5,
                        fontFamily: "Exo-SemiBold",
                        color: Colors.primary,
                      }}
                    >
                      Stylist
                    </Text>
                  </View>
                  <Text style={{ marginLeft: 10, color: Colors.textLight }}>
                    acum 3 zile
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    marginRight: 15,
                    backgroundColor: "#eee",
                    padding: 10,
                    borderTopLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.textDark,
                      fontFamily: "Exo-SemiBold",
                      fontSize: 13,
                    }}
                  >
                    Urmareste
                  </Text>
                </TouchableOpacity>
                <Icon
                  type="entypo"
                  name="dots-three-horizontal"
                  style={{ marginRight: 10 }}
                  size={20}
                />
              </View>
            </View>
            <Image
              source={{
                uri: "https://scontent.fotp3-1.fna.fbcdn.net/v/t1.6435-9/71498148_2594599870570594_298053640667529216_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=aC8ZXpx_xuEAX_aGm48&_nc_ht=scontent.fotp3-1.fna&oh=00_AT-6dhu68XyoRTuvt3TQJ3b80pAUGxYLH7DHSIZiJlTYwA&oe=6262C37F",
              }}
              style={{
                aspectRatio: 1,
                width: "100%",
                height: 300,
                flex: 1,
                borderBottomLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
            <View
              style={{
                padding: 10,
              }}
            >
              <Text style={{ fontFamily: "Exo-Regular" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry..
              </Text>
            </View>
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{ fontFamily: "Exo-SemiBold", color: Colors.textDark }}
                >
                  15 aprecieri
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity>
                  <Icon
                    type="antdesign"
                    name="sharealt"
                    style={{ marginRight: 15 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon
                    type="antdesign"
                    name="message1"
                    style={{ marginRight: 15 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon type="antdesign" name="hearto" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              marginVertical: 15,
              borderTopLeftRadius: 20,
              borderBottomRightRadius: 20,
              borderWidth: 1,
              borderColor: "#f1f1f1",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                  paddingHorizontal: 10,
                }}
              >
                <Avatar
                  size={35}
                  rounded
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/36.jpg",
                  }}
                />
                <View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{ fontFamily: "Exo-SemiBold", marginLeft: 10 }}
                    >
                      Raducu Balgiu
                    </Text>
                    <Text
                      style={{
                        marginBottom: 5,
                        marginLeft: 5,
                        fontFamily: "Exo-SemiBold",
                        color: Colors.primary,
                      }}
                    >
                      Stylist
                    </Text>
                  </View>
                  <Text style={{ marginLeft: 10, color: Colors.textLight }}>
                    acum 3 zile
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    marginRight: 15,
                    backgroundColor: "#eee",
                    padding: 10,
                    borderTopLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.textDark,
                      fontFamily: "Exo-SemiBold",
                      fontSize: 13,
                    }}
                  >
                    Urmareste
                  </Text>
                </TouchableOpacity>
                <Icon
                  type="entypo"
                  name="dots-three-horizontal"
                  style={{ marginRight: 10 }}
                  size={20}
                />
              </View>
            </View>
            <Image
              source={{
                uri: "https://scontent.fotp3-1.fna.fbcdn.net/v/t1.6435-9/71498148_2594599870570594_298053640667529216_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=aC8ZXpx_xuEAX_aGm48&_nc_ht=scontent.fotp3-1.fna&oh=00_AT-6dhu68XyoRTuvt3TQJ3b80pAUGxYLH7DHSIZiJlTYwA&oe=6262C37F",
              }}
              style={{
                aspectRatio: 1,
                width: "100%",
                height: 300,
                flex: 1,
                borderBottomLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
            <View
              style={{
                padding: 10,
              }}
            >
              <Text style={{ fontFamily: "Exo-Regular" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry..
              </Text>
            </View>
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{ fontFamily: "Exo-SemiBold", color: Colors.textDark }}
                >
                  15 aprecieri
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity>
                  <Icon
                    type="antdesign"
                    name="sharealt"
                    style={{ marginRight: 15 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon
                    type="antdesign"
                    name="message1"
                    style={{ marginRight: 15 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon type="antdesign" name="hearto" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              marginVertical: 15,
              borderTopLeftRadius: 20,
              borderBottomRightRadius: 20,
              borderWidth: 1,
              borderColor: "#f1f1f1",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                  paddingHorizontal: 10,
                }}
              >
                <Avatar
                  size={35}
                  rounded
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/36.jpg",
                  }}
                />
                <View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{ fontFamily: "Exo-SemiBold", marginLeft: 10 }}
                    >
                      Raducu Balgiu
                    </Text>
                    <Text
                      style={{
                        marginBottom: 5,
                        marginLeft: 5,
                        fontFamily: "Exo-SemiBold",
                        color: Colors.primary,
                      }}
                    >
                      Stylist
                    </Text>
                  </View>
                  <Text style={{ marginLeft: 10, color: Colors.textLight }}>
                    acum 3 zile
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    marginRight: 15,
                    backgroundColor: "#eee",
                    padding: 10,
                    borderTopLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.textDark,
                      fontFamily: "Exo-SemiBold",
                      fontSize: 13,
                    }}
                  >
                    Urmareste
                  </Text>
                </TouchableOpacity>
                <Icon
                  type="entypo"
                  name="dots-three-horizontal"
                  style={{ marginRight: 10 }}
                  size={20}
                />
              </View>
            </View>
            <Image
              source={{
                uri: "https://scontent.fotp3-1.fna.fbcdn.net/v/t1.6435-9/71498148_2594599870570594_298053640667529216_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=aC8ZXpx_xuEAX_aGm48&_nc_ht=scontent.fotp3-1.fna&oh=00_AT-6dhu68XyoRTuvt3TQJ3b80pAUGxYLH7DHSIZiJlTYwA&oe=6262C37F",
              }}
              style={{
                aspectRatio: 1,
                width: "100%",
                height: 300,
                flex: 1,
                borderBottomLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
            <View
              style={{
                padding: 10,
              }}
            >
              <Text style={{ fontFamily: "Exo-Regular" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry..
              </Text>
            </View>
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{ fontFamily: "Exo-SemiBold", color: Colors.textDark }}
                >
                  15 aprecieri
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity>
                  <Icon
                    type="antdesign"
                    name="sharealt"
                    style={{ marginRight: 15 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon
                    type="antdesign"
                    name="message1"
                    style={{ marginRight: 15 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon type="antdesign" name="hearto" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SocialScreen;

const styles = StyleSheet.create({
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
    backgroundColor: "white",
    flex: 1,
  },
  title: {
    fontFamily: "Exo-SemiBold",
    fontSize: 18,
    color: Colors.textDark,
    paddingLeft: 10,
    marginVertical: 10,
  },
});
