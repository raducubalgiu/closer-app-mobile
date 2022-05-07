import React from "react";

const Protected = (props) => {
  const { roles } = props;
  const { user } = props;

  let visible = false;

  if (roles.includes(user?.role)) {
    visible = true;
  } else if (roles === undefined) {
    visible = false;
  }

  return <>{visible && props.children}</>;
};

export default Protected;
