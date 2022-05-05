import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import HeaderReusable from "../../../../components/customized/Headers/HeaderReusable";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../../assets/styles/theme";

const EditPhotoLibraryScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderReusable
        firstBox={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.cancel}>Anuleaza</Text>
          </TouchableOpacity>
        }
        secondBox={<Text style={styles.field}>Adauga fotografia</Text>}
        thirdBox={
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.save}>Salveaza</Text>
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
  );
};

export default EditPhotoLibraryScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  cancel: {
    fontFamily: "Exo-Medium",
    color: theme.lightColors.grey0,
    fontSize: 14,
  },
  field: { fontFamily: "Exo-SemiBold", fontSize: 16 },
  save: {
    fontFamily: "Exo-Bold",
    color: theme.lightColors.primary,
    fontSize: 15,
  },
});
