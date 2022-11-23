import { SafeAreaView, StyleSheet, View } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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
  SuggestedUsersList,
  TopTabProfile,
  ProfileIconButton,
  FollowProfileButton,
} from "../../../components/customized";
import ProfileOverview from "../../../components/customized/ProfileOverview/ProfileOverview";
import { RootStackParams } from "../../../models/navigation/rootStackParams";

export const ProfileGeneralScreen = ({ route }) => {
  const { user } = useAuth();
  const { userId, username, avatar, name, checkmark } = route.params;
  const { service, option } = route.params;
  const [suggested, setSuggested] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const { data: userDetails } = useGet({
    model: "fetchUser",
    uri: `/users/${username}`,
  });

  const { mutate: handleSuggested, isLoading } = useGetMutate({
    uri: `/users/${userDetails?._id}/get-suggested`,
    onSuccess: (res: any) => setSuggested(res.data),
  });

  useGet({
    model: "checkFollow",
    uri: `/users/${user._id}/followings/${userId || userDetails?._is}/follows`,
    onSuccess: (res: any) => setIsFollow(res.data.status),
  });

  const { mutate: follow } = usePost({
    uri: `/users/${user?._id}/followings/${userId}/follows`,
    onSuccess: () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setIsFollow(true);
      //handleSuggested();
    },
  });

  const { mutate: unfollow } = useDelete({
    uri: `/users/${user?._id}/followings/${userId}/follows`,
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
    navigation.navigate("Map", { profession: userDetails?.profession });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <HeaderProfileGeneral
          username={username}
          checkmark={checkmark}
          onOpenNotifications={null}
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
        {isFollow && <ProfileIconButton name="map-pin" onPress={goToMap} />}
        <ProfileIconButton
          name="adduser"
          type="antdesign"
          onPress={handleSuggested}
          loading={isLoading}
        />
      </ProfileOverview>
      {suggested?.length > 0 && (
        <SuggestedUsersList suggested={suggested} userId={userId} />
      )}
      <TopTabProfile
        user={userDetails}
        userId={userId || userDetails?._id}
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
