import { SafeAreaView, StyleSheet } from "react-native";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
  InputSelect,
  Stack,
  MainButton,
  Header,
  Feedback,
} from "../../../../components/core";
import { useAuth } from "../../../../hooks/auth";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { BASE_ENDPOINT } from "@env";

const AddBusinessTypeScreen = () => {
  const { user, setUser } = useAuth();
  const [feedback, setFeedback] = useState({ visible: false, message: "" });
  const [disabled, setDisabled] = useState(true);
  const [categories, setCategories] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const navigation = useNavigation();
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get(`${BASE_ENDPOINT}/categories`)
      .then((res) => setCategories(res.data.categories))
      .catch(() =>
        setFeedback({ visible: true, message: t("somethingWentWrong") })
      );
  }, []);

  const fetchBusinesses = useCallback(() => {
    if (selectedCategory) {
      axios
        .get(`${BASE_ENDPOINT}/categories/${selectedCategory}/businesses`)
        .then((res) => setBusinesses(res.data.businesses))
        .catch(() =>
          setFeedback({ visible: true, message: t("somethingWentWrong") })
        );
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
        `${BASE_ENDPOINT}/users/${user?._id}/update`,
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
      .catch(() =>
        setFeedback({ visible: true, message: t("somethingWentWrong") })
      );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("addBusinessType")} />
      <Feedback feedback={feedback} setFeedback={setFeedback} />
      <Stack sx={{ margin: 15, flex: 1 }}>
        <Stack sx={{ width: "100%" }}>
          <Stack sx={{ marginBottom: 10, width: "100%" }}>
            <InputSelect
              value={selectedCategory}
              placeholder={t("selectCategory")}
              onValueChange={(category) => setSelectedCategory(category)}
              items={categories}
            />
          </Stack>
          <InputSelect
            value={selectedBusiness}
            placeholder={t("selectBusinessType")}
            onValueChange={(business) => setSelectedBusiness(business)}
            items={businesses}
          />
        </Stack>
        <MainButton
          size="lg"
          fullWidth
          title={t("save")}
          onPress={onSubmit}
          disabled={disabled}
        />
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
