import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../../hooks/auth";
import theme from "../../../assets/styles/theme";
import { InputSelect, MainButton } from "../../core";

const defaultValues = {
  name: "",
  description: "",
  price: "",
  discount: "",
};

const EditProductForm = ({ product }) => {
  const { user } = useAuth();
  const [options, setOptions] = useState([product?.option]);
  const [selectedService, setSelectedService] = useState(product.service._id);
  const [selectedOption, setSelectedOption] = useState(product.option._id);
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const fetchFilters = useCallback(() => {
    axios
      .get(`${process.env.BASE_ENDPOINT}/services/${selectedService}/filters`)
      .then((res) => setOptions(res.data.filters[0].options))
      .catch((err) => console.log(err));
  }, [selectedService]);

  const onSubmit = (data) => {
    setLoading(true);
    const { description, price, discount, name } = data;
  };

  console.log(options);

  return (
    <>
      <View style={styles.row}>
        <InputSelect
          placeholder="Selecteaza serviciul aferent produsului*"
          value={product?.service}
          onValueChange={(text) => {
            setSelectedService(text);
            fetchFilters();
          }}
          items={user?.services}
        />
      </View>
      <View style={styles.row}>
        <InputSelect
          placeholder="Selecteaza categoria produsului*"
          onValueChange={(text) => {
            setSelectedOption(text);
          }}
          items={options}
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
              value={product?.name}
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
              value={product?.description}
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
              value={`${product?.price.toString()} RON`}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Pret*"
              placeholderTextColor={"#9EA0A4"}
            />
          )}
          name="price"
        />
        {errors.price && <Text>This is required.</Text>}
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
              value={product?.priceDiscount.toString()}
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

export default EditProductForm;

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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    color: theme.lightColors.black,
    paddingRight: 30,
    fontFamily: "Exo-Regular",
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 10,
    color: theme.lightColors.black,
    fontFamily: "Exo-Regular",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
