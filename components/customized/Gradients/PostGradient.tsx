import { memo } from "react";
import { LinearGradient } from "expo-linear-gradient";

type IProps = { width: number; height: number };

const PostGradient = ({ width, height }: IProps) => {
  return (
    <LinearGradient
      colors={["#f1f1f1", "#d9d9d9"]}
      start={{ x: 1, y: 0.4 }}
      end={{ x: 1, y: 0.9 }}
      style={{ width, height }}
    />
  );
};

export default memo(PostGradient);
