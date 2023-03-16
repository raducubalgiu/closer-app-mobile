import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import React, { FC, memo, useEffect } from "react";

type Props = MaterialTopTabBarProps & {
  onIndexChange?: (index: number) => void;
};

const TabBar: FC<Props> = ({ onIndexChange, ...props }) => {
  const { index } = props.state;

  useEffect(() => {
    onIndexChange?.(index);
  }, [onIndexChange, index]);

  return <MaterialTopTabBar {...props} />;
};

export default memo(TabBar);
