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
import HeaderSimple from "../../components/Headers/HeaderSimple";

const ProfileScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <HeaderSimple />
      <ScrollView>
        <View style={styles.avatarSection}>
          <Avatar
            size={60}
            rounded
            source={{
              uri: "https://stanandrei.ro/wp-content/uploads/2021/02/user-icon-png.jpg",
            }}
          />
          <View>
            <Text style={styles.name}>Raducu Balgiu</Text>
            <Text style={styles.phone}>+40731289633</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Divider />
        </View>
        <View>
          <View style={styles.userDetails}>
            <ProfileListItem
              onPress={() => navigation.navigate("EditProfile")}
              listItemName={t("administrateYourAccount")}
              name="user"
              type="antdesign"
              size={20}
            />

            <ProfileListItem
              onPress={() => navigation.navigate("Gifts")}
              listItemName={t("gifts")}
              name="gift"
              type="feather"
              size={20}
            />

            <ProfileListItem
              onPress={() => navigation.navigate("Ratings")}
              listItemName={t("ratings")}
              name="profile"
              type="antdesign"
              size={20}
            />
          </View>

          <View style={styles.sectionDetails}>
            <Text style={styles.heading}>{t("support")}</Text>

            <ProfileListItem
              onPress={() => navigation.navigate("ControlPanel")}
              listItemName={t("controlPanel")}
              name="database"
              type="antdesign"
              size={20}
            />

            <ProfileListItem
              onPress={() => navigation.navigate("ReportProblem")}
              listItemName={t("reportAProblem")}
              name="exclamationcircleo"
              type="antdesign"
              size={20}
            />
          </View>

          <View style={styles.sectionDetails}>
            <Text style={styles.heading}>{t("settingsAndJuridicInfo")}</Text>

            <ProfileListItem
              onPress={() => navigation.navigate("Settings")}
              listItemName={t("Settings")}
              name="setting"
              type="antdesign"
              size={20}
            />

            <ProfileListItem
              onPress={() => {}}
              listItemName={t("rateOurApp")}
              name="like2"
              type="antdesign"
              size={20}
            />

            <ProfileListItem
              onPress={() => navigation.navigate("Legal")}
              listItemName={t("legal")}
              name="user"
              type="antdesign"
              size={20}
            />
          </View>

          <View style={styles.sectionDetails}>
            <Text style={styles.heading}>{t("partners")}</Text>

            <ProfileListItem
              onPress={() => navigation.navigate("RegisterBusiness")}
              listItemName={t("registerYourBusiness")}
              name="login"
              type="antdesign"
              size={20}
            />

            <TouchableOpacity style={styles.detailsItem}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon
                  name="log-out"
                  type="feather"
                  size={20}
                  color={Colors.danger}
                />
                <Text
                  style={{
                    marginLeft: 10,
                    paddingVertical: 20,
                    color: Colors.danger,
                    fontFamily: "Exo-SemiBold",
                  }}
                >
                  {t("logout")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
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
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingBottom: 25,
  },
  name: {
    fontSize: 25,
    fontWeight: "700",
    fontFamily: "Exo-Bold",
    color: Colors.textDark,
    marginLeft: 15,
  },
  phone: {
    fontFamily: "Exo-Medium",
    color: Colors.textLight,
    marginLeft: 15,
    marginTop: 5,
  },
  userDetails: {
    paddingHorizontal: 25,
    backgroundColor: "white",
  },
  sectionDetails: {
    backgroundColor: "white",
    marginTop: 10,
    paddingHorizontal: 25,
  },
  heading: {
    fontSize: 16,
    marginTop: 30,
    marginBottom: 5,
    fontFamily: "IBMPlexSansThaiLooped-SemiBold",
    color: Colors.textDark,
  },
});
