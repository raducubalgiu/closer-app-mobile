import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  View,
  TextInput,
} from "react-native";
import { Button, Header, Stack } from "../../components/core";
import {
  SettingsListItem,
  SettingsSwitchListItem,
} from "../../components/customized";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/rootStackParams";
import { Divider } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { isEmpty } from "lodash";
import { useState } from "react";

type IProps = NativeStackScreenProps<RootStackParams, "AddPost">;

export const AddPostScreen = ({ route }: IProps) => {
  const { photo, taggedUsers } = route.params;
  const [saveInPhone, setSaveInPhone] = useState(false);
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const tagUsersDescription: any = isEmpty(taggedUsers)
    ? t("youCanTagMaxTenPersons")
    : taggedUsers.map((user, index) =>
        index === taggedUsers?.length - 1 ? user?.name : `${user.name}, `
      );

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("upload")} />
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <Stack direction="row" align="start" sx={styles.description}>
            <View style={styles.imageBox}>
              <Image source={{ uri: photo.uri }} style={styles.image} />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <TextInput value="" placeholder={t("addPostDescription")} />
            </View>
          </Stack>
          <Divider color="#ddd" style={{ marginVertical: 10 }} />
          <SettingsListItem
            title={t("bookablePost")}
            description={t("bookablePostDescription")}
            onPress={() => {}}
            sx={{
              backgroundColor: "#f1f1f1",
              borderColor: "#eee",
              borderWidth: 1,
              borderRadius: 2.5,
            }}
            iconLeftProps={{
              name: "shopping-outline",
              type: "material-community",
            }}
            iconRightProps={{ color: "black" }}
          />
          <SettingsListItem
            title={t("tagPeople")}
            description={tagUsersDescription}
            iconLeftProps={{ name: "user" }}
            onPress={() => navigation.navigate("TagUsers", { taggedUsers })}
          />
          <SettingsListItem
            title={t("advancedSettings")}
            description={t("advacedAddPostSettingsDescription")}
            iconLeftProps={{ name: "unlock" }}
            onPress={() => {}}
          />
          <SettingsSwitchListItem
            title={t("saveInThePhone")}
            description={t("thePostWillBeSavedInPhoneAfterPosting")}
            iconLeftProps={{ name: "save" }}
            value={saveInPhone}
            onValueChange={() => setSaveInPhone((saveInPhone) => !saveInPhone)}
          />
        </ScrollView>
        <View>
          <Button title={t("upload")} onPress={() => {}} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    margin: 15,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  description: {
    marginBottom: 15,
  },
  imageBox: { height: 120, width: 95 },
  image: {
    height: undefined,
    width: undefined,
    ...StyleSheet.absoluteFillObject,
    borderRadius: 2.5,
  },
});
