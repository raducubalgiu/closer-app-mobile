type IProps = { roles: string[]; userRole: string | undefined; children: any };

export const Protected = ({ roles, userRole, children }: IProps) => {
  let visible = false;

  if (userRole && roles?.includes(userRole)) {
    visible = true;
  } else if (roles === undefined) {
    visible = false;
  } else {
    visible = false;
  }

  return <>{visible && children}</>;
};
