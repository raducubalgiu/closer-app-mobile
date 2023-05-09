import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  View,
  Keyboard,
} from "react-native";
import { useEffect, useState, useCallback } from "react";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Divider } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { includes, isEmpty, some } from "lodash";
import { RootStackParams } from "../../navigation/rootStackParams";
import { Button, Header, Input, Stack } from "../../components/core";
import {
  SettingsListItem,
  SettingsSwitchListItem,
  HashtagListItem,
  UserSelectableListItem,
} from "../../components/customized";
import { useAuth, useGet } from "../../hooks";
import { User, Hashtag } from "../../ts";
import dayjs from "dayjs";
import { setFileName, showToast } from "../../utils";

type IProps = NativeStackScreenProps<RootStackParams, "AddPost">;
type UserResponse = { next: number | null; results: User[] };
type HashtagResponse = { next: number | null; results: Hashtag[] };

export const AddPostScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const { uri, taggedUsers } = route.params;
  const [selectedUsers, setSelectedUsers] = useState(taggedUsers);
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  const [saveInPhone, setSaveInPhone] = useState(false);
  const [description, setDescription] = useState("");
  const [searchHastag, setSearchHashtag] = useState("");
  const [searchUsers, setSearchUsers] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const words = description.split(" ");
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  useEffect(() => {
    const lastWord = words[words.length - 1];
    const isHashtag = lastWord.startsWith("#");
    const isUser = lastWord.startsWith("@");
    setSearchHashtag(isHashtag ? lastWord.split("#")[1] : "");
    setSearchUsers(isUser ? lastWord.split("@")[1] : "");
  }, [description]);

  const { data: users } = useGet<UserResponse>({
    model: "search",
    uri: `/users/search?search=${searchUsers}&page=1&limit=5`,
    enableId: searchUsers,
    options: {
      enabled: !!searchUsers,
    },
  });

  const { data: hashtags } = useGet<HashtagResponse>({
    model: "searchHashtags",
    uri: `/hashtags/search?search=${searchHastag}&page=1&limit=5`,
    enableId: searchHastag,
    options: {
      enabled: !!searchHastag,
    },
  });

  const tagUsersDescription: any = isEmpty(selectedUsers)
    ? t("youCanTagMaxTenPersons")
    : selectedUsers.map((user, index) =>
        index === selectedUsers?.length - 1 ? user?.name : `${user.name}, `
      );

  const formatFileName = `${dayjs().utc(true).format()}_${
    user?.username
  }_post_image`;

  const handlePost = async () => {
    let formData: any = new FormData();
    formData.append("image", {
      name: formatFileName,
      uri,
      type: "image/jpg",
    } as unknown as Blob);

    formData.append("userId", user?.id);
    formData.append("description", description);
    //formData.append("postType", "video");

    if (!isEmpty(selectedUsers)) {
      formData.append(
        "mentions",
        selectedUsers.map((user) => user.id)
      );
    }

    try {
      setLoading(true);
      const response = await fetch(`${process.env.BASE_ENDPOINT}/posts`, {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      await response.json();
      setLoading(false);
      navigation.navigate("FeedExplore");
    } catch (error) {
      setLoading(false);
      showToast({ message: t("somethingWentWrong") });
    }
  };

  const handleSelectUser = useCallback(
    (user: User, action: string) => {
      Keyboard.dismiss();

      if (action === "REMOVE") {
        setSelectedUsers((selectedUsers) =>
          selectedUsers.filter((selectedUser) => selectedUser?.id !== user.id)
        );
      } else {
        if (selectedUsers?.length === 10) {
          return showToast({
            message: t("youCanTagMaxTenPersons"),
            short: true,
          });
        }
        setSelectedUsers((selectedUsers) => selectedUsers.concat(user));
      }
    },
    [selectedUsers]
  );

  const navigateToTagUsers = () =>
    navigation.navigate("TagUsers", {
      taggedUsers: selectedUsers,
    });

  const onSelectHashtag = (hashtagId: string) => {
    if (!includes(selectedHashtags, hashtagId)) {
      setSelectedHashtags((selectedHashtags) =>
        selectedHashtags.concat(hashtagId)
      );
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("upload")} />
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <Stack direction="row" align="start" sx={styles.description}>
            <View style={styles.imageBox}>
              <Image source={{ uri }} style={styles.image} />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Input
                value={description}
                placeholder={t("addPostDescription")}
                multiline={true}
                onChangeText={(text) => setDescription(text)}
                height={70}
                maxLength={300}
                withDetails
                spacing={0}
                border={false}
                onFocus={() => setKeyboardVisible(true)}
                onBlur={() => setKeyboardVisible(false)}
              />
            </View>
          </Stack>
          <Divider color="#ddd" />
          {isEmpty(searchHastag) && isEmpty(searchUsers) && (
            <View
              style={{
                backgroundColor: `rgba(0, 0, 0, ${
                  isEmpty(searchHastag) &&
                  isEmpty(searchUsers) &&
                  isKeyboardVisible
                    ? "0.3"
                    : "0.0"
                })`,
                paddingHorizontal: 15,
              }}
            >
              <SettingsListItem
                title={t("bookablePost")}
                description={t("bookablePostDescription")}
                onPress={() => {}}
                sx={styles.bookable}
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
                onPress={navigateToTagUsers}
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
                onValueChange={() =>
                  setSaveInPhone((saveInPhone) => !saveInPhone)
                }
              />
            </View>
          )}
          {!isEmpty(searchHastag) && (
            <View style={{ marginTop: 15 }}>
              {hashtags?.results?.map((item, i) => (
                <HashtagListItem
                  key={i}
                  name={item.name}
                  postsCount={item.postsCount}
                  onPress={() => onSelectHashtag(item.id)}
                />
              ))}
            </View>
          )}
          {!isEmpty(searchUsers) && (
            <View style={{ marginTop: 15 }}>
              {users?.results?.map((item, i) => (
                <UserSelectableListItem
                  user={item}
                  onSelect={handleSelectUser}
                  selected={some(selectedUsers, { id: item.id })}
                />
              ))}
            </View>
          )}
        </ScrollView>
        <View style={styles.button}>
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
  container: { flex: 1 },
  content: { flex: 1 },
  description: { padding: 15 },
  imageBox: { height: 105, width: 90 },
  image: {
    ...StyleSheet.absoluteFillObject,
    height: undefined,
    width: undefined,
    borderRadius: 2.5,
  },
  bookable: {
    backgroundColor: "#f1f1f1",
    borderColor: "#eee",
    borderWidth: 1,
    borderRadius: 2.5,
  },
  actionBtn: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    height: 30,
    borderRadius: 2.5,
  },
  actionBtnTxt: {
    marginLeft: 5,
    fontWeight: "500",
    fontSize: 13.5,
  },
  button: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingHorizontal: 15,
  },
});
