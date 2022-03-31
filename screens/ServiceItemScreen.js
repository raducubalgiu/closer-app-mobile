import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Avatar, Image, Icon, Divider, Badge } from "react-native-elements";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CardProduct from "../components/customized/Cards/CardProduct";
import { Colors } from "../assets/styles/Colors";

const images = [
  "https://images.unsplash.com/photo-1648288582532-7ca072ae2ee3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80",
  "https://images.unsplash.com/photo-1648203223784-d8db8b649eeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
  ,
  "https://images.unsplash.com/photo-1640622300363-4f295638be2e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",
];

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ServiceItemScreen = (props) => {
  const [imageActive, setImageActive] = useState(0);
  const navigation = useNavigation();

  const onChange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide != imageActive) {
        setImageActive(slide);
      }
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.wrap}>
        <ScrollView
          onScroll={({ nativeEvent }) => onChange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}
        >
          {images.map((e, index) => (
            <Image
              key={e}
              resizeMode="stretch"
              style={styles.wrap}
              source={{ uri: e }}
            />
          ))}
        </ScrollView>
        <View style={styles.wrapDot}>
          {images.map((e, index) => (
            <Text
              key={e}
              style={imageActive === index ? styles.dotActive : styles.dot}
            >
              ●
            </Text>
          ))}
        </View>
      </View>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 20,
          marginTop: -20,
          padding: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "Exo-SemiBold",
                  fontSize: 19.5,
                  color: Colors.textDark,
                }}
              >
                Trattoria Monza
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <Icon
                  name="star"
                  type="antdesign"
                  color={Colors.primary}
                  size={17}
                />
                <Text
                  style={{
                    fontFamily: "Exo-SemiBold",
                    fontSize: 16,
                    marginLeft: 5,
                  }}
                >
                  4.5
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 7.5,
              }}
            >
              <Icon
                name="pushpino"
                type="antdesign"
                color={Colors.primary}
                size={20}
              />
              <Text
                style={{
                  fontFamily: "Exo-Medium",
                  marginLeft: 5,
                  fontSize: 14,
                }}
              >
                La 5 km de tine
              </Text>
              <Text
                style={{
                  fontFamily: "Exo-Bold",
                  textTransform: "uppercase",
                  color: Colors.primary,
                  marginLeft: 10,
                }}
              >
                Harta
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <Icon
                name="form"
                type="antdesign"
                color={Colors.primary}
                size={20}
              />
              <Text
                style={{
                  fontFamily: "Exo-Medium",
                  marginLeft: 5,
                  fontSize: 14,
                }}
              >
                135 de recenzii
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <Icon
                name="users"
                type="feather"
                color={Colors.primary}
                size={20}
              />
              <Text
                style={{
                  fontFamily: "Exo-Medium",
                  marginLeft: 5,
                  fontSize: 14,
                }}
              >
                100 de urmaritori
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("User")}
            style={{ alignItems: "center" }}
          >
            <View>
              <Avatar
                source={{
                  uri: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                }}
                rounded
                size={50}
              />
              <Badge
                value={
                  <Icon
                    name="checkmark-sharp"
                    type="ionicon"
                    size={12}
                    color="white"
                  />
                }
                containerStyle={{
                  position: "absolute",
                  top: 0,
                  left: 37,
                }}
              />
            </View>
            <Text
              style={{
                fontFamily: "Exo-Bold",
                textTransform: "uppercase",
                color: Colors.primary,
                marginTop: 10,
              }}
            >
              Profil
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Divider />

      <View style={{ margin: 15 }}>
        <Text
          style={{
            fontFamily: "Exo-SemiBold",
            fontSize: 17,
          }}
        >
          Descriere
        </Text>

        <Text style={{ fontFamily: "Exo-Regular" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem... vezi mai mult
        </Text>
      </View>

      <Divider />

      <View style={{ margin: 15 }}>
        <Text
          style={{
            fontFamily: "Exo-SemiBold",
            fontSize: 17,
          }}
        >
          Produse
        </Text>

        <CardProduct
          name="Tuns scurt"
          option="Barbati"
          price="50"
          description="Some Description about this productttttttttttttttttttttttttt"
        />
        <CardProduct
          name="Tuns scurt"
          option="Barbati"
          price="50"
          description="Some Description about this product tttttttttttttttttt"
        />
        <CardProduct
          name="Tuns scurt"
          option="Barbati"
          price="50"
          description="Some Description about this product"
        />
        <CardProduct
          name="Tuns scurt"
          option="Barbati"
          price="50"
          description="Some Description about this productttttttttttttttttttttttttttttttttt"
        />
      </View>
    </View>
  );
};

export default ServiceItemScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.33,
  },
  wrapDot: {
    position: "absolute",
    bottom: 25,
    flexDirection: "row",
    alignSelf: "center",
  },
  dotActive: {
    margin: 3,
    color: Colors.primary,
  },
  dot: {
    margin: 3,
    color: "white",
  },
  about: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  name: {
    fontFamily: "Exo-Bold",
    fontSize: 21,
    color: Colors.textDark,
  },
});
