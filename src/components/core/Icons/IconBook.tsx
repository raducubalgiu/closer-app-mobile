import { Icon } from "@rneui/themed";

export const IconBook = ({ sx = {} }) => {
  return (
    <Icon
      name="shopping"
      type="material-community"
      color="white"
      size={20}
      containerStyle={{ ...sx }}
    />
  );
};
