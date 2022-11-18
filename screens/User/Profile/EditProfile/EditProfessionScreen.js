import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useCallback, useState } from "react";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import {
  FormInputRadio,
  Header,
  SearchBarInput,
  Stack,
} from "../../../../components/core";
import theme from "../../../../assets/styles/theme";
import { useAuth, useGet, usePatch } from "../../../../hooks";

const { primary, grey0 } = theme.lightColors;

export const EditProfessionScreen = () => {
  const { user, setUser } = useAuth();
  const { role } = user;
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { data: businesses } = useGet({
    model: "businesses",
    uri: `/businesses`,
  });

  const { isLoading: loadingPatch, mutate } = usePatch({
    uri: `/users/${user?._id}/update`,
    onSuccess: (res) => {
      setUser({ ...user, profession: res.data.profession });
      navigation.goBack();
    },
  });

  const handleProfession = () => {
    if (selected) {
      mutate({
        profession: {
          _id: selected?._id,
          category: selected?.category,
          name: selected?.name,
        },
      });
    }
  };

  const actionBtn = (
    <Pressable disabled={!selected || loadingPatch} onPress={handleProfession}>
      <Icon
        name="checkcircle"
        type="antdesign"
        color={!selected ? "#ccc" : primary}
        size={25}
      />
    </Pressable>
  );

  console.log(selected?.name);

  const renderBusiness = useCallback(
    ({ item }) => (
      <FormInputRadio
        text={item.name}
        checked={item.name === selected?.name}
        onPress={() => setSelected(item)}
      />
    ),
    [selected]
  );

  const keyExtractor = useCallback((item) => item._id, []);

  let data;
  if (role === "admin") data = businesses;

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title={t("addCategory")}
        divider
        actionBtn={!loadingPatch ? actionBtn : <ActivityIndicator />}
      />
      <Stack sx={styles.searchbar}>
        <SearchBarInput placeholder={t("search")} />
      </Stack>
      <FlashList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderBusiness}
        contentContainerStyle={{ paddingVertical: 15 }}
        estimatedItemSize={57}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  textAreaContainer: {
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 5,
  },
  textArea: {
    height: 100,
    justifyContent: "flex-start",
    padding: 10,
  },
  strokeLength: {
    paddingHorizontal: 10,
    color: grey0,
    marginTop: 10,
  },
  searchbar: { marginHorizontal: 15, marginTop: 10, height: 50 },
});
