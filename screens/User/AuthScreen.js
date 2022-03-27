import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../assets/styles/Colors";
import { Divider, Icon } from "react-native-elements";
import BottomSheetAuth from "../../components/BottomSheets/BottomSheetAuth";

const AuthScreen = () => {
  return (
    <>
      <SafeAreaView style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.mainHeading}>Profilul tău</Text>
          <Text style={styles.secondHeading}>
            Conectează-te pentru a începe să rezervi servicii
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            backgroundColor: Colors.primary,
            marginTop: 30,
            padding: 12.5,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontFamily: "Exo-SemiBold",
              fontSize: 15,
            }}
          >
            Conectează-te
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 15,
          }}
        >
          <Text style={styles.textAction}>Nu ai un cont?</Text>
          <TouchableOpacity style={{ marginLeft: 5 }}>
            <Text style={styles.btnAction}>Înscrie-te</Text>
          </TouchableOpacity>
        </View>
        <Divider />
        <View style={{ marginTop: 25 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 15,
            }}
          >
            <Icon
              name="settings-outline"
              type="ionicon"
              color={Colors.textDark}
              size={26}
            />
            <Text
              style={{
                fontFamily: "Exo-Regular",
                fontSize: 16,
                color: Colors.textDark,
                marginLeft: 10,
              }}
            >
              Setări
            </Text>
          </View>
          <Divider />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 15,
            }}
          >
            <Icon
              name="exclamationcircleo"
              type="antdesign"
              color={Colors.textDark}
            />
            <Text
              style={{
                fontFamily: "Exo-Regular",
                fontSize: 16,
                color: Colors.textDark,
                marginLeft: 10,
              }}
            >
              Raportează o problemă
            </Text>
          </View>
          <Divider />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 15,
            }}
          >
            <Icon
              name="questioncircleo"
              type="antdesign"
              color={Colors.textDark}
            />
            <Text
              style={{
                fontFamily: "Exo-Regular",
                fontSize: 16,
                color: Colors.textDark,
                marginLeft: 10,
              }}
            >
              Termeni şi condiţii
            </Text>
          </View>
        </View>
        <BottomSheetAuth />
      </SafeAreaView>
    </>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    marginTop: 20,
    paddingRight: 50,
  },
  mainHeading: {
    fontFamily: "Exo-SemiBold",
    fontSize: 27,
    color: Colors.textDark,
  },
  secondHeading: {
    fontFamily: "Exo-Medium",
    color: Colors.textLight,
    fontSize: 16,
    marginTop: 2.5,
  },
  textAction: {
    fontFamily: "Exo-Regular",
    fontSize: 14,
    color: Colors.textDark,
  },
  btnAction: {
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
    color: Colors.textDark,
  },
});
