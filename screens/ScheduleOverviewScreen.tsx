import { StyleSheet, Text, View } from "react-native";
import { MainButton, Stack } from "../components/core";
import { Icon } from "@rneui/themed";
import theme from "../assets/styles/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../models/navigation/rootStackParams";

const { black, primary, grey0 } = theme.lightColors;

export const ScheduleOverviewScreen = ({ route }) => {
  const { schedule } = route.params;
  const { service, start } = schedule;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <View style={styles.screen}>
      <Stack justify="center" sx={styles.container}>
        <Icon name="check-circle" type="feather" size={70} color={primary} />
        <Text style={styles.title}>Super</Text>
        <Text style={styles.message}>
          Ai rezervat serviciul de {service.name} pentru data de:
        </Text>
        <Text style={styles.date}>{start}</Text>
        <Stack direction="row" sx={{ marginTop: 10 }}>
          <MainButton
            title="Vezi sumarul"
            sx={{ marginRight: 10 }}
            onPress={() => navigation.navigate("Schedules")}
          />
          <MainButton
            title="Catre profil"
            variant="outlined"
            onPress={() => navigation.navigate("Profile")}
          />
        </Stack>
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    color: black,
  },
  message: {
    color: grey0,
    marginBottom: 5,
    fontSize: 15,
  },
  date: {
    color: black,
    fontSize: 15,
  },
});
