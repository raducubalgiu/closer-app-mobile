import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../../assets/styles/theme";
import { useAuth } from "../../../../context/auth";
import MenuITemBetween from "../../../../components/customized/MenuItem/MenuITemBetween";
import BottomSheetPopup from "../../../../components/customized/BottomSheets/BottomSheetPopup";
import UserAvatar from "../../../../components/customized/Avatars/UserAvatar";
import { Stack, Header } from "../../../../components/core";
import axios from "axios";

const EditProfileScreen = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useAuth();
  const navigation = useNavigation();

  const handleClose = () => setOpen(false);

  const handleDeletePhoto = () => {
    axios
      .patch(
        `${process.env.BASE_ENDPOINT}/users/${user?._id}/update`,
        {
          avatar: [],
        },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then(() => setUser({ ...user, avatar: undefined }))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <SafeAreaView style={styles.screen}>
        <Header title={user?.name} />
        <ScrollView style={{ flex: 1 }}>
          <Stack sx={{ marginVertical: 20 }}>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => setOpen(true)}
            >
              <View>
                <UserAvatar
                  avatar={user?.avatar}
                  size={95}
                  iconSize={35}
                  withBadge={true}
                  badgeDetails={{
                    name: "plus",
                    type: "entypo",
                  }}
                />
              </View>
              <Text style={styles.text}>Schimba fotografia</Text>
            </TouchableOpacity>
          </Stack>
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
              resultText={user?.website}
              onPress={() => navigation.navigate("EditWebsite")}
            />
            <MenuITemBetween
              label="Descriere"
              resultText={user?.description}
              resultTextLength={25}
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
      <BottomSheetPopup
        open={open}
        height={40}
        onClose={handleClose}
        sheetBody={
          <Stack>
            <TouchableOpacity
              style={styles.sheetTitle}
              onPress={handleDeletePhoto}
            >
              <Text style={styles.sheetText}>Sterge fotografia actuala</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sheetTitle}>
              <Text style={styles.sheetText}>Adauga o fotografie</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sheetTitle}
              onPress={() => navigation.navigate("EditPhotoLibrary")}
            >
              <Text style={styles.sheetText}>Alege din biblioteca</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn}>
              <Text style={styles.cancelBtnText}>Renunta</Text>
            </TouchableOpacity>
          </Stack>
        }
      />
    </>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  goBack: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 15,
    padding: 10,
  },
  name: {
    fontFamily: "Exo-Bold",
    fontSize: 16,
    color: theme.lightColors.black,
  },
  sectionContainer: {
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 15,
  },
  sectionHeading: {
    marginBottom: 10,
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.grey0,
    fontSize: 13,
    marginTop: 5,
  },
  text: {
    marginTop: 15,
    fontFamily: "Exo-Bold",
    color: theme.lightColors.black,
    fontSize: 15,
  },
  sheetTitle: {
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
  sheetText: {
    fontFamily: "Exo-Medium",
    color: theme.lightColors.black,
  },
  cancelBtn: {
    width: "100%",
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  cancelBtnText: {
    textAlign: "center",
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.black,
  },
});
