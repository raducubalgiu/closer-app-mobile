import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import React, { useRef, useMemo, useCallback } from "react";
import { Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../../assets/styles/theme";
import { useAuth } from "../../../../hooks/auth";
import { Icon } from "@rneui/themed";
import {
  Stack,
  Header,
  CustomAvatar,
  Button,
  ListItem,
} from "../../../../components/core";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { trimFunc } from "../../../../utils";

const { grey0, black } = theme.lightColors;

const EditProfileScreen = () => {
  const { user, setUser } = useAuth();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "40%"], []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        disappearsOnIndex={0}
      />
    ),
    []
  );

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCloseSheet = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

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

  const list = [
    { label: "name", val: user?.name, nav: "EditName" },
    { label: "username", val: user?.username, nav: "EditUsername" },
    { label: "profession", val: "Liber Profesionist", nav: "EditProfession" },
    { label: "website", val: user?.website, nav: "EditWebsite" },
    { label: "description", val: user?.description, nav: "EditBio" },
  ];

  return (
    <>
      <SafeAreaView style={styles.screen}>
        <Header title={user?.name} />
        <ScrollView>
          <Stack sx={{ marginVertical: 20 }}>
            <Button
              sx={{ alignItems: "center" }}
              onPress={handlePresentModalPress}
            >
              <CustomAvatar avatar={user?.avatar} size={95} iconSize={35} />
              <Text style={styles.text}>{t("changePhoto")}</Text>
            </Button>
          </Stack>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>{t("aboutYou")}</Text>
            {list.map((item, i) => (
              <ListItem
                key={i}
                between
                sx={styles.listItem}
                onPress={() => navigation.navigate(item.nav)}
              >
                <Text style={styles.label}>{t(item.label)}</Text>
                <Stack direction="row">
                  <Text style={styles.buttonText}>
                    {trimFunc(item?.val, 30)}
                  </Text>
                  <Icon name="keyboard-arrow-right" size={17} color={grey0} />
                </Stack>
              </ListItem>
            ))}
          </View>
          <Divider color="#ddd" />
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>Social</Text>
            <ListItem between sx={styles.listItem}>
              <Text style={styles.label}>Instagram</Text>
              <Stack direction="row">
                <Text style={styles.buttonText}>raducu__balgiu</Text>
                <Icon name="keyboard-arrow-right" size={17} color={grey0} />
              </Stack>
            </ListItem>
            <ListItem between sx={styles.listItem}>
              <Text style={styles.label}>Youtube</Text>
              <Stack direction="row">
                <Text style={styles.buttonText}>{t("addYoutubeAccount")}</Text>
                <Icon name="keyboard-arrow-right" size={17} color={grey0} />
              </Stack>
            </ListItem>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Portal>
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={styles.indicatorStyle}
          >
            <Stack sx={{ padding: 15 }}>
              <Button sx={styles.sheetTitle} onPress={handleDeletePhoto}>
                <Text style={styles.sheetText}>{t("erasePhoto")}</Text>
              </Button>
              <Button sx={styles.sheetTitle}>
                <Text style={styles.sheetText}>{t("addPhoto")}</Text>
              </Button>
              <Button
                sx={styles.sheetTitle}
                onPress={() => navigation.navigate("EditPhotoLibrary")}
              >
                <Text style={styles.sheetText}>{t("chooseFromLibrary")}</Text>
              </Button>
              <Button sx={styles.cancelBtn} onPress={handleCloseSheet}>
                <Text style={styles.cancelBtnText}>{t("cancel")}</Text>
              </Button>
            </Stack>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </Portal>
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
    color: black,
  },
  sectionContainer: {
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 15,
  },
  sectionHeading: {
    marginBottom: 10,
    fontFamily: "Exo-SemiBold",
    color: grey0,
    fontSize: 13,
    marginTop: 5,
  },
  text: {
    marginTop: 15,
    fontFamily: "Exo-Bold",
    color: black,
    fontSize: 15,
  },
  sheetTitle: {
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
  sheetText: {
    fontFamily: "Exo-Medium",
    color: black,
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
    color: black,
  },
  indicatorStyle: {
    backgroundColor: "#ddd",
    width: 45,
    height: 5,
  },
  label: {
    fontFamily: "Exo-Medium",
    color: black,
    fontSize: 15,
  },
  buttonText: {
    fontFamily: "Exo-Medium",
    marginRight: 10,
    fontSize: 14,
    color: grey0,
  },
  listItem: {
    marginBottom: 20,
  },
});
