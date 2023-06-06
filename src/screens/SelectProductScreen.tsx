import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import React, { useCallback } from "react";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/rootStackParams";
import { Button, Header } from "../components/core";
import { useTranslation } from "react-i18next";
import ProductListItem from "../components/customized/ListItems/ProductListItem";
import { useGet } from "../hooks";
import { Product } from "../ts";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "@rneui/themed";
import theme from "../../assets/styles/theme";

const { black } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "SelectProduct">;

type ProductsResponse = { next: number | null; results: Product[] };

export const SelectProductScreen = ({ route }: IProps) => {
  const { userId, start, option, service } = route.params;
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const { data: products } = useGet<ProductsResponse>({
    model: "products",
    uri: `/users/${userId}/services/${service.id}/products?option=${option.id}`,
  });

  const renderProduct = useCallback(
    ({ item }: ListRenderItemInfo<Product>) => (
      <ProductListItem
        product={item}
        selectable={true}
        ownerInfo={false}
        onPress={() => {}}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item: Product) => item.id, []);

  const navigateBack = () => {
    navigation.goBack();
    navigation.navigate("CalendarSheet", {
      userId,
      startDate: start,
      name: "Some Name",
      option,
      service,
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title={t("products")}
        subtitle="ITP Dristor"
        customNavigation={navigateBack}
      />
      <View style={styles.container}>
        <View
          style={{
            marginHorizontal: 15,
            marginVertical: 10,
            backgroundColor: "#eee",
            width: 100,
            paddingVertical: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: black, fontWeight: "600" }}>
            {service?.name}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={products?.results}
            keyExtractor={keyExtractor}
            renderItem={renderProduct}
            ItemSeparatorComponent={() => <Divider color="#ddd" />}
          />
        </View>
        <View
          style={{
            marginHorizontal: 15,
            borderTopWidth: 1,
            borderTopColor: "#eee",
          }}
        >
          <Button title={t("next")} disabled={true} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: { flex: 1, justifyContent: "space-between" },
});
