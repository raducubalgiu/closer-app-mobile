import React from "react";

const Protected = (props) => {
  const { roles } = props;
  const { userRole } = props;

  let visible = false;

  if (roles.includes(userRole)) {
    visible = true;
  } else if (roles === undefined) {
    visible = false;
  } else {
    visible = false;
  }

  return <>{visible && props.children}</>;
};

export default Protected;
