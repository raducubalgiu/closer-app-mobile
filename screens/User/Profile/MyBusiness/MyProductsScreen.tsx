import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { IconButtonAdd, MainButton, Stack } from "../../../../components/core";
import { NoFoundMessage } from "../../../../components/customized";
import { useAuth } from "../../../../hooks/auth";
import { useGet } from "../../../../hooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../models/navigation/rootStackParams";

export const MyProductsScreen = () => {
  const { user } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();

  const goToAddProduct = () => navigation.navigate("AddProducts");

  const { data: services } = useGet({
    model: "services",
    uri: `/locations/${user?.location}/services`,
  });

  const addBtn = (
    <IconButtonAdd onPress={goToAddProduct} disabled={services?.length > 0} />
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
      {/* <SafeAreaView>
        <Header title={t("myProducts")} actionBtn={addBtn} divider />
        <Feedback feedback={feedback} setFeedback={setFeedback} />
      </SafeAreaView>
      {services?.length > 0 && (
        <TopTabProducts userId={user?._id} services={services} />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
});
