import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../assets/styles/Colors";
import { Divider } from "react-native-elements";
import BottomSheetPopup from "../../components/BottomSheets/BottomSheetPopup";
import LoginForm from "../../components/Forms/LoginForm";
import MenuItemBigger from "../../components/MenuItem/MenuItemBigger";
import RegisterForm from "../../components/Forms/RegisterForm";

const AuthScreen = () => {
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const closeSheet = () => setOpen(false);
  const goToRegister = () => {
    setOpen(true);
    setOpenLogin(false);
    setOpenRegister(true);
  };
  const goToLogin = () => {
    setOpen(true);
    setOpenLogin(true);
    setOpenRegister(false);
  };

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
          onPress={() => {
            setOpen(true);
            setOpenLogin(true);
            setOpenRegister(false);
          }}
          style={styles.mainBtn}
        >
          <Text style={styles.mainBtnText}>Conectează-te</Text>
        </TouchableOpacity>
        <View style={styles.registerText}>
          <Text style={styles.textAction}>Nu ai un cont?</Text>
          <TouchableOpacity
            style={{ marginLeft: 5 }}
            onPress={() => {
              setOpen(true);
              setOpenRegister(true);
              setOpenLogin(false);
            }}
          >
            <Text style={styles.btnAction}>Înscrie-te</Text>
          </TouchableOpacity>
        </View>
        <Divider />
        <View style={{ marginTop: 25 }}>
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
        <BottomSheetPopup
          height={90}
          open={open}
          onClose={closeSheet}
          sheetBody={
            openLogin && !openRegister ? (
              <LoginForm onGoToRegister={goToRegister} />
            ) : (
              <RegisterForm onGoToLogin={goToLogin} />
            )
          }
        />
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
});
