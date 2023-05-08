import { Pressable, StyleSheet, Text, View } from "react-native";
import { memo } from "react";
import { Icon } from "@rneui/themed";
import theme from "../../../../../assets/styles/theme";
import { Stack, CustomAvatar } from "../../../core";
import { User } from "../../../../ts";

const { black, primary, grey0 } = theme.lightColors || {};
type IProps = {
  user: User;
  selected: boolean;
  onSelect: (user: User, action: string) => void;
  disabled?: boolean;
};

const UserSelectableListItem = ({
  user,
  onSelect,
  selected,
  disabled = false,
}: IProps) => {
  const onSelectUser = () => {
    onSelect(user, selected ? "REMOVE" : "ADD");
  };

  return (
    <Pressable onPress={onSelectUser} disabled={disabled}>
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
            borderColor: selected ? primary : "#ccc",
            backgroundColor: selected ? primary : "white",
            ...styles.select,
          }}
        >
          {selected && <Icon name="check" size={20} color="white" />}
        </View>
      </Stack>
    </Pressable>
  );
};

export default memo(UserSelectableListItem);

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
