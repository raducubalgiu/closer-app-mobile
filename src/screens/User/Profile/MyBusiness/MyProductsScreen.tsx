import { StyleSheet, View, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import {
  IconButtonAdd,
  Button,
  Stack,
  Header,
} from "../../../../components/core";
import { NoFoundMessage } from "../../../../components/customized";
import { useGet, useAuth } from "../../../../hooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";

export const MyProductsScreen = () => {
  const { user } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation("common");

  const goToAddProduct = () => navigation.navigate("AddProducts");

  const { data: services } = useGet({
    model: "services",
    uri: `/locations/${user?.locationId}/services`,
  });

  const addBtn = <IconButtonAdd onPress={goToAddProduct} disabled={false} />;

  const noServices = (
    <>
      <NoFoundMessage
        title={t("servicesNotAdded")}
        description={t("cannotAddProducts")}
      />
      <Stack sx={{ marginTop: 10 }}>
        <Button
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
      </SafeAreaView>
      {/* {services?.length > 0 && (
        <TopTabProducts userId={user?.id} services={services} />
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
