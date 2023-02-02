import { Pressable, StyleSheet, Text } from "react-native";
import { Icon } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";
import { Stack } from "../../../core";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";
import { trimFunc } from "../../../../utils";

const { grey0, black } = theme.lightColors || {};

type IProps = {
  serviceName: string;
  details: string;
};

export const HeaderServices = ({ serviceName, details }: IProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <Stack sx={styles.container}>
      <Stack direction="row">
        <Pressable onPress={() => navigation.popToTop()} style={styles.back}>
          <Icon name="arrow-back-ios" size={21} color={black} />
        </Pressable>
        <Stack direction="row" sx={styles.search}>
          <Pressable onPress={() => navigation.pop(2)}>
            <Stack direction="row">
              <Stack direction="row">
                <Icon
                  name="search"
                  size={20}
                  color={black}
                  style={{ padding: 5 }}
                />
                <Stack
                  align="start"
                  justify="center"
                  sx={{ marginHorizontal: 5, height: 40 }}
                >
                  <Stack direction="row" sx={{ marginBottom: 1.5 }}>
                    <Text style={styles.service}>{serviceName}</Text>
                    <Text style={styles.point}>{"\u2B24"}</Text>
                    <Text style={styles.service}>Autoturisme</Text>
                  </Stack>
                  <Stack direction="row">
                    <Text style={styles.period}>23 - 30 aug</Text>
                    <Text style={styles.point}>{"\u2B24"}</Text>
                    <Text style={styles.period}>14:00 ~ 16:00</Text>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("LocationFilters")}>
            <Icon
              name="filter"
              type="feather"
              color={black}
              size={17.5}
              style={styles.filter}
            />
          </Pressable>
        </Stack>
      </Stack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    zIndex: 1000000,
    height: 70,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
  },
  back: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingLeft: 13.5,
    paddingRight: 7.5,
    borderRadius: 50,
    shadowColor: "#737373",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    marginRight: 10,
  },
  search: {
    backgroundColor: "white",
    borderRadius: 50,
    paddingHorizontal: 15,
    flex: 1,
    paddingVertical: 7.5,
    shadowColor: "#737373",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  service: {
    color: black,
    fontWeight: "700",
    fontSize: 15,
  },
  period: {
    color: grey0,
    fontWeight: "500",
    fontSize: 12.5,
  },
  item: {
    marginRight: 5,
  },
  filter: {
    padding: 10,
    borderWidth: 1.5,
    borderRadius: 50,
    borderColor: "#eee",
  },
  point: { fontSize: 3, color: grey0, marginHorizontal: 5 },
});
