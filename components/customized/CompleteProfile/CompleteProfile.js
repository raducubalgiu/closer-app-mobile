import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "../../core";
import { Colors } from "../../../assets/styles/Colors";
import CardCompleteProfile from "../Cards/CardCompleteProfile";
import { useAuth } from "../../../context/auth";
import { useNavigation } from "@react-navigation/native";

const CompleteProfile = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const STEPS = [
    {
      title: "Adauga tipul afacerii",
      description: "Este necesar sa stim care este tipul business-ului tau",
      iconName: "navigation",
      iconType: "feather",
      completed: false,
      navigation: "AddBusinessType",
    },
    {
      title: "Adauga locatia",
      description: "Introdu locatia si incepe sa primesti clienti",
      iconName: "navigation",
      iconType: "feather",
      completed: false,
      navigation: "AddLocation",
    },
    {
      title: "Adauga serviciile",
      description: "Ce servicii oferi clientilor?",
      iconName: "bulb1",
      iconType: "antdesign",
      completed: false,
      navigation: "AddServices",
    },
    {
      title: "Adauga produsele",
      description: "Adauga produsele aferente fiecarui serviciu oferit",
      iconName: "rocket1",
      iconType: "antdesign",
      completed: false,
      navigation: "AddProducts",
    },
    {
      title: "Include-ti numele",
      description: "Cum ar trebui sa iti spuna oamenii?",
      iconName: "user",
      iconType: "antdesign",
      completed: true,
      navigation: "EditName",
    },
    {
      title: "Adauga-ti biografia",
      description: "Ce ne spui despre tine?",
      iconName: "form",
      iconType: "antdesign",
      completed: false,
      navigation: "EditBio",
    },
    {
      title: "Adauga fotografia de profil",
      description: "Ce fotografie te reprezinta?",
      iconName: "camerao",
      iconType: "antdesign",
      completed: true,
      navigation: "EditAvatar",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completeaza-ti profilul</Text>
      <Stack
        direction="row"
        justify="start"
        sx={{ marginTop: 5, marginBottom: 15 }}
      >
        <Text style={styles.counter}>0 / 7</Text>
        <Text style={styles.status}> FINALIZATE</Text>
      </Stack>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
      >
        {STEPS.map((step, i) => (
          <CardCompleteProfile
            key={i}
            onPress={() => navigation.navigate(step?.navigation)}
            iconName={step.iconName}
            iconType={step.iconType}
            withBadge={step.completed}
            title={step.title}
            description={step.description}
            completed={step.completed}
            actionTitle={step.completed ? "Editeaza" : "Adauga"}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default CompleteProfile;

const styles = StyleSheet.create({
  container: { margin: 15, flex: 1 },
  title: {
    fontFamily: "Exo-Medium",
    color: Colors.textDark,
    fontSize: 15,
  },
  counter: {
    fontFamily: "Exo-SemiBold",
    color: Colors.textDark,
    fontSize: 12.5,
  },
  status: {
    fontFamily: "Exo-SemiBold",
    color: Colors.primary,
    fontSize: 12,
  },
});
