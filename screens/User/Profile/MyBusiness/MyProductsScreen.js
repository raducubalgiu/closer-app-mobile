import { SafeAreaView, StyleSheet, View } from "react-native";
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
import { TopTabProducts } from "../../../../components/customized/Tabs/TopTabContainer/TopTabProducts";
import { useHttpGet } from "../../../../hooks";

const MyProductsScreen = () => {
  const { user } = useAuth();
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const navigation = useNavigation();
  const { t } = useTranslation();

  const goToAddProduct = () => navigation.navigate("AddProducts");

  const addBtn = (
    <IconButtonAdd onPress={goToAddProduct} disabled={services?.length > 0} />
  );

  const { data: services } = useHttpGet(
    `/locations/${user?.location}/services`
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
    <View style={styles.screen}>
      <SafeAreaView>
        <Header title={t("myProducts")} actionBtn={addBtn} divider />
        <Feedback feedback={feedback} setFeedback={setFeedback} />
      </SafeAreaView>
      {services?.length > 0 && (
        <TopTabProducts userId={user?._id} services={services} />
      )}
      {!services?.length && noServices}
    </View>
  );
};

export default MyProductsScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
});
