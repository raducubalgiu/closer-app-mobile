import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import { Avatar, Divider } from "react-native-elements";
import React from "react";
import ProfileListItem from "../../components/ProfileListItem/ProfileListItem";
import { useTranslation } from "react-i18next";
import { Colors } from "../../assets/styles/Colors";
import { useNavigation } from "@react-navigation/native";
import BottomScheetReusable from "../../components/BottomSheets/BottomScheetReusable";

const ProfileScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <SafeAreaView
        style={{
          backgroundColor: "#f1f1f1",
          borderRadius: 15,
          marginVertical: 10,
        }}
      ></SafeAreaView>
      <ScrollView>
        <View style={styles.avatarSection}>
          <Avatar
            size={100}
            rounded
            source={{
              uri: "https://scontent.fotp3-1.fna.fbcdn.net/v/t1.6435-1/c0.202.1612.1611a/71498148_2594599870570594_298053640667529216_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=dbb9e7&_nc_ohc=NVUyJqOQousAX_zJXTC&_nc_ht=scontent.fotp3-1.fna&oh=00_AT9yCGLs0oKSHTumtf06hI15BlZ4Kc90Q0Ll96NwteELoQ&oe=622E8A05",
            }}
          />
          <Text style={styles.name}>Raducu Balgiu</Text>
        </View>
        <View style={styles.detailsSection}>
          <ProfileListItem
            onPress={() => navigation.navigate("EditProfile")}
            listItemName={t("administrateYourAccount")}
            name="user"
            type="antdesign"
            size={20}
          />

          <Divider />

          <ProfileListItem
            onPress={() => navigation.navigate("Gifts")}
            listItemName={t("gifts")}
            name="gift"
            type="feather"
            size={20}
          />

          <Divider />

          <ProfileListItem
            onPress={() => navigation.navigate("Ratings")}
            listItemName={t("ratings")}
            name="profile"
            type="antdesign"
            size={20}
          />

          <Text style={styles.heading}>{t("support")}</Text>

          <ProfileListItem
            onPress={() => navigation.navigate("ControlPanel")}
            listItemName={t("controlPanel")}
            name="database"
            type="antdesign"
            size={20}
          />

          <Divider />

          <ProfileListItem
            onPress={() => navigation.navigate("ReportProblem")}
            listItemName={t("reportAProblem")}
            name="exclamationcircleo"
            type="antdesign"
            size={20}
          />

          <Text style={styles.heading}>{t("settingsAndJuridicInfo")}</Text>

          <ProfileListItem
            onPress={() => navigation.navigate("Settings")}
            listItemName={t("Settings")}
            name="setting"
            type="antdesign"
            size={20}
          />

          <Divider />

          <ProfileListItem
            onPress={() => {}}
            listItemName={t("rateOurApp")}
            name="like2"
            type="antdesign"
            size={20}
          />

          <Divider />

          <ProfileListItem
            onPress={() => navigation.navigate("Legal")}
            listItemName={t("legal")}
            name="user"
            type="antdesign"
            size={20}
          />

          <Text style={styles.heading}>{t("partners")}</Text>

          <ProfileListItem
            onPress={() => navigation.navigate("RegisterBusiness")}
            listItemName={t("registerYourBusiness")}
            name="login"
            type="antdesign"
            size={20}
          />

          <Divider />

          <TouchableOpacity style={styles.detailsItem}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="log-out" type="feather" size={20} />
              <Text style={{ marginLeft: 10 }}>{t("logout")}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  avatarSection: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "white",
    borderRadius: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
    fontFamily: "Exo-ExtraBold",
    color: Colors.textDark,
  },
  detailsSection: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    shadowColor: "#c9c5c5",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,

    elevation: 11,
  },
  detailsItem: {
    paddingVertical: 15,
  },
  heading: {
    fontSize: 16,
    marginTop: 30,
    marginBottom: 5,
    fontFamily: "IBMPlexSansThaiLooped-SemiBold",
    color: Colors.textDark,
  },
});
