import { SafeAreaView, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Divider } from "@rneui/themed";
import { useState } from "react";
import {
  Button,
  FormInputRadio,
  Header,
  Heading,
} from "../../../../components/core";
import theme from "../../../../assets/styles/theme";
import { useAuth } from "../../../../hooks";
import { displayNothing } from "../../../../utils";

const { grey0 } = theme.lightColors || {};

export const PrivacyCommentsScreen = () => {
  const { user } = useAuth();
  const { viewComments } = user?.settings || {};
  const [canAddComment, setCanAddComment] = useState(viewComments);
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("comments")} />
      <View style={styles.container}>
        <View>
          <Heading title={t("whoCanCommentToYourPosts")} sx={styles.heading} />
          <FormInputRadio
            title={t("allPeople")}
            description={displayNothing(
              canAddComment === "all",
              t("privacyCommentsAllDescription")
            )}
            checked={canAddComment === "all"}
            onPress={() => setCanAddComment("all")}
            sx={{ paddingVertical: 0 }}
          />
          <Divider color="#ddd" style={styles.divider} />
          <FormInputRadio
            title={t("followersThatYouAreFollowing")}
            description={displayNothing(
              canAddComment === "followers",
              t("privacyCommentsFollowersThatYouAreFollowingDescription")
            )}
            checked={canAddComment === "followers"}
            onPress={() => setCanAddComment("followers")}
            sx={{ paddingVertical: 0 }}
          />
          <Divider color="#ddd" style={styles.divider} />
          <FormInputRadio
            title={t("nobody")}
            description={displayNothing(
              canAddComment === "me",
              t("privacyCommentsNobodyDescription")
            )}
            checked={canAddComment === "me"}
            onPress={() => setCanAddComment("me")}
            sx={{ paddingVertical: 0 }}
          />
        </View>
        <Button
          title={t("save")}
          onPress={() => {}}
          disabled={viewComments === canAddComment}
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
  heading: { marginTop: 0, marginBottom: 25 },
  container: { margin: 15, justifyContent: "space-between", flex: 1 },
  divider: { marginVertical: 10 },
  description: { color: grey0, marginBottom: 15 },
});
