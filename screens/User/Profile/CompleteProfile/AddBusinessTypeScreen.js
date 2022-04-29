import { SafeAreaView, StyleSheet } from "react-native";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import React, { useCallback, useEffect, useState } from "react";
import Header from "../../../../components/customized/Headers/Header";
import { Stack } from "../../../../components/core";
import { MainButton } from "../../../../components/core";
import { useAuth } from "../../../../context/auth";
import { useNavigation } from "@react-navigation/native";

const AddBusinessTypeScreen = () => {
  const { user, setUser } = useAuth();
  const [disabled, setDisabled] = useState(true);
  const [categories, setCategories] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const navigation = useNavigation();

  const categoryPlaceholder = {
    label: "Selecteaza categoria principala",
    value: null,
    color: "#9EA0A4",
  };
  const businessPlaceholder = {
    label: "Selecteaza tipul afacerii",
    value: null,
    color: "#9EA0A4",
  };

  useEffect(() => {
    axios
      .get(`${process.env.BASE_ENDPOINT}/categories`)
      .then((res) => setCategories(res.data.categories))
      .catch((err) => console.log(err));
  }, []);

  const fetchBusinesses = useCallback(() => {
    if (selectedCategory) {
      axios
        .get(
          `${process.env.BASE_ENDPOINT}/categories/${selectedCategory}/businesses`
        )
        .then((res) => setBusinesses(res.data.businesses))
        .catch((err) => console.log(err.message));
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

  useEffect(() => {
    if (selectedCategory && selectedBusiness) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [selectedCategory, selectedBusiness]);

  const onSubmit = () => {
    axios
      .patch(
        `${process.env.BASE_ENDPOINT}/users/${user?._id}/update`,
        {
          business: selectedBusiness,
        },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then((res) => {
        const { name } = res.data.user.business;
        setUser({ ...user, business: name });
        navigation.navigate("Profile");
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title="Adauga tipul afacerii"
        withTooltip={true}
        tooltipText="Selecteaza din listele de mai jos tipul afacerii tale"
        tooltipContainer={{ width: 220, height: 60 }}
      />
      <Stack sx={{ margin: 15, flex: 1 }}>
        <Stack sx={{ width: "100%" }}>
          <RNPickerSelect
            placeholder={categoryPlaceholder}
            useNativeAndroidPickerStyle={false}
            onValueChange={(category) => setSelectedCategory(category)}
            style={{ ...pickerSelectStyles }}
            items={categories.map((category) => {
              return {
                label: category?.name,
                value: category?._id,
              };
            })}
          />
          <RNPickerSelect
            placeholder={businessPlaceholder}
            useNativeAndroidPickerStyle={false}
            onValueChange={(business) => setSelectedBusiness(business)}
            style={pickerSelectStyles}
            items={businesses.map((business) => {
              return {
                label: business?.name,
                value: business?._id,
              };
            })}
          />
        </Stack>
        <MainButton title="Salveaza" onPress={onSubmit} disabled={disabled} />
      </Stack>
    </SafeAreaView>
  );
};

export default AddBusinessTypeScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    color: "black",
    paddingRight: 30,
    fontFamily: "Exo-Medium",
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 10,
    color: "black",
    fontFamily: "Exo-Medium",
    paddingRight: 30, // to ensure the text is never behind the icon
    fontFamily: "Exo-Medium",
    marginBottom: 10,
  },
});
