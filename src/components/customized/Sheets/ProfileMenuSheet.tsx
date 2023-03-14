import { ListRenderItemInfo, StyleSheet } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MAIN_ROLE, SECOND_ROLE, SUPERADMIN_ROLE, THIRD_ROLE } from "@env";
import { useAuth } from "../../../hooks";
import theme from "../../../../assets/styles/theme";
import { Protected } from "../../core";
import { RootStackParams } from "../../../navigation/rootStackParams";
import { SettingsListItem } from "../ListItems/SettingsListItem";

const { black } = theme.lightColors || {};

type IProps = { onCloseSheet: () => void };
type Item = {
  id: string;
  title: string;
  iconName: string;
  navigation?: any;
  roles: string[];
};

export const ProfileMenuSheet = ({ onCloseSheet }: IProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { user } = useAuth();
  const { t } = useTranslation();

  const handleShareProfile = () => {};

  const items = [
    {
      id: "1",
      title: t("myBusiness"),
      iconName: "airplay",
      navigation: "MyBusiness",
      roles: [MAIN_ROLE, SECOND_ROLE],
    },
    {
      id: "2",
      title: t("settingsAndPrivacy"),
      iconName: "settings",
      navigation: "Settings",
      roles: [MAIN_ROLE, SECOND_ROLE, THIRD_ROLE, SUPERADMIN_ROLE],
    },
    {
      id: "6",
      title: t("shareProfile"),
      iconName: "share-2",
      roles: [THIRD_ROLE, SUPERADMIN_ROLE],
    },
  ];

  const handleNavigate = (item: Item) => {
    if (item.navigation) {
      navigation.navigate(item?.navigation);
      onCloseSheet();
    } else {
      handleShareProfile();
    }
  };

  const renderItem = ({ item }: ListRenderItemInfo<Item>) => (
    <Protected userRole={user?.role} roles={item?.roles}>
      <SettingsListItem
        title={item?.title}
        onPress={() => handleNavigate(item)}
        iconLeftProps={{ name: item?.iconName, size: 22.5 }}
        rightIcon={false}
      />
    </Protected>
  );

  return (
    <BottomSheetFlatList
      data={items}
      contentContainerStyle={styles.container}
      keyExtractor={(item) => item?.id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 15, marginTop: 7.5, flex: 1 },
  listItem: {
    paddingLeft: 0,
    backgroundColor: "white",
    marginBottom: 15,
  },
  text: {
    color: black,
    paddingVertical: 2.5,
    marginLeft: 15,
    fontWeight: "500",
    fontSize: 14,
  },
});
