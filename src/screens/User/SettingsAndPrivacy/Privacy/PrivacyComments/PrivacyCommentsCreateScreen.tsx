import {
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import {
  Header,
  Heading,
  FormInputRadio,
  Button,
} from "../../../../../components/core";
import { useAuth, usePatch } from "../../../../../hooks";
import { showToast } from "../../../../../utils";
import theme from "../../../../../../assets/styles/theme";
import { CommentsViewCreateEnum } from "../../../../../ts";

const { error } = theme.lightColors || {};

export const PrivacyCommentsCreateScreen = () => {
  const { user, setUser } = useAuth();
  const { comments } = user?.settings || {};
  const [create, setCreate] = useState(comments?.create);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const { mutate, isLoading } = usePatch({
    uri: `/users/${user?.id}/settings`,
    onSuccess: (res) => {
      setUser({
        ...user,
        settings: res.data,
      });
      showToast({ message: t("youChangedSettings"), short: true });
      navigation.goBack();
    },
    onError: () =>
      showToast({ message: t("somethingWentWrong"), bgColor: error }),
  });

  const handleUpdate = () => mutate({ comments: { ...comments, create } });

  type InputProps = { title: string; action: string };

  const inputs = [
    { title: t("allPeople"), action: CommentsViewCreateEnum.ALL },
    { title: t("nobody"), action: CommentsViewCreateEnum.NOBODY },
    {
      title: t("followersThatYouAreFollowing"),
      action: CommentsViewCreateEnum.FOLLOWERS_AND_FOLLOWINGS,
    },
  ];

  const renderFormRadio = useCallback(
    ({ item }: ListRenderItemInfo<InputProps>) => (
      <FormInputRadio
        title={item.title}
        checked={create === item.action}
        onPress={() => setCreate(item.action)}
        variant="normal"
      />
    ),
    [create]
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("privacyCommentsCreateTitle")} />
      <View style={styles.container}>
        <View>
          <Heading title={t("whoCanCommentToYourPosts")} />
          <FlatList
            data={inputs}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderFormRadio}
            ItemSeparatorComponent={() => <Divider />}
          />
        </View>
        <Button
          title={t("save")}
          disabled={create === comments?.create}
          loading={isLoading}
          onPress={handleUpdate}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: { margin: 15, justifyContent: "space-between", flex: 1 },
});
