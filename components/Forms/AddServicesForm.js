import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { ProgressStep } from "react-native-progress-steps";
import { Icon } from "react-native-elements";
import { Colors } from "../../assets/styles/Colors";

const AddServicesForm = () => {
  const [service, setService] = useState("");

  const handleService = (service) => {
    setService(service);
  };

  console.log(service);

  const addService = () => {};

  return (
    <ProgressStep label="Servicii" removeBtnRow={true}>
      <View
        style={{
          padding: 10,
          justifyContent: "space-between",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontFamily: "Exo-Regular" }}>
            Alege din lista de mai jos serviciile pe care desfasori la locatia
            introdusa anterior:
          </Text>

          <View style={styles.chipWrapper}>
            <View style={styles.chipContainer}>
              <Text style={styles.chipLabel}>Tuns</Text>
              <TouchableOpacity>
                <Icon
                  name="closecircle"
                  type="antdesign"
                  color="white"
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.serviceBox}>
            <TextInput
              style={{
                flex: 1,
                borderWidth: 2,
                borderColor: "#ccc",
                paddingVertical: 10,
                paddingHorizontal: 15,
                marginRight: 10,
                borderRadius: 5,
                fontFamily: "Exo-Medium",
              }}
              placeholder="Serviciu"
              value={service}
              onChangeText={handleService}
            />
            <TouchableOpacity style={styles.addBtn}>
              <Text style={styles.addBtnText}>Adauga</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.previousBtnStyle} onPress={() => {}}>
            <Text style={styles.previousBtnTextStyle}>Inapoi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextBtnStyle} onPress={addService}>
            <Text style={styles.nextBtnTextStyle}>Inainte</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ProgressStep>
  );
};

export default AddServicesForm;

const styles = StyleSheet.create({
  chipWrapper: { flexDirection: "row", alignItems: "center", marginTop: 15 },
  chipContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ccc",
    paddingHorizontal: 15,
    paddingVertical: 7.5,
    borderRadius: 20,
    marginRight: 10,
  },
  chipLabel: {
    fontFamily: "Exo-SemiBold",
    marginRight: 10,
    color: Colors.textDark,
    fontSize: 13,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  nextBtnStyle: {
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
    marginLeft: 10,
  },
  nextBtnTextStyle: {
    fontSize: 15,
    color: "white",
    fontFamily: "Exo-Medium",
  },
  previousBtnStyle: {
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderColor: Colors.primary,
  },
  previousBtnTextStyle: {
    color: Colors.textDark,
    fontFamily: "Exo-Medium",
    fontSize: 15,
  },
  serviceBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
  },
  addBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 12.5,
    borderRadius: 10,
  },
  addBtnText: {
    color: "white",
    fontFamily: "Exo-Medium",
    textAlign: "center",
  },
});
