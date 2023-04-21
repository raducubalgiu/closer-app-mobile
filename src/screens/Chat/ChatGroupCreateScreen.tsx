import {
  SafeAreaView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { useForm, FormProvider } from "react-hook-form";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/rootStackParams";
import { User } from "../../ts";
import { useAuth, usePost } from "../../hooks";
import { Button, FormTextField, Header, Heading } from "../../components/core";
import { UserListItemSimple } from "../../components/customized";
import { showToast } from "../../utils";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type IProps = NativeStackScreenProps<RootStackParams, "ChatGroupCreate">;

export const ChatGroupCreateScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const { users } = route.params;
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const insets = useSafeAreaInsets();
  const methods = useForm({ defaultValues: { name: "" } });
  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;

  const { mutate: goToMessages, isLoading } = usePost({
    uri: `/users/${user?.id}/chats`,
    onSuccess: (response) => {
      navigation.navigate("Messages", { chat: response.data });
    },
    onError: () => showToast({ message: "Grupul nu a putut fi creat" }),
  });

  const renderUser = useCallback(
    ({ item }: ListRenderItemInfo<User>) => (
      <UserListItemSimple
        title={item?.name}
        description={item?.username}
        checkmark={item?.checkmark}
        avatar={item?.avatar}
        sx={{ marginBottom: 15 }}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item: User) => item.id, []);

  const onCreateGroup = (data: { name: string }) => {
    goToMessages({
      name: data.name,
      users: users.map((u) => u.id),
      groupAdmin: [user?.id],
      isGroupChat: true,
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("createNewGroup")} />
      <FormProvider {...methods}>
        <View style={styles.container}>
          <View style={{ margin: 15, flex: 1 }}>
            <FormTextField
              name="name"
              placeholder={t("chooseGroupName")}
              label={t("nameOfTheGroup")}
            />
            {user && (
              <FlatList
                ListHeaderComponent={
                  <Heading title={t("members")} sx={{ marginBottom: 25 }} />
                }
                data={[user, ...users]}
                keyExtractor={keyExtractor}
                renderItem={renderUser}
              />
            )}
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={95}
          >
            <Button
              title={t("createNewGroup")}
              onPress={handleSubmit(onCreateGroup)}
              disabled={!isDirty || isLoading}
              loading={isLoading}
              sxBtn={{ marginHorizontal: 15 }}
            />
          </KeyboardAvoidingView>
        </View>
      </FormProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: { flex: 1, justifyContent: "space-between" },
});
