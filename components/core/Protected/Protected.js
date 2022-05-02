import React from "react";
import { useAuth } from "../../../context/auth";

const Protected = (props) => {
  const { roles } = props;
  const { user } = useAuth();

  let visible = false;

  if (roles.includes(user?.role)) {
    visible = true;
  } else if (roles === undefined) {
    visible = false;
  }

  return <>{visible && props.children}</>;
};

export default Protected;
