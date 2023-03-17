import { StyleSheet, Text, Animated } from "react-native";
import { memo } from "react";
import { User } from "../../../models";
import ProfileOverview from "../ProfileOverview/ProfileOverview";

type IProps = {
  user: User | null;
  panHandlers: any;
  headerHeight: number;
  scrollY: Animated.Value;
  profileActions: any;
};

const ProfileHeader = ({
  user,
  panHandlers,
  headerHeight,
  scrollY,
  profileActions,
}: IProps) => {
  const styles = StyleSheet.create({
    header: {
      height: headerHeight,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      backgroundColor: "white",
    },
  });

  const tHeader = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolateRight: "clamp",
  });

  return (
    <Animated.View
      {...panHandlers}
      style={[styles.header, { transform: [{ translateY: tHeader }] }]}
    >
      <ProfileOverview
        user={user}
        username={user?.username}
        name={user?.name}
        avatar={user?.avatar}
      >
        {profileActions}
      </ProfileOverview>
    </Animated.View>
  );
};

export default memo(ProfileHeader);
