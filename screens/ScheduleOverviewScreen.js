import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MainButton, Stack } from "../components/core";
import { Icon } from "@rneui/themed";
import theme from "../assets/styles/theme";
import { useNavigation } from "@react-navigation/native";

const { black, primary, grey0 } = theme.lightColors;

const ScheduleOverviewScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.screen}>
      <Stack justify="center" sx={styles.container}>
        <Icon name="check-circle" type="feather" size={70} color={primary} />
        <Text style={styles.title}>Super</Text>
        <Text style={styles.message}>
          Ai rezervat serviciul de Tuns pentru data de:
        </Text>
        <Text style={styles.date}>23-05-2022, ora 16:30</Text>
        <Stack direction="row" sx={{ marginTop: 10 }}>
          <MainButton title="Vezi sumarul" sx={{ marginRight: 10 }} />
          <MainButton
            title="Catre profil"
            variant="outlined"
            onPress={() => navigation.navigate("Profile")}
          />
        </Stack>
      </Stack>
    </SafeAreaView>
  );
};

export default ScheduleOverviewScreen;

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
    fontFamily: "Exo-Bold",
    fontSize: 20,
    marginVertical: 10,
    color: black,
  },
  message: {
    fontFamily: "Exo-Medium",
    color: grey0,
    marginBottom: 5,
    fontSize: 15,
  },
  date: {
    fontFamily: "Exo-SemiBold",
    color: black,
    fontSize: 15,
  },
});
