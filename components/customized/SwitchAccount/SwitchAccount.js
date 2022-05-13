import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { Avatar, Icon, Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../assets/styles/theme";
import { useAuth } from "../../../hooks/auth";

const SwitchAccount = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const USERS = [user];

  return (
    <>
      <View>
        <Text style={styles.heading}>Comuta contul</Text>
        <Divider />
      </View>
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        data={USERS}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {!user?.avatar && (
                <Avatar
                  size={55}
                  rounded
                  icon={{ name: "user", type: "font-awesome", size: 22.5 }}
                  containerStyle={{ backgroundColor: "#ccc" }}
                />
              )}
              {user?.avatar && (
                <Avatar
                  size={55}
                  rounded
                  source={{ uri: `${item?.avatar}` }}
                  containerStyle={{ backgroundColor: "#ccc" }}
                />
              )}
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.name}>{item?.name}</Text>
                <Text style={styles.job}>{item?.job}</Text>
              </View>
            </View>
            <View>
              <Icon
                name="check"
                type="andesign"
                color={theme.lightColors.primary}
              />
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Order", {
                activeStep: 1,
                headerLabel: "Detalii Business",
              })
            }
            style={styles.actionBtn}
          >
            <Avatar
              size={55}
              rounded
              icon={{
                name: "plus",
                type: "feather",
                color: theme.lightColors.black,
                size: 26,
              }}
              containerStyle={{ backgroundColor: "#eee" }}
            />
            <Text style={styles.actionBtnText}>Adauga cont</Text>
          </TouchableOpacity>
        }
      />
    </>
  );
};

export default SwitchAccount;

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    fontFamily: "Exo-SemiBold",
    color: theme.lightColors.black,
    marginBottom: 15,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  name: {
    fontFamily: "Exo-SemiBold",
    marginBottom: 2.5,
    fontSize: 15,
  },
  job: { fontFamily: "Exo-Medium", color: theme.lightColors.grey0 },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  actionBtnText: {
    fontFamily: "Exo-Medium",
    marginBottom: 2.5,
    fontSize: 15,
    marginLeft: 10,
  },
});
