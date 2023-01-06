import { Pressable, StyleSheet, Text } from "react-native";
import { Icon } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";
import { Stack } from "../../../core";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../models/navigation/rootStackParams";

const { grey0, black } = theme.lightColors || {};

type IProps = {
  serviceName: string;
  period: string;
};

export const HeaderServices = ({ serviceName, period }: IProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <Stack sx={styles.container}>
      <Stack direction="row">
        <Pressable onPress={() => navigation.popToTop()} style={{ padding: 5 }}>
          <Icon name="arrow-back-ios" size={21} color={black} />
        </Pressable>
        <Pressable style={styles.search} onPress={() => navigation.pop(2)}>
          <Stack direction="row" justify="center">
            <Icon name="search" size={18} color={grey0} />
            <Text style={styles.service}>{serviceName},</Text>
            <Text style={styles.period}>{period}</Text>
          </Stack>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("LocationFilters")}>
          <Icon
            name="filter"
            type="feather"
            color={black}
            size={19}
            style={styles.filter}
          />
        </Pressable>
      </Stack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    zIndex: 1000000,
    height: 70,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  search: {
    backgroundColor: "#f1f1f1",
    borderRadius: 50,
    paddingVertical: 12.5,
    paddingHorizontal: 15,
    marginRight: 10,
    flex: 1,
  },
  service: {
    marginLeft: 10,
    color: black,
    fontWeight: "700",
  },
  period: {
    marginLeft: 5,
    color: grey0,
    fontWeight: "500",
  },
  item: {
    marginRight: 5,
  },
  filter: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#ddd",
  },
});
