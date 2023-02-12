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
import { useTranslation } from "react-i18next";
import theme from "../../../../assets/styles/theme";
import {
  useAuth,
  useGetPaginate,
  usePaginateActions,
  usePatch,
} from "../../../../hooks";
import { Profession } from "../../../../models/profession";
import { HeaderEdit } from "../../../../components/customized";
import { MAIN_ROLE, SECOND_ROLE, THIRD_ROLE } from "@env";
import { FormInputRadio, Heading, Spinner } from "../../../../components/core";
import { Divider } from "@rneui/themed";

const { grey0 } = theme.lightColors || {};

export const EditProfessionScreen = () => {
  const { user, setUser } = useAuth();
  const [selected, setSelected] = useState(user?.profession);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const professionOptions = useGetPaginate({
    model: "professions",
    uri: `/professions`,
    limit: "20",
    enabled: user?.role === THIRD_ROLE,
  });

  const businessOptions = useGetPaginate({
    model: "businesses",
    uri: `/businesses`,
    limit: "20",
    enabled: user?.role === MAIN_ROLE || user?.role === SECOND_ROLE,
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

  const renderProfession = useCallback(
    ({ item }: ListRenderItemInfo<Profession>) => {
      return (
        <FormInputRadio
          text={t(`${item?.name}`)}
          checked={item?.id === selected?.id}
          onPress={() => setSelected(item)}
        />
      );
    },
    [selected]
  );

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderEdit
        iconBack
        title=""
        onSave={() => mutate({ profession: selected })}
        disabledSave={isLoading || user?.profession?.id === selected?.id}
      />
      {!isLoading && (
        <View style={{ margin: 15, flex: 1 }}>
          <Heading title={t("chooseCategory")} sx={styles.title} />
          <Text style={{ color: grey0, fontSize: 15 }}>
            {t("categoryDescription")}
          </Text>
          <Divider color="#ddd" style={{ marginTop: 10, paddingBottom: 7.5 }} />
          <FlatList
            data={user?.role === THIRD_ROLE ? professions : businesses}
            keyExtractor={(item) => item?.id}
            renderItem={renderProfession}
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
    fontSize: 18,
    fontWeight: "500",
    marginTop: 0,
    marginBottom: 5,
  },
});
