import {
  StyleSheet,
  Text,
  FlatList,
  Pressable,
  ListRenderItemInfo,
} from "react-native";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../../assets/styles/theme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigation/rootStackParams";
import { Service } from "../../../ts";

const { grey0, black } = theme.lightColors || {};

type IProps = { services: Service[] | undefined };

export const ServicesList = ({ services }: IProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goToFilters = (item: Service) =>
    navigation.navigate("FiltersDate", {
      screen: "Calendar",
      service: item,
      defaultPeriod: {
        title: "",
        description: "",
        startDate: null,
        endDate: null,
        startMinutes: null,
        endMinutes: null,
        monthIndex: 0,
        key: "",
      },
    });

  const renderService = useCallback(
    ({ item }: ListRenderItemInfo<Service>) => (
      <Pressable style={styles.serviceBtn} onPress={() => goToFilters(item)}>
        <Text style={styles.servicesTitle}>{item.name}</Text>
      </Pressable>
    ),
    []
  );
  const keyExtractor = useCallback((item: Service) => item.id, []);

  return (
    <FlatList
      nestedScrollEnabled={true}
      showsHorizontalScrollIndicator={false}
      horizontal
      data={services}
      keyExtractor={keyExtractor}
      renderItem={renderService}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    marginRight: 15,
  },
  headingContainer: {
    paddingBottom: 20,
    paddingTop: 5,
  },
  heading: {
    color: black,
    fontSize: 15,
  },
  seeAll: {
    fontSize: 12.5,
    color: grey0,
  },
  serviceBtn: {
    backgroundColor: "#f1f1f1",
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 15,
    minWidth: 90,
    marginLeft: 10,
  },
  servicesTitle: {
    textAlign: "center",
    fontSize: 13,
    color: black,
    fontWeight: "500",
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
});
