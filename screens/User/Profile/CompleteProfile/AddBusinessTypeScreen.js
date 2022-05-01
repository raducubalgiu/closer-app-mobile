import { SafeAreaView, StyleSheet } from "react-native";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Header from "../../../../components/customized/Headers/Header";
import { InputSelect, Stack, MainButton } from "../../../../components/core";
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
        setUser({ ...user, business: { name } });
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
          <InputSelect
            placeholder="Selecteaza categoria principala"
            onValueChange={(category) => setSelectedCategory(category)}
            items={categories}
          />
          <InputSelect
            placeholder="Selecteaza tipul afacerii"
            onValueChange={(business) => setSelectedBusiness(business)}
            items={businesses}
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
