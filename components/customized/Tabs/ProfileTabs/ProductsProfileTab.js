import { TopTabServices } from "../TopTabContainer/TopTabServices";

export const ProductsProfileTab = ({ userId, service, option }) => {
  return (
    <TopTabServices
      userId={userId}
      //initialRoute={service?.name.toLowerCase()}
      service={service}
      option={option}
    />
  );
};
