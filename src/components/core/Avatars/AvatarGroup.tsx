import { StyleSheet, View } from "react-native";
import { Avatar } from "@rneui/themed";

type IProps = { sx?: {} };

export const AvatarGroup = ({ sx }: IProps) => {
  return (
    <View style={[styles.container, sx]}>
      <Avatar
        rounded
        size={25}
        source={{
          uri: "https://res.cloudinary.com/closer-app/image/upload/v1667841461/raducu-balgiu-avatar_ejmoaf.jpg",
        }}
        containerStyle={{
          borderWidth: 2,
          borderColor: "white",
          zIndex: 10,
        }}
      />
      <Avatar
        rounded
        size={25}
        source={{
          uri: "https://res.cloudinary.com/closer-app/image/upload/v1667922458/romina-1_f4pyf9.jpg",
        }}
        containerStyle={{
          marginLeft: -10,
          borderWidth: 2,
          borderColor: "white",
          zIndex: 5,
        }}
      />
      <Avatar
        rounded
        size={25}
        source={{
          uri: "https://res.cloudinary.com/closer-app/image/upload/v1667549749/marina-filimon-avatar_n6aiua.jpg",
        }}
        containerStyle={{
          marginLeft: -10,
          borderWidth: 2,
          borderColor: "white",
          zIndex: 1,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
