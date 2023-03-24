import { StyleSheet, Animated, useWindowDimensions } from "react-native";
import { memo } from "react";
import { User } from "../../../ts";
import ProfileOverview from "./ProfileOverview";

type IProps = {
  user: User | null;
  panHandlers: any;
  headerHeight: number;
  scrollY: Animated.Value;
  isBlocked: boolean;
  isPrivate: boolean;
  profileActions: any;
};

const ProfileHeader = ({
  user,
  panHandlers,
  headerHeight,
  scrollY,
  isPrivate,
  isBlocked,
  profileActions,
}: IProps) => {
  const { width } = useWindowDimensions();

  const styles = StyleSheet.create({
    header: {
      height: headerHeight,
      width,
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
        isBlocked={isBlocked}
        isPrivate={isPrivate}
      >
        {profileActions}
      </ProfileOverview>
    </Animated.View>
  );
};

export default memo(ProfileHeader);
