import { StyleSheet, FlatList, ListRenderItemInfo } from "react-native";
import { memo, useCallback, Dispatch, SetStateAction } from "react";
import * as Animatable from "react-native-animatable";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { isEmpty } from "lodash";
import { AvatarDelete, Button } from "../../../core";
import { User } from "../../../../ts";
import { useTranslation } from "react-i18next";

type IProps = {
  selectedUsers: User[];
  setSelectedUsers: Dispatch<SetStateAction<User[]>>;
  onPress: () => void;
  isLoading?: boolean;
};

const FooterUserSelectable = ({
  selectedUsers,
  setSelectedUsers,
  onPress,
  isLoading = false,
}: IProps) => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const renderSelectedUser = useCallback(
    ({ item }: ListRenderItemInfo<User>) => (
      <AvatarDelete
        onPress={() =>
          setSelectedUsers((selectedUsers: User[]) =>
            selectedUsers.filter((u) => u?.id !== item.id)
          )
        }
        uri={item.avatar?.url}
      />
    ),
    [selectedUsers]
  );

  const keyExtractor = useCallback((item: User) => item.id, []);

  return (
    <Animatable.View
      animation="fadeInUp"
      duration={100}
      style={{
        paddingBottom: insets.bottom,
        ...styles.btn,
      }}
    >
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={selectedUsers}
        keyExtractor={keyExtractor}
        renderItem={renderSelectedUser}
      />
      <Button
        title={
          !isEmpty(selectedUsers)
            ? `${t("select")} (${selectedUsers?.length})`
            : `${t("select")}`
        }
        loading={isLoading}
        disabled={isLoading || selectedUsers?.length === 0}
        onPress={onPress}
      />
    </Animatable.View>
  );
};

export default memo(FooterUserSelectable);

const styles = StyleSheet.create({
  btn: {
    paddingTop: 5,
    marginHorizontal: 15,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});
