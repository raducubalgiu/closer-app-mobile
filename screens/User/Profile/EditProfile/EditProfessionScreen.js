import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useState } from "react";
import {
  Button,
  Feedback,
  FormInputRadio,
  Header,
  Spinner,
} from "../../../../components/core";
import theme from "../../../../assets/styles/theme";
import { useAuth, useHttpGet, useHttpPatch } from "../../../../hooks";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const { primary } = theme.lightColors;

const EditProfessionScreen = () => {
  const { user, setUser } = useAuth();
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();
  const { data: businesses, loading } = useHttpGet(`/businesses`);

  const callback = (data) => {
    console.log("DATA!!", data);
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

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        divider
        actionBtn={!loadingPatch ? actionBtn : <ActivityIndicator />}
      />
      <Feedback feedback={feedback} setFeedback={setFeedback} />
      {!loading && (
        <FlatList
          data={businesses}
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
    fontFamily: "Exo-Medium",
  },
  strokeLength: {
    paddingHorizontal: 10,
    fontFamily: "Exo-Medium",
    color: theme.lightColors.grey0,
    marginTop: 10,
  },
});
