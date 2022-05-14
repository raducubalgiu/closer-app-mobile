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
import TooltipTitle from "../../../../components/customized/ListItems/TooltipItem";
import { AutocompleteGoogle } from "../../../../components/customized";
import { Stack, Header, MainButton } from "../../../../components/core";
import { Icon, Avatar, Badge } from "@rneui/themed";
import axios from "axios";
import { useAuth } from "../../../../hooks/auth";
import { useNavigation } from "@react-navigation/native";

const defaultValues = {
  street: "",
  number: "",
  blockApartment: "",
  city: "",
  county: "",
  country: "",
  coordinates: null,
};

const AddLocationScreen = () => {
  const { user, setUser } = useAuth();
  const [location, setLocation] = useState(defaultValues);
  const [images, setImages] = useState([]);
  const [blockApartment, setBlockApartment] = useState("");
  const navigation = useNavigation();

  const handleSetLocation = (location) => setLocation(location);

  const onSubmit = () => {
    axios
      .patch(
        `${process.env.BASE_ENDPOINT}/users/${user?._id}/update`,
        {
          location: { ...location, blockApartment, type: "Point" },
        },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      )
      .then((res) => {
        setUser({ ...user, location: res.data.user.location });
        navigation.navigate("Profile");
      })
      .catch(() => setVisible(true));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title="Adauga locatia"
        withTooltip={true}
        tooltipText="Adauga mai jos adresa la care iti desfasori activitatea si imagini de la locatie"
        tooltipContainer={{ width: 220, height: 80 }}
        divider={true}
      />
      <AutocompleteGoogle onSetLocation={handleSetLocation} />
      <ScrollView style={{ padding: 15 }} bounces={false}>
        <TooltipTitle
          title="Adauga adresa afacerii"
          tooltipText="Campurile bloc, scara etc se vor introduce manual (daca e cazul)"
          tooltipDimensions={{ width: 250, height: 60 }}
          sx={{ marginBottom: 20 }}
        />
        <Stack direction="row">
          <View style={{ flex: 1, marginRight: 5 }}>
            <TextInput
              style={{ ...styles.input, ...styles.disabled }}
              value={location?.street}
              placeholder="Strada"
              placeholderTextColor={theme.lightColors.grey0}
              editable={false}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <TextInput
              style={{ ...styles.input, ...styles.disabled }}
              value={location?.number}
              placeholder="Numar"
              placeholderTextColor={theme.lightColors.grey0}
              editable={false}
            />
          </View>
        </Stack>
        <View style={{ marginTop: 10 }}>
          <TextInput
            style={{ ...styles.input }}
            onChangeText={(text) => setBlockApartment(text)}
            placeholder="Bloc, scara, apartament"
            placeholderTextColor={theme.lightColors.grey0}
          />
        </View>
        <Stack direction="row" sx={{ marginTop: 10 }}>
          <View style={{ flex: 1, marginRight: 5 }}>
            <TextInput
              style={{ ...styles.input, ...styles.disabled }}
              value={location?.city}
              placeholder="Oras"
              placeholderTextColor={theme.lightColors.grey0}
              editable={false}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <TextInput
              style={{ ...styles.input, ...styles.disabled }}
              value={location?.county}
              placeholder="Judet"
              placeholderTextColor={theme.lightColors.grey0}
              editable={false}
            />
          </View>
        </Stack>
        <View style={{ marginTop: 10 }}>
          <TextInput
            style={{ ...styles.input, ...styles.disabled }}
            value={location?.country}
            placeholder="Tara"
            placeholderTextColor={theme.lightColors.grey0}
            editable={false}
          />
        </View>
        <Stack direction="row" sx={{ marginVertical: 15 }}>
          <TooltipTitle
            title="Adauga imagini"
            tooltipText="Adauga minim 3 imagini (maxim 5)"
            tooltipDimensions={{ width: 250, height: 50 }}
          />
          <TouchableOpacity>
            <Icon
              name="plussquare"
              type="antdesign"
              size={27.5}
              color={theme.lightColors.primary}
            />
          </TouchableOpacity>
        </Stack>
        <FlatList
          showsHorizontalScrollIndicator={false}
          bounces={false}
          horizontal
          data={images}
          keyExtractor={(item) => item?._id}
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
        <MainButton title="Salveaza" onPress={onSubmit} />
      </View>
    </SafeAreaView>
  );
};

export default AddLocationScreen;

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
    fontFamily: "Exo-Regular",
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
    borderColor: theme.lightColors.primary,
    backgroundColor: theme.lightColors.primary,
    marginRight: 10,
    borderRadius: 5,
  },
  nextBtnTextStyle: {
    fontSize: 15,
    color: "white",
    fontFamily: "Exo-Medium",
  },
  badgeStyle: {
    backgroundColor: theme.lightColors.black,
    width: 22.5,
    height: 22.5,
    borderRadius: 50,
  },
});