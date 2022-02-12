import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Divider } from "react-native-elements";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../assets/styles/Colors";

const data = [
  {
    id: "6",
    title: "Toate serviciile",
    icon: "category",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Smart_logo.svg/2048px-Smart_logo.svg.png",
  },
  {
    id: "4",
    title: "ITP",
    icon: "car-repair",
    image:
      "https://itp-dumbravita.ro/wp-content/uploads/2021/07/cropped-logo-itp-dumbravita-mic.png",
  },
  {
    id: "1",
    title: "Restaurant",
    icon: "restaurant",
    image:
      "https://www.pngall.com/wp-content/uploads/8/Restaurant-Chef-PNG-Free-Download.png",
  },
  {
    id: "5",
    title: "Spalatorie auto",
    icon: "local-car-wash",
    image:
      "https://image.shutterstock.com/image-vector/vector-icons-logos-car-repair-260nw-1968480934.jpg",
  },
  {
    id: "3",
    title: "Masaj",
    icon: "airline-seat-recline-extra",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr6YuFn36i93VvHnXWrgntwzgdsLJAs1-ViQ&usqp=CAU",
  },
  {
    id: "2",
    title: "Tuns",
    icon: "restaurant",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEq-5Ke0jJ2fakdPr5Ntn2IFNWkF_SZ_T-Ya91Sj2yqsESTPu8KHtXjD4gdLjKIX5FhWU&usqp=CAU",
  },
];

const ServicesCategories = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={styles.servicesContainer}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 20,
          paddingTop: 5,
          paddingHorizontal: 10,
        }}
      >
        <Text style={styles.servicesHeading}>{t("servicesHeading")}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AllServices")}>
          <Text style={styles.seeAllHeading}>{t("seeAll")}</Text>
        </TouchableOpacity>
      </View>
      <Divider />
      <FlatList
        nestedScrollEnabled={true}
        horizontal
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              alignItems: "center",
              marginRight: 20,
              paddingVertical: 20,
              flex: 1,
              paddingHorizontal: 5,
            }}
          >
            <TouchableOpacity>
              <Image
                style={{
                  width: 70,
                  height: 70,
                  resizeMode: "contain",
                }}
                source={{
                  uri: item.image,
                }}
              />
            </TouchableOpacity>
            <Text style={styles.servicesTitle}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ServicesCategories;

const styles = StyleSheet.create({
  servicesContainer: {
    backgroundColor: "white",
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    shadowColor: "#c9c5c5",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,

    elevation: 11,
  },
  servicesHeading: {
    color: Colors.textDark,
    fontFamily: "IBMPlexSansThaiLooped-SemiBold",
    fontSize: 15,
  },
  seeAllHeading: {
    color: Colors.textDark,
    fontSize: 12,
    fontFamily: "Exo-SemiBold",
    color: Colors.textLight,
  },
  servicesTitle: {
    marginTop: 10,
    maxWidth: 150,
    textAlign: "center",
    fontSize: 13,
    fontFamily: "Exo-SemiBold",
    color: Colors.textDark,
    fontSize: 13,
  },
});
