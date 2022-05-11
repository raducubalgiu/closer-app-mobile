import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Stack } from "../index";
import { Icon, Tooltip, Divider } from "@rneui/themed";
import React from "react";
import theme from "../../../assets/styles/theme";
import { useNavigation } from "@react-navigation/native";
import IconBackButton from "../IconButton/IconBackButton";

const Header = (props) => {
  const navigation = useNavigation();

  const handleBack = () => navigation.goBack();

  return (
    <>
      <Stack direction="row" sx={styles.container}>
        <TouchableOpacity
          onPress={!props.hideBtnLeft ? () => handleBack : null}
        >
          <IconBackButton
            color={!props.hideBtnLeft ? theme.lightColors.black : "white"}
          />
        </TouchableOpacity>
        <Stack direction="row">
          <Text style={styles.title}>{props.title}</Text>
          {props.withTooltip && (
            <Tooltip
              backgroundColor={theme.lightColors.primary}
              popover={<Text style={styles.popover}>{props.tooltipText}</Text>}
              containerStyle={{
                ...styles.tooltipBody,
                ...props.tooltipContainer,
              }}
            >
              <Icon
                name="info"
                type="feather"
                color={theme.lightColors.black}
              />
            </Tooltip>
          )}
        </Stack>
        {props.actionBtn && props.actionBtn}
        {!props.actionBtn && (
          <Icon name="chevron-thin-right" type="entypo" color="white" />
        )}
      </Stack>
      {props.divider && <Divider color="#ddd" />}
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: { paddingVertical: 10, paddingHorizontal: 15 },
  popover: { color: "white", fontFamily: "Exo-Medium" },
  title: {
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
    color: theme.lightColors.black,
    marginRight: 10,
  },
  tooltipBody: { flex: 1 },
});
