import { SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import {
  Header,
  IconButtonAdd,
  Feedback,
  MainButton,
  Stack,
} from "../../../../components/core";
import { NoFoundMessage } from "../../../../components/customized";
import { useAuth } from "../../../../hooks/auth";

const MyProductsScreen = ({ route }) => {
  const { user } = useAuth();
  const { services } = user;
  const { product, serviceId } = route.params || {};
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const navigation = useNavigation();
  const { t } = useTranslation();

  const goToAddProduct = () => navigation.navigate("AddProducts");

  const addBtn = (
    <IconButtonAdd onPress={goToAddProduct} disabled={!services.length} />
  );

  const noServices = (
    <>
      <NoFoundMessage
        title={t("servicesNotAdded")}
        description={t("cannotAddProducts")}
      />
      <Stack sx={{ marginTop: 10 }}>
        <MainButton
          title={t("goToServices")}
          onPress={() => navigation.navigate("AddServices")}
        />
      </Stack>
    </>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("myProducts")} actionBtn={addBtn} divider />
      <Feedback feedback={feedback} setFeedback={setFeedback} />
    </SafeAreaView>
  );
};

export default MyProductsScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
});
