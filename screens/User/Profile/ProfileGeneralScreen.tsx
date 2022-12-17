import { SafeAreaView, StyleSheet, View } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import * as Haptics from "expo-haptics";
import {
  useAuth,
  useGet,
  useGetMutate,
  usePost,
  useDelete,
} from "../../../hooks";
import {
  HeaderProfileGeneral,
  TopTabProfile,
  ProfileIconButton,
  FollowProfileButton,
} from "../../../components/customized";
import SuggestedUsersList from "../../../components/customized/Lists/SuggestedUsersList";
import ProfileOverview from "../../../components/customized/ProfileOverview/ProfileOverview";
import { RootStackParams } from "../../../models/navigation/rootStackParams";
import { Protected } from "../../../components/core";
import { MAIN_ROLE, SECOND_ROLE } from "@env";

type IProps = NativeStackScreenProps<RootStackParams, "ProfileGeneral">;

export const ProfileGeneralScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const { userId, username, avatar, name, checkmark } = route.params;
  const { service, option } = route.params;
  const [isFollow, setIsFollow] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const { data: userDetails } = useGet({
    model: "fetchUser",
    uri: `/users/${username}`,
  });

  const {
    data: suggested,
    mutate: handleSuggested,
    isLoading,
  } = useGetMutate({ uri: `/users/suggested` });

  useGet({
    model: "checkFollow",
    uri: `/users/${user.id}/followings/${userId || userDetails?.id}/follows`,
    onSuccess: (res: any) => setIsFollow(res.data.status),
  });

  const { mutate: follow } = usePost({
    uri: `/users/${user?.id}/followings/${userId}/follows`,
    onSuccess: () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setIsFollow(true);
      //handleSuggested();
    },
  });

  const { mutate: unfollow } = useDelete({
    uri: `/users/${user?.id}/followings/${userId}/follows`,
    onSuccess: () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setIsFollow(false);
    },
  });

  const handleFollow = () => (isFollow ? unfollow() : follow({}));

  const goToMessage = () =>
    navigation.navigate("MessageItem", {
      user: {
        _id: userId,
        username,
        avatar,
        name,
        checkmark,
      },
    });
  const goToMap = () => {
    navigation.push("Map", {
      profession: userDetails?.profession?._id,
      userId: userDetails?._id,
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <HeaderProfileGeneral
          username={username}
          checkmark={checkmark}
          onOpenNotifications={() => {}}
          onOpenSettings={() => {}}
        />
      </SafeAreaView>
      <ProfileOverview
        user={userDetails}
        name={name ? name : userDetails?.name}
        username={username}
        avatar={avatar ? avatar : userDetails?.avatar}
      >
        <FollowProfileButton isFollow={isFollow} onPress={handleFollow} />
        {isFollow && (
          <ProfileIconButton name="message-circle" onPress={goToMessage} />
        )}
        <Protected
          roles={[MAIN_ROLE, SECOND_ROLE]}
          userRole={userDetails?.role}
        >
          <ProfileIconButton name="map-pin" onPress={goToMap} />
        </Protected>
        <ProfileIconButton
          name="adduser"
          type="antdesign"
          onPress={handleSuggested}
          loading={isLoading}
        />
      </ProfileOverview>
      {suggested && (
        <SuggestedUsersList suggested={suggested?.data} userId={userId} />
      )}
      <TopTabProfile
        user={userDetails}
        userId={userId || userDetails?.id}
        service={service}
        option={option}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
