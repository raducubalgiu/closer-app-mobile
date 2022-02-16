import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BackSearchFilter from "../components/Headers/BackSearchFilter";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { Avatar } from "react-native-elements";
import { Colors } from "../assets/styles/Colors";
import { useNavigation } from "@react-navigation/native";

const ServicesNavigation = () => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get("http://192.168.100.2:8000/api/v1/categories")
      .then((resp) => {
        setCategories(resp.data.categories);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleAccordion = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <BackSearchFilter />
      <View style={styles.servicesContainer}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                activeOpacity={1}
                onPress={handleAccordion}
                style={{
                  backgroundColor: "#f1f1f1",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <Text style={{ fontFamily: "Exo-Medium" }}>{item.name}</Text>
                <Icon
                  size={18}
                  name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                  style={{ backgroundColor: "white", borderRadius: 50 }}
                />
              </TouchableOpacity>

              {isOpen && (
                <FlatList
                  data={item.services}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <View style={{ paddingHorizontal: 15 }}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Services", {
                            serviceId: item._id,
                          })
                        }
                        activeOpacity={1}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          paddingVertical: 15,
                        }}
                      >
                        <Avatar
                          size={40}
                          rounded
                          source={{
                            uri: `${item.image}`,
                          }}
                          title={item.name}
                        ></Avatar>
                        <View style={{ marginLeft: 10 }}>
                          <Text
                            style={{
                              fontFamily: "Exo-Medium",
                              textTransform: "uppercase",
                            }}
                          >
                            {item.name}
                          </Text>
                          <Text
                            style={{
                              fontFamily: "Exo-Regular",
                              fontSize: 12,
                              color: Colors.textLight,
                            }}
                          >
                            5 rezultate
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <Divider />
                    </View>
                  )}
                />
              )}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ServicesNavigation;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  servicesContainer: {
    backgroundColor: "white",
    marginTop: 15,
    borderTopColor: "#ddd",
    borderTopWidth: 0.5,
  },
});
