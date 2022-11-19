import { TopTabServices } from "../TopTabContainer/TopTabServices";

export const ProductsProfileTab = ({
  userId,
  service = null,
  option = null,
}) => {
  return (
    <TopTabServices
      userId={userId}
      initialRoute={service?.name.toLowerCase()}
      service={service}
      option={option}
    />
  );
};
