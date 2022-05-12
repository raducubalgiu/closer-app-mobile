import { SafeAreaView, StyleSheet } from "react-native";
import { Header, Stack } from "../../../../components/core";
import React from "react";
import EditProductForm from "../../../../components/customized/Forms/EditProductForm";

const EditProductScreen = ({ route }) => {
  const { product } = route.params;

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={product.name} divider={true} />
      <Stack sx={styles.container}>
        <EditProductForm product={product} />
      </Stack>
    </SafeAreaView>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    padding: 15,
  },
});
