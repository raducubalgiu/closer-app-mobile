import { StyleSheet, Text, Pressable, View } from "react-native";
import { Avatar, Icon } from "@rneui/themed";
import { Checkmark, IconButton, Stack } from "../../core";
import theme from "../../../../assets/styles/theme";
import NoAvatar from "../../../../assets/images/avatar.jpg";
import { useDelete } from "../../../hooks";

const { black, grey0 } = theme.lightColors || {};
type IProps = {
  item: any;
  onDelete: () => void;
  onGoToSearch: (arg: any) => void;
};

export const RecentSearchListItem = ({
  item,
  onDelete,
  onGoToSearch,
}: IProps) => {
  const { mutate } = useDelete({
    uri: `/searches/${item.id}`,
    onSuccess: () => onDelete(),
  });

  const { avatar, checkmark, name } = item?.user || {};
  const displayAvatar = avatar ? { uri: avatar } : NoAvatar;

  switch (true) {
    case !!item.user:
      return (
        <Pressable style={styles.item} onPress={() => onGoToSearch(item)}>
          <Stack direction="row">
            <Stack direction="row">
              <Avatar source={displayAvatar} rounded size={35} />
              <Text style={styles.searchItem}>{name}</Text>
              {checkmark && <Checkmark sx={{ marginLeft: 5 }} size={7.5} />}
            </Stack>
            <IconButton
              name="close"
              type="antdesign"
              size={17.5}
              color={grey0}
              onPress={() => mutate()}
            />
          </Stack>
        </Pressable>
      );
    case !!item.hashtag:
      return (
        <Pressable style={styles.item} onPress={() => onGoToSearch(item)}>
          <Stack direction="row">
            <Stack direction="row">
              <View style={styles.iconContainer}>
                <Icon name="hash" type="feather" color={black} size={17.5} />
              </View>
              <Text style={styles.searchItem}>{item?.hashtag?.name}</Text>
            </Stack>
            <IconButton
              name="close"
              type="antdesign"
              size={17.5}
              color={grey0}
              onPress={() => mutate()}
            />
          </Stack>
        </Pressable>
      );
    case !!item.word:
      return (
        <Pressable style={styles.item} onPress={() => onGoToSearch(item)}>
          <Stack direction="row">
            <Stack direction="row">
              <View style={styles.iconContainer}>
                <Icon name="search" type="feather" color={black} size={17.5} />
              </View>
              <Text style={styles.searchItem}>{item.word}</Text>
            </Stack>
            <IconButton
              name="close"
              type="antdesign"
              size={17.5}
              color={grey0}
              onPress={() => mutate()}
            />
          </Stack>
        </Pressable>
      );
    default:
      return (
        <Pressable style={styles.item} onPress={() => onGoToSearch(item)}>
          <Stack direction="row">
            <Stack direction="row">
              <View style={styles.iconContainer}>
                <Icon name="search" type="feather" color={black} size={17.5} />
              </View>
              <Text style={styles.searchItem}>{item.word}</Text>
            </Stack>
            <IconButton
              name="close"
              type="antdesign"
              size={17.5}
              color={grey0}
              onPress={() => mutate()}
            />
          </Stack>
        </Pressable>
      );
  }
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
  },
  searchItem: {
    color: black,
    marginLeft: 10,
    fontWeight: "600",
    fontSize: 14,
  },
  iconContainer: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
