import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ProgressStep } from "react-native-progress-steps";
import { useForm, Controller } from "react-hook-form";
import React from "react";
import { Colors } from "../../assets/styles/Colors";
import { useAuth } from "../../context/auth";
import axios from "axios";

const RegisterLocationForm = (props) => {
  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      street: "",
      number: "",
      blockApartment: "",
      coordinates: "",
      city: "",
      county: "",
    },
  });

  const handleLocation = async (data) => {
    try {
      const {
        name,
        description,
        street,
        number,
        blockApartment,
        coordinates,
        city,
        county,
      } = data;
      const [lat, lng] = coordinates.split(",");

      const res = await axios.post(
        "http://192.168.100.2:8000/api/v1/locations",
        {
          startLocation: {
            address: {
              street,
              county,
              city,
              number,
              blockApartment,
            },
            coordinates: [lat * 1, lng * 1],
            type: "Point",
          },
          name: name,
          description: description,
          owner: user?._id,
          employees: user?.id,
          job: "Restaurant",
        },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );

      console.log("LOCATION!!!!!!", res.data.location);

      if (res.data.location) {
        const orderRes = await axios.patch(
          `http://192.168.100.2:8000/api/v1/orders/${user?.orderId}/order`,
          {
            location: res.data.location._id,
            activeStep: 2,
          },
          { headers: { Authorization: `Bearer ${user?.token}` } }
        );

        if (orderRes.data.order) props.onUpdateStep();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ProgressStep label="Business" removeBtnRow={true}>
      <View style={{ padding: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 1, marginRight: 5 }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={{
                    borderRadius: 10,
                    ...styles.input,
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Numele locatiei*"
                  placeholderTextColor={Colors.textLight}
                />
              )}
              name="name"
            />
            {errors.name && <Text>This is required.</Text>}
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={{
                    borderRadius: 10,
                    ...styles.input,
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Scurta Descriere*"
                  placeholderTextColor={Colors.textLight}
                />
              )}
              name="description"
            />
            {errors.description && <Text>This is required.</Text>}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <View style={{ flex: 1, marginRight: 5 }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={{
                    borderRadius: 10,
                    ...styles.input,
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Strada*"
                  placeholderTextColor={Colors.textLight}
                />
              )}
              name="street"
            />
            {errors.street && <Text>This is required.</Text>}
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={{
                    borderRadius: 10,
                    ...styles.input,
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Numar*"
                  placeholderTextColor={Colors.textLight}
                />
              )}
              name="number"
            />
            {errors.number && <Text>This is required.</Text>}
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{
                  borderRadius: 10,
                  ...styles.input,
                }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Bloc, scara etc"
                placeholderTextColor={Colors.textLight}
              />
            )}
            name="blockApartment"
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{
                  borderRadius: 10,
                  ...styles.input,
                }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Coordonate"
                placeholderTextColor={Colors.textLight}
              />
            )}
            name="coordinates"
          />
          {errors.coordinates && <Text>This is required.</Text>}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <View style={{ flex: 1, marginRight: 5 }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={{
                    borderRadius: 10,
                    ...styles.input,
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Oras*"
                  placeholderTextColor={Colors.textLight}
                />
              )}
              name="city"
            />
            {errors.city && <Text>This is required.</Text>}
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={{
                    borderRadius: 10,
                    ...styles.input,
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Judet*"
                  placeholderTextColor={Colors.textLight}
                />
              )}
              name="county"
            />
            {errors.county && <Text>This is required.</Text>}
          </View>
        </View>
        <Text
          style={{
            marginTop: 25,
            marginBottom: 10,
            fontFamily: "Exo-Bold",
            color: Colors.textLight,
          }}
        >
          Atentie!
        </Text>
        <Text
          style={{
            fontFamily: "Exo-Medium",
            color: Colors.textLight,
          }}
        >
          Daca ai mai multe locatii, vei introduce prima locatie in acest pas,
          iar urmatoarele locatii vor fi introduse ulterior ce vei fi logat in
          aplicatie
        </Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.nextBtnStyle}
          onPress={handleSubmit(handleLocation)}
        >
          <Text style={styles.nextBtnTextStyle}>Inainte</Text>
        </TouchableOpacity>
      </View>
    </ProgressStep>
  );
};

export default RegisterLocationForm;

const styles = StyleSheet.create({
  input: {
    padding: 17.5,
    borderWidth: 1,
    borderColor: "#ccc",
    fontFamily: "Exo-Regular",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  nextBtnStyle: {
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
    marginRight: 10,
  },
  nextBtnTextStyle: {
    fontSize: 15,
    color: "white",
    fontFamily: "Exo-Medium",
  },
});
