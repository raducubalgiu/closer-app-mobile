import { SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Header, IconButtonAdd, Feedback } from "../../../../components/core";
import { ShowProducts } from "../../../../components/customized";
import { useAuth } from "../../../../hooks/auth";

const MyProductsScreen = ({ route }) => {
  const { user } = useAuth();
  const { services } = user;
  const { product, serviceId } = route.params || {};
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const navigation = useNavigation();
  const { t } = useTranslation();

  const goToAddProduct = () => navigation.navigate("AddProducts");

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title={t("myProducts")}
        actionBtn={
          <IconButtonAdd
            onPress={goToAddProduct}
            disabled={user.services.length === 0}
          />
        }
        divider
      />
      <Feedback feedback={feedback} setFeedback={setFeedback} />
      <ShowProducts
        userId={user?._id}
        product={product}
        services={services}
        initServ={services[0]?._id}
        serviceId={serviceId}
      />
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
