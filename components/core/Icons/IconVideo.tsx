import { Icon } from "@rneui/themed";

export const IconVideo = ({ sx = {} }) => {
  return (
    <Icon
      name="video"
      type="feather"
      color="white"
      size={20}
      containerStyle={{ ...sx }}
    />
  );
};
