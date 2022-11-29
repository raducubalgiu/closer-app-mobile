import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import theme from "../../../../assets/styles/theme";
import { AutocompleteGoogle } from "../../../../components/customized";
import { Stack, Header, Button } from "../../../../components/core";
import { Icon, Avatar, Badge } from "@rneui/themed";
import { useAuth } from "../../../../hooks/auth";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { usePost } from "../../../../hooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../models/navigation/rootStackParams";

const { primary, black, grey0 } = theme.lightColors || {};

const defaultValues = {
  street: "",
  number: "",
  blockApartment: "",
  city: "",
  county: "",
  country: "",
  coordinates: null,
};

export const AddLocationScreen = () => {
  const { user, setUser } = useAuth();
  const [location, setLocation] = useState(defaultValues);
  const [images, setImages] = useState([]);
  const [blockApartment, setBlockApartment] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();

  const handleSetLocation = (location: any) => setLocation(location);

  const { mutate: makePost, isLoading: loading } = usePost({
    uri: `/users/${user?._id}/locations`,
    onSuccess: (res) => {
      setUser({ ...user, location: res._id });
      navigation.navigate("Profile");
    },
  });

  const onSubmit = () => {
    makePost({
      address: { ...location, blockApartment },
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Adauga locatia" divider />
      <AutocompleteGoogle onSetLocation={handleSetLocation} />
      <ScrollView style={{ padding: 15 }} bounces={false}>
        <Stack direction="row">
          <View style={{ flex: 1, marginRight: 5 }}>
            <TextInput
              style={{ ...styles.input, ...styles.disabled }}
              value={location?.street}
              placeholder="Strada"
              placeholderTextColor={grey0}
              editable={false}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <TextInput
              style={{ ...styles.input, ...styles.disabled }}
              value={location?.number}
              placeholder="Numar"
              placeholderTextColor={grey0}
              editable={false}
            />
          </View>
        </Stack>
        <View style={{ marginTop: 10 }}>
          <TextInput
            style={{ ...styles.input }}
            onChangeText={(text) => setBlockApartment(text)}
            placeholder="Bloc, scara, apartament"
            placeholderTextColor={grey0}
          />
        </View>
        <Stack direction="row" sx={{ marginTop: 10 }}>
          <View style={{ flex: 1, marginRight: 5 }}>
            <TextInput
              style={{ ...styles.input, ...styles.disabled }}
              value={location?.city}
              placeholder="Oras"
              placeholderTextColor={grey0}
              editable={false}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <TextInput
              style={{ ...styles.input, ...styles.disabled }}
              value={location?.county}
              placeholder="Judet"
              placeholderTextColor={grey0}
              editable={false}
            />
          </View>
        </Stack>
        <View style={{ marginTop: 10 }}>
          <TextInput
            style={{ ...styles.input, ...styles.disabled }}
            value={location?.country}
            placeholder="Tara"
            placeholderTextColor={grey0}
            editable={false}
          />
        </View>
        <Stack direction="row" sx={{ marginVertical: 15 }}>
          <TouchableOpacity>
            <Icon
              name="plussquare"
              type="antdesign"
              size={27.5}
              color={primary}
            />
          </TouchableOpacity>
        </Stack>
        <FlatList
          showsHorizontalScrollIndicator={false}
          bounces={false}
          horizontal
          data={images}
          keyExtractor={(item: any) => item?._id}
          contentContainerStyle={{ paddingVertical: 20 }}
          renderItem={({ item }) => (
            <View style={{ marginRight: 20 }}>
              <Avatar
                source={{
                  uri: `${item?.image}`,
                }}
                size={120}
                avatarStyle={{ borderRadius: 10 }}
              />
              <Badge
                badgeStyle={styles.badgeStyle}
                value={
                  <TouchableOpacity>
                    <Icon
                      name="close"
                      type="antdesign"
                      size={15}
                      color="white"
                    />
                  </TouchableOpacity>
                }
                containerStyle={{ position: "absolute", top: -10, left: 105 }}
              />
            </View>
          )}
        />
      </ScrollView>
      <View style={styles.actionButtons}>
        <Button
          size="lg"
          title={t("save")}
          onPress={onSubmit}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  input: {
    padding: 13,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  disabled: {
    backgroundColor: "#f1f1f1",
    borderColor: "#f1f1f1",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    margin: 15,
  },
  nextBtnStyle: {
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: primary,
    backgroundColor: primary,
    marginRight: 10,
    borderRadius: 5,
  },
  nextBtnTextStyle: {
    fontSize: 15,
    color: "white",
  },
  badgeStyle: {
    backgroundColor: black,
    width: 22.5,
    height: 22.5,
    borderRadius: 50,
  },
});
