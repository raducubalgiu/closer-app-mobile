import { StyleSheet, View } from "react-native";
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
  CardAccountPrivate,
} from "../../../components/customized";
import ProfileOverview from "../../../components/customized/ProfileOverview/ProfileOverview";
import SuggestedUsersList from "../../../components/customized/Lists/SuggestedUsersList";
import { RootStackParams } from "../../../navigation/rootStackParams";
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
    uri: `/users/${user?.id}/followings/${userId || userDetails?.id}/follows`,
    onSuccess: (res: any) => setIsFollow(res.data.status),
  });

  const { mutate: follow } = usePost({
    uri: `/users/${user?.id}/followings/${userId}/follows`,
    onSuccess: () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setIsFollow(true);
      handleSuggested();
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
  const goToMessage = () => {
    // navigation.navigate("MessageItem", {
    //   user: {
    //     _id: userId,
    //     username,
    //     avatar,
    //     name,
    //     checkmark,
    //   },
    // });
  };

  const goToMap = () => {
    navigation.push("Map", {
      profession: userDetails?.profession?._id,
      userId: userDetails?._id,
    });
  };

  const isPrivate = !isFollow && userDetails?.private;

  return (
    <View style={styles.container}>
      <View style={{ height: 100, zIndex: 10000 }}>
        <HeaderProfileGeneral
          username={username}
          checkmark={checkmark}
          onOpenSettings={() => {}}
        />
      </View>
      {!isPrivate && (
        <TopTabProfile
          user={userDetails}
          userId={userId || userDetails?.id}
          service={service}
          option={option}
          profileOverview={
            <>
              <ProfileOverview
                user={userDetails}
                name={name}
                username={username}
                avatar={avatar}
              >
                <FollowProfileButton
                  isFollow={isFollow}
                  onPress={handleFollow}
                />
                {isFollow && (
                  <ProfileIconButton
                    name="message-circle"
                    onPress={goToMessage}
                  />
                )}
                <Protected
                  roles={[MAIN_ROLE, SECOND_ROLE]}
                  userRole={userDetails?.role}
                >
                  <ProfileIconButton name="map-pin" onPress={goToMap} />
                </Protected>
                <ProfileIconButton name="bell" onPress={() => {}} />
                <ProfileIconButton
                  name="adduser"
                  type="antdesign"
                  onPress={handleSuggested}
                  loading={isLoading}
                />
              </ProfileOverview>
              {isPrivate && <CardAccountPrivate />}
              {suggested && (
                <SuggestedUsersList
                  suggested={suggested?.data}
                  userId={userId}
                />
              )}
            </>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
