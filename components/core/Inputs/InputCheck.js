import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import { MainButton } from "../Buttons/MainButton";
import React, { useEffect, useState } from "react";
import theme from "../../../assets/styles/theme";
import { Icon } from "@rneui/themed";
import { Stack } from "../Stack/Stack";
import { FormInput } from "./FormInput";

const { error } = theme.lightColors;

const InputCheck = ({ inputName, endpoint, onSubmit, loadingBtn }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const methods = useForm({ defaultValues: { inputName: "" } });
  const { handleSubmit, watch } = methods;
  const input = watch(inputName);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setLoading(true);
      axios
        .post(endpoint, {
          username: input,
        })
        .then((res) => {
          setLoading(false);
          setStatus(res.data.status);
        })
        .catch((err) => console.log(err));
    }, 1000);

    return () => {
      clearTimeout(identifier);
    };
  }, [input]);

  let showStatus;

  if (input === undefined) {
    showStatus = <Text></Text>;
  } else if (!loading && input !== "") {
    showStatus = (
      <Icon
        name={status === "success" ? "check" : "info-with-circle"}
        type="entypo"
        size={18}
        color={status === "success" ? "green" : "red"}
      />
    );
  } else if (loading && input !== "") {
    showStatus = <ActivityIndicator size="small" />;
  } else {
    showStatus = <Text></Text>;
  }

  const onHandleSubmit = (data) => {
    if (status === "success") onSubmit(data);
  };

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        <View style={{ flex: 1 }}>
          <Stack direction="row" align="center">
            <FormInput
              sx={{ flex: 1 }}
              name={inputName}
              placeholder="Nume de utilizator"
            />
            <View style={{ padding: 10 }}>{showStatus}</View>
          </Stack>
        </View>
        <MainButton
          onPress={handleSubmit(onHandleSubmit)}
          title="Continuare"
          disabled={!input ? true : false}
          loading={loadingBtn}
          size="lg"
        />
      </FormProvider>
    </View>
  );
};

export default InputCheck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputCheck: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: { flex: 1, padding: 15 },
  error: {
    color: error,
    marginLeft: 10,
    marginTop: 5,
    fontSize: 13,
  },
});
