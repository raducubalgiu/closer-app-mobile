import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  View,
  Text,
} from "react-native";
import { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation, withTranslation } from "react-i18next";
import theme from "../../../../../assets/styles/theme";
import {
  useAuth,
  useGetPaginate,
  usePaginateActions,
  usePatch,
} from "../../../../hooks";
import { Profession } from "../../../../models/profession";
import { HeaderEdit } from "../../../../components/customized";
import { SUPERADMIN_ROLE, THIRD_ROLE } from "@env";
import {
  FormInputRadio,
  Heading,
  SearchBarInput,
  Spinner,
} from "../../../../components/core";
import { Divider } from "@rneui/themed";

const { grey0 } = theme.lightColors || {};

export const EditProfessionScreen = () => {
  const { user, setUser } = useAuth();
  const [selected, setSelected] = useState(user?.profession);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  const { t } = useTranslation(["common", "professions", "businesses"]);

  const isRegularUser =
    user?.role === THIRD_ROLE || user?.role === SUPERADMIN_ROLE;

  const professionOptions = useGetPaginate({
    model: "professions",
    uri: `/professions`,
    limit: "20",
    enabled: isRegularUser,
  });

  const businessOptions = useGetPaginate({
    model: "businesses",
    uri: `/businesses`,
    limit: "20",
    enabled: !isRegularUser,
  });

  const { data: professions } = usePaginateActions(professionOptions);
  const { data: businesses } = usePaginateActions(businessOptions);

  const { isLoading, mutate } = usePatch({
    uri: `/users/${user?.id}`,
    onSuccess: (res) => {
      setUser({ ...user, profession: res.data.profession });
      navigation.goBack();
    },
  });

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Profession>) => (
      <FormInputRadio
        title={t(`${item?.name}`)}
        checked={item?.id === selected?.id}
        onPress={() => setSelected(item)}
      />
    ),
    [selected, t]
  );

  const hasData = businesses?.length > 0 || professions?.length > 0;
  let header;
  if (hasData) {
    header = (
      <SearchBarInput
        placeholder={t("search")}
        value={search}
        showCancel={false}
        onChangeText={(text) => setSearch(text)}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderEdit
        iconBack
        title=""
        onSave={() => mutate({ profession: selected })}
        disabledSave={isLoading || user?.profession?.id === selected?.id}
      />
      {!isLoading && (
        <View style={{ marginVertical: 15, flex: 1 }}>
          <Heading title={t("chooseCategory")} sx={styles.title} />
          <Text style={styles.description}>{t("categoryDescription")}</Text>
          <Divider color="#ddd" style={{ marginTop: 10, paddingBottom: 7.5 }} />
          <FlatList
            ListHeaderComponent={header}
            data={isRegularUser ? professions : businesses}
            keyExtractor={(item) => item?.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          />
        </View>
      )}
      {isLoading && <Spinner />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 19,
    fontWeight: "700",
    marginTop: 0,
    marginBottom: 5,
    paddingHorizontal: 15,
  },
  description: {
    color: grey0,
    fontSize: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
});
