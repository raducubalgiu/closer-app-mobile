import { StyleSheet, Text, Pressable, View } from "react-native";
import React, { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../../assets/styles/theme";
import { Stack, Checkmark, Protected } from "../../../core";
import CustomAvatar from "../../../core/Avatars/CustomAvatar";
import { Icon } from "@rneui/themed";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";
import { MAIN_ROLE, SECOND_ROLE } from "@env";
import { useTranslation } from "react-i18next";

const { grey0, primary, black } = theme.lightColors || {};

type IProps = {
  userId: string;
  avatar: any;
  username: string;
  checkmark: boolean;
  profession: any;
  name: string;
  role: string;
  ratingsAverage: number;
  onShowDetails: () => void;
};

const CardPostHeader = ({
  userId,
  avatar,
  username,
  checkmark,
  profession,
  name,
  role,
  ratingsAverage,
  onShowDetails,
}: IProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();

  const goToUser = (userId: string) => {
    navigation.push("ProfileGeneral", {
      userId,
      avatar,
      username,
      name,
      checkmark,
      service: null,
      option: null,
    });
  };

  const goToStories = () => {
    navigation.navigate("Story");
  };

  return (
    <Stack direction="row">
      <View style={{ paddingLeft: 15 }}>
        <Stack direction="row" sx={styles.avatarContainer}>
          <Pressable onPress={goToStories}>
            <CustomAvatar avatar={avatar} size={30} />
          </Pressable>
          <Pressable onPress={() => goToUser(userId)}>
            <Stack align="start">
              <Stack direction="row">
                <Text style={styles.name}>@{username}</Text>
                {checkmark && <Checkmark sx={{ marginLeft: 5 }} size={8} />}
              </Stack>
              <Stack direction="row" sx={{ marginTop: 1 }}>
                <Text style={styles.profession}>
                  {t(`${profession?.name}`)}
                </Text>
                <Protected userRole={role} roles={[MAIN_ROLE, SECOND_ROLE]}>
                  <Text style={styles.point}>{"\u2B24"}</Text>
                  <Stack direction="row">
                    <Icon
                      name="star"
                      type="antdesign"
                      size={12.5}
                      color={primary}
                    />
                    <Text style={styles.ratingsAverage}>
                      {ratingsAverage?.toFixed(1)}
                    </Text>
                  </Stack>
                </Protected>
              </Stack>
            </Stack>
          </Pressable>
        </Stack>
      </View>
      <Pressable onPress={onShowDetails} style={{ padding: 15 }}>
        <Icon name="more-horizontal" type="feather" size={20} />
      </Pressable>
    </Stack>
  );
};

export default memo(CardPostHeader);

const styles = StyleSheet.create({
  avatarContainer: {
    marginVertical: 10,
  },
  name: { marginLeft: 10, fontWeight: "600", fontSize: 14 },
  profession: {
    marginLeft: 10,
    color: grey0,
    fontSize: 13,
    textTransform: "capitalize",
    fontWeight: "500",
  },
  point: { fontSize: 3, color: grey0, marginHorizontal: 5 },
  ratingsAverage: {
    color: black,
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 2.5,
  },
});
