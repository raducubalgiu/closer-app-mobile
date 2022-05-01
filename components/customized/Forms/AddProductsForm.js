import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../../context/auth";
import theme from "../../../assets/styles/theme";
import { MainButton, InputSelect } from "../../core";

const defaultValues = {
  name: "",
  description: "",
  price: "",
  discount: "",
};

const AddProductsForm = (props) => {
  const { user } = useAuth();
  const [filters, setFilters] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const fetchFilters = useCallback(() => {
    if (selectedService) {
      axios
        .get(`${process.env.BASE_ENDPOINT}/services/${selectedService}/filters`)
        .then((res) => setFilters(res.data.filters[0].options))
        .catch((err) => console.log(err));
    }
  }, [selectedService]);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  const onSubmit = (data) => {
    setLoading(true);
    const { description, price, discount, name } = data;
    axios
      .post(
        `${process.env.BASE_ENDPOINT}/users/${user?._id}/products`,
        {
          name,
          description,
          price,
          discount,
          service: selectedService,
          option: selectedOption,
        },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then((res) => {
        setLoading(false);
        props.onAddProduct(res.data.product);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <View style={styles.row}>
        <InputSelect
          placeholder="Selecteaza serviciul aferent produsului*"
          onValueChange={(service) => {
            setSelectedService(service);
            fetchFilters();
          }}
          value={selectedService}
          items={user?.services}
        />
      </View>
      <View style={styles.row}>
        <InputSelect
          placeholder="Selecteaza categoria produsului"
          onValueChange={(option) => setSelectedOption(option)}
          value={selectedOption}
          items={filters}
        />
      </View>
      <View style={styles.row}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{
                ...styles.input,
              }}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Numele produsului*"
              placeholderTextColor={"#9EA0A4"}
            />
          )}
          name="name"
        />
        {errors.street && <Text>This is required.</Text>}
      </View>
      <View style={styles.row}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{
                ...styles.input,
              }}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Scurta descriere"
              placeholderTextColor={"#9EA0A4"}
            />
          )}
          name="description"
        />
        {errors.street && <Text>This is required.</Text>}
      </View>
      <View style={styles.row}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{
                ...styles.input,
              }}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Pret*"
              placeholderTextColor={"#9EA0A4"}
            />
          )}
          name="price"
        />
        {errors.street && <Text>This is required.</Text>}
      </View>
      <View style={styles.row}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{
                ...styles.input,
              }}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Discount"
              placeholderTextColor={"#9EA0A4"}
            />
          )}
          name="discount"
        />
        {errors.street && <Text>This is required.</Text>}
      </View>
      <View style={styles.row}>
        <MainButton
          title={loading ? <ActivityIndicator color="white" /> : "Adauga"}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </>
  );
};

export default AddProductsForm;

const styles = StyleSheet.create({
  row: { marginBottom: 15, width: "100%" },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    fontFamily: "Exo-Regular",
    fontSize: 14,
    color: theme.lightColors.black,
  },
});
