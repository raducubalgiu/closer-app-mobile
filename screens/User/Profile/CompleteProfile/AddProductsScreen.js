import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Stack } from "../../../../components/core";
import Header from "../../../../components/customized/Headers/Header";
import TooltipTitle from "../../../../components/customized/ListItems/TooltipItem";
import { Colors } from "../../../../assets/styles/Colors";
import AddProductsForm from "../../../../components/customized/Forms/AddProductsForm";
import { useNavigation } from "@react-navigation/native";

const AddProductsScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title="Adauga un produs"
        withTooltip={true}
        tooltipText="Este necesar sa adaugi minim un produs pentru a finaliza inscrierea"
        tooltipContainer={{ width: 220, height: 80 }}
        divider={true}
      />
      <ScrollView bounces={false} showsVerticalScrollIndicator={true}>
        <Stack align="start" sx={{ margin: 15 }}>
          <TooltipTitle
            title="Produse"
            sx={{ marginBottom: 25 }}
            tooltipText="In aceasta sectiune vei adauga minim un produs, iar pe celelalte le vei adauga din panoul de bord"
            tooltipDimensions={{ width: 250, height: 80 }}
          />
          <AddProductsForm onAddProduct={() => navigation.goBack()} />
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProductsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    fontFamily: "Exo-Regular",
    fontSize: 14,
    color: Colors.textDark,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    color: Colors.textDark,
    paddingRight: 30,
    fontFamily: "Exo-Regular",
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 10,
    color: Colors.textDark,
    fontFamily: "Exo-Regular",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
