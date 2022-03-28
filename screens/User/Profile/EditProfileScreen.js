import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon, Divider } from "react-native-elements";
import { Colors } from "../../../assets/styles/Colors";
import { useAuth } from "../../../context/auth";
import { useNavigation } from "@react-navigation/native";
import ProfileEditAvatar from "../../../components/ProfileAvatar/ProfileEditAvatar";
import MenuITemBetween from "../../../components/MenuItem/MenuITemBetween";

const EditProfileScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.screen}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 15,
          padding: 10,
        }}
      >
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back-ios"
            size={20}
            color={Colors.textDark}
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "Exo-Bold",
            fontSize: 16,
            color: Colors.textDark,
          }}
        >
          {user?.name}
        </Text>
        <Icon name="arrow-back" size={25} color="white" />
      </View>
      <Divider />
      <ScrollView style={{ flex: 1 }}>
        <ProfileEditAvatar userAvatar={user?.avatar} />
        <Divider />
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Despre tine</Text>
          <MenuITemBetween
            label="Nume"
            resultText="Oprea Laurentiu"
            onPress={() => navigation.navigate("EditName")}
          />
          <MenuITemBetween
            label="Site web"
            resultText="https://www.raducubalgiu.com"
            onPress={() => navigation.navigate("EditWebsite")}
          />
          <MenuITemBetween
            label="Biografie"
            resultText="Life is short, but very..."
            onPress={() => navigation.navigate("EditBio")}
          />
        </View>
        <Divider color="#ccc" />
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Social</Text>
          <MenuITemBetween label="Instagram" resultText="raducu__balgiu" />
          <MenuITemBetween
            label="Youtube"
            resultText="Adauga contul de Youtube"
          />
          <MenuITemBetween
            label="Biografie"
            resultText="Life is short, but very..."
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  sectionContainer: {
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 15,
  },
  sectionHeading: {
    marginBottom: 10,
    fontFamily: "Exo-Bold",
    color: Colors.textLight,
    fontSize: 13,
  },
});
