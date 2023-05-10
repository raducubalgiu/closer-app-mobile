import { useTranslation } from "react-i18next";
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import { Header, Heading, Button } from "../../../../components/core";
import { TextWithBullet } from "../../../../components/customized";
import theme from "../../../../../assets/styles/theme";
import { useAuth, usePatch } from "../../../../hooks";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";

const { black } = theme.lightColors || {};

export const HideAccountScreen = () => {
  const { user, setUser } = useAuth();
  const { status } = user || {};
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const { mutate, isLoading } = usePatch({
    uri: `/users/${user?.id}`,
    onSuccess: (res) => {
      setUser({
        ...user,
        status: res.data.status,
      });
      navigation.navigate("Profile");
    },
  });

  const handleUpdate = () =>
    mutate({
      status: status === "active" ? "hidden" : "active",
    });

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title={
          status === "hidden" ? t("yourAccountIsHidden") : t("hideAccount")
        }
      />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <ScrollView bounces={false} style={{ margin: 20 }}>
          <Heading
            title={status === "hidden" ? t("cancelHiding") : t("areYouSure")}
            sx={{ fontWeight: "500", fontSize: 19 }}
          />
          <Text style={styles.title}>
            {status === "hidden"
              ? t("byCancelHidingTheAccount")
              : t("byHidingTheAccount")}
            :
          </Text>
          {status !== "hidden" && (
            <>
              <TextWithBullet text={t("nobodyCanSeeYourAccountAndContent")} />
              <TextWithBullet text={t("youCannotEngageWithOtherUsers")} />
              <TextWithBullet text={t("youCanCancelHidingAccountAnytime")} />
              <TextWithBullet
                text={t("youWillBeLoggedInAppAndBookServices")}
                sxText={{ color: black, fontWeight: "500" }}
              />
            </>
          )}
          {status === "hidden" && (
            <TextWithBullet text={t("byCancelHidingTheAccountDescription")} />
          )}
        </ScrollView>
        <Button
          title={status === "hidden" ? t("cancel") : t("hide")}
          sxBtn={{ marginHorizontal: 20 }}
          loading={isLoading}
          disabled={isLoading}
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
  title: {
    marginTop: 20,
    marginBottom: 15,
    color: black,
    fontSize: 14.5,
  },
});
