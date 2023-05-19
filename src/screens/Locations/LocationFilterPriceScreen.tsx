import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  TextInput,
} from "react-native";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import HeaderSheet from "../../components/customized/Layout/Headers/HeaderSheet";
import { Button, Heading, Stack } from "../../components/core";
import { RootStackParams } from "../../navigation/rootStackParams";
import theme from "../../../assets/styles/theme";
import { Icon } from "@rneui/themed";

const { grey0, black } = theme.lightColors || {};

export const LocationFilterPriceScreen = () => {
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderSheet
        sx={{ marginVertical: 2.5 }}
        title=""
        onClose={() => navigation.goBack()}
        divider={false}
      />
      <View style={styles.container}>
        <ScrollView scrollEnabled={false}>
          <Heading title={t("filterPrice")} sx={styles.title} />
          <Text style={styles.description}>
            Luand in calcul filtrele selectate, pretul mediu pentru acest
            serviciu este de 450 lei
          </Text>
        </ScrollView>
        <Stack direction="row">
          <Button
            //onPress={handleReset}
            title={t("delete")}
            sxBtn={{ width: width / 2 - 30 }}
            variant="outlined"
            //disabled={low === 0 && high === 500}
          />
          <Button
            title={t("filter")}
            sxBtn={{ width: width / 2 - 30 }}
            //disabled={low !== 0 && high !== 500}
          />
        </Stack>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  title: { fontSize: 22 },
  description: { color: grey0, fontSize: 15 },
});
