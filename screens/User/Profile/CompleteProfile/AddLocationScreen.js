import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { Stack } from "../../../../components/core";
import { Colors } from "../../../../assets/styles/Colors";
import { GOOGLE_MAPS_API_KEY } from "@env";

const AddLocationScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.screen}>
      <Stack
        direction="row"
        sx={{ paddingVertical: 10, paddingHorizontal: 15 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="md-chevron-back" type="ionicon" />
        </TouchableOpacity>
        <Text style={styles.title}>Adauga locatia</Text>
        <Icon name="md-chevron-back" type="ionicon" color="white" />
      </Stack>
      <View style={{ padding: 15 }}>
        <Text>Introdu adresa</Text>
      </View>
    </SafeAreaView>
  );
};

export default AddLocationScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
    color: Colors.textDark,
  },
});
