import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  View,
  TextInput,
  Text,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { Button, Header, Input, Stack } from "../../components/core";
import {
  SettingsListItem,
  SettingsSwitchListItem,
} from "../../components/customized";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/rootStackParams";
import { Divider, Icon } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { isEmpty } from "lodash";
import { useCallback, useState } from "react";
import { useAuth } from "../../hooks";
import dayjs from "dayjs";
import theme from "../../../assets/styles/theme";

const { black, primary, error } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "AddPost">;

export const AddPostScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const { photo, taggedUsers } = route.params;
  const [saveInPhone, setSaveInPhone] = useState(false);
  const [description, setDescription] = useState("");
  const [height, setHeight] = useState<number>(100);
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions();

  const tagUsersDescription: any = isEmpty(taggedUsers)
    ? t("youCanTagMaxTenPersons")
    : taggedUsers.map((user, index) =>
        index === taggedUsers?.length - 1 ? user?.name : `${user.name}, `
      );

  const formatFileName = `${dayjs().utc(true).format()}_${
    user?.username
  }_post_image`;

  const handlePost = async () => {
    let formData: any = new FormData();
    formData.append("image", {
      name: formatFileName,
      uri: photo.uri,
      type: "image/jpg",
    } as unknown as Blob);

    formData.append("userId", user?.id);
    formData.append("description", description);

    if (!isEmpty(taggedUsers)) {
      formData.append(
        "mentions",
        taggedUsers.map((user) => user.id)
      );
    }

    try {
      setLoading(true);
      const response = await fetch(`${process.env.BASE_ENDPOINT}/posts`, {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      const data = await response.json();
      setLoading(false);
      navigation.navigate("FeedExplore");
    } catch (error) {
      setLoading(false);
    }
  };

  const getColor = useCallback((description: string) => {
    switch (description?.length) {
      case 0:
        return "#ddd";
      case 200:
        return error;
      default:
        return primary;
    }
  }, []);

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
              <Input
                value={description}
                placeholder={t("addPostDescription")}
                multiline={true}
                onChangeText={(text) => setDescription(text)}
                height={100}
                maxLength={300}
                withDetails
                spacing={0}
                border={false}
              />
            </View>
          </Stack>
          <Stack direction="row" sx={{ marginVertical: 5 }}>
            <Pressable
              style={{
                width: width / 2 - 20,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "#ddd",
                height: 30,
                borderRadius: 2.5,
              }}
            >
              <Stack direction="row">
                <Icon name="hash" type="feather" size={15} />
                <Text
                  style={{ marginLeft: 5, fontWeight: "500", fontSize: 13.5 }}
                >
                  {t("hashtags")}
                </Text>
              </Stack>
            </Pressable>
            <Pressable
              style={{
                width: width / 2 - 20,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "#ddd",
                height: 30,
                borderRadius: 2.5,
              }}
            >
              <Stack direction="row">
                <Icon name="at-sign" type="feather" size={15} />
                <Text
                  style={{ marginLeft: 5, fontWeight: "500", fontSize: 13.5 }}
                >
                  {t("mentions")}
                </Text>
              </Stack>
            </Pressable>
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
          <Button
            title={t("upload")}
            onPress={handlePost}
            disabled={loading}
            loading={loading}
          />
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
  imageBox: { height: 130, width: 95 },
  image: {
    height: undefined,
    width: undefined,
    ...StyleSheet.absoluteFillObject,
    borderRadius: 2.5,
  },
});
