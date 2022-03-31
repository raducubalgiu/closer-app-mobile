import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SearchBar } from "react-native-elements";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../assets/styles/Colors";

const BackSearchFilter = () => {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          name="arrow-back"
          size={20}
          style={{
            padding: 15,
          }}
          color={Colors.textDark}
        />
      </TouchableOpacity>
      <SearchBar
        placeholder="Caută serviciu.."
        onChangeText={updateSearch}
        value={search}
        leftIconContainerStyle={{ display: "none" }}
        containerStyle={{
          display: "inline",
          flex: 1,
          padding: 0,
          backgroundColor: "white",
          borderStyle: "dashed",
        }}
        inputContainerStyle={{
          backgroundColor: "white",
          borderBottomColor: "white",
        }}
        inputStyle={{
          fontSize: 16,
          color: Colors.textLight,
          fontFamily: "Exo-Regular",
        }}
      />
      {/* <TouchableOpacity>
        <Icon
          name="sliders"
          size={19}
          style={{
            padding: 10,
            backgroundColor: "#f1f1f1",
            marginRight: 5,
            borderRadius: 10,
          }}
          type="font-awesome"
          color={Colors.textDark}
        />
      </TouchableOpacity> */}
    </View>
  );
};

export default BackSearchFilter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    backgroundColor: "white",
  },
  backButton: {
    flex: 1,
  },
  filtersButton: {},
});
