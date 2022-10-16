import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import {
  Button,
  Feedback,
  FormInputRadio,
  Header,
  Spinner,
} from "../../../../components/core";
import theme from "../../../../assets/styles/theme";
import { useAuth, useHttpGet, useHttpPatch } from "../../../../hooks";

const { primary } = theme.lightColors;

const EditProfessionScreen = () => {
  const { user, setUser } = useAuth();
  const { role } = user;
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();
  const { data: businesses, loading } = useHttpGet(`/businesses`);
  const { data: jobs } = useHttpGet("/jobs");
  const { t } = useTranslation();

  const callback = (data) => {
    setUser({ ...user, profession: data.profession });
    navigation.goBack();
  };
  const {
    makePatch,
    loading: loadingPatch,
    feedback,
    setFeedback,
  } = useHttpPatch(`/users/${user?._id}/update`, callback);

  const handleProfession = () => {
    if (selected) {
      makePatch({
        profession: {
          _id: selected?._id,
          category: selected?.category,
          name: selected?.name,
        },
      });
    }
  };

  const actionBtn = (
    <Button disabled={!selected || loadingPatch} onPress={handleProfession}>
      <Icon
        name="checkcircle"
        type="antdesign"
        color={!selected ? "#ccc" : primary}
        size={25}
      />
    </Button>
  );

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
      <Feedback feedback={feedback} setFeedback={setFeedback} />
      {!loading && (
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderBusiness}
          contentContainerStyle={{ padding: 15 }}
        />
      )}
      {loading && <Spinner />}
    </SafeAreaView>
  );
};

export default EditProfessionScreen;

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
    color: theme.lightColors.grey0,
    marginTop: 10,
  },
});
