import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import React from "react";
import { MainButton, Stack } from "../../../../components/core";
import Header from "../../../../components/customized/Headers/Header";
import { useForm, Controller } from "react-hook-form";
import TooltipTitle from "../../../../components/customized/ListItems/TooltipItem";
import { Colors } from "../../../../assets/styles/Colors";
import { Divider } from "react-native-elements";

const DUMMY_SERVICES = [
  {
    _id: "1",
    name: "Tuns",
  },
  {
    _id: "2",
    name: "Pensat",
  },
  {
    _id: "3",
    name: "Unghii",
  },
];

const defaultValues = {
  name: "",
  description: "",
  price: "",
};

const AddProductsScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const placeholder = {
    label: "Selecteaza serviciul aferent produsului",
    value: null,
    color: "#9EA0A4",
  };
  const placeholderOption = {
    label: "Selecteaza categoria produsului",
    value: null,
    color: "#9EA0A4",
  };

  const onSubmit = (data) => console.log(data);

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title="Adauga un produs"
        withTooltip={true}
        tooltipText="Este necesar sa adaugi minim un produs pentru a finaliza inscrierea"
        tooltipContainer={{ width: 220, height: 80 }}
      />
      <Divider color="#ddd" />
      <ScrollView bounces={false} showsVerticalScrollIndicator={true}>
        <Stack align="start" sx={{ margin: 15 }}>
          <TooltipTitle
            title="Produse"
            sx={{ marginBottom: 25 }}
            tooltipText="In aceasta sectiune vei adauga minim un produs, iar pe celelalte le vei adauga din panoul de bord"
            tooltipDimensions={{ width: 250, height: 80 }}
          />
          <View style={{ marginBottom: 15, width: "100%" }}>
            <RNPickerSelect
              placeholder={placeholder}
              useNativeAndroidPickerStyle={false}
              onValueChange={(value) => {}}
              style={pickerSelectStyles}
              items={DUMMY_SERVICES.map((service) => {
                return {
                  label: service?.name,
                  value: service?._id,
                };
              })}
            />
          </View>
          <View style={{ marginBottom: 15, width: "100%" }}>
            <RNPickerSelect
              placeholder={placeholderOption}
              useNativeAndroidPickerStyle={false}
              onValueChange={(value) => {}}
              style={pickerSelectStyles}
              items={DUMMY_SERVICES.map((service) => {
                return {
                  label: service?.name,
                  value: service?._id,
                };
              })}
            />
          </View>
          <View style={{ marginBottom: 15, width: "100%" }}>
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
                  //value={location?.street}
                  placeholder="Numele produsului"
                  placeholderTextColor={"#9EA0A4"}
                />
              )}
              name="name"
            />
            {errors.street && <Text>This is required.</Text>}
          </View>
          <View style={{ marginBottom: 15, width: "100%" }}>
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
                  //value={location?.street}
                  placeholder="Scurta descriere"
                  placeholderTextColor={"#9EA0A4"}
                />
              )}
              name="description"
            />
            {errors.street && <Text>This is required.</Text>}
          </View>
          <View style={{ marginBottom: 15, width: "100%" }}>
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
                  //value={location?.street}
                  placeholder="Pret"
                  placeholderTextColor={"#9EA0A4"}
                />
              )}
              name="price"
            />
            {errors.street && <Text>This is required.</Text>}
          </View>
          <View style={{ marginBottom: 15, width: "100%" }}>
            <MainButton title="Adauga" onPress={handleSubmit(onSubmit)} />
          </View>
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProductsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    fontFamily: "Exo-Regular",
    fontSize: 14,
    color: Colors.textDark,
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
    color: Colors.textDark,
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
    color: Colors.textDark,
    fontFamily: "Exo-Regular",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
