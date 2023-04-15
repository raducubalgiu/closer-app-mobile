import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { Icon } from "@rneui/themed";
import theme from "../../../../../assets/styles/theme";
import { Stack, CustomAvatar } from "../../../core";
import { User } from "../../../../ts";

const { black, primary, grey0 } = theme.lightColors || {};
type IProps = { user: User; onSelect: (user: User, action: string) => void };

const UserListItemSelectable = ({ user, onSelect }: IProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const onSelectUser = () => {
    setIsSelected((isSelected) => !isSelected);
    onSelect(user, isSelected ? "REMOVE" : "ADD");
  };

  return (
    <Pressable onPress={onSelectUser}>
      <Stack direction="row" sx={styles.container}>
        <Stack direction="row">
          <CustomAvatar avatar={user?.avatar} />
          <Stack align="start" sx={{ marginLeft: 10 }}>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.username}>{user?.username}</Text>
          </Stack>
        </Stack>
        <View
          style={{
            borderColor: isSelected ? primary : "#ccc",
            backgroundColor: isSelected ? primary : "white",
            ...styles.select,
          }}
        >
          {isSelected && <Icon name="check" size={20} color="white" />}
        </View>
      </Stack>
    </Pressable>
  );
};

export default UserListItemSelectable;

const styles = StyleSheet.create({
  container: { marginHorizontal: 15, marginBottom: 15 },
  name: {
    color: black,
    fontWeight: "600",
    fontSize: 16,
    marginRight: 5,
  },
  username: { color: grey0, marginTop: 2.5, fontSize: 15 },
  select: { width: 25, height: 25, borderWidth: 1.5, borderRadius: 50 },
});
