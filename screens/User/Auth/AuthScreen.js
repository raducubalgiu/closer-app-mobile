import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../assets/styles/Colors";
import { Divider, Icon } from "react-native-elements";
import MenuItemBigger from "../../../components/customized/MenuItem/MenuItemBigger";
import { useNavigation } from "@react-navigation/native";

const AuthScreen = () => {
  const navigation = useNavigation();

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
          onPress={() => navigation.navigate("Login")}
          style={styles.mainBtn}
        >
          <Text style={styles.mainBtnText}>Conectează-te</Text>
        </TouchableOpacity>
        <View style={styles.registerText}>
          <Text style={styles.textAction}>Nu ai un cont?</Text>
          <TouchableOpacity
            style={{ marginLeft: 5 }}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.btnAction}>Înscrie-te</Text>
          </TouchableOpacity>
        </View>
        <Divider />
        <View style={styles.businessContainer}>
          <Icon name="wallet" type="antdesign" size={35} />
          <View style={{ marginLeft: 20, flex: 1 }}>
            <Text style={styles.businessText}>
              Detii un business? Incepe sa primesti clienti imediat
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("RegisterBusiness")}
            >
              <Text style={styles.registerBtnText}>Inregistreaza</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Divider />
        <View style={{ marginTop: 20 }}>
          <MenuItemBigger
            onPress={() => {}}
            iconName="settings-outline"
            iconType="ionicon"
            text="Setări"
          />
          <MenuItemBigger
            onPress={() => {}}
            iconName="exclamationcircleo"
            iconType="antdesign"
            text="Raportează o problemă"
          />
          <MenuItemBigger
            onPress={() => {}}
            iconName="questioncircleo"
            iconType="antdesign"
            text="Termeni şi condiţii"
          />
        </View>
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
  mainBtnText: {
    textAlign: "center",
    color: "white",
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
  },
  secondHeading: {
    fontFamily: "Exo-Medium",
    color: Colors.textLight,
    fontSize: 16,
    marginTop: 2.5,
  },
  mainBtn: {
    backgroundColor: Colors.primary,
    marginTop: 30,
    padding: 12.5,
    borderRadius: 5,
  },
  registerText: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
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
  businessContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingVertical: 10,
  },
  businessText: {
    fontFamily: "Exo-Regular",
    fontSize: 15,
  },
  registerBtnText: {
    marginTop: 5,
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
  },
});
