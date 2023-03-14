import { StyleSheet, Text, View } from "react-native";
import { memo, useState } from "react";
import { Stack, IconStar, IconButton, Checkmark, Protected } from "../../core";
import CustomAvatar from "../../core/Avatars/CustomAvatar";
import theme from "../../../assets/styles/theme";
import { useTranslation } from "react-i18next";
import { trimFunc } from "../../../src/utils";
import FollowButton from "../Buttons/FollowButton";
import { MAIN_ROLE, SECOND_ROLE } from "@env";
import { User } from "../../../models/user";

const { grey0, black, primary } = theme.lightColors || {};

type IProps = { item: User; onRemoveCard: () => void };

const RecommendedUserListItem = ({ item, onRemoveCard }: IProps) => {
  const {
    username,
    avatar,
    followersCount,
    ratingsAverage,
    profession,
    checkmark,
    role,
  } = item;
  const { t } = useTranslation();
  const [isFollow, setIsFollow] = useState(false);

  return (
    <View style={styles.container}>
      <Stack justify="end" align="end" sx={{ width: "100%" }}>
        <IconButton
          onPress={onRemoveCard}
          name="close"
          type="antdesign"
          size={15}
          color={grey0}
          sx={{ marginRight: 10 }}
        />
      </Stack>
      <Stack sx={styles.content}>
        <Stack>
          <CustomAvatar avatar={avatar} size={75} />
        </Stack>
        <Stack
          direction="row"
          justify="start"
          sx={{ marginTop: 5, marginBottom: 2 }}
        >
          <Text style={styles.username}>{username}</Text>
          {checkmark && <Checkmark sx={{ marginLeft: 5 }} />}
        </Stack>
        <Stack direction="row" sx={{ marginTop: 2.5 }}>
          <Text style={styles.business}>{trimFunc(profession?.name, 12)}</Text>
          <Protected roles={[MAIN_ROLE, SECOND_ROLE]} userRole={role}>
            <Stack direction="row" sx={{ marginLeft: 2.5 }}>
              <IconStar />
              <Text style={styles.ratingsAverage}>{ratingsAverage}</Text>
            </Stack>
          </Protected>
        </Stack>
        <Text style={styles.followers}>
          {followersCount} {t("followers")}
        </Text>
        <FollowButton isFollow={isFollow} onPress={() => {}} fullWidth />
      </Stack>
    </View>
  );
};

export default memo(RecommendedUserListItem);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    marginHorizontal: 7.5,
    borderRadius: 5,
    width: 220,
    paddingVertical: 10,
  },
  content: {
    width: "100%",
    paddingHorizontal: 25,
  },
  name: {
    color: black,
    fontWeight: "600",
  },
  username: {
    color: black,
    fontWeight: "600",
    fontSize: 14.5,
  },
  followers: {
    color: grey0,
    fontSize: 13.5,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "400",
  },
  business: {
    color: primary,
    textTransform: "capitalize",
    fontWeight: "700",
  },
  followBtn: { marginTop: 10 },
  followBtnText: { textAlign: "center" },
  ratingsAverage: { marginLeft: 2.5, fontWeight: "600" },
});
