import { useMemo, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native";
import { Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import theme from "../../../../assets/styles/theme";
import { Icon } from "@rneui/themed";
import {
  Stack,
  Header,
  ListItem,
  SheetModal,
} from "../../../../components/core";
import { EditProfileSheet } from "../../../../components/customized";
import CustomAvatar from "../../../../components/core/Avatars/CustomAvatar";
import { trimFunc } from "../../../../utils";
import { useAuth } from "../../../../src/hooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const { grey0, black } = theme.lightColors || {};
type ListItem = { label: string; val: any; nav: string };

export const EditProfileScreen = () => {
  const { user } = useAuth();
  const { name, username, profession, website, description } = user || {};
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();
  const sheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [1, 300], []);

  const list = [
    { label: "name", val: name, nav: "EditName" },
    { label: "username", val: username, nav: "EditUsername" },
    {
      label: "profession",
      val: t(`${profession?.name}`),
      nav: "EditProfession",
    },
    {
      label: "website",
      val: website ? website : t("addWebsite"),
      nav: "EditWebsite",
    },
    {
      label: "biography",
      val: description ? description : t("addBiography"),
      nav: "EditBio",
    },
  ];

  return (
    <>
      <SafeAreaView style={styles.screen}>
        <Header title={user?.name} />
        <ScrollView>
          <Stack sx={{ marginVertical: 20 }}>
            <Pressable
              style={{ alignItems: "center" }}
              onPress={() => sheetRef.current?.present()}
            >
              <CustomAvatar avatar={user?.avatar} size={95} />
              <Text style={styles.text}>{t("changePhoto")}</Text>
            </Pressable>
          </Stack>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>{t("aboutYou")}</Text>
            {list.map((item: ListItem, i: number) => (
              <ListItem
                key={i}
                between
                sx={styles.listItem}
                onPress={() => navigation.navigate<any>(item.nav)}
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
            <ListItem between sx={styles.listItem} onPress={() => {}}>
              <Text style={styles.label}>Instagram</Text>
              <Stack direction="row">
                <Text style={styles.buttonText}>raducu__balgiu</Text>
                <Icon name="keyboard-arrow-right" size={17} color={grey0} />
              </Stack>
            </ListItem>
            <ListItem between sx={styles.listItem} onPress={() => {}}>
              <Text style={styles.label}>Youtube</Text>
              <Stack direction="row">
                <Text style={styles.buttonText}>{t("addYoutubeAccount")}</Text>
                <Icon name="keyboard-arrow-right" size={17} color={grey0} />
              </Stack>
            </ListItem>
          </View>
        </ScrollView>
      </SafeAreaView>
      <SheetModal
        ref={sheetRef}
        snapPoints={snapPoints}
        animationConfig={{ duration: 150 }}
      >
        <EditProfileSheet onCloseSheet={() => sheetRef.current?.close()} />
      </SheetModal>
    </>
  );
};

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
    color: grey0,
    fontSize: 13,
    marginTop: 5,
    fontWeight: "600",
  },
  text: {
    marginTop: 15,
    color: black,
    fontSize: 15,
    fontWeight: "700",
  },
  label: {
    color: black,
    fontSize: 15,
    fontWeight: "500",
  },
  buttonText: {
    marginRight: 10,
    fontSize: 14.5,
    color: grey0,
  },
  listItem: {
    marginBottom: 20,
  },
});
