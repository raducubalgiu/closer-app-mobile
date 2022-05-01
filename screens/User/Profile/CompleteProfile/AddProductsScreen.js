import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Stack, Header } from "../../../../components/core";
import TooltipTitle from "../../../../components/customized/ListItems/TooltipItem";
import theme from "../../../../assets/styles/theme";
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
    color: theme.lightColors.black,
  },
});
