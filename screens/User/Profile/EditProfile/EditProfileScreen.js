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
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../../assets/styles/Colors";
import { useAuth } from "../../../../context/auth";
import ProfileEditAvatar from "../../../../components/customized/ProfileOverview/ProfileEditAvatar";
import MenuITemBetween from "../../../../components/customized/MenuItem/MenuITemBetween";

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
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Despre tine</Text>
          <MenuITemBetween
            label="Nume"
            resultText={user?.name}
            onPress={() => navigation.navigate("EditName")}
          />
          <MenuITemBetween
            label="Nume utilizator"
            resultText={user?.username}
            onPress={() => navigation.navigate("EditUsername")}
          />
          <MenuITemBetween
            label="Site web"
            resultText={user?.website ? user?.website : "Adauga un website"}
            onPress={() => navigation.navigate("EditWebsite")}
          />
          <MenuITemBetween
            label="Descriere"
            resultText={
              user?.description ? user?.description : "Adauga o descriere"
            }
            onPress={() => navigation.navigate("EditBio")}
          />
        </View>
        <Divider color="#ddd" />
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Social</Text>
          <MenuITemBetween label="Instagram" resultText="raducu__balgiu" />
          <MenuITemBetween
            label="Youtube"
            resultText="Adauga contul de Youtube"
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
    fontFamily: "Exo-SemiBold",
    color: Colors.textLight,
    fontSize: 13,
    marginTop: 5,
  },
});
