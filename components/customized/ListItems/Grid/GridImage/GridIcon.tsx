import { StyleSheet, View } from "react-native";
import { memo } from "react";
import { Icon } from "@rneui/themed";

type IProps = { fixed: boolean; postType: string; bookable: boolean };

const GridIcon = ({ fixed, postType, bookable }: IProps) => {
  let defProps = { name: "", type: "material-community", size: 20 };
  let iconProps = {};

  switch (true) {
    case fixed:
      iconProps = { name: "pushpin", type: "antdesign" };
      break;
    case postType === "video":
      iconProps = { name: "video" };
      break;
    case bookable:
      iconProps = { name: "shopping" };
      break;
    default:
      iconProps;
  }

  return (
    <View style={styles.container}>
      <Icon
        {...defProps}
        {...iconProps}
        color="white"
        style={{ marginLeft: 5 }}
      />
    </View>
  );
};

export default memo(GridIcon);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 10000,
    top: 5,
    right: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
